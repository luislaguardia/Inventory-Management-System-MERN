import Stock from '../models/stocks.model.js'; 
import mongoose from 'mongoose';

export const getStocks = async (req, res) => {
    try {
        // Fetch stocks and populate the product field with the product name
        const stocks = await Stock.find({}).populate('product', 'name'); // Populate only the 'name' field of the product
        res.status(200).json({ success: true, data: stocks });
    } catch (error) {
        console.log("Error in fetching stocks: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const createStock = async (req, res) => {
    const stock = req.body; // user will send data

    if (!stock.product || !stock.quantity ) {
        return res.status(400).json({ success: false, message: "Please provide all fields."})
    }

    const newStock = new Stock(stock)

    try {
        await newStock.save();
        res.status(201).json({ success: true, data: newStock})
    } catch (error) {
        console.error("Error in Creating Stock: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}


export const updateStock = async (req, res) => {
    const { id } = req.params;

    const stock = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Stock ID."});
    }

    try {
        const updatedStock = await Stock.findByIdAndUpdate(id, stock, { new: true});
        res.status(200).json({ success: true, data: updatedStock});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error."});
    }
}


export const deleteStock = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Stock ID."});
    }
    
    try {
        await Stock.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Stock Deleted."});
    } catch (error) {
        console.log("Error in deleting stock: ", error.message);
        res.status(500).json({ success: false, message: "Server Error."});
    }
}


// newly added for stocks,, dashabaord

export const getMonthlyStockSummary = async (req, res) => {
    try {
        const stockSummary = await Stock.aggregate([
            {
                $project: {
                    month: { $month: "$date_last_updated" },
                    year: { $year: "$date_last_updated" },
                    quantity: 1
                }
            },
            {
                $match: { year: new Date().getFullYear() } // Filter to current year
            },
            {
                $group: {
                    _id: "$month",
                    totalStock: { $sum: "$quantity" }
                }
            },
            {
                $sort: { _id: 1 } // Sort by month
            }
        ]);
        res.status(200).json(stockSummary);
    } catch (error) {
        console.error("Error in fetching monthly stock summary: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};
