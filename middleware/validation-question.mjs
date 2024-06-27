export function ValidationQuestion(req, res, next) {
  const newQuestionFromClient = req.body;
  if (
    !newQuestionFromClient.title &&
    !newQuestionFromClient.description &&
    !newQuestionFromClient.category
  ) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing or invalid request data." });
  }
  if (!newQuestionFromClient.title) {
    return res.status(400).json({ message: "Missing Question 'Title'" });
  }
  if (!newQuestionFromClient.description) {
    return res.status(400).json({ message: "Missing Question 'Description'" });
  }
  if (!newQuestionFromClient.category) {
    return res.status(400).json({ message: "Missing Question 'Category'" });
  }
  next();
}
