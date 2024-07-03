import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerRouter = Router();
// Optional Requirement
// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "A simple API document",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["app.mjs", "./routes/*.mjs"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
swaggerRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
