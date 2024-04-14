import React, {useContext, useEffect } from 'react';
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Signup from './Components/Signup/Signup';
import Login from './Components/Signup/Login';
import Question from './Components/Pages/Question';
import Answer from './Components/Pages/Answer';
import Home from './Components/Home/Home';
import axios from './axios';
import { UserContext } from './Components/ContextAPI/Context'; 


function App() {
const navigate= useNavigate()
const [userData, setUserData] = useContext(UserContext);
  
  const checkUserLoggedIn = async () => {
    try {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      } else {
        const { data } = await axios.get(
          "/check",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(data)
        
        setUserData(data );
        console.log(userData);
      }
    } catch (error) {
      console.log(error?.data?.msg);
      navigate("/login");
    }
  };

  const logout = () => {
    setUserData(null);
    localStorage.setItem("token", "");
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  return (
    <>
      <Navbar logout={logout} />
      <Routes>
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/question/" element={<Question />} />
        <Route path="/answer/" element={<Answer />} />

        {/* <Route path='question/getanswer/:questionId' element={<Answer/>} /> */}
        <Route path="answer/:id" element={<Answer />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
