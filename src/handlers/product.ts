import { Request, Response } from "express";
import Product from "../models/Produc.model";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await Product.findByPk(id);

    if (!products) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(products);

  } catch (error) {
    console.log(error);
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

// Update with put
export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await Product.findByPk(id);

    if (!products) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await products.update(req.body)
    await products.save()

    res.json(products);
    
  } catch (error) {
    console.log(error);
  }
};

// Update with pach
export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await Product.findByPk(id);

    if (!products) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    products.availability = !products.dataValues.availability
    await products.save()
    res.json(products);
    
  } catch (error) {
    console.log(error);
  }
};


// Delete
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await Product.findByPk(id);

    if (!products) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await products.destroy()
    res.json(products);
    
  } catch (error) {
    console.log(error);
  }
};


