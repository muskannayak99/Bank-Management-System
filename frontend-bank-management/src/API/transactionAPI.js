import axios from "axios";

const API_URL = "http://localhost:8080/transaction";

export const addTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/addtransaction`, transactionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/alltransactionview`);
      return response.data.alltransaction;
    } catch (error) {
      throw error;
    }
  };

export const updateTransaction = async (id, transactionData) => {
    try {
      const response = await axios.put(`${API_URL}/edittransaction/${id}`, transactionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const deleteTransaction = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/deletetransaction/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };  