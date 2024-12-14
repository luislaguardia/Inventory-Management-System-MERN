// Stocks.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stocks() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const updateQuantity = (id, delta) => {
        axios.patch(`/api/products/${id}`, { quantity: delta })
            .then(response => {
                setProducts(products.map(product => 
                    product._id === id ? { ...product, quantity: product.quantity + delta } : product
                ));
            })
            .catch(error => console.error('Error updating quantity:', error));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Stocks</h1>
            <table style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Unit Cost</th>
                        <th>Quantity in Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => updateQuantity(product._id, 1)} style={{ margin: '0 5px' }}>Add Stock</button>
                                <button onClick={() => updateQuantity(product._id, -1)} disabled={product.quantity <= 0} style={{ margin: '0 5px' }}>Reduce Stock</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Stocks;
