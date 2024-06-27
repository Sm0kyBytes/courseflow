export function ValidationAnswer(req, res, next) {
  const newAnswerFromClient = req.body;
  if (!newAnswerFromClient.content) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing or invalid request data." });
  }
  if (newAnswerFromClient.content.length > 300) {
    return res.status(400).json({ message: "The content is too long.'" });
  }
  next();
}
