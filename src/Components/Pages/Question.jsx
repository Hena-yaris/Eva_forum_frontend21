import React, { useState,useEffect } from "react";

import axios from '../../configaxios';
import { Link, useNavigate } from 'react-router-dom';
import { CircleLoader } from "react-spinners";



const Question = () => {
  const navigate = useNavigate();

  // Introduce loading state
  const [loading, setLoading] = useState(false);

  const [checkForm, setCheckForm] = useState({
    title: "",
    description: "",
  });


   const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState(true);

    useEffect(() => {
      if (successMessage) {
        setTimeout(() => {
          setSuccessMessage("");
          setDisplayMessage(true);
          // Set displayMessage back to true after 3 seconds
        }, 3000);
      }
    }, [successMessage]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCheckForm({
      ...checkForm,
      [name]: value,
    });
  };

  const handleEvent = async (e) => {
    e.preventDefault();
    const valErrors = {};
    if (!checkForm.title.trim()) {
      valErrors.title = "title is required";
    }
    if (!checkForm.description.trim()) {
      valErrors.description = "description is required";
    }
    setErrors(valErrors);
    if (Object.keys(valErrors).length===0) {
        setLoading(true)

    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const { data } = await axios.post(
        "/questions/askquestion",
        {
          title: checkForm.title,
          description: checkForm.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data);
      // Set loading to false after form submission
      setLoading(false);
      setSuccessMessage("Posted successfully.Thank You.🙏");
      // Set displayMessage to false when success message is displayed
      setDisplayMessage(false);
      setCheckForm({
        // Reset the text in textarea
        title: "",
        description: "",
      });
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  }
  };

  return (
    <div>
      <section className=" sm:my-32  md:my-2">
        <div className="w-full container mx-auto">
          <h2 className=" font-serif text-3xl mt-24 md:ml-40 ml-8 text-orange-400">
            Steps to Write Good Questions
          </h2>
          <ul className="text-sm list-none mt-4 font-semibold md:ml-52 ml-14 text-indigo-400">
            <li className="flex items-center mb-2">
              <span className="bg-black rounded-full h-2 w-2 mr-2"></span>
              Summarize your problem in one-line title.
            </li>
            <li className="flex items-center mb-2">
              <span className="bg-black rounded-full h-2 w-2 mr-2"></span>
              Describe your problem in more detail.
            </li>
            <li className="flex items-center mb-2">
              <span className="bg-black rounded-full h-2 w-2 mr-2"></span>
              Describe what you tried and what you expect.
            </li>
            <li className="flex items-center">
              <span className="bg-black rounded-full h-2 w-2 mr-2"></span>
              Review your questions and post it to the site.
            </li>
          </ul>
        </div>
        <form
          onSubmit={handleEvent}
          className="text-center mt-24 max-w-[1000px] boxshadow-2xl mx-auto rounded-2xl h-[450px] border mb-10 shadow-2xl"
        >
          <h1 className="text-3xl my-7 font-serif text-green-500">
            {loading
              ? "Ask a public Question"
              : displayMessage
              ? "Ask a public Question"
              : successMessage}
          </h1>
          <div>
            <input
              type="text"
              value={checkForm.title}
              placeholder="Title"
              name="title"
              onChange={handleChange}
              className="w-[90%] h-[40px] rounded-2xl border border-gray-300 my-2 focus:bg-white  bg-gray-700 p-2 font-semibold outline-none"
            />
            {errors.title && (
              <div className="error h-[60px]">{errors.title}</div>
            )}
          </div>

          <div className="mb-5">
            <textarea
              className="w-[90%] rounded-2xl h-[150px] border border-gray-300 bg-gray-800 focus:bg-white outline-none p-2 font-semibold"
              value={checkForm.description}
              onChange={handleChange}
              name="description"
              placeholder="Question Description..."
            ></textarea>
            {errors.description && (
              <div className="error">{errors.description}</div>
            )}
          </div>

          <div className="flex items-center justify-around">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400  md:py-4 md:px-10 py-2 px-2 my-2 rounded-lg text-white font-serif md:text-xl text-sm"
            >
              {loading ? (
                <CircleLoader color="yellow" size={22} />
              ) : (
                "Post Your Questions"
              )}
            </button>
            <Link to={"/"}>
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-yellow-500 hover:to-orange-600 sm:py-4 md:px-10 py-2 px-3 my-2 rounded-lg text-white font-serif md:text-xl text-sm ml-2"
              >
                Back to DashBoard
              </button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Question;


            