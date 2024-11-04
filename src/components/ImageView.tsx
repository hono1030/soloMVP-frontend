import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "./UploadImage";
import DisplayImage from "./DisplayImage";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  prefectureCode: string;
};

const ImageView: React.FC<Props> = ({ prefectureCode }) => {
  return (
    <div>
      <DisplayImage prefectureCode={prefectureCode}></DisplayImage>
      <ImageUpload></ImageUpload>
    </div>
  );
};

export default ImageView;
