import axios from "axios";

const API = "http://localhost:6969/api/products";

export const getProducts = () => axios.get(API);
