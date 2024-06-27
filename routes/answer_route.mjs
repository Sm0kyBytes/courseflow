import { Router } from "express";
import express from "express";
import connectionPool from "../utils/db.mjs";

const answersRouter = Router();
answersRouter.use(express.json());

answersRouter.post("/:id/upvote", async (req, res) => {
  const answerId = req.params.id;
  try {
    const result = await connectionPool.query(
      `insert into answer_votes(answer_id,vote) values($1,$2) returning *;`,
      [answerId, 1]
    );
    return res.status(200).json({
      message: "Successfully upvoted the question.",
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found: Question not found.",
    });
  }
});
answersRouter.post("/:id/downvote", async (req, res) => {
  const answerId = req.params.id;
  try {
    const result = await connectionPool.query(
      `insert into answer_votes(answer_id,vote) values($1,$2) returning *;`,
      [answerId, -1]
    );
    return res.status(200).json({
      message: "Successfully upvoted the question.",
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found: Question not found.",
    });
  }
});

export default answersRouter;
