// product.route.js
import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getSalesData } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// New route for sales data
router.get('/sales', getSalesData);

export default router;
