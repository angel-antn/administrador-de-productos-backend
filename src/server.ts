import express from "express";
import productRouter from "./routers/product.router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import db from "./config/db";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
  } catch (error) {
    console.log(error);
    console.log("Error al conectar con la base de datos");
  }
}

connectDB();
const server = express();
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (
      origin === process.env.FRONT_URL ||
      origin === process.env.SWAGGER_URL ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan("dev"));

server.use("/api/v1/products", productRouter);

server.get("/api", (req, res) => {
  res.json({ msg: "Hola mundo" });
});

server.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
