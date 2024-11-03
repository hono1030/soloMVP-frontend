import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

let questionsIndex = 0;

function SubmitPreference() {
  const questions = [
    "travel_style",
    "activity_level",
    "cultural_experiences",
    "transport_mode",
    "travel_companions",
    "cat_lover",
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

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSelect(e) {
    e.preventDefault();
    questionsIndex++;
    setCurrentQuestion(questions[questionsIndex]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/apiChat`, { formData });
      console.log(response.data);
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      reportError({ message });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      {currentQuestion === "travel_style" && (
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
      )}
    </>
  );
}

export default SubmitPreference;
