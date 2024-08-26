import { Router } from "express";
import { body } from "express-validator";

// Import of function
import { createProduct, getProduct } from "./handlers/product";
import { handlerInputErrors } from "./middleware";

const router = Router();

//Routing

router.get('/', getProduct)

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

router.put("/", (req, res) => {
  res.json("Desde put");
});

router.patch("/", (req, res) => {
  res.json("Desde patch");
});

router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router;
