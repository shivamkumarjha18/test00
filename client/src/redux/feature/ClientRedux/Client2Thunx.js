import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

// 1. Create Client with Personal Details
export const createClient = createAsyncThunk(
  'client/createClient',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/client/create', clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while creating the client."
      );
    }
  }
);

// 2. Add Family Members
export const addFamilyMember = createAsyncThunk(
  'client/addFamilyMember',
  async ({ clientId, membersArray }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/client/add/family/${clientId}`, membersArray);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while adding family members."
      );
    }
  }
);

// 3. Add Financial Information
export const addFinancialInfo = createAsyncThunk(
  'client/addFinancialInfo',
  async ({ clientId, financialData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/client/add/financialinfo/${clientId}`, financialData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while adding financial info."
      );
    }
  }
);

// 4. Add Future Priorities and Needs
export const addFuturePrioritiesAndNeeds = createAsyncThunk(
  'client/addFuturePrioritiesAndNeeds',
  async ({ clientId, futurePriorities, needs }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/client/add/futurepriorities/${clientId}`, { futurePriorities, needs });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while adding future priorities and needs."
      );
    }
  }
);

// 5. Add Proposed Financial Plan
export const addProposedFinancialPlan = createAsyncThunk(
  'client/addProposedFinancialPlan',
  async ({ clientId, planData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/client/add/proposedplan/${clientId}`, planData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while adding the proposed financial plan."
      );
    }
  }
);
