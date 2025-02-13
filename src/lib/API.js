import axios from "axios";

const API = axios.create({
    baseURL : "https://madrasha-s-website-server.onrender.com",
})

export default API;