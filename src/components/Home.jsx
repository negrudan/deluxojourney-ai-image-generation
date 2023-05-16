import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import DisplayPost from "./DisplayPost";
import { LoadingAnimation } from "./LoadingAnimation";
import FormField from "./FormField";

const Home = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const postRef = collection(db, "posts");

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = posts.filter(
          (item) =>
            item.user.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    setLoading(true);
    const getPost = () => {
      getDocs(postRef).then((data) => {
        setPost(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        setLoading(false);
      });
    };
    getPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section className="max-w-7xl mx-30px-auto">
      <div>
        <h1 className="font-extrabold text-[#d2d2d2] text-[32px]">
          The Community <span className="text-cyan-400">Showcase</span>
        </h1>
        <p className="mt-2 text-[#d8d8d8] text-[14px] max-w-[500px]">
          Browse and create visually stunning images generated through the help
          of Stable Diffusion (using the openjourney model)!
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#d2d2d2] text-xl mb-3">
                Showing Resuls for{" "}
                <span className="text-cyan-400">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText && searchedResults
                ? searchedResults.map((post) => <DisplayPost post={post} />)
                : posts.map((post) => <DisplayPost post={post} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
