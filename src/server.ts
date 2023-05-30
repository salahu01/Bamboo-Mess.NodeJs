import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { config } from "dotenv";
import options from "./utils/swagger/swagger";
import productRoutes from "./routes/products_routes";
import categoriesRoutes from "./routes/categories_routes";
import employeeRoutes from "./routes/employee_routes";
import recieptsRoutes from "./routes/reciepts_routes";
import { connectDb } from "./configs/mongodb";

config()

const port = process.env.PORT || 8888;

const url = `http://localhost:${port}`

const app = express();

const specs = swaggerJsdoc(options(url));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/reciepts", recieptsRoutes);

app.all("*", (_req, _res) => {
  _res.status(404).send("Page Not Found");
});

async function startServer() {
  await connectDb()
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${url}/api-docs`);
  })
}

startServer()
