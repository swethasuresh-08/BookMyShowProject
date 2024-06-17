import axios from "axios";
import { axiosIntance } from "./axiosInstance";

//Register a new user

export const RegisterUser=async (payload)=>{
    try{
        const response=await axiosIntance.post('http://localhost:5000/api/users/register',payload)
        return response
    }
    catch(e)
    {
        return e
    }
}

export const LoginUser=async (payload)=>{
    try{
        const response=await axiosIntance.post('http://localhost:5000/api/users/login',payload)
        return response
    }
    catch(e)
    {
        return e
    }
}