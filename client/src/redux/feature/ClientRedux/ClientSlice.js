import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "./ClientThunx";

const initialState = {
  clients: [],
  currentClient: null,
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clearCurrentClient: (state) => {
      state.currentClient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Client
      .addCase(thunks.createClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
        state.currentClient = action.payload;
      })
      // Get All Clients
      .addCase(thunks.getAllClients.fulfilled, (state, action) => {
        state.clients = action.payload;
      })
      // Get Client By Id
      .addCase(thunks.getClientById.fulfilled, (state, action) => {
        state.currentClient = action.payload;
      })
      // Update Client
      .addCase(thunks.updateClientPersonalDetails.fulfilled, (state, action) => {
        state.currentClient = action.payload.updatedClient;
        const index = state.clients.findIndex(c => c._id === action.payload.updatedClient._id);
        if (index !== -1) {
          state.clients[index] = action.payload.updatedClient;
        }
      })
      // Delete Client
      .addCase(thunks.deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(c => c._id !== action.payload);
      })
      // Add family members
      .addCase(thunks.addFamilyMemberToClient.fulfilled, (state, action) => {
          if (state.currentClient) {
              state.currentClient.familyMembers = action.payload.familyMembers;
          }
      })
      // Add financial info
      .addCase(thunks.addFinancialInfoToClient.fulfilled, (state, action) => {
        if (state.currentClient) {
            state.currentClient.financialInfo = action.payload.financialInfo;
        }
      })
      // Add future priorities
      .addCase(thunks.addFuturePrioritiesToClient.fulfilled, (state, action) => {
        if (state.currentClient) {
            state.currentClient.futurePriorities = action.payload.client.futurePriorities;
            state.currentClient.needs = action.payload.client.needs;
        }
      })
      // Add proposed plan
      .addCase(thunks.addProposedPlanToClient.fulfilled, (state, action) => {
        if (state.currentClient) {
            state.currentClient.proposedPlan = action.payload.proposedPlan;
        }
      })
       // Update Status
      .addCase(thunks.updateClientStatus.fulfilled, (state, action) => {
        const index = state.clients.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
            state.clients.splice(index, 1);
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearCurrentClient } = clientSlice.actions;
export default clientSlice.reducer;
