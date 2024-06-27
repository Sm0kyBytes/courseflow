import { Router } from "express";
import express from "express";
import connectionPool from "../utils/db.mjs";
import { ValidationQuestion } from "../middleware/validation-question.mjs";

const questionsRouter = Router();

questionsRouter.use(express.json());

questionsRouter.get("/", async (req, res) => {
  // Optional Requirement
  const questionTitle = req.query.title;
  const questionCategory = req.query.category;
  // console.log(questionTitle);
  // console.log(questionCategory);
  if (req.query && !questionTitle && !questionTitle) {
    return res
      .status(400)
      .json({ message: "Bad Request: Invalid query parameters." });
  }
  try {
    const result = await connectionPool.query(
      `select * from questions where (category=$1 or $1 is null or $1 ='') and (title=$2 or $2 is null or $2 ='')`,
      [questionCategory, questionTitle]
    );
    // console.log(result);
    return res.status(200).json({
      message: "Successfully retrieved the list of questions.",
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

questionsRouter.get("/:id", async (req, res) => {
  const questionId = req.params.id;
  // console.log(questionId);
  try {
    const result = await connectionPool.query(
      `select * from questions where questions.id=$1`,
      [questionId]
    );
    // console.log(result);
    if (result.rows[0]) {
      return res.status(200).json({
        message: "Successfully retrieved the question.",
        data: result.rows[0],
      });
    } else {
      return res.status(404).json({
        message: "Not Found: Question not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

questionsRouter.post("/", [ValidationQuestion], async (req, res) => {
  const newQuestion = req.body;
  try {
    const result = await connectionPool.query(
      `insert into questions(title,description,category) values($1,$2,$3 )`,
      [newQuestion.title, newQuestion.description, newQuestion.category]
    );
    return res.status(201).json({ message: "Question created successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

questionsRouter.put("/:id", [ValidationQuestion], async (req, res) => {
  const questionId = req.params.id;
  const newUpdateQuestion = req.body;
  //make this valadation following Required Requirement API
  if (!newUpdateQuestion.created_at) {
    return res.status(400).json({ message: "Missing Question 'created_at'" });
  }
  if (!newUpdateQuestion.updated_at) {
    return res.status(400).json({ message: "Missing Question 'updated_at'" });
  }
  //this pattern would be more appropriate.
  // const newUpdateQuestion = {...req.body,updated_at: new Date()};
  // update questions only title, description and category and server updating information to database with new date on 'updated_at'
  try {
    const result = await connectionPool.query(
      `update questions set title =$1, description = $2, category=$3, created_at=$4, updated_at=$5 where questions.id=$6 `,
      [
        newUpdateQuestion.title,
        newUpdateQuestion.description,
        newUpdateQuestion.category,
        newUpdateQuestion.created_at,
        newUpdateQuestion.updated_at,
        questionId,
      ]
    );
    console.log(result);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Not Found: Question not found." });
    } else {
      return res.status(200).json({
        message: "Successfully updated the question.",
        data: newUpdateQuestion,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

questionsRouter.delete("/:id", async (req, res) => {
  const questionId = req.params.id;
  try {
    const result = await connectionPool.query(
      "delete from questions where id=$1 ",
      [questionId]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Not Found: Question not found." });
    } else {
      return res.status(200).json({
        message: "Question deleted successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default questionsRouter;
