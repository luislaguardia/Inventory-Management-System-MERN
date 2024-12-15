import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct, getSalesData } from "../controllers/product.controller.js";
//new added  getSalesData for dashboard
const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get('/sales', getSalesData);


export default router;
