import axios from "axios";

let baseUrl = "https://hotel-server-master.onrender.com/api/user/";
// let baseUrl = "http://localhost:8080/api/user/";

export const httpAddUser = (user) => {
    console.log(user)
    return axios.post(baseUrl, user);
};

export const httpLogin = (username, password) => {
    console.log(username,password)
    return axios.post(`${baseUrl}login`, { username, password });
};
