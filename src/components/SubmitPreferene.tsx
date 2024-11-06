import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

let questionsIndex = 0;

interface FavoriteListProps {
  fhandleApiResponse: (response: string) => void;
  setCurrentDisplay: (loading: string) => void;
}

const SubmitPreference: React.FC<FavoriteListProps> = ({
  handleApiResponse,
  setCurrentDisplay,
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
    setCurrentDisplay("loading");

    try {
      const response = await axios.post(
        `${apiUrl}/apiChat`,
        { formData },
        { withCredentials: true }
      );
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
      <div className="x-16 py-16 m-auto flex flex-col items-center justify-center">
        <form
          onSubmit={
            currentQuestion[0] === "cat_lover"
              ? handleSubmit
              : handleNextQuestion
          }
        >
          <div>
            <label className="my-5 py-20 text-4xl text-center font-bold ">
              {currentQuestion[1]}
            </label>
          </div>
          <div className="flex flex-wrap gap-8 my-10">
            {questionOptions[currentQuestion[0]].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionClick(currentQuestion[0], option)}
                className="h-18 w-40 px-6 m-2 text-lg bg-white hover:bg-yellow-600 hover:text-white text-black border-2 border-yellow-600/75  font-bold py-2  rounded transition-colors duration-150 focus:outline-none focus:ring focus:ring-yellow-600 "
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            {currentQuestion[0] === "cat_lover" ? (
              <button
                className="w-30 bg-yellow-700 hover:bg-yellow-600 text-white  font-bold h-16 px-6 m-2 rounded "
                type="submit"
              >
                Submit
              </button>
            ) : (
              <button
                className="w-40 bg-yellow-700 hover:bg-yellow-600 text-white  font-bold h-16 px-6 m-2 rounded "
                type="submit"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitPreference;
