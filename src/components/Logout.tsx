import React from "react";

type Props = {
  handleLogout: () => void;
};

const Logout: React.FC<Props> = ({ handleLogout }) => {
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </>
  );
};

export default Logout;
