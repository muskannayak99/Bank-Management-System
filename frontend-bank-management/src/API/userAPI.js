import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }; 
  
export const forgotpassword = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgotpassword`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const resetPassword = async (token, passwords) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, passwords);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const changePassword = async (userId, data) => {
    try {
      const response = await axios.put(`${API_URL}/changepassword/${userId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };  

export const updateProfile = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/updateprofile/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },       
      });
      console.log(response);
      return response.data;            
    } catch (error) {
      throw error;
    }
  };  