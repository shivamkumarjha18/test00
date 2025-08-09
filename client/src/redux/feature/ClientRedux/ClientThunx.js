import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

const API_URL = "/client";

export const createClient = createAsyncThunk(
  "client/create",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllClients = createAsyncThunk(
  "client/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data.clients;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getClientById = createAsyncThunk(
  "client/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.client;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFamilyMemberToClient = createAsyncThunk(
  "client/addFamilyMember",
  async ({ clientId, familyMembers }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/family/${clientId}`, familyMembers);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFinancialInfoToClient = createAsyncThunk(
  "client/addFinancialInfo",
  async ({ clientId, financialInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/financialinfo/${clientId}`, financialInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFuturePrioritiesToClient = createAsyncThunk(
  "client/addFuturePriorities",
  async ({ clientId, futurePriorities }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/futurepriorities/${clientId}`, futurePriorities);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addProposedPlanToClient = createAsyncThunk(
  "client/addProposedPlan",
  async ({ clientId, proposedPlan }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/proposedplan/${clientId}`, proposedPlan);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateClientPersonalDetails = createAsyncThunk(
  "client/updatePersonalDetails",
  async ({ clientId, personalDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update/personaldetails/${clientId}`, { personalDetails });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "client/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateClientStatus = createAsyncThunk(
    "client/updateStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/update/status/${id}`, { status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
