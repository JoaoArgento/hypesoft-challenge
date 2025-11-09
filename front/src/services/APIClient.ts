import axios from "axios";


export const API = axios.create({
    baseURL: "http://localhost:5039",
    headers: {"Content-Type" : "application/json"}
});