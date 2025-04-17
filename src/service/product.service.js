import { Product } from "../models/product.model.js";


export const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw error;
  }
};


export const getAllProducts = async () => {
  try {
    return await Product.find().populate('category');
  } catch (error) {
    throw error;
  }
};


export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw error;
  }
};


export const updateProduct = async (productId, updateData) => {
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    ).populate('category');
    
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw error;
  }
};


export const deleteProduct = async (productId) => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw error;
  }
};


