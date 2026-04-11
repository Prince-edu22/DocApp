const API_URL =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://docapp-backend-11pn.onrender.com/api";

export default API_URL;