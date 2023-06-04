import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecommerce-be-6nlj.onrender.com",
});

export default instance;