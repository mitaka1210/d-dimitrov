"use client";
import React, {useEffect, useState} from "react";
import "./addComments.scss";
import {useDispatch, useSelector} from "react-redux";
import {addComments, submitComment} from "../../store/addComments/addCommentSlice.js";
import {getArticleComment} from "../../store/getCommentsForArticle/getCommentSlice.js";
import axios from "axios";

const AddComment = ({id}) => {
  const [comments, setComments] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const date = new Date();
  const time = new Date().toLocaleTimeString();
  let content;
  const status = useSelector((state) => state.likes.status);
  const error = useSelector((state) => state.likes.error);
  useEffect(() => {
    if (submit) {
      dispatch(getArticleComment(id));
    }
  }, [submit]);
  const getTodos = () => {
    if (status === "idle") {
      dispatch(submitComment(params));
    } else if (status === "loading") {
      content = <div>Loading...</div>;
    } else if (status === "succeeded") {
    } else if (status === "failed") {
      content = <div>{error}</div>;
    } else {
    }
  };
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/addComments", {comments: comments, id: id, email: email, name: name, time: time});
      // resetInput(e);
    } catch (err) {
      console.error(err.message);
    }
  };
  const resetInput = (event) => {
    setComments("");
    setEmail("");
    setName("");
  };
  const addComment = (email, name, comments) => {
    setSubmit(true);
    if (email.trim() && name.trim() && comments.trim()) {
      dispatch(addComments({
        comments: comments,
        id: id,
        email: email,
        name: name,
        time: time,
        date: date.toDateString()
      }));
    }
  };
  return (
    <div>
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2>Вашият коментар</h2>
          <h6>Вашият имейл адрес няма да бъде публикуван. Задължителните полета са отбелязани с *</h6>
          <form action="#" className="space-y-8" onSubmit={onSubmitForm}>
            <div>
              <label htmlFor="email"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Имейл
                *</label>
              <input type="email" id="email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                     placeholder="имейл" required/>
            </div>
            <div>
              <label htmlFor="subject"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Име*</label>
              <input type="text" id="subject"
                     value={name}
                     className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                     placeholder="име" onChange={e => setName(e.target.value)} required/>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Коментар:*</label>
              <textarea id="message" rows="6"
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Коментар..."></textarea>
            </div>
            <div className="read-back-btn">
              <button
                type={"submit"}
                onClick={() => addComment(email, name, comments)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Публикуване
              </button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default AddComment;
