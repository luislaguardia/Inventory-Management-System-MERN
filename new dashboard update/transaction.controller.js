import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('product', 'name'); // Only fetch 'name' from Product
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        console.log("Error in fetching transactions: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}


export const createTransaction = async (req, res) => {
    const transaction = req.body; // User-provided data

    const allowedTypes = ['Sale', 'Restock', 'Damage', 'Return'];

    // Input validation
    if (!transaction.product || !transaction.transaction_type || !transaction.quantity) {
    return res
        .status(400)
        .json({ success: false, message: 'Please provide all required fields.' });
    }

    // Check if transaction_type is valid
    if (!allowedTypes.includes(transaction.transaction_type)) {
    return res.status(400).json({
        success: false,
        message: `Invalid transaction type. Allowed types are: ${allowedTypes.join(', ')}`,
    });
    }

    const newTransaction = new Transaction(transaction);

    try {
        await newTransaction.save();
        res.status(201).json({ success: true, data: newTransaction });
    } catch (error) {
        console.error('Error in Creating Transaction: ', error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
    };

// new added -- 
// should not add because the transaction tab is not going to appear
//new added 17:39
// export const getSalesData = async (req, res) => {
//     try {
//         const salesData = await Transaction.aggregate([
//             { $match: { transaction_type: 'Sale' } },
//             {
//                 $group: {
//                     _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//                     totalSales: { $sum: "$amount" }
//                 }
//             },
//             { $sort: { "_id": 1 } }
//         ]);
//         res.status(200).json(salesData);
//     } catch (error) {
//         console.error('Error fetching sales data:', error);
//         res.status(500).send('Server error');
//     }
// };
