import axios from "axios";

const api = axios.create({
    baseURL: "https://reactn59-7-lesson-7-posts-api-3.onrender.com"
});
export default api