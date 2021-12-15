import React, { useEffect, useState } from "react";
import { updateQuestion, getQuestionById } from "../services/Services";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export default function EditQuestion() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const question = await getQuestionById(id);
      setText(question.text)
      setAnswers(question.answers)
      setCorrectAnswer(question.correctAnswer)
    }
    fetchData()
  }, [id])

  const onAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const onAddAnswer = () => {
    const newAnswers = [...answers];
    newAnswers.push("");
    setAnswers(newAnswers);
  };

  const onDeleteAnswer = (index) => {
    if (correctAnswer === index) {
      setCorrectAnswer(-1);
    }
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  const onSaveQuestion = (event) => {
    event.preventDefault();
    if (validateQuestion()) {
      const question = {
        _id: id,
        text: text,
        answers: answers,
        correctAnswer: correctAnswer,
      };
      updateQuestion(question);
      navigate("/");
    }
  };

  const validateQuestion = () => {
    console.log(text.length);
    if (text.length === 0) {
      alert("Question must have question");
      return false;
    }
    if (correctAnswer < 0) {
      alert("Question must have one correct answer");
      return false;
    }
    if (answers.length < 2) {
      alert("The number of answers must greater or equal to 2");
      return false;
    }
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].length === 0) {
        alert("Question can not have empty answer");
        return false;
      }
    }
    return true;
  };
  return (
    <div className="container">
      <h1>New question</h1>
      <form id="frm-create">
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            value={text}
            onChange={(inputEvent) => setText(inputEvent.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Answers: </label>
          {answers.map((answer, index) => {
            return (
              <div className="answer" key={index}>
                <input
                  type="text"
                  name="answers"
                  value={answer}
                  onChange={(inputEvent) =>
                    onAnswerChange(index, inputEvent.target.value)
                  }
                />
                <div>
                  <input
                    name="correctAnswer"
                    type="radio"
                    id={`answer-${index}`}
                    checked={parseInt(correctAnswer) === index}
                    onChange={() => setCorrectAnswer(index)}
                  />
                  <label htmlFor={`answer-${index}`}>correct</label>
                </div>
                <button
                  type="button"
                  className="btn btn-orange"
                  onClick={() => onDeleteAnswer(index)}
                >
                  <i className="fas fa-times"></i> Remove
                </button>
              </div>
            );
          })}

          <div className="text-right">
            <button
              type="button"
              className="btn btn-blue"
              onClick={onAddAnswer}
            >
              <i className="fas fa-plus"></i> Add
            </button>
          </div>
        </div>

        <div className="actions">
          <button className="btn btn-blue btn-large" onClick={onSaveQuestion}>
            <i className="fas fa-save"></i> Save
          </button>
        </div>
      </form>
    </div>
  );
}
