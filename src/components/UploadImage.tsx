import React, { useState } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {};

const ImageUpload: React.FC<Props> = () => {
  const [selectedImage, setSelectedImage] = useState<
    File | string | Brop | null
  >(null);

  const handleImageChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      setSelectedImage(target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(`${apiUrl}/upload/1/11`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log("Image uploaded:", response.data);
      // Handle success - maybe display uploaded image on the UI
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error - display error message to the user
    }
  };

  return (
    <div className="">
      <p className="mb-1 text-2xl ">Share your photos</p>

      <input
        className="h-12 rounded"
        type="file"
        id="file_input"
        accept="image/*"
        onChange={handleImageChange}
      ></input>

      <button
        className=" bg-yellow-700 hover:bg-yellow-600 text-white h-10 px-4 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
