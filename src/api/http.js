import Axios from 'axios';

const http = Axios.create({
    //baseURL: `${process.env.BASE_URL}${process.env.API_VERSION}`,
    baseURL: "https://success-mefit.herokuapp.com/api",
    withCredentials: false
});

export default http;