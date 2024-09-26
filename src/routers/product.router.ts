import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product/product.controller";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/handleInputErrors";

const productRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: "Product Name"
 *         price:
 *           type: number
 *           description: The product price
 *           example: 1000
 *         isAvailable:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get a list of produts
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productRouter.get("/", getProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get data of a produts
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 */

productRouter.get(
  "/:id",
  [param("id", "id not valid").isInt(), handleInputErrors],
  getProductById
);

/**
 * @swagger
 * /api/v1/products/:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *       - Products
 *     description: Return a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Producto"
 *               price:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

productRouter.post(
  "/",
  [
    body("name", "name not valid").notEmpty(),
    body("price", "price not valid").isFloat({ min: 0 }).notEmpty(),
    handleInputErrors,
  ],
  createProduct
);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Update the data of a produts
 *     tags:
 *       - Products
 *     description: Return the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Producto"
 *               price:
 *                 type: number
 *                 example: 100
 *               isAvailable:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 */

productRouter.patch(
  "/:id",
  [
    body("isAvailable", "isAvailable not valid").isBoolean().optional(),
    body("price", "price not valid").isFloat({ min: 0 }).optional(),
    handleInputErrors,
  ],
  updateProduct
);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Update the data of a produts
 *     tags:
 *       - Products
 *     description: Return the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 */

productRouter.delete(
  "/:id",
  [param("id", "id not valid").isInt(), handleInputErrors],
  deleteProduct
);

export default productRouter;
