import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PersonalDetailsForm from "../Client/PersonalDetailsForm";
import FamilyMembersForm from "../Client/FamilyMembersForm";
import FinancialInfoForm from "../Client/FinancialInfoForm";
import FuturePrioritiesForm from "../Client/FuturePrioritiesForm";
import ProposedPlanForm from "../Client/ProposedPlanForm";

import { createProspect, getProspectById, updateProspectPersonalDetails } from "../../../redux/feature/ProspectRedux/ProspectThunx";

const AddProspect = ({ editId, setActiveTab }) => {
  const [activeTabState, setActiveTabState] = useState("personalDetails");
  const [prospectId, setProspectId] = useState(editId);

  const dispatch = useDispatch();
  const { loading, error, currentProspect } = useSelector((state) => state.prospect);

  useEffect(() => {
    if (editId) {
      dispatch(getProspectById(editId));
    }
  }, [editId, dispatch]);

  const handlePersonalDetailsSubmit = async (personalDetailsData) => {
    try {
      let resultAction;
      if (prospectId) {
        resultAction = await dispatch(updateProspectPersonalDetails({ prospectId, personalDetails: personalDetailsData.personalDetails }));
      } else {
        resultAction = await dispatch(createProspect(personalDetailsData));
      }

      const newProspectId = resultAction.payload._id || resultAction.payload.updatedProspect._id;
      setProspectId(newProspectId);
      toast.success("Personal details saved successfully!");
      setActiveTabState("familyMembers");
    } catch (err) {
      toast.error("Failed to save personal details.");
    }
  };

  const getMemberOptions = () => {
    if (!currentProspect) return [];
    const names = [currentProspect.personalDetails?.groupName];
    currentProspect.familyMembers?.forEach(m => names.push(m.name));
    return names.filter(Boolean);
  }

  const renderTabContent = () => {
    switch (activeTabState) {
      case "personalDetails":
        return <PersonalDetailsForm onDataChange={handlePersonalDetailsSubmit} initialData={currentProspect} isEditMode={!!prospectId} />;
      case "familyMembers":
        return <FamilyMembersForm prospectId={prospectId} onBack={() => setActiveTabState("personalDetails")} onNext={() => setActiveTabState("financialInfo")} />;
      case "financialInfo":
        return <FinancialInfoForm prospectId={prospectId} onBack={() => setActiveTabState("familyMembers")} onNext={() => setActiveTabState("futurePriorities")} />;
      case "futurePriorities":
        return <FuturePrioritiesForm prospectId={prospectId} onBack={() => setActiveTabState("financialInfo")} onNext={() => setActiveTabState("proposedPlan")} />;
      case "proposedPlan":
        return <ProposedPlanForm prospectId={prospectId} onBack={() => setActiveTabState("futurePriorities")} memberOptions={getMemberOptions()} />;
      default:
        return <PersonalDetailsForm onDataChange={handlePersonalDetailsSubmit} initialData={currentProspect} isEditMode={!!prospectId} />;
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
          <button className={`nav-link custom-tab ${activeTabState === "familyMembers" ? "active-custom" : ""}`} onClick={() => setActiveTabState("familyMembers")} disabled={!prospectId}>
            Family Members
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTabState === "financialInfo" ? "active-custom" : ""}`} onClick={() => setActiveTabState("financialInfo")} disabled={!prospectId}>
            Financial Info
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTabState === "futurePriorities" ? "active-custom" : ""}`} onClick={() => setActiveTabState("futurePriorities")} disabled={!prospectId}>
            Future Priorities
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTabState === "proposedPlan" ? "active-custom" : ""}`} onClick={() => setActiveTabState("proposedPlan")} disabled={!prospectId}>
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

export default AddProspect;
