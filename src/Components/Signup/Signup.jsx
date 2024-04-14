
import React,{ useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from '../../axios'
import './signup.css'
import { CircleLoader } from "react-spinners";



const Signup = () => {
  // Introduce loading state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [checkForm, setCheckForm] = useState({
    uname: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  //from backend
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    //trim() empty kehone /white space kehone empty string new yemimelsln yamalet false malet new. so ! is true
    if (!checkForm.uname.trim()) {
      valErrors.uname = "user name is required";
    }
    if (!checkForm.fname.trim()) {
      valErrors.fname = "first name is required";
    }
    if (!checkForm.lname.trim()) {
      valErrors.lname = "last name is required";
    }
    if (!checkForm.email.trim()) {
      valErrors.email = "email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(checkForm.email)) {
      valErrors.email = "email is not valid";
    }
    if (!checkForm.password.trim()) {
      valErrors.password = "password is required";
    }
    else if (checkForm.password.length<8){
      valErrors.password = "Password must be at least 8 characters!";
    }
    setErrors(valErrors);
    if (Object.keys(valErrors).length === 0) {
      setLoading(true);
      try {
        await axios.post("/users/register", {
          username: checkForm.uname,
          firstname: checkForm.fname,
          lastname: checkForm.lname,
          email: checkForm.email,
          password: checkForm.password,
        });
        setLoading(false); // Set loading to false after form submission
        setMessage("Registration successful. Please proceed to login.");
        setError(""); // Clear any previous error messages
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect to login after 3 seconds
      } catch (error) {
        setLoading(false);
        setError(error.response.data.msg);
      }
    }
  };

  return (
    <div className="formbackground md:py-32 py-20">
      <section className=" sm:block mx-auto md:flex md:justify-between  container-fluid max-w-[1100px]  ">
        <div className="bg-[#fff] shadow-2xl md:h-[620px] h-[650px]  mt-10  mx-auto container text-center rounded-2xl">
          <div className=" abbaydam ">
            <div className="text-2xl pt-5 pb-3 join">Join to the network</div>
            <p className="text-center already">
              Already have an account?
              <Link className="sign" to="/login">
                sign in
              </Link>
            </p>
            <form
              className="mt-2 form_input"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-5 ">
                {" "}
                <input
                  type="text"
                  className=" border-current border w-[80%] h-[40px]"
                  placeholder="userName"
                  name="uname"
                  onChange={handleChange}
                />
                {errors.uname && (
                  <div className="error w-[70%]">{errors.uname}</div>
                )}
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  className="border-current border mb-4 w-[80%] h-[40px] mr-1 form_fname"
                  placeholder="firstName"
                  name="fname"
                  onChange={handleChange}
                />
                {errors.fname && (
                  <div className="error_first w-[70%]">{errors.fname}</div>
                )}
                <input
                  type="text"
                  className="border-current  border w-[80%] h-[40px]"
                  placeholder="LastName"
                  name="lname"
                  onChange={handleChange}
                />
                {errors.lname && (
                  <div className="error w-[70%]">{errors.lname}</div>
                )}
              </div>

              <div className="mb-5">
                {" "}
                <input
                  className=" border-current border w-[80%] h-[40px]"
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
                  className="border border-current w-[80%] h-[40px] "
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                />{" "}
                {errors.password && (
                  <div className="error w-[70%]">{errors.password}</div>
                )}
              </div>
              <p className="m-3 text-customtext font-serif">
                I agree to the{" "}
                <a
                  href="/"
                  className="text-customLink border-b-2 border-customLink"
                >
                  privacy policy
                </a>{" "}
                and{" "}
                <a
                  className="text-customLink border-b-2 border-customLink"
                  href="/"
                >
                  terms of service
                </a>
              </p>
              <button
                value="Send"
                type="submit"
                className="w-[80%] text-white bg-customBlue m-2 p-2 hover:bg-customBlight rounded-sm font-mono text-lg"
              >
                {loading ? (
                  <CircleLoader color="yellow" size={22} />
                ) : (
                  "Agree and Join"
                )}
              </button>
              <br />
              {message && <div className="message">{message}</div>}
              {error && <div className="error-back">{error}</div>}
              <a
                href="/"
                className="text-customLink sm:mb-5 border-customLink font-semibold text-lg"
              >
                Already have an account?
              </a>
            </form>
          </div>
        </div>
        <div className=" mx-auto hidden md:block container mt-44  md:max-w-[800px] md:ml-10">
          <h6 className="text-customAbout about ">About</h6>
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
          <p className=" my-10 text-customEvaText no_matter">
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
          <button className="text-center items-center bg-customAbout text-white   py-2 px-8 w-1/2 font-bold mb-10">
            How it works{" "}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Signup