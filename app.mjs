import express from "express";
import questionsRouter from "./routes/question_route.mjs";
import answersRouter from "./routes/answer_route.mjs";
// Optional Requirement swagger
import swaggerUi from "swagger-ui-express";
import { loadSwaggerDocument } from "./utils/swagger.mjs";

const app = express();
const port = 4000;

app.use(express.json());
// Optional Requirement swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(loadSwaggerDocument()));

app.use("/questions", questionsRouter);
app.use("/answers", answersRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
