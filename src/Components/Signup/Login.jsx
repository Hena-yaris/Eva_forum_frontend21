import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { UserContext } from "../ContextAPI/Context";
import { CircleLoader } from "react-spinners";

const Login = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  // Introduce loading state
  const [loading, setLoading] = useState(false);

  const [checkForm, setCheckForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  //from backend
  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCheckForm({
      ...checkForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErrors = {};
    if (!checkForm.email.trim()) {
      valErrors.email = "email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(checkForm.email)) {
      valErrors.email = "email is not valid";
    }
    if (!checkForm.password.trim()) {
      valErrors.password = "password is required";
    } 
    // else if (checkForm.password.length < 8) {
    //   valErrors.password = "Password must be at least 8 characters!";
    // }
    setErrors(valErrors);
    if (Object.keys(valErrors).length === 0) {
      setLoading(true);
      try {
        const { data } = await axios.post("/users/login", {
          email: checkForm.email,
          password: checkForm.password,
        });
        setUserData({ data });
        console.log(userData);
        setLoading(false);
        setSuccessMessage("login sucessfully, you can access home page");
        setError("");
        setTimeout(() => {
          navigate("/");
          localStorage.setItem("token", data.token);
        }, 3000);
        // console.log(data)
      } catch (error) {
        setLoading(false);
        setError(error.response.data.msg);
        console.log(error);
      }
    }
  };

  return (
    <div className="formbackground md:mt-14 ">
      <section className=" sm:block mx-auto md:flex md:justify-between  container-fluid max-w-[1100px]  ">
        <div className="bg-[#fff] mt-24 shadow-2xl h-[550px] bground  mr-8 container text-center rounded-2xl mb-24">
          <div>
            <div className="text-xl  pb-3 pt-10 join">
              Login to your Account
            </div>
            <p className="text-center login_have md:text-xl text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-400 login_create">
                create a new account
              </Link>
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-2 form_input login_form"
              noValidate
            >
              <div className="mb-5">
                <input
                  className=" border-current border w-[80%] h-[50px]"
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                />{" "}
                {errors.email && (
                  <div className="error w-[63%]">{errors.email}</div>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  className="border border-current w-[80%] h-[50px] "
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                />{" "}
                {errors.password && (
                  <div className="error w-[63%]">{errors.password}</div>
                )}
              </div>
              <div className="w-[98%]  text-customAbout text-lg font-medium cursor-pointer xl:pl-72 lg:pl-64 md:pl-44 sm:pl-48 pl-40">
                Forget Password?
              </div>
              <button
                className=" hover:bg-customBlight rounded-md font-mono text-lg text-white bg-customBlue m-8 px-14 py-2 w-[80%]"
                type="submit"
                value="Send"
              >
                {loading ? <CircleLoader color="yellow" size={22} /> : "Login"}
              </button>
              <br />
              {successMessage && (
                <div className="message">{successMessage}</div>
              )}
              {error && <div className="error-login">{error}</div>}
            </form>
          </div>
        </div>

        <div className="  container text-gray-800 mt-48 hidden md:block md:max-w-[800px]">
          <h6 className="text-customAbout about">About</h6>
          <h1 className=" text-4xl  font-serif">
            <span
              className="text-4xl font-bold"
              style={{
                background: `linear-gradient(to right, rgb(214, 61, 0), rgb(211, 59, 0), rgb(151, 41, 0), rgb(61, 17, 0), rgb(61, 16, 0))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Evangadi Networks Q&A
            </span>
          </h1>
          <p className="my-10 text-customEvaText no_matter">
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p className="mb-10 text-customEvaText no_matter">
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button className="text-center items-center bg-customAbout text-white   py-2 px-8 w-1/2 font-bold">
            HOW IT WORKS{" "}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Login;
