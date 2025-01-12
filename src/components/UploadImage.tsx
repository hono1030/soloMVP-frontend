import React, { useState } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  prefcode: string;
  userid: string | null;
  setReloadImages: (val: string) => void;
};

const ImageUpload: React.FC<Props> = ({
  prefcode,
  userid,
  setReloadImages,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );

  const handleImageChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      setSelectedImage(target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedImage) {
        console.error("No image selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedImage);

      await axios.post(`${apiUrl}/upload/${userid}/${prefcode}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setReloadImages("reload");
    } catch (error) {
      console.error("Error uploading image:", error);
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
