import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    // new added route for series //1, 2, 3
    series: {
        type: String,
        enum: ['series 1', 'series 2', 'series 3'],
        required: true,
    },


}, {
    timestamps: true // updates createdAt, updatedAt
});

const Product = mongoose.model('Product', productSchema);

export default Product;