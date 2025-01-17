import React, { useState, useEffect } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  prefectureCode: string;
  reloadImages: string;
  setReloadImages: (val: string) => void;
};

const DisplayImage: React.FC<Props> = ({
  prefectureCode,
  reloadImages,
  setReloadImages,
}) => {
  const [images, setImages] = useState<Array<string> | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const fetchImages = async (code: string) => {
    try {
      const response = await axios.get(`${apiUrl}/images/${code}`, {
        withCredentials: true,
      });

      setImages(response.data.allImagesUrl);
      setReloadImages("");
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (prefectureCode) {
      fetchImages(prefectureCode);
    }
  }, [prefectureCode, reloadImages]);

  return (
    <div className="">
      {images && images.length !== 0 ? (
        <div className="grid gap-4">
          {images[selectedImage] && (
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src={images[selectedImage]}
                alt="images of a prefecture"
              />
            </div>
          )}

          <div className="grid grid-cols-5 gap-4">
            {images.map((image, index) => (
              <img
                className="h-auto max-w-full rounded-lg"
                key={index}
                src={image}
                alt="images of a prefecture"
                onClick={() => setSelectedImage(index)}
              ></img>
            ))}
          </div>
        </div>
      ) : (
        <div>No images are uploaded</div>
      )}
    </div>
  );
};

export default DisplayImage;
