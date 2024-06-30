
// Regsiter a new User

import { axiosInstance } from "./axiosInstance"



// localhost: 3000/api/
export const MakePayment = async (payload)=>{
    try {
        const response = await axiosInstance.post(`http://localhost:5000/api/booking/make-payment`, payload)
        return response
    } catch (error) {
        return error
    }
}

export const BookShowTickets = async (payload)=>{
  try {
      const response = await axiosInstance.post(`http://localhost:5000/api/booking/book-show`, payload)
      return response
  } catch (error) {
      return error
  }
}
export const GetBookingsOfUser = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/api/booking/get-bookings");
      return response;
    } catch (error) {
      return error;
    }
  };


  


