import express from "express";
import cors from "cors";
import {
  startMongo,
  getAllQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
} from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;
let db;

const startServer = async () => {
  db = await startMongo();
  app.listen(port);
  console.log("Listen on port 3001");
};

startServer();

app.get("/questions", async (req, res) => {
  const response = await getAllQuestions(db);
  res.status(200).json(response);
});

app.post("/questions", async (req, res) => {
  const question = req.body;
  const response = await addQuestion(db, question);
  res.status(201).json(response);
});

app.get("/questions/:id", async (req, res) => {
  const id = req.params.id;
  const response = await getQuestionById(db, id);
  res.status(200).json(response);
});

app.put("/questions", async (req, res) => {
  const question = req.body;
  const response = await updateQuestion(db, question);
  res.status(200).json(response);
});

app.delete("/questions/:id", async (req, res) => {
  const id = req.params.id;
  const response = await deleteQuestion(db, id);
  res.status(200).json({response});
});

app.post("/questions/:keywords", async (req, res) => {
  const keywords = req.params.keywords;
  const response = await searchQuestions(db, keywords);
  res.status(200).json(response);
});
