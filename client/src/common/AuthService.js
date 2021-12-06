import React from 'react';
import axios from "axios";
import authHeader from './AuthHeader';

const API_URL = "http://localhost:3050/api/v1/";
// axios.defaults.headers.common['Content-Type'] = 'application/json'

export const login = (email, password) => {
    return axios
        .post(API_URL + "user/login", {
            email,
            password
        }, {
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': true,
            }
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
}

export const upload = (formData) => {
    return axios
        .post(API_URL + "feeds/create", formData
            , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': "*",
                    'x-access-token': authHeader()
                }
            })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const register = (data) => {
    return axios.post(API_URL + "user/register", {
        ...data
    })
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user')) ?? null;
}
