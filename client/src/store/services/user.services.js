import React from 'react';
import axios from "axios";

const API_URL = "https://agulite.herokuapp.com/api/v1/";
axios.defaults.headers.common['Content-Type'] = 'application/json'

export const login = (email, password) => {
    return axios
        .post(API_URL + "users/signin", {
            email,
            password
        },{
            headers: {
            //   'content-type': 'application/json',
              'Access-Control-Allow-Origin': true,
            }
          })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const register = (firstname, lastname, phone, email, role, password, passwordConfirm) => {
    return axios.post(API_URL + "users/signup", {
        firstname,
        lastname,
        phone,
        email,
        role,
        password,
        passwordConfirm
    });
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user')) ?? null;
}


export const userService = {
    login,
    logout,
    getAll,
    getCurrentUser,
    register
};