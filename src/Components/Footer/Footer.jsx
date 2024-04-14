import React from "react";
import footerLogo from "../../Images/Icons/footer-logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    { label: "Facebook", icon: FaFacebook, to: "/" },
    { label: "Instagram", icon: FaInstagram, to: "/footer" },
    {
      label: "YouTube",
      icon: FaYoutube,
      to: "https://www.youtube.com/watch?v=RnoWRXh0vNo",
    },
  ];

  return (
    <footer className="bg-[#061432] p-10">
      <section className=" container-fluid sm:block md:flex flex-row justify-between md:max-w-[1200px] mx-auto">
        <div className="container">
          <img src={footerLogo} className="w-100 mb-10" />
          <div className="flex flex-row ">
            <div className="footer-icons flex items-center space-x-3">
              {socialLinks.map((socialLink, index) => {
                const Icon = socialLink.icon;
                const to = socialLink.to;
                return (
                  <Link to={to}>
                    <Icon
                      key={`social-${index}`}
                      className="w-14 h-14 p-2 rounded-full hover:bg-white hover:text-indigo-700 text-customAbout cursor-pointer duration-700"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container text-white">
          <h3 className="text-white mb-3 text-2xl font-serif">usefull Link</h3>
          <div className="opacity-50 font-mono">
            <p>
              <a>How it works</a>
            </p>
            <p>
              <a>term of service</a>
            </p>
            <p>
              <a>Privacy policy</a>
            </p>
          </div>
        </div>
        <div className="container text-white">
          <h3 className="text-2xl mb-2 font-serif">contact information</h3>
          <div className="opacity-50 font-mono">
            <p className="">Evangadi Networks</p>
            <p className="">support@evangadi.com</p>
            <p className="">+1-202-386-2702</p>
          </div>
        </div>
      </section>
      <div className="text-center rounded-full hover:bg-white hover:text-yellow-400 text-customEvaFooter cursor-pointer duration-700 opacity-20 text-3xl hover:opacity-50  font-serif py-5">
        Developed by Hena-yaris21
      </div>
    </footer>
  );
};
export default Footer;
