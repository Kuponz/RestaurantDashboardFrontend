import axios from "axios";
import { GenericResponse } from "./types";

const BASE_URL = "http://localhost:5000/";

export const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';


// {
//   headers: {
//     Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
//   }
//  }
  export const loginUserFn = async (user: any) => {
    const response = await authApi.post('user/login', user);
    return response;
  };
  
  export const getTables= async (headerAuth, restaurantId)=> {
    let reId = restaurantId.length != 0 ?restaurantId[0]:"";
    const response = await authApi.get(`restaurant/getTable?restaurantId=${reId}`, {
      headers: {
          Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
      }
    });
    return response;
  }
  export const getMenu= async (restaurantId)=> {
    let reId = restaurantId.length != 0 ?restaurantId[0]:"";
    const response = await authApi.get(`menu/getAllMenuByRestaurantId?restaurantId=${reId}`, {
    });
    return response;
  }
  // export const verifyEmailFn = async (verificationCode: string) => {
  //   const response = await authApi.get<GenericResponse>(
  //     `auth/verifyemail/${verificationCode}`
  //   );
  //   return response.data;
  // };
  
  // export const logoutUserFn = async () => {
  //   const response = await authApi.get<GenericResponse>('auth/logout');
  //   return response.data;
  // };