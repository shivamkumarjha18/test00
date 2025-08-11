import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

<<<<<<< HEAD
const API_URL = "/client";

export const createClient = createAsyncThunk(
  "client/create",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
=======
// 1. Create Client with Personal Details
export const createClient = createAsyncThunk(
  'client/createClient',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/client/create', clientData);
      console.log("Create client successfully", response?.data?._id)
      return response?.data?._id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while creating the client."
      );
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
    }
  }
);

<<<<<<< HEAD
export const getAllClients = createAsyncThunk(
  "client/getAll",
=======
// 2. Add Family Members
export const addFamilyMember = createAsyncThunk(
  'client/addFamilyMember',
  async ({ clientId, membersArray }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/client/add/family/${clientId}`, membersArray);
      console.log("Add family members successfully", response?.data?.clientId)
      return response?.data?.clientId;
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
      console.log("Add financial info successfully", response?.data?.clientId)
      return response?.data?.clientId;
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
      console.log("Add future priorities successfully", response?.data?.clientId)
      return response?.data?.clientId;
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
  async ({ clientId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/client/add/proposedplan/${clientId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Add proposed plan successfully", response?.data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data?.error || "An error occurred while adding the proposed financial plan."
      );
    }
  }
);


// 6: Get All Clients
export const getAllClients = createAsyncThunk(
  'client/all',
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/client/all`);
      console.log("Get all clients", response?.data)
      return response?.data?.clients
    } catch (error) {
<<<<<<< HEAD
      return rejectWithValue(error.response?.data || error.message);
=======
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while adding the proposed financial plan."
      );
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
    }
  }
);

<<<<<<< HEAD
export const getClientById = createAsyncThunk(
  "client/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.client;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
=======
// 7: Get Client by Id
export const getClientById = createAsyncThunk(
  'client/id',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/client/${id}`);
      console.log("Get single client successfully", response?.data)
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while adding the proposed financial plan."
      );
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
    }
  }
);

<<<<<<< HEAD
export const addFamilyMemberToClient = createAsyncThunk(
  "client/addFamilyMember",
  async ({ clientId, familyMembers }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add/family/${clientId}`, familyMembers);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
=======
// 8: Update Client Status
export const updateCleintStatus = createAsyncThunk(
  'client/update/status',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/client/update/status/${id}`, {status});
      console.log("Update Client Status successfully", response?.data)
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || "An error occurred while adding the proposed financial plan."
      );
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
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

<<<<<<< HEAD
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
=======
// 9.update client personal Details
export const updateClientPersonalDetails = createAsyncThunk(
  'client/update/personal/details', 
  async({id, personalDetails}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`/api/client/update/personaldetails/${id}`, personalDetails);
      console.log("Update Client Personal Details successfully", response?.data)
      return response?.data;
    } catch (error) {
       return rejectWithValue(error?.response?.data?.error || "An error occured while updating the personal Details of the client.")

    }
  }
)


// 10. Delete cleint by id
export const deleteClientById = createAsyncThunk(
  'client/delete/client',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/client/delete/${id}`)
      console.log("Delete Client successfully", response?.data)
      return response?.data;
    } catch (error) {
          return rejectWithValue(error?.response?.data?.error || "An error occured while deleting a client.")
    }
  }
)
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
