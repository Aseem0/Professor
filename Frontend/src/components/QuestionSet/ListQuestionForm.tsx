import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/questions/set/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuestionSet(response?.data?.questionSet);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (questionSets.length === 0) return <p>No qusestion sets found.</p>;

  const { isAuth } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      {isAuth && (
        <Link
          className="w-53 font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:brightness-110 py-2 px-2 rounded-lg hover:opcity-80 cursor-pointer "
          to="/admin/questionset/create"
        >
          Create New Question Set
        </Link>
      )}
      <h2 className="mt-4">My Question Sets</h2>
      <ul>
        {questionSets.map((question) => {
          const TakeQuizHandler = () => {
            Navigate(`/questionset/${question._id}/attempt`);
          };
          return (
            <li key={question._id} style={{ display: "flex", gap: "1rem" }}>
              <p>
                <strong>{question.title}</strong> — {question.questionCount}{" "}
                questions
              </p>
              <button
                className="w-24 font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:brightness-110 py-2 px-2 rounded-lg hover:opcity-80 cursor-pointer"
                onClick={TakeQuizHandler}
              >
                Take Quiz
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListQuestionSet;
