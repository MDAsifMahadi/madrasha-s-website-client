import axios from "axios";

const API = axios.create({
    baseURL : "http://192.168.0.113:4000",
})

export default API;