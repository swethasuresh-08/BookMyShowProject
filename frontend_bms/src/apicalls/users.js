import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { BASEURL } from "./booking";

//Register a new user

export const RegisterUser=async (payload)=>{
    try{
        const response=await axiosInstance().post(`https://${BASEURL}/api/users/register`,payload)
        return response
    }
    catch(e)
    {
        return e
    }
}

export const LoginUser=async (payload)=>{
    try{
        const response=await axiosInstance().post(`https://${BASEURL}/api/users/login`,payload)
        return response
    }
    catch(e)
    {
        return e
    }
}

export const GetCurrentUser=async (payload)=>{
    try{
        const response=await axiosInstance().get(`https://${BASEURL}/api/users/get-current-user`,payload)
        return response.data
    }
    catch(error)
    {
        return error
    }
}