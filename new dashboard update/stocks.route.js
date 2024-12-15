import express from 'express';
import { getStocks, createStock, updateStock, deleteStock, getMonthlyStockSummary } from '../controllers/stocks.controller.js';

const router = express.Router();

router.get("/", getStocks);

router.post("/", createStock);

router.put("/:id", updateStock);

router.delete("/:id", deleteStock);

//new added for dashboard feeeeee
router.get("/monthly-summary", getMonthlyStockSummary);


export default router;
