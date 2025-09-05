import { createSlice } from "@reduxjs/toolkit";

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
  deleteClientById,
  getAllFamilyMembers,
  updateProposedPlanStatus, // ✅ new thunk
} from "./ClientThunx";

const initialState = {
  clients: [],
  currentClient: null,
  loading: false,
  success: false,
  error: null,
  clientData: null,
  familyMembers: [],
  financialInfo: null,
  futurePriorities: null,
  proposedPlan: [],
  singleClient: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetClientState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
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

        // naye plan ko array me add karo
        if (Array.isArray(state.proposedPlan)) {
          state.proposedPlan.push(action.payload);
        } else {
          state.proposedPlan = [action.payload];
        }

        // singleClient ke andar bhi update karo
        if (state.singleClient) {
          if (!Array.isArray(state.singleClient.proposedPlan)) {
            state.singleClient.proposedPlan = [];
          }
          state.singleClient.proposedPlan.push(action.payload);
        }
      })
      .addCase(addProposedFinancialPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ updateProposedPlanStatus
      .addCase(updateProposedPlanStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProposedPlanStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedPlan = action.payload;
        if (!updatedPlan?._id) return;

        // update state.proposedPlan
        state.proposedPlan = state.proposedPlan.map((plan) =>
          plan._id === updatedPlan._id ? updatedPlan : plan
        );

        // agar singleClient ke andar bhi hai to update karo
        if (state.singleClient && Array.isArray(state.singleClient.proposedPlan)) {
          state.singleClient.proposedPlan = state.singleClient.proposedPlan.map(
            (plan) => (plan._id === updatedPlan._id ? updatedPlan : plan)
          );
        }
      })
      .addCase(updateProposedPlanStatus.rejected, (state, action) => {
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
        state.clients = Array.isArray(action.payload) ? action.payload : [];
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
        state.proposedPlan = action.payload?.proposedPlan || [];
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

      // updateClientPersonalDetails
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

      // deleteClientById
      .addCase(deleteClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const deletedId = action.payload.id || action.payload._id;
        state.clients = state.clients.filter(
          (client) => client._id !== deletedId
        );
      })
      .addCase(deleteClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAllFamilyMembers
      .addCase(getAllFamilyMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllFamilyMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.familyMembers = action.payload;
      })
      .addCase(getAllFamilyMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetClientState } = clientSlice.actions;
export default clientSlice.reducer;
