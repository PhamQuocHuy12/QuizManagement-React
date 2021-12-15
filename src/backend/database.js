import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
const url = "mongodb://localhost:27017/wpr-quiz";
const client = new MongoClient(url);

export const startMongo = async () => {
  await client.connect();
  const db = client.db();
  return db;
};

export const getAllQuestions = async (db) => {
  return await db.collection("questions").find().toArray();
};

export const getQuestionById = async (db, id) => {
  return await db.collection("questions").findOne({ _id: new ObjectId(id) });
};

export const searchQuestions = async (db, keywords) => {
  return await db
    .collection("questions")
    .find({ text: { $regex: new RegExp(keywords, "i") } })
    .toArray();
};

export const addQuestion = async (db, question) => {
  return await db.collection("questions").insertOne(question);
};

export const updateQuestion = async (db, question) => {
  return await db.collection("questions").updateOne(
    { _id: new ObjectId(question._id) },
    {
      $set: {
        text: question.text,
        answers: question.answers,
        correctAnswer: question.correctAnswer,
      },
    }
  );
};

export const deleteQuestion = async (db, id) => {
    return await db
      .collection("questions")
      .deleteOne({ _id: new ObjectId(id) });
  };
