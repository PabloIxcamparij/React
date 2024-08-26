import { Request, Response } from "express";
import Product from "../models/Produc.model";


export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};


export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};
