import React, { useEffect, useState, useContext } from "react";
import { TbHexagonLetterE } from "react-icons/tb";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import evangadilogo from "../../Images/Icons/black-eva.png";
import { UserContext } from "../ContextAPI/Context";
import Button from "./Button";
const Navbar = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  // Initialize to "Sign in"
  const [logoutText, setLogoutText] = useState("Sign in");
  const navigate = useNavigate();
  const goToSignIn = (e) => {
    e.preventDefault();
    if (userData?.data) {
      logout();
    }
    navigate("/login");
  };

  useEffect(() => {
    // Change the logout text to "Log out" after 3 seconds if userData is present
    if (userData?.data) {
      const timeout = setTimeout(() => {
        setLogoutText("Log out");
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      // Reset to "Sign in" if userData becomes null
      setLogoutText("Sign in");
    }
  }, [userData]);


  const Links=[
    {name:"Home",link:"#"},
    {name:"How it works",link:"#"}
  ]

  const [open,setOpen]=useState(false);
  return (
    <>
      <section>
        <div className="shadow-md w-full fixed top-0 left-0">
          <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
            <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins]">
              <span className="text-3xl bg-customAbout mr-1 p-1">
                <TbHexagonLetterE size={22} color="black" />
              </span>
              {/* Evangadi */}
              <img
                src={evangadilogo}
                className="h-[25px] "
                alt="Evangadi logo image"
              />
            </div>
            <div
              className="text-3xl absolute right-8 top-5 cursor-pointer md:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <IoMdClose color="rgb(255, 133, 3)" />
              ) : (
                <FiMenu color="rgb(255, 133, 3)" />
              )}
            </div>
            <ul
              className={`md:flex  md:items-center md:pb-0 pb-10 absolute md:static bg-white md:z-auto z-[-1]left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-700 ease-in -ml-8 ${
                open ? "top-16 opacity-100" : "top-[-200px] md:opacity-100 "
              }`}
            >
              {Links.map((link) => (
                <li key={link.name} className="md:ml-8 text-xl md:my-0 my-5">
                  <a
                    href={link.link}
                    className="text-gray-800 hover:text-gray-400 duration-5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}

              <Button onClick={goToSignIn}>
                {/* {userData?.data ? logoutText : "Sign in"} */}
                {logoutText}
              </Button>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
export default Navbar;
