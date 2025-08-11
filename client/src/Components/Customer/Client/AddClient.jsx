<<<<<<< HEAD
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
=======


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientSecondForm from "./ClientSecondForm";
import ClientFirstFrom from "./ClientFirstFrom";
import {
  createClient,
   getClientById,
   updateClientPersonalDetails
} from "../../../redux/feature/ClientRedux/ClientThunx";


>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PersonalDetailsForm from "./PersonalDetailsForm";
import FamilyMembersForm from "./FamilyMembersForm";
import FinancialInfoForm from "./FinancialInfoForm";
import FuturePrioritiesForm from "./FuturePrioritiesForm";
import ProposedPlanForm from "./ProposedPlanForm";

// Placeholder for the new thunk
const createClient = (data) => ({ type: 'client/create', payload: data });

const AddClient = ({ editId, setActiveTab }) => {
  const [activeTab, setActiveTabState] = useState("personalDetails");
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(!!editId);
  const [clientId, setClientId] = useState(editId);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.client);

  const handlePersonalDetailsSubmit = async (personalDetailsData) => {
    try {
      // In a real scenario, you would dispatch a thunk here
      // const resultAction = await dispatch(createClient(personalDetailsData));
      // const newClientId = resultAction.payload._id;

      // For now, let's simulate success
      const newClientId = "fake-client-id-" + Date.now();
      setClientId(newClientId);
      toast.success("Personal details saved successfully!");
      setActiveTabState("familyMembers"); // Move to the next tab
    } catch (error) {
      toast.error("Failed to save personal details.");
    }
  };

  const handleDataChange = (data) => {
    setFormData(data);
  };

<<<<<<< HEAD
  const renderTabContent = () => {
    switch (activeTab) {
      case "personalDetails":
        return (
          <PersonalDetailsForm
            onDataChange={handleDataChange}
            initialData={formData}
            isEditMode={isEditMode}
            onDataChange={handlePersonalDetailsSubmit}
          />
        );
      case "familyMembers":
        return <FamilyMembersForm clientId={clientId} />;
      case "financialInfo":
        return <FinancialInfoForm clientId={clientId} />;
      case "futurePriorities":
        return <FuturePrioritiesForm clientId={clientId} />;
      case "proposedPlan":
        return <ProposedPlanForm clientId={clientId} />;
      default:
        return <PersonalDetailsForm onDataChange={handlePersonalDetailsSubmit} />;
=======
  useEffect(() => {
    if (editId) {
      dispatch(getClientById(editId))
        .unwrap()
        .then((clientData) => {
          setClientFirstData(clientData);
          setIsEditMode(true);
          setShowSecondForm(true);
          setFormKey(Date.now());
        })
        .catch(() => {
          toast.error("Failed to load client data for editing");
          setActiveTab("display");
        });
    } else {
      setClientFirstData({});
      setClientSecondData({});
      setShowSecondForm(false);
      setIsEditMode(false);
      setFormKey(Date.now());
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
    }
  };

  return (
    <div className="mx-auto mt-6 px-4">
      <ul className="nav nav-pills mb-3 bg-white shadow-lg" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTab === "personalDetails" ? "active-custom" : ""}`} onClick={() => setActiveTabState("personalDetails")}>
            Personal Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTab === "familyMembers" ? "active-custom" : ""}`} onClick={() => setActiveTabState("familyMembers")} disabled={!clientId}>
            Family Members
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTab === "financialInfo" ? "active-custom" : ""}`} onClick={() => setActiveTabState("financialInfo")} disabled={!clientId}>
            Financial Info
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTab === "futurePriorities" ? "active-custom" : ""}`} onClick={() => setActiveTabState("futurePriorities")} disabled={!clientId}>
            Future Priorities
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link custom-tab ${activeTab === "proposedPlan" ? "active-custom" : ""}`} onClick={() => setActiveTabState("proposedPlan")} disabled={!clientId}>
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

export default AddClient;
