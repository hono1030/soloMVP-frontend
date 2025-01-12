import JapanMap from "../components/JapanMap";
import ImageView from "../components/ImageView";
import { useState } from "react";
import { User } from "../types";

type Props = {
  user: User | null;
};

const DiscoverPage: React.FC<Props> = ({ user }) => {
  const [activePrefecture, setActivePrefecture] = useState<string>("");

  return (
    <>
      {activePrefecture === "" ? (
        <div className="bg-sand-200">
          <div className="sm:flex">
            <div className="w-full">
              <div className="w-full h-36  p-6 flex items-center justify-center">
                <p className="font-bold text-5xl text-center">
                  Click a prefecture to see pictures
                </p>
              </div>
              <JapanMap setActivePrefecture={setActivePrefecture}></JapanMap>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-sans bg-sand-200">
          <ImageView
            prefcode={activePrefecture}
            userid={user?.userid ?? null}
            prefectureCode={activePrefecture}
            setActivePrefecture={setActivePrefecture}
          ></ImageView>
        </div>
      )}
    </>
  );
};

export default DiscoverPage;
