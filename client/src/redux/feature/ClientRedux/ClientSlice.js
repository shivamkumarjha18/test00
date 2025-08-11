import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import * as thunks from "./ClientThunx";
=======
import {
  createClient,
  addFamilyMember,
  addFinancialInfo,
  addFuturePrioritiesAndNeeds,
  addProposedFinancialPlan,
  getAllClients,
  getClientById,
  updateCleintStatus,
  updateClientPersonalDetails,
  deleteClientById
} from "./ClientThunx";
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)

const initialState = {
  clients: [],
  currentClient: null,
  loading: false,
<<<<<<< HEAD
  error: null,
=======
  success: false,
  error: null,
  clientData: null,
  familyMembers: null,
  financialInfo: null,
  futurePriorities: null,
  proposedPlan: null,
  clients: [],
  singleClient: null,
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
<<<<<<< HEAD
    clearCurrentClient: (state) => {
      state.currentClient = null;
=======
    resetClientState: (state) => {
      Object.assign(state, initialState);
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
    },
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
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
=======
      // createClient
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientData = action.payload;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addFamilyMember
      .addCase(addFamilyMember.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addFamilyMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.familyMembers = action.payload;
      })
      .addCase(addFamilyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addFinancialInfo
      .addCase(addFinancialInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addFinancialInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.financialInfo = action.payload;
      })
      .addCase(addFinancialInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addFuturePrioritiesAndNeeds
      .addCase(addFuturePrioritiesAndNeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addFuturePrioritiesAndNeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.futurePriorities = action.payload;
      })
      .addCase(addFuturePrioritiesAndNeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addProposedFinancialPlan
      .addCase(addProposedFinancialPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProposedFinancialPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.proposedPlan = action.payload;
      })
      .addCase(addProposedFinancialPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAllClients
      .addCase(getAllClients.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clients = action.payload;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getClientById
      .addCase(getClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singleClient = action.payload;
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleClient = null;
      })

      // updateClientStatus
      .addCase(updateCleintStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCleintStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singleClient = action.payload;
      })
      .addCase(updateCleintStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleClient = null;
      })
      .addCase(updateClientPersonalDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateClientPersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singleClient = action.payload;
      })
      .addCase(updateClientPersonalDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleClient = null;
      })
      // delete client
      .addCase(deleteClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const deletedId = action.payload.id || action.payload._id;
        state.clients = state.clients.filter(client => client._id !== deletedId);
      })
    
      .addCase(deleteClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })
  },
});

export const { resetClientState } = clientSlice.actions;
export default clientSlice.reducer;
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
