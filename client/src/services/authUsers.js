import axios from "axios";
import { API_BASE_URL } from "./constante";

export const createUser = async (name,username,email,password) =>{ 
    const payload =  {
        name,
        username,
        email,
        password
      } 
    let response = await axios.post(API_BASE_URL+'/users/register', payload)
    return response;
}

export const login = async (email,password) =>{ 
  const payload =  {
      email,
      password
    } 
  let response = await axios.post(API_BASE_URL+'/users/login', payload)
  return response;
}

