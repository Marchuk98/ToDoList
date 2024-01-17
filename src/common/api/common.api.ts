import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "1fa14c67-71e4-4f59-9324-9f56be671b29",
    },
});


export const instanceCaptcha = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    withCredentials: true,
    headers: {
        "API-KEY": "1fa14c67-71e4-4f59-9324-9f56be671b29",
    },
});