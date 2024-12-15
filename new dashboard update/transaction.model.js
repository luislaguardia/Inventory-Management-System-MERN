import mongoose from 'mongoose';

// Define the Transaction schema
const transactionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId, // Reference to an existing product
      ref: 'Product', // The name of the referenced model
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ['Sale', 'Restock', 'Damage', 'Return'], // Restrict to specific types
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensure quantity is at least 1
    },
    date: {
      type: Date,
      default: Date.now, // Automatically set to the current date
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
