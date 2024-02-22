import axios, { AxiosRequestConfig } from "axios";
import { refreshToken } from "./index";

interface PendingRequest {
    config: AxiosRequestConfig,
    resolve: Function
}

let pendingRequestQueue: PendingRequest[] = [];
let refreshFlag = false;

const fetcher = axios.create({
    baseURL: 'https://localhost:7070',
    withCredentials: true
});

const errorHandler = async (error: any) => {
    console.log(error);
    const { config, status } = error.response;
    if (refreshFlag) {
        return new Promise((resolve) => {
            pendingRequestQueue.push({ config, resolve });
        })
    }
    if (status === 401 && !config.url.includes('/refresh')) {
        refreshFlag = true;
        const response = await refreshToken();
        refreshFlag = false;
        if (response && (response as any).status === 200) {
            while (pendingRequestQueue.length > 0) {
                const { config, resolve } = pendingRequestQueue.shift()!;
                resolve(fetcher(config));
            }
        }

        return fetcher(config);
    } else {
        return Promise.reject(error);
    }
}

fetcher.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token');
    config.headers.Authorization = "Bearer " + access_token;
    return config;
}, errorHandler)

fetcher.interceptors.response.use((response) => {
    return response;
}, errorHandler);

export default fetcher;