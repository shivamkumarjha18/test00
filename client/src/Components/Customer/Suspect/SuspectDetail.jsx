import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  FiUser,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import {
  FaIdCardAlt,
  FaUsers,
  FaMoneyBillWave,
  FaTasks,
  FaBullseye,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSuspectById } from "../../../redux/feature/SuspectRedux/SuspectThunx";
import KycComponent from "../Client/KYCComponent"; // Assuming this can be reused

const SuspectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSuspect: userData, loading } = useSelector((state) => state.suspect);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getSuspectById(id));
    }
  }, [id, dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!userData) {
    return <h1>Suspect not found.</h1>;
  }

  return (
    <div className="container customer-profile-container">
      <div className="profile-header">
        <h1>Suspect Profile</h1>
        <div className="status-badge">
          <span className={`status-dot ${userData?.status}`}></span>
          {userData?.status}
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-info">
            <h2 className="profile-name">{userData?.personalDetails?.name}</h2>
            <div className="detail-item">
              <FiPhone className="detail-icon" />
              <div>
                <p className="detail-label">Name</p>
                <p className="detail-value">{userData?.personalDetails?.groupName || "N/A"}</p>
              </div>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <FiUser className="detail-icon" />
                <div>
                  <p className="detail-label">Occupation</p>
                  <p className="detail-value ">{userData?.personalDetails?.organisation}</p>
                </div>
              </div>
              <div className="detail-item">
                <FiPhone className="detail-icon" />
                <div>
                  <p className="detail-label">Phone</p>
                  <p className="detail-value">{userData?.personalDetails?.mobileNo}</p>
                </div>
              </div>
              <div className="detail-item">
                <FiMail className="detail-icon" />
                <div>
                  <p className="detail-label">Email</p>
                  <p className="detail-value">{userData?.personalDetails?.emailId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon"><FiUser size={24} /></div>
              <div>
                <h3>Member Since</h3>
                <p>{formatDate(userData.createdAt)}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaIdCardAlt size={24} /></div>
              <div>
                <h3>Referred By</h3>
                <p>{userData?.personalDetails?.leadPerson || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="tabs-container">
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
              <TabList className="custom-tablist">
                <Tab className={`custom-tab ${tabIndex === 0 ? "active" : ""}`}><FiUser className="tab-icon" /><span>Personal Details</span></Tab>
                <Tab className={`custom-tab ${tabIndex === 1 ? "active" : ""}`}><FaUsers className="tab-icon" /><span>Family Members</span></Tab>
                <Tab className={`custom-tab ${tabIndex === 2 ? "active" : ""}`}><FaMoneyBillWave className="tab-icon" /><span>Financial Details</span></Tab>
                <Tab className={`custom-tab ${tabIndex === 3 ? "active" : ""}`}><FaBullseye className="tab-icon" /><span>Future Priorities</span></Tab>
                <Tab className={`custom-tab ${tabIndex === 4 ? "active" : ""}`}><FaTasks className="tab-icon" /><span>KYC</span></Tab>
              </TabList>

              <TabPanel>
                {/* Personal Details Panel */}
              </TabPanel>
              <TabPanel>
                {/* Family Members Panel */}
              </TabPanel>
              <TabPanel>
                {/* Financial Details Panel */}
              </TabPanel>
              <TabPanel>
                {/* Future Priorities Panel */}
              </TabPanel>
              <TabPanel>
                <KycComponent id={id} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
       {/* CSS Styles */}
       <style jsx>{`
            .customer-profile-container {
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              color: #333;
              max-width: 1200px;
              margin: 0 auto;
              padding: 20px;
            }

            .profile-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 30px;
            }

            .profile-header h1 {
              font-size: 28px;
              font-weight: 600;
              color: #2c3e50;
            }

            .status-badge {
              display: flex;
              align-items: center;
              background: #f8f9fa;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 14px;
            }

            .status-dot {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              margin-right: 8px;
            }

            .status-dot.active {
              background: #28a745;
            }

            .status-dot.inactive {
              background: #6c757d;
            }

            .profile-grid {
              display: grid;
              grid-template-columns: 300px 1fr;
              gap: 20px;
            }

            .profile-card {
              background: white;
              border-radius: 10px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              overflow: hidden;
            }

            .profile-image-container {
              position: relative;
              height: 200px;
            }

            .profile-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .profile-actions {
              position: absolute;
              bottom: 10px;
              right: 10px;
              display: flex;
              gap: 8px;
            }

            .btn-icon {
              background: rgba(255, 255, 255, 0.9);
              border: none;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              color: #555;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              transition: all 0.2s;
            }

            .btn-icon:hover {
              background: white;
              color: #3498db;
            }

            .profile-info {
              padding: 20px;
            }

            .profile-name {
              font-size: 20px;
              font-weight: 600;
              margin: 0 0 5px 0;
            }

            .profile-meta {
              display: flex;
              gap: 8px;
              margin-bottom: 15px;
            }

            .badge {
              background: #3498db;
              color: white;
              padding: 4px 10px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 500;
            }

            .badge.secondary {
              background: #6c757d;
            }

            .detail-item {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 12px 0;
              border-bottom: 1px solid #eee;
            }

            .detail-item:last-child {
              border-bottom: none;
            }

            .detail-icon {
              color: #7f8c8d;
              min-width: 24px;
            }

            .detail-label {
              font-size: 12px;
              color: #7f8c8d;
              margin: 0;
            }

            .detail-value {
              font-size: 14px;
              font-weight: 500;
              margin: 2px 0 0 0;
            }

            .profile-stats {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              margin-top: 20px;
              text-align: center;
            }

            .stat-item {
              background: #f8f9fa;
              padding: 12px;
              border-radius: 8px;
            }

            .stat-value {
              font-size: 20px;
              font-weight: 600;
              margin: 0;
              color: #2c3e50;
            }

            .stat-label {
              font-size: 12px;
              color: #7f8c8d;
              margin: 4px 0 0 0;
            }

            .content-area {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }

            .info-cards {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
            }

            .info-card {
              background: white;
              border-radius: 8px;
              padding: 15px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .info-icon {
              background: #e3f2fd;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #3498db;
            }

            .info-card h3 {
              font-size: 14px;
              color: #7f8c8d;
              margin: 0 0 4px 0;
            }

            .info-card p {
              font-size: 15px;
              font-weight: 500;
              margin: 0;
            }

            .tabs-container {
              background: white;
              border-radius: 10px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              overflow: hidden;
            }

            .custom-tablist {
              display: flex;
              background: #f8f9fa;
              padding: 0;
              margin: 0;
              list-style: none;
              border-bottom: 1px solid #eee;
            }

            .custom-tab {
              padding: 15px 20px;
              cursor: pointer;
              font-size: 14px;
              font-weight: 500;
              color: #7f8c8d;
              display: flex;
              align-items: center;
              gap: 8px;
              border-bottom: 2px solid transparent;
              transition: all 0.2s;
            }

            .custom-tab:hover {
              color: #3498db;
              background: rgba(52, 152, 219, 0.05);
            }

            .custom-tab.active {
              color: #3498db;
              border-bottom: 2px solid #3498db;
              background: white;
            }

            .tab-icon {
              font-size: 16px;
            }
          `}</style>
    </div>
  );
};

export default SuspectDetail;
