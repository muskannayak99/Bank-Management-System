import axios from "axios";

const API_URL = "http://localhost:8080/customer";

export const addCustomer = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/addcustomer`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCustomers = async () => {
    try {
      const response = await axios.get(`${API_URL}/allcustomerview`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  };

export const updateCustomer = async (id, formData) => {
  try {
    const res = await axios.put(`${API_URL}/editcustomer/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw { field: error.response.data.field, msg: error.response.data.msg };
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deletecustomer/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
