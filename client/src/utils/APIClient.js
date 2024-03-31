import axios from "axios";

const APIClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_API_URL}`,
});

export default APIClient;
