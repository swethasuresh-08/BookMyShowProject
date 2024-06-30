import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const GetAllMovies=async ()=>{
    try{
        const response=await axiosInstance.get('http://localhost:5000/api/movies/get-movie')
        return response
    }
    catch(error)
    {
        return error
    }
}

export const GetMovieById=async (movieId)=>{
    try{
        const response=await axiosInstance.get(`http://localhost:5000/api/movies/get-movie-by-id/${movieId}`)
        return response
    }
    catch(error)
    {
        return error
    }
}

export const AddMovie=async (payload)=>{
    try{

        const response=await axiosInstance.post('http://localhost:5000/api/movies/add-movie',payload) 
        return response
    }catch(error)
    {
        return error
    }
}

export const UpdateMovie=async (payload)=>{
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/movies/update-movie',payload)
        return response
    }
    catch(error)
    {
        return error
    }
}

export const DeleteMovie=async (payload)=>{
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/movies/delete-movie',payload)
        return response
    }
    catch(error)
    {
        return error
    }
}