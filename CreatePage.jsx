import { Box, Container, Heading, useColorModeValue, VStack, Button, Input, useToast, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    series: ''
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    // Validation to ensure all required fields are filled
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.series) {
      toast({
        title: "Error",
        description: "All fields must be filled, including the series selection.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    // Attempt to create the product
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message || "Failed to create the product.",
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product successfully created.",
        status: "success",
        isClosable: true,
      });
      // Resetting the form after successful submission
      setNewProduct({ name: '', price: '', image: '', description: '', series: '' });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Input
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />

            <Select
              placeholder="Select series"
              value={newProduct.series}
              onChange={(e) =>
                setNewProduct({ ...newProduct, series: e.target.value })
              }
            >
              <option value="series 1">Series 1</option>
              <option value="series 2">Series 2</option>
              <option value="series 3">Series 3</option>
            </Select>

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
            
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
