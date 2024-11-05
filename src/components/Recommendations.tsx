import React, { useState, useEffect } from "react";
import axios from "axios";
import SubmitPreference from "./SubmitPreferene";
const apiUrl: string = import.meta.env.VITE_API_URL;

const Recommendations = () => {
  const [currentDisplay, setCurrentDisplay] = useState<string>("get_started");
  const [aiResponse, setAiResponse] = useState<Array<object> | null>(null);

  const changeViewToQuestion = () => {
    setCurrentDisplay("questions");
  };

  const handleApiResponse = (response) => {
    setCurrentDisplay("aiAnswer");

    const jsonArray = response.split("\n\n");
    try {
      const responseArray = jsonArray.map((response) => JSON.parse(response));
      console.log(responseArray);
      setAiResponse(responseArray);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  useEffect(() => {
    console.log(aiResponse);
  }, [aiResponse]);

  return (
    <div className="bg-amber-50  h-80 ">
      {currentDisplay === "get_started" && (
        <div className=" h-80  px-16 py-16   m-auto flex flex-col items-center justify-center">
          <div className="my-5 text-4xl text-center">
            Get recommendations of destination by answering 6 questions
          </div>
          <div className="inline-block mt-5">
            <button
              className="bg-yellow-700 hover:bg-yellow-600 text-2xl text-white  py-3 px-10 rounded "
              type="button"
              onClick={() => changeViewToQuestion()}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {currentDisplay === "questions" && (
        <SubmitPreference
          handleApiResponse={handleApiResponse}
        ></SubmitPreference>
      )}

      {currentDisplay === "aiAnswer" && (
        <div>
          {aiResponse &&
            aiResponse.map((item, index) => (
              <div key={index}>
                <p>
                  {index + 1}. {item.pref}
                </p>
                <p>{item.highlights}</p>
                <ul>
                  {Array.isArray(item.activities) ? (
                    item.activities.map((activity, activityIndex) => (
                      <li key={activityIndex}>{activity}</li>
                    ))
                  ) : (
                    <li>No activities available</li>
                  )}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
