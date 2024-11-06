import React, { useState, useEffect } from "react";

import { CgCloseR } from "react-icons/cg";
import ImageUpload from "./UploadImage";
import DisplayImage from "./DisplayImage";

const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  prefectureCode: string;
  setActivePrefecture: (pref: string) => void;
};

const ImageView: React.FC<Props> = ({
  prefectureCode,
  setActivePrefecture,
}) => {
  return (
    <div className="m-10">
      <div className="flex justify-between pb-4">
        <ImageUpload></ImageUpload>

        <button
          className="mr-24 text-yellow-700"
          onClick={() => {
            setActivePrefecture("");
          }}
        >
          <CgCloseR size="35px" />
        </button>
      </div>
      <DisplayImage prefectureCode={prefectureCode}></DisplayImage>
    </div>
  );
};

export default ImageView;
