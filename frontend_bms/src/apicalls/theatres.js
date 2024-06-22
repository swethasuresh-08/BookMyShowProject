
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const GetTheatresByUserId=async (payload)=>{
    try{
        const response=await axiosInstance.get('http://localhost:5000/api/theatres/get-all-theatres-by-user-id',payload)
        return response
    }
    catch(error)
    {
        return error
    }
}


export const GetAllTheatres=async ()=>{
    try{
        const response=await axiosInstance.get('http://localhost:5000/api/theatres/get-all-theatres')
        return response
    }
    catch(error)
    {
        return error
    }
}
export const AddTheatre=async (payload)=>{
    try{

        const response=await axiosInstance.post('http://localhost:5000/api/theatres/add-theatre',payload) 
        return response
    }catch(error)
    {
        return error
    }
}

export const UpdateTheatre=async (payload)=>{
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/theatres/update-theatre',payload)
        return response
    }
    catch(error)
    {
        return error
    }
}

export const DeleteTheatre=async (payload)=>{
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/theatres/delete-theatre',payload)
        return response
    }
    catch(error)
    {
        return error
    }
}