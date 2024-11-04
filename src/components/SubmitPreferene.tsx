import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

let questionsIndex = 0;

interface FavoriteListProps {
  fhandleApiResponse: (response: string) => void;
}

const SubmitPreference: React.FC<FavoriteListProps> = ({
  handleApiResponse,
}) => {
  const questions = [
    ["travel_style", "How would you describe your travel style?"],
    ["activity_level", "What activity level do you prefer?"],
    [
      "cultural_experiences",
      "Are you interested in traditional Japanese cultural experiences?",
    ],
    ["transport_mode", "What transportation mode will you primarily use?"],
    ["travel_companions", "Are you traveling with any of the following?"],
    [
      "cat_lover",
      "Are you a fan of cats or interested in cat-themed experiences?",
    ],
  ];

  const [formData, setFormData] = useState<object>({
    travel_style: "",
    activity_level: "",
    cultural_experiences: "",
    transport_mode: "",
    travel_companions: "",
    cat_lover: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    questions[questionsIndex]
  );

  const handleOptionClick = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  //   function handleChange(e) {
  //     e.preventDefault();
  //     const { name, value } = e.target;
  //     console.log(name, value);
  //     setFormData((prevState) => ({ ...prevState, [name]: value }));
  //   }

  const handleNextQuestion = (e) => {
    e.preventDefault();
    questionsIndex++;
    if (questionsIndex < questions.length) {
      setCurrentQuestion(questions[questionsIndex]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/apiChat`, { formData });
      console.log(response.data);
      handleApiResponse(response.data.openaiResponse);
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      reportError({ message });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const questionOptions = {
    travel_style: [
      "Adventure",
      "Relaxed",
      "Cultural",
      "Family-friendly",
      "Nature-focused",
      "Foodie",
    ],
    activity_level: ["Low-key/relaxed", "Moderate", "High-energy"],
    cultural_experiences: [
      "Highly interested",
      "Somewhat interested",
      "Not interested",
    ],
    transport_mode: ["Public transit", "Rental car", "Bicycle", "Walking"],
    travel_companions: ["Family with kids", "Friends", "Partner", "Solo"],
    cat_lover: ["Yes", "No", "Open to trying"],
  };

  return (
    <>
      <div>
        <form
          onSubmit={
            currentQuestion[0] === "cat_lover"
              ? handleSubmit
              : handleNextQuestion
          }
        >
          <label>{currentQuestion[1]}</label>
          <div className="options-container">
            {questionOptions[currentQuestion[0]].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionClick(currentQuestion[0], option)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
          {currentQuestion[0] === "cat_lover" ? (
            <button type="submit">Submit</button>
          ) : (
            <button type="submit">Next</button>
          )}
        </form>
      </div>

      <style jsx>{`
        .options-container {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .option-button {
          padding: 10px;
          border: 2px solid #ccc;
          border-radius: 5px;
          background-color: white;
          cursor: pointer;
        }
        .option-button:hover {
          border-color: #0070f3;
          background-color: #f0f0f0;
        }
      `}</style>
      {/* {currentQuestion === "travel_style" && (
        <div>
          <form method="post" onSubmit={handleSelect}>
            <label>
              How would you describe your travel style?
              <select
                name="travel_style"
                onChange={handleChange}
                // value={state.value}
                // onChange={handleChange}
              >
                <option value=""></option>
                <option value="Adventure">Adventure</option>
                <option value="Relaxed">Relaxed</option>
                <option value="Cultural">Cultural</option>
                <option value="Family-friendly">Family-friendly</option>
                <option value="Nature-focused">Nature-focused</option>
                <option value="Foodie">Foodie</option>
              </select>
            </label>

            <button type="submit">Next</button>
          </form>
        </div>
      )}

      {currentQuestion === "activity_level" && (
        <div>
          <form method="post" onSubmit={handleSelect}>
            <label>
              What activity level do you prefer?
              <select
                name="activity_level"
                onChange={handleChange}
                // value={state.value}
                // onChange={handleChange}
              >
                <option value=""></option>
                <option value="Low-key/relaxed">Low-key/relaxed</option>
                <option value="Moderate">Moderate</option>
                <option value="High-energy">High-energy</option>
              </select>
            </label>

            <button type="submit">Next</button>
          </form>
        </div>
      )}

      {currentQuestion === "cultural_experiences" && (
        <div>
          <form method="post" onSubmit={handleSelect}>
            <label>
              Are you interested in traditional Japanese cultural experiences?
              <select
                name="cultural_experiences"
                onChange={handleChange}
                // value={state.value}
                // onChange={handleChange}
              >
                <option value=""></option>
                <option value="Highly interested">Highly interested</option>
                <option value="Somewhat interested">Somewhat interested</option>
                <option value="Not interested">Not interested</option>
              </select>
            </label>

            <button type="submit">Next</button>
          </form>
        </div>
      )}

      {currentQuestion === "transport_mode" && (
        <div>
          <form method="post" onSubmit={handleSelect}>
            <label>
              What transportation mode will you primarily use?
              <select
                name="transport_mode"
                onChange={handleChange}
                // value={state.value}
                // onChange={handleChange}
              >
                <option value=""></option>
                <option value="Public transit">Public transit</option>
                <option value="Rental car">Rental car</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Walking">Walking</option>
              </select>
            </label>

            <button type="submit">Next</button>
          </form>
        </div>
      )}
      {currentQuestion === "travel_companions" && (
        <div>
          <form method="post" onSubmit={handleSelect}>
            <label>
              Are you traveling with any of the following?
              <select
                name="travel_companions"
                onChange={handleChange}
                // value={state.value}
                // onChange={handleChange}
              >
                <option value=""></option>
                <option value="Family with kids">Family with kids</option>
                <option value="Friends">Friends</option>
                <option value="Partner">Partner</option>
                <option value="Solo">Solo</option>
              </select>
            </label>

            <button type="submit">Next</button>
          </form>
        </div>
      )}
      {currentQuestion === "cat_lover" && (
        <div>
          <form method="post" onSubmit={handleSubmit}>
            <label>
              Are you a fan of cats or interested in cat-themed experiences?
              <select
                name="cat_lover"
                onChange={handleChange}
                // value={state.value}
                // onChange={handleChange}
              >
                <option value=""></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Open to trying)">Open to trying</option>
              </select>
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      )} */}
    </>
  );
};

export default SubmitPreference;
