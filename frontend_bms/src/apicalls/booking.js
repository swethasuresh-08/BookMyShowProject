
// Regsiter a new User

import { axiosInstance } from "./axiosInstance"


export const BASEURL="bookmyshowproject-shgc.onrender.com"
// localhost: 3000/api/
export const MakePayment = async (payload)=>{
    try {
        const response = await axiosInstance().post(`https://${BASEURL}/api/booking/make-payment`, payload)
        return response
    } catch (error) {
        return error
    }
}

export const BookShowTickets = async (payload)=>{
  try {
      const response = await axiosInstance().post(`https://${BASEURL}/api/booking/book-show`, payload)
      return response
  } catch (error) {
      return error
  }
}
export const GetBookingsOfUser = async () => {
    try {
      const response = await axiosInstance().get(`https://${BASEURL}/api/booking/get-bookings`);
      return response;
    } catch (error) {
      return error;
    }
  };


  


