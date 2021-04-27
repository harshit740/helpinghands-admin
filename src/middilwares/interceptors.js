
import axios from "axios";
import {store} from "@/store/store"
export const axiosApi = axios.create();


axiosApi.interceptors.request.use(async function (config) {
    store.commit('setLoading')
    // Do something before request is sent
    console.log("HTTP Call has been made ")
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosApi.interceptors.response.use(function (response) {
    console.log("HTTP Call has been made ")
    store.commit('setLoading')
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});