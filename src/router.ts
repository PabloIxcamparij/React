import { Router } from "express";
import { body, param } from "express-validator";

// Import of function
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateAvailability,
  updateProductById,
} from "./handlers/product";

import { handlerInputErrors } from "./middleware";

const router = Router();

// Schema product
/**
 * @swagger
 * components:
 *   schemas:
 *    Product:
 *     type: object
 *     properties:
 *              id:
 *                 type: integer
 *                 description: The Product ID, it is auto-generated
 *                 example: 1
 *              name:
 *                 type: string
 *                 description: The Product name, it is a input
 *                 example: Intel Core
 *              price:
 *                 type: decimal
 *                 description: The Product price, it is a input
 *                 example: 300
 *              availability:
 *                 type: boolean
 *                 description: The Product availability, it is auto-determined in true when create a product
 *                 example: true
 */

// Get all products
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:     
 *                    $ref: '#/components/schemas/Product'
 */

// Search product
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found
 * 
 *       400:
 *         description: Bad Request - Invalid ID
 */

// Create product
/**
 * @swagger
 * /api/products/:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *       - Products
 *     description: Creates and returns a new product record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Intel Core"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 3.99
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:     
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid input
 */

// Update product
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product with user input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Intel Core"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 3.99
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:     
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid input
 */

// Update product availability
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product availability
 *     tags:
 *       - Products
 *     description: Returns the updated product availability 
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:     
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid input
 *       404:
 *         description: Not found
 */

// Delete product
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product 
 *     tags:
 *       - Products
 *     description: Returns the message about delete product successful 
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful delete
 *         content:
 *           application/json:
 *             schema:     
 *                 type: string
 *                 value: "Producto eliminado"
 *       400:
 *         description: Bad Request - Invalid input
 *       404:
 *         description: Not found
 */

//Routing

router.get("/", getProduct);

//Router dinamico

router.get(
  "/:id",
  param("id").isInt().withMessage("Valor no valido"),
  handlerInputErrors,
  getProductById
);

router.post(
  "/",

  body("name")
    .notEmpty()
    .withMessage("EL nombre de Producto no puede ir vacio"),

  body("price")
    .notEmpty()
    .withMessage("EL precio de Producto no puede ir vacio")
    .isNumeric()
    .withMessage("El valor no es valido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),

  handlerInputErrors,

  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Valor no valido"),

  body("name")
    .notEmpty()
    .withMessage("EL nombre de Producto no puede ir vacio"),

  body("price")
    .notEmpty()
    .withMessage("EL precio de Producto no puede ir vacio")
    .isNumeric()
    .withMessage("El valor no es valido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),

  handlerInputErrors,

  updateProductById
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Valor no valido"),
  handlerInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Valor no valido"),
  handlerInputErrors,
  deleteProduct
);

export default router;
