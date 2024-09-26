import { Request, Response } from "express";
import Product from "../../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({ order: [["id", "DESC"]] });
  res.json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  await product.update(req.body);
  await product.save();
  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  await product.destroy();
  res.json({ data: product });
};
