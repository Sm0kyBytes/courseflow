import express from "express";
import questionsRouter from "./routes/question_route.mjs";
import answersRouter from "./routes/answer_route.mjs";
import swaggerRouter from "./swagger/swagger.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.use("/questions", questionsRouter);
app.use("/answers", answersRouter);

// Optional Requirement
app.use("/api-docs", swaggerRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
