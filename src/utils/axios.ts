import axios from 'axios';
import Config from '@config';
import { useCooke } from '@hooks';

const { cookie: accessToken } = useCooke('accessToken');

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // 'Authorization': `Bearer ${accessToken}`,
    },
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    const authorization = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    
    return {
        ...config,
        ...authorization,
    };
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default instance;