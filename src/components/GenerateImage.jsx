import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { LoadingAnimation } from "./LoadingAnimation";
import { Auth, db, storage, API_TOKEN } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [user] = useAuthState(Auth);
  const postRef = collection(db, "posts");

  const uploadImage = async () => {
    if (imageFile !== null) {
      const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
      uploadBytes(imageRef, imageFile)
        .then(() => {
          getDownloadURL(imageRef).then((url) => {
            if (prompt !== "") {
              addDoc(postRef, {
                prompt: prompt,
                image: url,
                user: user.displayName,
                logo: user.photoURL,
              })
                .then((res) => alert("posted"))
                .catch((err) => console.log(err));
            }
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    setPrompt(input);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setImageFile(new File([blob], "art.png", { type: "image/png" }));
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "art.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="imageGen">
      <div>
        <h1 className="font-extrabold text-[#d2d2d2] text-[32px]">
          Prompt Your <span className="text-cyan-400">Creativity!</span>
        </h1>
        <p className="mt-2 text-[#d8d8d8] text-[14px] max-w-[500px]">
          Browse and create visually stunning images generated through the help
          of Stable Diffusion (using the openjourney model)!
        </p>
      </div>
      <form className="generate-form mt-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="type your prompt here..."
        />
        <button type="submit" className="button">
          Create
        </button>
      </form>
      {loading && (
        <div className="loading flex justify-center items-center">
          <LoadingAnimation />
        </div>
      )}
      {!loading && output && (
        <div className="result-image">
          <img src={output} alt="art" />
          <div className="action">
            <button onClick={handleDownload} className="hover:bg-[#04acfa]">
              <FileDownloadIcon />
            </button>
            {user && (
              <button onClick={uploadImage} className="hover:bg-[#04acfa]">
                <ShareIcon />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerationForm;
