import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000", // URL used by fastAPI
});

export default API;