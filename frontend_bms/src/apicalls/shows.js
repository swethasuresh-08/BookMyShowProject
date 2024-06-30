
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const GetShowsByTheatreId=async (theatreId)=>{
    try{
        const response=await axiosInstance.get(`http://localhost:5000/api/shows/get-all-shows-by-theatre-id/${theatreId}`)
        return response
    }
    catch(error)
    {
        return error
    }
}
export const GetShowById=async (showId)=>{
    try{
        const response=await axiosInstance.get(`http://localhost:5000/api/shows/get-show-by-id/${showId}`)
        return response
    }
    catch(error)
    {
        return error
    }
}
export const AddShow=async (payload)=>{
    try{

        const response=await axiosInstance.post('http://localhost:5000/api/shows/add-show',payload) 
        return response
    }catch(error)
    {
        return error
    }
}

export const DeleteShow=async (payload)=>{
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/shows/delete-show',payload)
        return response
    }
    catch(error)
    {
        return error
    }
}
// export const GetAllTheatres=async ()=>{
//     try{
//         const response=await axiosInstance.get('http://localhost:5000/api/theatres/get-all-theatres')
//         return response
//     }
//     catch(error)
//     {
//         return error
//     }
// }

// export const UpdateTheatre=async (payload)=>{
//     try{
//         const response = await axiosInstance.post('http://localhost:5000/api/theatres/update-theatre',payload)
//         return response
//     }
//     catch(error)
//     {
//         return error
//     }
// }

