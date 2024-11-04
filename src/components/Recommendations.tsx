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
    <div>
      {currentDisplay === "get_started" && (
        <>
          <h2>What kind of trip are you looking for?</h2>
          <div>Get destination recommendations by answering 6 questions</div>
          <button type="button" onClick={() => changeViewToQuestion()}>
            Get Started
          </button>
        </>
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
