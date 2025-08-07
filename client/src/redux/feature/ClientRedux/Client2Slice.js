import { createSlice } from "@reduxjs/toolkit";
import {
  createClient,
  addFamilyMember,
  addFinancialInfo,
  addFuturePrioritiesAndNeeds,
  addProposedFinancialPlan
} from "./thunks";

const initialState = {
  loading: false,
  success: false,
  error: null,
  clientData: null,
  familyMembers: null,
  financialInfo: null,
  futurePriorities: null,
  proposedPlan: null,
};

const clientSlice2 = createSlice({
  name: 'client',
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
        state.proposedPlan = action.payload;
      })
      .addCase(addProposedFinancialPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetClientState } = clientSlice2.actions;
export default clientSlice2.reducer;
