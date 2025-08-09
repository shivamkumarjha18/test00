import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PersonalDetailsForm from "../Client/PersonalDetailsForm";
import FamilyMembersForm from "../Client/FamilyMembersForm";
import FinancialInfoForm from "../Client/FinancialInfoForm";
import FuturePrioritiesForm from "../Client/FuturePrioritiesForm";
import ProposedPlanForm from "../Client/ProposedPlanForm";

import { createSuspect, getSuspectById, updateSuspectPersonalDetails } from "../../../redux/feature/SuspectRedux/SuspectThunx";

const AddSuspect = ({ editId, setActiveTab }) => {
  const [activeTabState, setActiveTabState] = useState("personalDetails");
  const [suspectId, setSuspectId] = useState(editId);

  const dispatch = useDispatch();
  const { loading, error, currentSuspect } = useSelector((state) => state.suspect);

  useEffect(() => {
    if (editId) {
      dispatch(getSuspectById(editId));
    }
  }, [editId, dispatch]);

  const handlePersonalDetailsSubmit = async (personalDetailsData) => {
    try {
      let resultAction;
      if (suspectId) {
        resultAction = await dispatch(updateSuspectPersonalDetails({ suspectId, personalDetails: personalDetailsData.personalDetails }));
      } else {
        resultAction = await dispatch(createSuspect(personalDetailsData));
      }

      const newSuspectId = resultAction.payload._id || resultAction.payload.updatedSuspect._id;
      setSuspectId(newSuspectId);
      toast.success("Personal details saved successfully!");
      setActiveTabState("familyMembers");
    } catch (err) {
      toast.error("Failed to save personal details.");
    }
  };

  const getMemberOptions = () => {
    if (!currentSuspect) return [];
    const names = [currentSuspect.personalDetails?.groupName];
    currentSuspect.familyMembers?.forEach(m => names.push(m.name));
    return names.filter(Boolean);
  }

  const renderTabContent = () => {
    switch (activeTabState) {
      case "personalDetails":
        return <PersonalDetailsForm onDataChange={handlePersonalDetailsSubmit} initialData={currentSuspect} isEditMode={!!suspectId} />;
      case "familyMembers":
        return <FamilyMembersForm suspectId={suspectId} onBack={() => setActiveTabState("personalDetails")} onNext={() => setActiveTabState("financialInfo")} />;
      case "financialInfo":
        return <FinancialInfoForm suspectId={suspectId} onBack={() => setActiveTabState("familyMembers")} onNext={() => setActiveTabState("futurePriorities")} />;
      case "futurePriorities":
        return <FuturePrioritiesForm suspectId={suspectId} onBack={() => setActiveTabState("financialInfo")} onNext={() => setActiveTabState("proposedPlan")} />;
      case "proposedPlan":
        return <ProposedPlanForm suspectId={suspectId} onBack={() => setActiveTabState("futurePriorities")} memberOptions={getMemberOptions()} />;
      default:
        return <PersonalDetailsForm onDataChange={handlePersonalDetailsSubmit} initialData={currentSuspect} isEditMode={!!suspectId} />;
    }
  };

  return (
    <div className="mx-auto mt-6 px-4">
      <ul className="nav nav-pills mb-3 bg-white shadow-lg" role="tablist">
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTabState === "personalDetails" ? "active-custom" : ""}`} onClick={() => setActiveTabState("personalDetails")}>
            Personal Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTabState === "familyMembers" ? "active-custom" : ""}`} onClick={() => setActiveTabState("familyMembers")} disabled={!suspectId}>
            Family Members
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTabState === "financialInfo" ? "active-custom" : ""}`} onClick={() => setActiveTabState("financialInfo")} disabled={!suspectId}>
            Financial Info
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTabState === "futurePriorities" ? "active-custom" : ""}`} onClick={() => setActiveTabState("futurePriorities")} disabled={!suspectId}>
            Future Priorities
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTabState === "proposedPlan" ? "active-custom" : ""}`} onClick={() => setActiveTabState("proposedPlan")} disabled={!suspectId}>
            Proposed Plan
          </button>
        </li>
      </ul>

      <div className="tab-content p-4 border rounded bg-light">
        {loading && <p className="text-blue-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {renderTabContent()}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddSuspect;
