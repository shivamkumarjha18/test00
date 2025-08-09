import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

const API_URL = "/prospect";

export const createProspect = createAsyncThunk(
  "prospect/create",
  async (prospectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, prospectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllProspects = createAsyncThunk(
  "prospect/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data.prospects;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProspectById = createAsyncThunk(
  "prospect/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.prospect;
    } catch (error)      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFamilyMemberToProspect = createAsyncThunk(
  "prospect/addFamilyMember",
  async ({ prospectId, familyMembers }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/family/${prospectId}`, familyMembers);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFinancialInfoToProspect = createAsyncThunk(
  "prospect/addFinancialInfo",
  async ({ prospectId, financialInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/financialinfo/${prospectId}`, financialInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFuturePrioritiesToProspect = createAsyncThunk(
  "prospect/addFuturePriorities",
  async ({ prospectId, futurePriorities }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/futurepriorities/${prospectId}`, futurePriorities);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addProposedPlanToProspect = createAsyncThunk(
  "prospect/addProposedPlan",
  async ({ prospectId, proposedPlan }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/proposedplan/${prospectId}`, proposedPlan);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProspectPersonalDetails = createAsyncThunk(
  "prospect/updatePersonalDetails",
  async ({ prospectId, personalDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update/personaldetails/${prospectId}`, { personalDetails });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProspect = createAsyncThunk(
  "prospect/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
