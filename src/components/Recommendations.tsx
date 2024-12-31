import { useState } from "react";
import SubmitPreference from "./SubmitPreferene";

type prefecture = {
  pref: string;
  activities: Array<string>;
};

const Recommendations = () => {
  const [currentDisplay, setCurrentDisplay] = useState<string>("get_started");
  const [aiResponse, setAiResponse] = useState<Array<prefecture> | null>(null);

  const changeViewToGetStarted = () => {
    setCurrentDisplay("get_started");
  };

  const changeViewToQuestion = () => {
    setCurrentDisplay("questions");
  };

  const handleApiResponse = (response: string) => {
    setCurrentDisplay("aiAnswer");

    try {
      const jsonArray = JSON.parse(response).recommendations;

      setAiResponse(jsonArray);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <div className="bg-amber-50  h-auto pl-10 pb-10 pt-2">
      {currentDisplay === "get_started" && (
        <div className=" h-80  px-16 py-16   m-auto flex flex-col items-center justify-center">
          <div className="my-5 text-4xl flex justify-center">
            Get recommendations for hidden gems by answering 6 questions
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
          setCurrentDisplay={setCurrentDisplay}
          changeViewToGetStarted={changeViewToGetStarted}
        ></SubmitPreference>
      )}

      {currentDisplay === "loading" && (
        <div className="x-16 py-16 m-auto flex flex-col items-center justify-center">
          <l-square
            size="45"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="1.2"
            color="#DD9313"
            className=""
          ></l-square>
        </div>
      )}

      {currentDisplay === "aiAnswer" && (
        <div className="px-36 ">
          {aiResponse &&
            aiResponse.map((item, index) => (
              <div key={index}>
                <p className="py-4 text-4xl font-bold mt-4">
                  {index + 1}. {item.pref}
                </p>

                <div className="text-orange-700 text-base font-bold">
                  Activities you can do
                </div>
                <ul className="ml-10 list-disc text-2xl">
                  {item.activities ? (
                    item.activities.map((activity, activityIndex) => (
                      <li key={activityIndex}>{activity}</li>
                    ))
                  ) : (
                    <li>No activities available</li>
                  )}
                </ul>
              </div>
            ))}
          <div className="mt-5 flex items-center">
            <button
              className="bg-yellow-700 hover:bg-yellow-600 text-white text-sm font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => changeViewToQuestion()}
            >
              Answer again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
