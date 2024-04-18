import axios from "axios"
const axiosconfigbase = axios.create({
  // baseURL:"http://localhost:7000/api"
  baseURL:"https://forum-backend-hwau.onrender.com/api"
});
export default axiosconfigbase