import axios from 'axios';
import Config from '@config';
import { useCooke } from '@hooks';
const { cookie: accessToken } = useCooke('accessToken');
const authorization = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        ...authorization,
    },
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!error.response) {
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default instance;