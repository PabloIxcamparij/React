import express from "express";
import colors from "colors";
import productsRouter from "./router";
import db from "./config/db";

// Swagger import
import SwaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// Conexion a la base de datos
async function ConnectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.bgGreen.white("Conexion exitosa con la bd"));
  } catch (error) {
    console.log(colors.bgRed.white("Hubo un error en la conexion con la bd"));
    console.log(error);
  }
}

ConnectDB();

// Instacia de Axios de express
const server = express();

// Leer datos de formulario, habilita la lectura
server.use(express.json());

// http://localhost:4000/api/products/

server.use("/api/products", productsRouter);

// Docs
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))

export default server;
