import axios from "axios";

const API = axios.create({
    baseURL : "https://madrasha-s-website-server.onrender.com",
    // baseURL : "http://localhost:4000",
})

export default API;