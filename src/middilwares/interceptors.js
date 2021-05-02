import axios from "axios";
import {store} from "@/store/store"
import router from "@/router";
import {host} from '@/config'
export const axiosApi = axios.create();


axiosApi.interceptors.request.use(async function (config) {
    store.commit('setLoading', true)
    if (config.url !== host +"/users/login") {
        let token = JSON.parse(await localStorage.getItem('Auth'))
        if (token) {
            config.headers['Authorization'] = token['token'];
            return config
        } else {
            await router.push('/accounts/login')
        }
    }
    return config
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosApi.interceptors.response.use(async function (response) {
    store.commit('setLoading', false)
    if (response.data['code'] === 403 || response.data['code'] === "403") {
        await router.push('/accounts/login')
    } else {
        return response;

    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});