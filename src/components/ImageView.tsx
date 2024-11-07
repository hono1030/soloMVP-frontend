import React, { useState } from "react";
import { CgCloseR } from "react-icons/cg";
import ImageUpload from "./UploadImage";
import DisplayImage from "./DisplayImage";

type Props = {
  prefcode: string;
  userid: string | null;
  prefectureCode: string;
  setActivePrefecture: (pref: string) => void;
};

const ImageView: React.FC<Props> = ({
  prefcode,
  userid,
  prefectureCode,
  setActivePrefecture,
}) => {
  const [reloadImages, setReloadImages] = useState<string>("");

  return (
    <div className="m-10">
      <div className="flex justify-between pb-4">
        <ImageUpload
          setReloadImages={setReloadImages}
          prefcode={prefcode}
          userid={userid}
        ></ImageUpload>

        <button
          className="mr-24 text-yellow-700"
          onClick={() => {
            setActivePrefecture("");
          }}
        >
          <CgCloseR size="35px" />
        </button>
      </div>
      <DisplayImage
        setReloadImages={setReloadImages}
        reloadImages={reloadImages}
        prefectureCode={prefectureCode}
      ></DisplayImage>
    </div>
  );
};

export default ImageView;
