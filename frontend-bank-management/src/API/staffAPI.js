import axios from "axios";

const API_URL = "http://localhost:8080/staff";

export const addStaff = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/addstaff`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding staff:", error);
    throw error;
  }
}

export const fetchStaff = async () => {
  try {
    const response = await axios.get(`${API_URL}/allstaffview`);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error; 
  }
};

export const updateStaff = async (id, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/editstaff/${id}`, 
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating staff:", error);
    throw error; 
  }
};

export const deleteStaff = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deletestaff/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};