import axios from 'axios'
const axiosconfig=axios.create({
    // baseURL:"http://localhost:7000/api"
    baseURL:"https://forum-backend-hwau.onrender.com/api"
})
export default axiosconfig