import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "./SuspectThunx";

const initialState = {
  suspects: [],
  currentSuspect: null,
  loading: false,
  error: null,
};

const suspectSlice = createSlice({
  name: "suspect",
  initialState,
  reducers: {
    clearCurrentSuspect: (state) => {
      state.currentSuspect = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Suspect
      .addCase(thunks.createSuspect.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.createSuspect.fulfilled, (state, action) => {
        state.loading = false;
        state.suspects.push(action.payload);
        state.currentSuspect = action.payload;
      })
      .addCase(thunks.createSuspect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Suspects
      .addCase(thunks.getAllSuspects.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.getAllSuspects.fulfilled, (state, action) => {
        state.loading = false;
        state.suspects = action.payload;
      })
      .addCase(thunks.getAllSuspects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Suspect By Id
      .addCase(thunks.getSuspectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.getSuspectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSuspect = action.payload;
      })
      .addCase(thunks.getSuspectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Suspect (example for personal details)
      .addCase(thunks.updateSuspectPersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSuspect = action.payload.updatedSuspect;
        const index = state.suspects.findIndex(s => s._id === action.payload.updatedSuspect._id);
        if (index !== -1) {
          state.suspects[index] = action.payload.updatedSuspect;
        }
      })
      // Delete Suspect
      .addCase(thunks.deleteSuspect.fulfilled, (state, action) => {
        state.loading = false;
        state.suspects = state.suspects.filter(s => s._id !== action.payload);
      })
      // Add family members
      .addCase(thunks.addFamilyMemberToSuspect.fulfilled, (state, action) => {
          state.loading = false;
          if (state.currentSuspect) {
              state.currentSuspect.familyMembers = action.payload.familyMembers;
          }
      })
      // Add financial info
      .addCase(thunks.addFinancialInfoToSuspect.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSuspect) {
            state.currentSuspect.financialInfo = action.payload.financialInfo;
        }
      })
      // Add future priorities
      .addCase(thunks.addFuturePrioritiesToSuspect.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSuspect) {
            state.currentSuspect.futurePriorities = action.payload.suspect.futurePriorities;
            state.currentSuspect.needs = action.payload.suspect.needs;
        }
      })
      // Add proposed plan
      .addCase(thunks.addProposedPlanToSuspect.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSuspect) {
            state.currentSuspect.proposedPlan = action.payload.proposedPlan;
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

export const { clearCurrentSuspect } = suspectSlice.actions;
export default suspectSlice.reducer;
