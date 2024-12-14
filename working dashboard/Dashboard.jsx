import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function Transactions() {
    const [products, setProducts] = useState([]);
    const toast = useToast();

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const markAsSold = (id) => {
        axios.patch(`/api/products/${id}`, { soldAt: new Date() })
            .then(() => {
                setProducts(products.map(product => 
                    product._id === id ? { ...product, soldAt: new Date() } : product
                ));
                toast({
                    title: "Product marked as sold",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                console.error('Error marking as sold:', error);
                toast({
                    title: "Failed to mark as sold",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Transactions</h1>
            <table style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Date Added</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.createdAt}</td>
                            <td>
                                <Menu>
                                    <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" />
                                    <MenuList>
                                        <MenuItem onClick={() => markAsSold(product._id)}>Mark as Sold</MenuItem>
                                    </MenuList>
                                </Menu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;
