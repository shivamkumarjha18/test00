import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

const API_URL = "/suspect";

export const createSuspect = createAsyncThunk(
  "suspect/create",
  async (suspectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, suspectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllSuspects = createAsyncThunk(
  "suspect/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data.suspects;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSuspectById = createAsyncThunk(
  "suspect/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.suspect;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFamilyMemberToSuspect = createAsyncThunk(
  "suspect/addFamilyMember",
  async ({ suspectId, familyMembers }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/family/${suspectId}`, familyMembers);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFinancialInfoToSuspect = createAsyncThunk(
  "suspect/addFinancialInfo",
  async ({ suspectId, financialInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/financialinfo/${suspectId}`, financialInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFuturePrioritiesToSuspect = createAsyncThunk(
  "suspect/addFuturePriorities",
  async ({ suspectId, futurePriorities }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/futurepriorities/${suspectId}`, futurePriorities);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addProposedPlanToSuspect = createAsyncThunk(
  "suspect/addProposedPlan",
  async ({ suspectId, proposedPlan }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/proposedplan/${suspectId}`, proposedPlan);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSuspectPersonalDetails = createAsyncThunk(
  "suspect/updatePersonalDetails",
  async ({ suspectId, personalDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update/personaldetails/${suspectId}`, { personalDetails });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSuspect = createAsyncThunk(
  "suspect/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
