import React, { useState, useEffect } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  prefectureCode: string;
};

const DisplayImage: React.FC<Props> = ({ prefectureCode }) => {
  const [images, setImages] = useState<Array<string> | null>(null);
  const fetchImages = async (code: string) => {
    try {
      const response = await axios.get(`${apiUrl}/images/${code}`);

      console.log("Image uploaded:", response.data.allImagesUrl);
      setImages(response.data.allImagesUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (prefectureCode) {
      fetchImages(prefectureCode);
    }
  }, [prefectureCode]);

  return (
    <div>
      {images ? (
        images.map((image, index) => (
          <img key={index} src={image} alt="images of a prefecture"></img>
        ))
      ) : (
        <div>No images are uploaded</div>
      )}
    </div>
  );
};

export default DisplayImage;
