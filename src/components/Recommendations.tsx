import React, { useState } from "react";
import axios from "axios";
import SubmitPreference from "./SubmitPreferene";
const apiUrl: string = import.meta.env.VITE_API_URL;

const Recommendations = () => {
  const [currentDisplay, setCurrentDisplay] = useState<string>("get_started");
  const [aiResponse, setAiResponse] = useState<string>("get_started");

  const changeViewToQuestion = () => {
    setCurrentDisplay("questions");
  };

  const handleApiResponse = (response) => {
    setCurrentDisplay("aiAnswer");
    setAiResponse(response);
  };

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

      {currentDisplay === "aiAnswer" && <div>{aiResponse}</div>}
    </div>
  );
};

export default Recommendations;
