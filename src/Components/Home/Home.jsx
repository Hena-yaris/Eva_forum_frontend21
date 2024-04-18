import React, {useEffect,useState, useContext} from 'react'
import { FaUserCircle } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { Link,useParams, useNavigate } from 'react-router-dom';
import axios from '../../configaxios'
import { UserContext } from "../ContextAPI/Context";

const Home = () => {
const navigate= useNavigate();
  const [userData, setUserData] = useContext(UserContext);
const id= useParams()
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/questions/allquestion',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log(response.data);
        setData(response.data.questions);
      })
      .catch(error => {
        console.log('Error:', error);
      });
      
  }, []);

  
  return (
    <div className="container mx-auto my-24 w-full">
      <section className="container  flex justify-between  md:mt-28 items-center pl-10 ">
        <div className="">
          <Link to="/question">
            <button className="bg-customBlue text-orange-400 hover:bg-customBlight rounded-md font-bold sm:text-2xl text-sm md:px-10 px-3 py-2 mt-3 mr-4">
              Ask Questions
            </button>
          </Link>
        </div>

        <div className="sm:text-2xl text-sm text-green-500 font-bold  mr-16">
          Wellcome:{" "}
          <small className="sm:text-3xl text-xl text-green-700">
            {" "}
            {userData?.data?.username}
          </small>{" "}
        </div>
      </section>

      <div className=" mx-auto text-2xl ml-10 mr-10">
        <h2 className="my-12 text-3xl font-serif text-orange-400">Questions</h2>
        <input
          className="w-[100%]  border-gray-300 mb-7 rounded border h-[40px] outline-none px-3 py-4 text-lg"
          placeholder="search"
        />
        <p className="my-3">
          <hr />
        </p>
        <section className=" ">
          <div className="" key="id">
            {/* Render the fetched data */}
            {data.map((item) => (
              <div>
                <div key={item.questionid}></div>
                <div className="flex justify-between ">
                  <div className="sm:flex justify-round ">
                    <div className="mr-10 block text-customBlight font-serif">
                      {" "}
                      <Link to={`answer/${item.questionid}`}>
                        <FaUserCircle size={80} className="mt-5" />
                      </Link>
                      <div className="text-xl my-2 mx-7 ">{item.username}</div>
                    </div>

                    <div className="my-8 sm:mt-14 text-orange-400 font-mono text-sm">
                      {item.description} ?
                    </div>
                  </div>

                  <Link to={`answer/${item.questionid}`}>
                    <div className="md:mt-10 mt-16 text-green-400">
                      <MdArrowForwardIos size={30} />
                    </div>
                  </Link>
                </div>
                <hr className="text-red-400 my-3" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
export  default Home;



