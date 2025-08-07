import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";


// create Kyc of a client
export const createKyc = createAsyncThunk(
  'kyc/createKyc',
  async ({ clientId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/client/kyc/create/${clientId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Response of Kyc creation", response.data)
      return response?.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue("An error occurred while creating the KYC.");
      }
    }
  }
);





// Fetch KYCs by client ID
export const fetchKycsByClient = createAsyncThunk(
  'kyc/fetchKycsByClient',
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/client/kyc/${clientId}`);
      return response?.data?.kycs;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred while fetching KYCs.");
      }
    }
  }
);



// Delete a KYC by ID
export const deleteKyc = createAsyncThunk(
  'kyc/deleteKyc',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/client/kyc/${id}`);
      return response?.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred while deleting the KYC.");
      }
    }
  }
);





// Update a KYC by ID
export const updateKyc = createAsyncThunk(
  'kyc/updateKyc',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/client/kyc/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response?.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred while updating the KYC.");
      }
    }
  }
);