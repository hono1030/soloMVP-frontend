import { Link } from "react-router-dom";
import { User } from "../types";

type Props = {
  user: User | null;
  handleLogout: () => void;
};

const Header: React.FC<Props> = ({ user, handleLogout }) => {
  return (
    <header className="fixed top-0 left-0 w-full  border-b border-gray-200 z-[102] h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold text-2xl mr-4 shrink-0 text-[#34495E]">
        Discover Japan
      </h1>
      <ul className="flex justify-center gap-8">
        <li>
          <span className="cursor-pointer hover:bg-yellow-600 hover:text-white rounded w-auto px-4 py-2 text-xl font-bold">
            <Link to="/">Home</Link>
          </span>
        </li>
        <li>
          <span className="cursor-pointer hover:bg-yellow-600 hover:text-white rounded w-auto px-4 py-2 text-xl font-bold">
            <Link to="/discover">Discover</Link>
          </span>
        </li>
        <li>
          <span className="cursor-pointer hover:bg-yellow-600 hover:text-white rounded w-auto px-4 py-2 text-xl font-bold">
            <Link to="/map">Map</Link>
          </span>
        </li>
      </ul>

      <div className="flex gap-4 ml-auto">
        {user ? (
          <button
            className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              to="/signin"
              className="text-green-700 w-auto flex items-center text-xl font-bold"
            >
              Log In
            </Link>
            <span className="cursor-pointer bg-yellow-700 hover:bg-yellow-600 rounded w-auto px-4 py-2 font-normal">
              <Link to="/signup" className="text-white">
                Sign Up
              </Link>
            </span>
          </>
        )}
      </div>
      {/* </nav> */}
    </header>
  );
};

export default Header;
