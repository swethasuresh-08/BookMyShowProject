import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//Register a new user

export const RegisterUser=async (payload)=>{
    try{
        const response=await axiosInstance.post('http://localhost:5000/api/users/register',payload)
        return response
    }
    catch(e)
    {
        return e
    }
}

export const LoginUser=async (payload)=>{
    try{
        const response=await axiosInstance.post('http://localhost:5000/api/users/login',payload)
        return response
    }
    catch(e)
    {
        return e
    }
}

export const GetCurrentUser=async (payload)=>{
    try{
        const response=await axiosInstance.get('http://localhost:5000/api/users/get-current-user',payload)
        return response.data
    }
    catch(error)
    {
        return error
    }
}