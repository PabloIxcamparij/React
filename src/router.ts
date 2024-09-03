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
