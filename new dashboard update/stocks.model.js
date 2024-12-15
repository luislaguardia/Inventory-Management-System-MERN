import mongoose from 'mongoose';

// Define the Stock schema with a reference to Product
const stockSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
      ref: 'Product', // The name of the model being referenced
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensure quantity is at least 1
    },
    date_last_updated: {
      type: Date, 
      default: Date.now, 
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Create and export the Stock model
const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
