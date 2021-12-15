import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllQuestions,
  searchQuestions,
  deleteQuestion,
} from "../services/Services";

export default function AllQuestion() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      if (search === "") {
        const data = await getAllQuestions();
        setQuestions(data);
      } else {
        const data = await searchQuestions(search);
        setQuestions(data);
      }
    };
    fetchQuestions();
  }, [search]);

  const onDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete this question?")) {
      await deleteQuestion(id);
      const data = await getAllQuestions();
      setQuestions(data);
    }
  };
  return (
    <div className="container">
      <h1>All questions</h1>

      <div id="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputEvent) => setSearch(inputEvent.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Answer</th>
            <th width="210">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{question.text}</td>
                <td>{question.answers[question.correctAnswer]}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/edit/${question._id}`,
                    }}
                  >
                    <button className="btn btn-blue">
                      <i className="far fa-edit"></i> Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-orange"
                    onClick={() => onDelete(question._id)}
                  >
                    <i className="far fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
