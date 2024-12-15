import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';
import stockRoutes from './routes/stocks.route.js';
import transactionRoutes from './routes/transaction.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows to accept json data to body

app.use("/api/products", productRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/transactions", transactionRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});

