import Axios from 'axios';

const http = Axios.create({
    //baseURL: `${process.env.BASE_URL}${process.env.API_VERSION}`,
    baseURL: "https://success-mefit.herokuapp.com/api",
    // baseURL: "http://localhost:8080/api",
    withCredentials: false
});

export default http;