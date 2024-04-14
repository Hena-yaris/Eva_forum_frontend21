import axios from "axios"
const axiosconfigbase = axios.create({
  // baseURL:"http://localhost:7000/api"
  baseURL: "https://odd-gold-dalmatian-wear.cyclic.app/api",
});
export default axiosconfigbase