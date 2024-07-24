"use client";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchLikesDislikes} from "@/store/likesSlice/likesSlice";
import LikeHeart from "@/app/likeHeart/likeHeart.js";

const LikeHTML = ({id}) => {
  console.log("pesho", id);
  let cardIdInfo = [];
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  let err = "";
  let content;
  const dispatch = useDispatch();
  const status = useSelector((state) => state.likes.status);
  const error = useSelector((state) => state.likes.error);
// Create a new URLSearchParams object
  const params = new URLSearchParams({
    "id": id
  });
  const storeData = useSelector((state) => {
    cardIdInfo = state.todo;
  });
  useEffect(() => {
    getTodos();
  }, [status]);
  const getTodos = () => {
    if (status === "idle") {
      dispatch(fetchLikesDislikes(params));
    } else if (status === "loading") {
      content = <div>Loading...</div>;
    } else if (status === "succeeded") {
      console.log("pesho", cardIdInfo);

    } else if (status === "failed") {
      content = <div>{error}</div>;
    } else {
      console.log("peshoDARTA", status, data);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {
        likesData.isLoading ? <div><h1>Loading........</h1></div> :
          <div className="likeDislikeBtn">
            <button className="removeBgrBorder" onClick={handleLike} disabled={isLiked || isDisliked}>
              <LikeHeart/>
              <span>{likesData.data.likes}</span>
            </button>
            {/*<button onClick={handleLike} disabled={isLiked || isDisliked}>👍 Харесвам <span>{likesData.data.likes}</span>*/}
            {/*</button>*/}
            {/*<button className="removeBgrBorder" onClick={handleDislike} disabled={isLiked || isDisliked}>*/}
            {/*  <DisLikeheart/>*/}
            {/*  <span>{likesData.data.dislikes}</span>*/}
            {/*</button>*/}
            {/*<button onClick={handleDislike} disabled={isLiked || isDisliked}>👎 Не*/}
            {/*  харесвам <span>{likesData.data.dislikes}</span></button>*/}
          </div>
      }
    </div>
  );
};

export default LikeHTML;
