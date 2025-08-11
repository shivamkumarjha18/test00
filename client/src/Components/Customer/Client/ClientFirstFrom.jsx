import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createClient, updateClientPersonalDetails } from "../../../redux/feature/ClientRedux/ClientThunx";
import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
import { fetchOccupations } from "../../../redux/feature/OccupationType/OccupationThunx";
import { fetchLeadOccupationDetails } from "../../../redux/feature/LeadOccupation/OccupationThunx";
import { useNavigate } from "react-router-dom";
import PersonalDetailsForm from "./PersonalDetailsForm";
import FamilyMembersForm from "./FamilyMembersForm";
import FinancialInformationForm from "./FinancialInformationForm";
import FuturePrioritiesForm from "./FuturePrioritiesForm";
import ProposedPlanForm from "./ProposedPlanForm";
import { FaUser, FaUsers, FaRupeeSign, FaBullseye } from "react-icons/fa";

const ClientFirstFrom = ({ isEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("personal");
  const [StoreData, setStoreData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [clientId, setClientId] = useState(isEdit?._id || "");




  useEffect(() => {
    dispatch(fetchLeadOccupationDetails());
    dispatch(fetchDetails());
    dispatch(fetchOccupations());
  }, [dispatch]);


  // Callback to receive clientId after creating a client
  const handleClientCreated = (newClientId) => {
    setClientId(newClientId);
  };



  const handleNext = () => {
    navigate("/next-page");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container py-5">
      <ul className="nav nav-pills mb-3 bg-white shadow-lg" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link custom-tab ${activeTab === "personal" ? "active-custom" : ""}`}
            onClick={() => handleTabChange("personal")}
          >
            <FaUser className="me-2" /> Personal Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link custom-tab ${activeTab === "family" ? "active-custom" : ""}`}
            onClick={() => handleTabChange("family")}
          >
            <FaUsers className="me-2" /> Add Family Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link custom-tab ${activeTab === "financial" ? "active-custom" : ""}`}
            onClick={() => handleTabChange("financial")}
          >
            <FaRupeeSign className="me-2" /> Financial Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link custom-tab ${activeTab === "priorities" ? "active-custom" : ""}`}
            onClick={() => handleTabChange("priorities")}
          >
            <FaBullseye className="me-2" /> Future's Priorities
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link custom-tab ${activeTab === "proposed" ? "active-custom" : ""}`}
            onClick={() => handleTabChange("proposed")}
          >
            <FaBullseye className="me-2" /> Proposed Financial Plan
          </button>
        </li>
      </ul>



      <div className="tab-content p-4 border rounded bg-light">
        {activeTab === "personal" && (
          <PersonalDetailsForm
            isEdit={isEdit}
            onClientCreated={handleClientCreated}
          />
        )}
        {activeTab === "family" && <FamilyMembersForm clientId={clientId} onClientCreated={handleClientCreated} />}
        {activeTab === "financial" && <FinancialInformationForm clientId={clientId}  onClientCreated={handleClientCreated} />}
        {activeTab === "priorities" && <FuturePrioritiesForm clientId={clientId}  onClientCreated={handleClientCreated} />}
        {activeTab === "proposed" && <ProposedPlanForm clientId={clientId}  />}
      </div>

    </div>
  );
};

export default ClientFirstFrom;