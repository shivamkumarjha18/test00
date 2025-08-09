import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "./ProspectThunx";

const initialState = {
  prospects: [],
  currentProspect: null,
  loading: false,
  error: null,
};

const prospectSlice = createSlice({
  name: "prospect",
  initialState,
  reducers: {
    clearCurrentProspect: (state) => {
      state.currentProspect = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Prospect
      .addCase(thunks.createProspect.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.createProspect.fulfilled, (state, action) => {
        state.loading = false;
        state.prospects.push(action.payload);
        state.currentProspect = action.payload;
      })
      .addCase(thunks.createProspect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Prospects
      .addCase(thunks.getAllProspects.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.getAllProspects.fulfilled, (state, action) => {
        state.loading = false;
        state.prospects = action.payload;
      })
      .addCase(thunks.getAllProspects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Prospect By Id
      .addCase(thunks.getProspectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.getProspectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProspect = action.payload;
      })
      .addCase(thunks.getProspectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Prospect (example for personal details)
      .addCase(thunks.updateProspectPersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProspect = action.payload.updatedProspect;
        const index = state.prospects.findIndex(p => p._id === action.payload.updatedProspect._id);
        if (index !== -1) {
          state.prospects[index] = action.payload.updatedProspect;
        }
      })
      // Delete Prospect
      .addCase(thunks.deleteProspect.fulfilled, (state, action) => {
        state.loading = false;
        state.prospects = state.prospects.filter(p => p._id !== action.payload);
      })
      // Add family members
      .addCase(thunks.addFamilyMemberToProspect.fulfilled, (state, action) => {
          state.loading = false;
          if (state.currentProspect) {
              state.currentProspect.familyMembers = action.payload.familyMembers;
          }
      })
      // Add financial info
      .addCase(thunks.addFinancialInfoToProspect.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProspect) {
            state.currentProspect.financialInfo = action.payload.financialInfo;
        }
      })
      // Add future priorities
      .addCase(thunks.addFuturePrioritiesToProspect.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProspect) {
            state.currentProspect.futurePriorities = action.payload.prospect.futurePriorities;
            state.currentProspect.needs = action.payload.prospect.needs;
        }
      })
      // Add proposed plan
      .addCase(thunks.addProposedPlanToProspect.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProspect) {
            state.currentProspect.proposedPlan = action.payload.proposedPlan;
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
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearCurrentProspect } = prospectSlice.actions;
export default prospectSlice.reducer;
