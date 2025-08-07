// import React, { useEffect, useState } from "react";
// import { Form, Row, Col, Button, Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
// import { fetchOccupations } from "../../../redux/feature/OccupationType/OccupationThunx";
// import { fetchLeadOccupationDetails } from "../../../redux/feature/LeadOccupation/OccupationThunx";
// import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
// import { FaIdCard } from "react-icons/fa";
// import ProposedPlan from "./proposedPlan";
// import {
//   createClientFirstForm,
//   fetchByidClientFirstForm,
//   updateClientFirstForm,
// } from "../../../redux/feature/ClientRedux/ClientThunx";
// import {
//   FaUser,
//   FaUsers,
//   FaRupeeSign,
//   FaBullseye,
//   FaHandshake,
//   FaPlus,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// const ClientFirstFrom = ({ isEdit, onDataChange }) => {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("personal");
//   const dispatch = useDispatch();
//   const [StoreData, setStoreData] = useState(null);
//   const [fetchedData, setFetchedData] = useState(null);
//   const [isUpdated, setIsUpdated] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [openModals, setOpenModals] = useState([]);
//   const [selectedInsurance, setSelectedInsurance] = useState("");
//   const [selectedItem, setSelectedItem] = useState(""); // e.g., "LIC Policy"
//   const [selectedGroup, setSelectedGroup] = useState("");

//   const handleNext = () => {
//     navigate("/next-page"); // Replace with your actual route
//   };




//   const [formData, setFormData] = useState({
//     personalDetails: {
//       groupCode: "",
//       salutation: "",
//       groupName: "",
//       gender: "",
//       organisation: "",
//       designation: "",
//       mobileNo: "",
//       contactNo: "",
//       whatsappNo: "",
//       emailId: "",
//       paName: "",
//       paMobileNo: "",
//       annualIncome: 0,
//       grade: "",

//       // Address Info
//       preferredAddressType: "resi",
//       resiAddr: "",
//       resiLandmark: "",
//       resiPincode: "",
//       officeAddr: "",
//       officeLandmark: "",
//       officePincode: "",
//       preferredMeetingAddr: "",
//       preferredMeetingArea: "",
//       // Area:"",
//       city: "",
//       bestTime: "",
//       adharNumber: "",
//       panCardNumber: "",
//       hobbies: "",
//       nativePlace: "",
//       socialLink: "",
//       habits: "",
//       leadSource: "",
//       leadName: "",
//       leadOccupation: "",
//       leadOccupationType: "",
//       leadPerson: "",
//       callingPurpose: "",
//       name: "",
//       allocatedCRE: "",
//       remark: "",
//     },

//     education: {
//       types: "",
//       schoolName: "",
//       schoolSubjects: "",
//       collegeName: "",
//       collegeCourse: "",
//       instituteName: "",
//       professionalDegree: "",
//     },

//     familyMembers: [
//       {
//         title: "",
//         name: "",
//         relation: "",
//         dobActual: "",
//         dobRecord: "",
//         marriageDate: "",
//         occupation: "",
//         annualIncome: "",
//         includeHealth: false,
//         healthHistory: {
//           submissionDate: "",
//           diseaseName: "",
//           since: "",
//           height: "",
//           weight: "",
//           remark: "",
//         },
//       },
//     ],

//     financialInfo: {
//       insuranceInvestment: [],
//       futurePriorities: [],
//       loans: [],
//       mode :""
//     },

//     needs: {
//       financialProducts: "",
//       anyCorrection: "",
//       anyUpdation: "",
//       financialCalculation: false,
//       assesmentOfNeed: false,
//       portfolioManagement: false,
//       doorStepServices: false,
//       purchaseNewProducts: false,
//     },

//     proposedPlan: [
//       {
//         createdDate: "",
//         memberName: "",
//         financialProduct: "",
//         financialCompany: "",
//         planName: "",
//         dcuments: [],
//       },
//     ],
//   });

//   const safePlans = Array.isArray(formData.proposedPlan)
//     ? formData.proposedPlan
//     : [formData.proposedPlan || {}];

//   useEffect(() => {
//     if (isEdit && Object.keys(isEdit).length) {
//       setFormData(isEdit); // set form fields from edit data
//     }
//   }, [isEdit]);
//   useEffect(() => {
//     dispatch(fetchLeadOccupationDetails());
//     dispatch(fetchDetails());
//     dispatch(fetchOccupations());
//   }, [dispatch]);


//   const [currentDate, setCurrentDate] = useState("");

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split("T")[0]; // yyyy-mm-dd
//     setCurrentDate(formattedDate);
//   }, []);

//   //new handle chnage on checkbox
//   const handleCheckboxChange = (e, group) => {
//     const { value, checked } = e.target;
//     // console.log(value, checked)
//     if (checked) {
//       setSelectedItem(value); // e.g., LIC Policy
//       setSelectedGroup(group); // e.g., insurance, investments, loans
//       setShowModal(true);
//       openNewModal(group, value); //  open a new modal with group and selected item
//       console.log(showModal);
//     }

//     setFormData((prev) => {
//       const currentGroup = prev.financialInfo[group] || [];

//       const updatedGroup = checked
//         ? [...currentGroup, value]
//         : currentGroup.filter((v) => v !== value);

//       console.log(formData.financialInfo);
//       return {
//         ...prev,
//         financialInfo: {
//           ...prev.financialInfo,
//           [group]: updatedGroup,
//         },
//       };
//     });
//   };

//   const openNewModal = (group, item) => {
//     const newModal = {
//       id: Date.now(), // unique ID
//       show: true,
//       selectedItem: item,
//       selectedGroup: group,
//     };

//     setOpenModals((prev) => [...prev, newModal]);
//   };

//   const closeModal = (id) => {
//     setOpenModals((prev) =>
//       prev.map((modal) => (modal.id === id ? { ...modal, show: false } : modal))
//     );
//   };

//   //  NEW — keeps meeting address + area separate
//   const handleRadioChange = (e) => {
//     const value = e.target.value; // "resi" or "office"

//     setFormData((prev) => ({
//       ...prev,
//       personalDetails: {
//         ...prev.personalDetails,
//         preferredAddressType: value, // ✔ just set the radio choice
//         // preferredMeetingAddr, preferredMeetingArea stay as-is
//       },
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (name.includes(".")) {
//       const [section, field] = name.split(".");

//       setFormData((prev) => {
//         const newVal =
//           type === "checkbox" ? checked : type === "file" ? files[0] : value;

//         const updatedSection = { ...prev[section], [field]: newVal };

//         // ── annualIncome → grade mapping ────────────────────────────────
//         if (section === "personalDetails" && field === "annualIncome") {
//           let grade = "";
//           if (newVal === "25 lakh to 1 Cr.") grade = 1;
//           else if (newVal === "5 to 25 lakh") grade = 2;
//           else if (newVal === "2.5 to 5 lakh") grade = 3;

//           updatedSection.grade = grade;
//         }
//         // ────────────────────────────────────────────────────────────────

//         return { ...prev, [section]: updatedSection };
//       });
//     } else {
//       // non-nested fields
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "file" ? files[0] : value,
//       }));
//     }
//   };

//   const handleFamilyMemberChange = (e, index) => {
//     const { name, value, type, checked } = e.target;
//     const keys = name.split(".");

//     setFormData((prev) => {
//       const members = [...prev.familyMembers];

//       if (keys.length === 1) {
//         members[index][keys[0]] = type === "checkbox" ? checked : value;

//         // ✅ self चुनते ही personalDetails से कॉपी करो
//         if (keys[0] === "relation" && value === "self") {
//           const { groupName, annualIncome } = prev.personalDetails;
//           members[index].name = groupName || ""; // personalDetails.name if you prefer
//           members[index].annualIncome = annualIncome || "";
//         }

//         // ❕ Optional: self हटाते ही खाली कर सकते हो (अभी नहीं कर रहे)
//         if (keys[0] === "relation" && value !== "self") {
//           members[index].name = "";
//           members[index].annualIncome = "";
//         }
//       } else if (keys.length === 2) {
//         members[index][keys[0]][keys[1]] = value;
//       }

//       console.log(formData.familyMembers);
//       return {
//         ...prev,
//         familyMembers: members,
//       };
//     });
//   };

//   const [futurePriorityFormData, setFuturePriorityFormData] = useState({
//     priorityName: "",
//      members: "",
//     approxAmount: "",
//     duration: "",
//     remark: "",
//   });






//   const handleFinancialInfoChange = (e, group, field) => {
//   const { value } = e.target;

//   setFormData((prev) => ({
//     ...prev,
//     financialInfo: {
//       ...prev.financialInfo,
//       [group]: {
//         ...prev.financialInfo[group],
//         [field]: value,
//       },
//     },
//   }));
// };





// const handleFuturePrioritiesChange = (e, field) => {
//   const { value } = e.target;

//   setFormData((prev) => ({
//     ...prev,
//     futurePriorities: {
//       ...prev.futurePriorities,
//       [field]: value,
//     },
//   }));
// };








// const handleProposedPlanChange = (e, index, field) => {
//   const { value } = e.target;

//   setFormData((prev) => ({
//     ...prev,
//     proposedPlan: prev.proposedPlan.map((plan, idx) =>
//       idx === index ? { ...plan, [field]: value } : plan
//     ),
//   }));
// };


//   useEffect(() => {
//     if (StoreData) {
//       const init = async () => {
//         try {
//           const res = await dispatch(
//             fetchByidClientFirstForm({ id: StoreData._id })
//           ).unwrap();
//           setFormData(res);
//           setFetchedData(res);
//           console.log(fetchedData);

//           // console.log(res, "asjdhakjshdjkahdkjahdhja");
//           if (res) {
//             setFormData(res);
//           }
//         } catch (error) {
//           console.log(error, "Error in client first form");
//           // alert("Error fetching client data: " + error.message);
//         }
//       };
//       init();
//     }
//   }, [StoreData]);



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (formData?._id) {
//         console.log("Form Data before Api call", formData);
//         // UPDATE
//         const updatedRes = await dispatch(
//           updateClientFirstForm({ id: formData?._id, formData })
//         ).unwrap();
//         console.log("form data after Api Call", formData);
//         alert("Form updated successfully.");
//         setStoreData(updatedRes);
//         // setIsUpdated(true); //  hide button after update
//         onDataChange(updatedRes);
//       } else {
//         // CREATE
//         const res = await dispatch(createClientFirstForm(formData)).unwrap();
//         if (res && res._id) {
//           alert("Form saved successfully.");
//           setStoreData(res);
//           setIsUpdated(false);
//           onDataChange(res);
//         } else {
//           alert("Form submission failed. Please try again.");
//         }
//       }
//     } catch (err) {
//       alert("Something went wrong while saving or updating the form.");
//       console.log(err, "error in first form");
//     }
//   };

//   const removeFamilyMember = (index) => {
//     setFormData((prev) => {
//       const updated = [...prev.familyMembers];
//       updated.splice(index, 1);
//       return { ...prev, familyMembers: updated };
//     });
//   };

//   // --------------------------lead cource and lead occupation -----------------------------
//   const leadOccupations = useSelector((state) => state.leadOccupation.details);

//   const leadSources = useSelector((state) => state.leadsource.leadsourceDetail);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         await dispatch(fetchLeadOccupationDetails()).unwrap();
//         await dispatch(fetchDetails()).unwrap();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     init();
//   }, []);

//   const handleProposedPlanFieldChange = (fieldName, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       proposedPlan: {
//         ...prev.proposedPlan,
//         [fieldName]: value,
//       },
//     }));

//     console.log(formData.proposedPlan);
//   };

//   const handleProposedPlanUpload = (urls) => {
//     if (!urls || urls.length === 0) return;

//     setFormData((prev) => ({
//       ...prev,
//       proposedPlan: {
//         ...prev.proposedPlan,
//         upload: Array.isArray(urls) ? urls : [urls],
//       },
//     }));
//     console.log(formData.proposedPlan.upload);
//   };


//   const emptyProposedPlan = {
//     createdDate: "",
//     memberName: "",
//     financialProduct: "",
//     financialCompany: "",
//     planName: "",
//     upload: [],
//   };


//   proposedPlan: [{
//     createdDate: "",  
//     memberName: "",
//     financialProduct: "",
//     financialCompany: "",
//     planName: "",
//     upload: [],
//   }];


//   const addProposedPlan = () =>
//     setFormData((p) => ({
//       ...p,
//       proposedPlan: [...p.proposedPlan, { ...emptyProposedPlan }],
//     }));

//   const removeProposedPlan = (idx) =>
//     setFormData((p) => ({
//       ...p,
//       proposedPlan: p.proposedPlan.filter((_, i) => i !== idx),
//     }));

//   // Helper function to get member names
//   // यह सभी मौजूदा नाम देगा
//   const getAllMemberNames = () => {
//     const list = [];
//     // प्राइमरी client
//     if (formData?.personalDetails?.groupName)
//       list.push(formData.personalDetails.groupName);
//     // family members
//     formData?.familyMembers?.forEach((m) => {
//       if (m.name) list.push(m.name);
//     });
//     return list;
//   };
//   return (
//     <>
//       <div className="container py-5">
//         {/* <h2 className="text-success fw-bold mb-4 text-center">Simple Bootstrap Tab</h2> */}

//         <ul
//           className="nav nav-pills mb-3 bg-white shadow-lg"
//           id="pills-tab"
//           role="tablist"
//         >
//           <li className="nav-item" role="presentation">
//             <button
//               className={`nav-link custom-tab ${activeTab === "personal" ? "active-custom" : ""
//                 }`}
//               onClick={() => setActiveTab("personal")}
//             >
//               <FaUser className="me-2" /> Personal Details
//             </button>
//           </li>

//           <li className="nav-item" role="presentation">
//             <button
//               className={`nav-link custom-tab ${activeTab === "siddhant" ? "active-custom" : ""
//                 }`}
//               onClick={() => setActiveTab("siddhant")}
//             >
//               <FaUsers className="me-2" /> Add Family Details
//             </button>
//           </li>

//           <li className="nav-item" role="presentation">
//             <button
//               className={`nav-link custom-tab ${activeTab === "financial" ? "active-custom" : ""
//                 }`}
//               onClick={() => setActiveTab("financial")}
//             >
//               <FaRupeeSign className="me-2" /> Financial Details
//             </button>
//           </li>

//           <li className="nav-item" role="presentation">
//             <button
//               className={`nav-link custom-tab ${activeTab === "priorities" ? "active-custom" : ""
//                 }`}
//               onClick={() => setActiveTab("priorities")}
//             >
//               <FaBullseye className="me-2" /> Future's Priorities
//             </button>
//           </li>

//           <li className="nav-item" role="presentation">
//             <button
//               className={`nav-link custom-tab ${activeTab === "proposed plan" ? "active-custom" : ""
//                 }`}
//               onClick={() => setActiveTab("proposed plan")}
//             >
//               <FaBullseye className="me-2" /> proposed financial plan
//             </button>
//           </li>


//         </ul>

//         <div className="tab-content p-4 border rounded bg-light">
//           {/* -----------------First Tab ----------------------- */}
//           <Form onSubmit={handleSubmit}>
//             {activeTab === "personal" && (
//               <div className="personal-detail">
//                 <div className="personal-details">
//                   <h5 className="mt-4">Personal Details</h5>
//                   <Row className="mb-4">
//                     <Col md={2}>
//                       <Form.Group controlId="groupCode">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Group Code
//                         </Form.Label>
//                         <Form.Control
//                           name="personalDetails.groupCode"
//                           type="text"
//                           placeholder="Group Code"
//                           value={formData?.personalDetails?.groupCode}
//                           onChange={handleChange}
//                           size="sm"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={2}>
//                       <Form.Group controlId="salutation">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Select
//                         </Form.Label>
//                         <Form.Select
//                           name="personalDetails.salutation"
//                           value={formData?.personalDetails?.salutation}
//                           onChange={handleChange}
//                           size="sm"
//                         >
//                           <option value="">Select</option>
//                           <option>Mr.</option>
//                           <option>Mrs.</option>
//                           <option>Ms.</option>
//                           <option>Mast.</option>
//                           <option>Shri.</option>
//                           <option>Smt.</option>
//                           <option>Kum.</option>
//                           <option>Kr.</option>
//                           <option>Dr.</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                     <Col md={5}>
//                       <Form.Group controlId="fmailyHead">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           // color="primary"
//                           className="fw-medium"
//                         >
//                           Group Head
//                         </Form.Label>
//                         <Form.Control
//                           name="personalDetails.groupName"
//                           type="text"
//                           placeholder="Fmaily Head"
//                           value={formData?.personalDetails?.groupName}
//                           onChange={handleChange}
//                           size="sm"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                       <Form.Group controlId="gender">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Gender
//                         </Form.Label>
//                         <Form.Select
//                           name="personalDetails.gender"
//                           value={formData?.personalDetails?.gender}
//                           onChange={handleChange}
//                           size="sm"
//                         >
//                           <option value="">Select</option>
//                           <option>Male</option>
//                           <option>Female</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row className="mb-4">
//                     <Col md={4}>
//                       <Form.Group
//                         style={{ color: "#00008B" }}
//                         controlId="organisation"
//                       >
//                         <Form.Label className="fw-medium">
//                           Organisation
//                         </Form.Label>
//                         <Form.Control
//                           name="personalDetails.organisation"
//                           type="text"
//                           placeholder="Organisation"
//                           value={formData?.personalDetails?.organisation}
//                           onChange={handleChange}
//                           size="sm"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group controlId="designation">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Designation
//                         </Form.Label>
//                         <Form.Control
//                           name="personalDetails.designation"
//                           type="text"
//                           placeholder="Designation"
//                           value={formData?.personalDetails?.designation}
//                           onChange={handleChange}
//                           size="sm"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                       <Form.Group controlId="annualIncome">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Annual Income
//                         </Form.Label>
//                         <Form.Control
//                           as="select"
//                           name="personalDetails.annualIncome"
//                           value={formData?.personalDetails?.annualIncome || ""}
//                           onChange={handleChange}
//                           size="sm"
//                         >
//                           <option value="">-- Select --</option>
//                           <option value="25 lakh to 1 Cr.">
//                             25 lakh to 1 Cr.
//                           </option>
//                           <option value="5 to 25 lakh">5 to 25 lakh</option>
//                           <option value="2.5 to 5 lakh">2.5 to 5 lakh</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col md={1}>
//                       <Form.Group controlId="grade">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Grade
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="personalDetails.grade"
//                           value={formData?.personalDetails?.grade || ""}
//                           size="sm"
//                           readOnly
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row className="mb-4">
//                     <Col md={3}>
//                       <Form.Group controlId="mobileNo">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Mobile Number
//                         </Form.Label>
//                         <Form.Control
//                           name="personalDetails.mobileNo"
//                           type="text"
//                           placeholder="mobile number"
//                           value={formData?.personalDetails?.mobileNo}
//                           onChange={handleChange}
//                           size="sm"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                       <Form.Group controlId="contactNo">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Contact Number
//                         </Form.Label>
//                         <Form.Control
//                           name="personalDetails.contactNo"
//                           type="text"
//                           placeholder="Contact Number"
//                           value={formData?.personalDetails?.contactNo}
//                           onChange={handleChange}
//                           size="sm"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                       <Form.Group controlId="whatsappNo">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Whatsapp Number
//                         </Form.Label>
//                         <Form.Control
//                           name="personalDetails.whatsappNo"
//                           type="text"
//                           placeholder="Whatsapp Number"
//                           value={formData?.personalDetails?.whatsappNo}
//                           onChange={handleChange}
//                           size="sm"
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                       <Form.Group controlId="emailId">
//                         <Form.Label
//                           style={{ color: "#00008B" }}
//                           className="fw-medium"
//                         >
//                           Email Id
//                         </Form.Label>
//                         <Form.Control
//                           name="personalDetails.emailId"
//                           type="text"
//                           placeholder="Email id"
//                           value={formData?.personalDetails?.emailId}
//                           onChange={handleChange}
//                           size="sm"
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row className="mb-4">
//                     <Col md={3}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         PA Name
//                       </Form.Label>
//                       <Form.Control
//                         name="personalDetails.paName"
//                         value={formData?.personalDetails?.paName}
//                         onChange={handleChange}
//                         placeholder="PA Name"
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         PA Number
//                       </Form.Label>
//                       <Form.Control
//                         name="personalDetails.paMobileNo"
//                         value={formData?.personalDetails?.paMobileNo}
//                         onChange={handleChange}
//                         placeholder="PA Number"
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Aadhar Number
//                       </Form.Label>
//                       <Form.Control
//                         placeholder="Aadhar Number"
//                         name="personalDetails.adharNumber"
//                         type="number"
//                         value={formData?.personalDetails?.adharNumber}
//                         onChange={handleChange}
//                       />
//                     </Col>

//                     <Col md={3}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium "
//                       >
//                         PAN Number
//                       </Form.Label>
//                       <Form.Control
//                         placeholder="PAN Number"
//                         name="personalDetails.panCardNumber"
//                         type="text"
//                         value={formData?.personalDetails?.panCardNumber}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>
//                   {/* Resi & Office Address */}
//                   <Row className="mb-4">
//                     <Col md={1} style={{ color: "#00008B" }} className="mt-2">
//                       <Form.Check
//                         type="radio"
//                         label="Select"
//                         name="preferredAddressType"
//                         checked={formData.preferredAddressType === "resi"}
//                         onChange={() => handleAddressTypeChange("resi")}
//                       />
//                     </Col>
//                     <Col md={4}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Resi Address
//                       </Form.Label>
//                       <Form.Control
//                         name="resiAddr"
//                         value={formData.resiAddr}
//                         // ={formData.preferredAddressType !== "resi"}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={4}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Landmark
//                       </Form.Label>
//                       <Form.Control
//                         name="resiLandmark"
//                         value={formData.resiLandmark}
//                         // disabled={formData.preferredAddressType !== "resi"}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Pin Code
//                       </Form.Label>
//                       <Form.Control
//                         name="resiPincode"
//                         value={formData.resiPincode}
//                         // disabled={formData.preferredAddressType !== "resi"}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md={1} style={{ color: "#00008B" }} className="mt-4">
//                       <Form.Check
//                         type="radio"
//                         label="Select"
//                         name="preferredAddressType"
//                         checked={formData.preferredAddressType === "office"}
//                         onChange={() => handleAddressTypeChange("office")}
//                       />
//                     </Col>
//                     <Col md={4}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Office Address
//                       </Form.Label>
//                       <Form.Control
//                         name="officeAddr"
//                         value={formData.officeAddr}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={4}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Landmark
//                       </Form.Label>
//                       <Form.Control
//                         name="officeLandmark"
//                         value={formData.officeLandmark}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Pin Code
//                       </Form.Label>
//                       <Form.Control
//                         name="officePincode"
//                         value={formData.officePincode}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>

//                   {/* Meeting Address */}
//                   <Row className="mb-4">
//                     <Col md={4}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Preferred Meeting Address
//                       </Form.Label>
//                       <Form.Control
//                         name="personalDetails.preferredMeetingAddr"
//                         value={formData?.personalDetails?.preferredMeetingAddr}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={4}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Area
//                       </Form.Label>
//                       <Form.Control
//                         name="personalDetails.preferredMeetingArea"
//                         value={formData?.personalDetails?.preferredMeetingArea}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={2}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         City
//                       </Form.Label>
//                       <Form.Control
//                         name="personalDetails.city"
//                         value={formData?.personalDetails?.city}
//                         onChange={handleChange}
//                       />
//                     </Col>

//                     <Col md={2}>
//                       <Form.Label
//                         style={{ color: "#00008B" }}
//                         className="fw-medium"
//                       >
//                         Best Time
//                       </Form.Label>
//                       <Form.Select
//                         id="bestTime"
//                         name="personalDetails.bestTime"
//                         value={formData?.personalDetails?.bestTime}
//                         onChange={handleChange}
//                       >
//                         <option value="">-- Select Time --</option>
//                         <option value="10 AM to 2 PM">10 AM to 2 PM</option>
//                         <option value="2 PM to 7 PM">2 PM to 7 PM</option>
//                       </Form.Select>
//                     </Col>
//                   </Row>

//                   <Row className="mb-4 align-items-end">
//                     {/* Education Type Dropdown */}
//                     <Col md={4} className="mt-2">
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Education Type
//                       </Form.Label>
//                       <Form.Select
//                         name="education.types"
//                         value={formData?.education?.types || "school"} // Default to "school"
//                         onChange={handleChange}
//                       >
//                         <option value="school">School</option>
//                         <option value="college">College</option>
//                         <option value="professional">
//                           Professional Degree
//                         </option>
//                       </Form.Select>
//                     </Col>

//                     {/* School Fields */}
//                     {formData?.education?.types === "school" && (
//                       <>
//                         <Col md={4}>
//                           <Form.Label
//                             className="fw-medium"
//                             style={{ color: "#00008B" }}
//                           >
//                             School Name
//                           </Form.Label>
//                           <Form.Control
//                             name="education.schoolName"
//                             type="text"
//                             placeholder="Enter School Name"
//                             value={formData?.education?.schoolName || ""}
//                             onChange={handleChange}
//                           />
//                         </Col>
//                         <Col md={4}>
//                           <Form.Label
//                             className="fw-medium"
//                             style={{ color: "#00008B" }}
//                           >
//                             Subjects
//                           </Form.Label>
//                           <Form.Control
//                             name="education.schoolSubjects"
//                             type="text"
//                             placeholder="Enter Subjects"
//                             value={formData?.education?.schoolSubjects || ""}
//                             onChange={handleChange}
//                           />
//                         </Col>
//                       </>
//                     )}

//                     {/* College Fields */}
//                     {formData?.education?.types === "college" && (
//                       <>
//                         <Col md={4}>
//                           <Form.Label
//                             className="fw-medium"
//                             style={{ color: "#00008B" }}
//                           >
//                             College Name
//                           </Form.Label>
//                           <Form.Control
//                             name="education.collegeName"
//                             type="text"
//                             placeholder="Enter College Name"
//                             value={formData?.education?.collegeName || ""}
//                             onChange={handleChange}
//                           />
//                         </Col>
//                         <Col md={4}>
//                           <Form.Label
//                             className="fw-medium"
//                             style={{ color: "#00008B" }}
//                           >
//                             Course/Degree
//                           </Form.Label>
//                           <Form.Control
//                             name="education.collegeCourse"
//                             type="text"
//                             placeholder="Enter Course"
//                             value={formData?.education?.collegeCourse || ""}
//                             onChange={handleChange}
//                           />
//                         </Col>
//                       </>
//                     )}

//                     {/* Professional Fields */}
//                     {formData?.education?.types === "professional" && (
//                       <>
//                         <Col md={4}>
//                           <Form.Label
//                             className="fw-medium"
//                             style={{ color: "#00008B" }}
//                           >
//                             Institute Name
//                           </Form.Label>
//                           <Form.Control
//                             name="education.instituteName"
//                             type="text"
//                             placeholder="Enter Institute Name"
//                             value={formData?.education?.instituteName || ""}
//                             onChange={handleChange}
//                           />
//                         </Col>
//                         <Col md={4}>
//                           <Form.Label
//                             className="fw-medium"
//                             style={{ color: "#00008B" }}
//                           >
//                             Degree
//                           </Form.Label>
//                           <Form.Control
//                             name="education.professionalDegree"
//                             type="text"
//                             placeholder="Enter Degree Name"
//                             value={
//                               formData?.education?.professionalDegree || ""
//                             }
//                             onChange={handleChange}
//                           />
//                         </Col>
//                       </>
//                     )}
//                   </Row>

//                   {/* Preferences: Hobbies, Native Place, Social Link, Habits */}
//                   <Row className="mb-4">
//                     <Col md={3}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Native Place
//                       </Form.Label>
//                       <Form.Control
//                         placeholder="Native Place"
//                         name="personalDetails.nativePlace"
//                         type="text"
//                         value={formData?.personalDetails?.nativePlace}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Hobbies
//                       </Form.Label>
//                       <Form.Control
//                         placeholder="Hobbies"
//                         name="personalDetails.hobbies"
//                         type="text"
//                         value={formData?.personalDetails?.hobbies}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Social Link
//                       </Form.Label>
//                       <Form.Control
//                         placeholder="Social Link"
//                         name="personalDetails.socialLink"
//                         type="text"
//                         value={formData?.personalDetails?.socialLink}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Habits
//                       </Form.Label>
//                       <Form.Control
//                         placeholder="Habits"
//                         name="personalDetails.habits"
//                         type="text"
//                         value={formData?.personalDetails?.habits}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>

//                   {/* Lead Info */}

//                   <Row className="mb-4">
//                     <Col md={3}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Lead Source
//                       </Form.Label>
//                       <Form.Select
//                         name="personalDetails.leadSource"
//                         value={formData?.personalDetails?.leadSource}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Lead Source</option>
//                         {leadSources.map((source) => (
//                           <option key={source._id} value={source.leadName}>
//                             {source.leadName}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </Col>

//                     <Col md={3}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Lead Name
//                       </Form.Label>
//                       <Form.Control
//                         name="personalDetails.leadName"
//                         placeholder="Lead Name"
//                         value={formData?.personalDetails?.leadName}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Lead Occupation
//                       </Form.Label>
//                       <Form.Select
//                         name="personalDetails.leadOccupation"
//                         value={formData?.personalDetails?.leadOccupation}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Lead Occupation</option>
//                         {leadOccupations.map((occupation) => (
//                           <option
//                             key={occupation._id}
//                             value={occupation.leadName}
//                           >
//                             {occupation.leadName}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </Col>

//                     <Col md={3}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Occupation Type
//                       </Form.Label>
//                       <Form.Control
//                         name="personalDetails.leadOccupationType"
//                         placeholder="Occupation Type"
//                         value={formData?.personalDetails?.leadOccupationType}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>

//                   <Row className="mb-2">
//                     <Col md={4}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Select Purpose
//                       </Form.Label>
//                       <Form.Select
//                         name="personalDetails.callingPurpose"
//                         value={formData?.personalDetails?.callingPurpose}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Purpose</option>
//                         <option value="Servicing">Servicing</option>
//                         <option value="Sales">Sales</option>
//                       </Form.Select>
//                     </Col>

//                     <Col md={4}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Select Name
//                       </Form.Label>
//                       <Form.Select
//                         name="personalDetails.name"
//                         value={formData?.personalDetails?.name}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Name</option>
//                         <option value="LIC">LIC</option>
//                         <option value="Portfolio Management">
//                           Portfolio Management
//                         </option>
//                       </Form.Select>
//                     </Col>

//                     <Col md={4}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         CRE Name
//                       </Form.Label>
//                       <Form.Control
//                         placeholder="Allocated CRE"
//                         name="personalDetails.allocatedCRE"
//                         type="text"
//                         value={formData?.personalDetails?.allocatedCRE}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>

//                   {/* Calling Purpose, Name, Allocated CRE */}
//                   <Row className="mb-2"></Row>

//                   {/* remark */}
//                   <Row className="mb-2">
//                     <Col md={12}>
//                       <Form.Label
//                         className="fw-medium"
//                         style={{ color: "#00008B" }}
//                       >
//                         Remark
//                       </Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         rows={3}
//                         placeholder="Enter any remarks"
//                         name="personalDetails.remark"
//                         value={formData?.personalDetails?.remark}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>

//                   {/*  Buttons Added Here */}
//                   <Row className="m-auto mt-3">
//                     <div className="d-flex justify-content-end mt-4">
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         onClick={() => setActiveTab("siddhant")}
//                       >
//                         Next <FaArrowRight />
//                       </button>
//                     </div>
//                   </Row>
//                 </div>
//               </div>
//             )}

//             {/* -----------------Second Tab ----------------------- */}
//             {activeTab === "siddhant" && (
//               <div className="family-detials">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h5 className="mt-4 fw-medium">Add Family Details</h5>
//                   <Button
//                     variant="success"
//                     className="mb-1"
//                     onClick={() => {
//                       setFormData((prev) => ({
//                         ...prev,
//                         familyMembers: [
//                           ...prev.familyMembers,
//                           {
//                             title: "",
//                             name: "",
//                             relation: "",
//                             dobActual: "",
//                             dobRecord: "",
//                             marriageDate: "",
//                             occupation: "",
//                             annualIncome: "",
//                             includeHealth: false,
//                             healthHistory: {
//                               submissionDate: "",
//                               diseaseName: "",
//                               since: "",
//                               height: "",
//                               weight: "",
//                               remark: "",
//                             },
//                           },
//                         ],
//                       }));
//                     }}
//                   >
//                     <FaPlus className="mb-1" />
//                   </Button>
//                 </div>

//                 {formData?.familyMembers?.map((member, index) => (
//                   <div key={index} className="border rounded p-3 mb-3">
//                     <Row className="mb-2">
//                       <Col md={2}>
//                         <Form.Group controlId={`title-${index}`}>
//                           <Form.Label
//                             style={{ color: "#00008B" }}
//                             className="fw-medium"
//                           >
//                             Mr/Mrs
//                           </Form.Label>
//                           <Form.Select
//                             placeholder="Mr/Mrs"
//                             name="title"
//                             value={member.title}
//                             onChange={(e) => handleFamilyMemberChange(e, index)}
//                           >
//                             <option value="">Select</option>
//                             <option>Mr.</option>
//                             <option>Mrs.</option>
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>

//                       <Col xs={12} md={4}>
//                         <Form.Group controlId={`name-${index}`}>
//                           <Form.Label
//                             style={{ color: "#00008B" }}
//                             className="fw-medium"
//                           >
//                             Name
//                           </Form.Label>
//                           <Form.Control
//                             placeholder="Name"
//                             name="name"
//                             value={member.name}
//                             onChange={(e) => handleFamilyMemberChange(e, index)}
//                           />
//                         </Form.Group>
//                       </Col>

//                       <Col xs={12} md={3}>
//                         <Form.Group controlId={`relation-${index}`}>
//                           <Form.Label
//                             style={{ color: "#00008B" }}
//                             className="fw-medium"
//                           >
//                             Relation
//                           </Form.Label>
//                           <Form.Select
//                             name="relation"
//                             value={member.relation}
//                             onChange={(e) => handleFamilyMemberChange(e, index)}
//                           >
//                             <option value="">Select Relation</option>
//                             {[
//                               "self",
//                               "Wife",
//                               "Husband",
//                               "Son",
//                               "Daughter",
//                               "Mother",
//                               "Father",
//                               "Brother",
//                               "Sister",
//                               "Brother-in-law",
//                               "Sister-in-law",
//                               "Other",
//                             ].map((rel) => (
//                               <option key={rel} value={rel}>
//                                 {rel}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>

//                       <Col xs={12} md={3}>
//                         <Form.Group controlId={`annualIncome-${index}`}>
//                           <Form.Label
//                             style={{ color: "#00008B" }}
//                             className="fw-medium"
//                           >
//                             Annual Income
//                           </Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Annual Income"
//                             name="annualIncome"
//                             value={member.annualIncome}
//                             onChange={(e) => handleFamilyMemberChange(e, index)}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Row className="mb-2">
//                       <Col xs={12} md={4}>
//                         <Form.Group controlId={`occupation-${index}`}>
//                           <Form.Label
//                             style={{ color: "#00008B" }}
//                             className="fw-medium"
//                           >
//                             Occupation
//                           </Form.Label>
//                           <Form.Control
//                             placeholder="Occupation"
//                             name="occupation"
//                             value={member.occupation}
//                             onChange={(e) => handleFamilyMemberChange(e, index)}
//                           />
//                         </Form.Group>
//                       </Col>

//                       <Col xs={12} md={3}>
//                         <Form.Group controlId={`dobActual-${index}`}>
//                           <Form.Label
//                             style={{ color: "#00008B" }}
//                             className="fw-medium"
//                           >
//                             Date of Birth (Actual)
//                           </Form.Label>
//                           <Form.Control
//                             type="date"
//                             name="dobActual"
//                             value={member.dobActual}
//                             onChange={(e) => handleFamilyMemberChange(e, index)}
//                           />
//                         </Form.Group>
//                       </Col>

//                       <Col xs={12} md={3}>
//                         <Form.Group controlId={`dobRecord-${index}`}>
//                           <Form.Label
//                             style={{ color: "#00008B" }}
//                             className="fw-medium"
//                           >
//                             Date of Birth (Record)
//                           </Form.Label>
//                           <Form.Control
//                             type="date"
//                             name="dobRecord"
//                             value={member.dobRecord}
//                             onChange={(e) => handleFamilyMemberChange(e, index)}
//                           />
//                         </Form.Group>
//                       </Col>

//                       <Col xs={12} md={2}>
//                         <Form.Group controlId={`marriageDate-${index}`}>
//                           <Form.Label
//                             style={{ color: "#00008B" }}
//                             className="fw-medium"
//                           >
//                             Date of Marriage
//                           </Form.Label>
//                           <Form.Control
//                             type="date"
//                             name="marriageDate"
//                             value={member.marriageDate}
//                             onChange={(e) => handleFamilyMemberChange(e, index)}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Row>
//                       <div className="text-end">
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => removeFamilyMember(index)}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     </Row>

//                     <Form.Check
//                       className="mb-3"
//                       label="Add Health Details"
//                       name="includeHealth"
//                       type="checkbox"
//                       checked={member.includeHealth}
//                       onChange={(e) => handleFamilyMemberChange(e, index)}
//                       style={{ position: "relative", bottom: "14px" }}
//                     />

//                     {member.includeHealth && (
//                       <>
//                         <h6 className="mb-3">Health History</h6>
//                         <Row className="mb-3">
//                           <Col md={2}>
//                             <Form.Group controlId={`submissionDate-${index}`}>
//                               <Form.Label
//                                 style={{ color: "#00008B" }}
//                                 className="small"
//                               >
//                                 Submission Date
//                               </Form.Label>
//                               <Form.Control
//                                 name="healthHistory.submissionDate"
//                                 type="date"
//                                 value={member.healthHistory.submissionDate}
//                                 onChange={(e) =>
//                                   handleFamilyMemberChange(e, index)
//                                 }
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col md={4}>
//                             <Form.Group controlId={`diseaseName-${index}`}>
//                               <Form.Label
//                                 style={{ color: "#00008B" }}
//                                 className="small"
//                               >
//                                 Disease Name
//                               </Form.Label>
//                               <Form.Control
//                                 name="healthHistory.diseaseName"
//                                 value={member.healthHistory.diseaseName}
//                                 onChange={(e) =>
//                                   handleFamilyMemberChange(e, index)
//                                 }
//                                 placeholder="Disease Name"
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col md={2}>
//                             <Form.Group controlId={`since-${index}`}>
//                               <Form.Label
//                                 style={{ color: "#00008B" }}
//                                 className="small"
//                               >
//                                 Since
//                               </Form.Label>
//                               <Form.Control
//                                 name="healthHistory.since"
//                                 type="text"
//                                 value={member.healthHistory.since}
//                                 onChange={(e) =>
//                                   handleFamilyMemberChange(e, index)
//                                 }
//                                 placeholder="Since"
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col md={2}>
//                             <Form.Group controlId={`height-${index}`}>
//                               <Form.Label
//                                 style={{ color: "#00008B" }}
//                                 className="small"
//                               >
//                                 Height
//                               </Form.Label>
//                               <Form.Control
//                                 name="healthHistory.height"
//                                 value={member.healthHistory.height}
//                                 onChange={(e) =>
//                                   handleFamilyMemberChange(e, index)
//                                 }
//                                 placeholder="Height"
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col md={2}>
//                             <Form.Group controlId={`weight-${index}`}>
//                               <Form.Label
//                                 style={{ color: "#00008B" }}
//                                 className="small"
//                               >
//                                 Weight
//                               </Form.Label>
//                               <Form.Control
//                                 name="healthHistory.weight"
//                                 value={member.healthHistory.weight}
//                                 onChange={(e) =>
//                                   handleFamilyMemberChange(e, index)
//                                 }
//                                 placeholder="Weight"
//                               />
//                             </Form.Group>
//                           </Col>
//                         </Row>

//                         <Row className="mb-3">
//                           <Col>
//                             <Form.Group controlId={`remark-${index}`}>
//                               <Form.Label
//                                 style={{ color: "#00008B" }}
//                                 className="small"
//                               >
//                                 Remark
//                               </Form.Label>
//                               <Form.Control
//                                 as="textarea"
//                                 rows={2}
//                                 name="healthHistory.remark"
//                                 value={member.healthHistory.remark}
//                                 onChange={(e) =>
//                                   handleFamilyMemberChange(e, index)
//                                 }
//                                 placeholder="Remark"
//                               />
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                       </>
//                     )}
//                   </div>
//                 ))}

//                 {/* ✅ Submit and Next Buttons */}
//                 <div className="d-flex justify-content-between mt-4">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setActiveTab("personal")}
//                   >
//                     <FaArrowLeft /> Previous
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={() => setActiveTab("financial")}
//                   >
//                     Next <FaArrowRight />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* -----------------Third Tab ----------------------- */}
//             {activeTab === "financial" && (
//               <div>
//                 <div className="financial-detail">
//                   <h5 className="mt-4">Financial Details</h5>
//                   <div className="row">
//                     {/* Insurance */}
//                     <div className="col-md-4" style={{ color: "#00008B" }}>
//                       <h6 className="text-warning fw-bold">Insurance</h6>
//                       {[
//                         "LIC Policy",
//                         "Pvt. Life Policy",
//                         "Health Policy",
//                         "Motor Policy",
//                         "Fire Policy",
//                         "Other Policy",
//                       ].map((item) => (
//                         <Form.Check
//                           key={item}
//                           type="checkbox"
//                           label={item}
//                           value={item}
//                           checked={formData?.financialInfo?.insuranceInvestment.includes(
//                             item
//                           )}
//                           onChange={(e) => handleCheckboxChange(e, "insurance")}
//                         />
//                       ))}
//                     </div>

//                     {/* Investment */}
//                     <div className="col-md-4" style={{ color: "#00008B" }}>
//                       <h6 className="text-warning fw-bold">Investment</h6>
//                       {[
//                         "Deposits",
//                         "Mutual Fund",
//                         "Stock Market",
//                         "Gold",
//                         "Property",
//                         "Other Investment",
//                       ].map((item) => (
//                         <Form.Check
//                           key={item}
//                           type="checkbox"
//                           label={item}
//                           value={item}
//                           checked={formData?.financialInfo?.insuranceInvestment.includes(
//                             item
//                           )}
//                           onChange={(e) =>
//                             handleCheckboxChange(e, "investment")
//                           }
//                         />
//                       ))}
//                     </div>

//                     {/* Loan */}
//                     <div className="col-md-4" style={{ color: "#00008B" }}>
//                       <h6 className="text-warning fw-bold">
//                         Loan & Liabilities
//                       </h6>
//                       {[
//                         "Business Loan",
//                         "Home Loan",
//                         "Vehicle Loan",
//                         "Personal Loan",
//                         "Gold Loan",
//                         "Other Loan",
//                       ].map((item) => (
//                         <Form.Check
//                           key={item}
//                           type="checkbox"
//                           label={item}
//                           value={item}
//                           checked={formData?.financialInfo?.loans.includes(
//                             item
//                           )}
//                           onChange={(e) => handleCheckboxChange(e, "loan")}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                   &nbsp; &nbsp;
//                   {/* Submit upper details only */}
//                   <div className="d-flex justify-content-between mt-4">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={() => setActiveTab("siddhant")}
//                     >
//                       <FaArrowLeft /> Previous
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={() => setActiveTab("priorities")}
//                     >
//                       Next <FaArrowRight />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* -----------------fourth Tab ----------------------- */}

//             {activeTab === "priorities" && (
//               <div>
//                 <div className="financial-detail">
//                   {/* Future's Priorities */}
//                   <div className="row mt-4">
//                     <div className="col-12">
//                       <h6
//                         className="fw-bold"
//                         style={{ color: "", textDecoration: "" }}
//                       >
//                         FUTURE'S PRIORITIES
//                       </h6>
//                       <div className="row">
//                         {/* Column 1 */}
//                         <div className="col-md-4">
//                           {[
//                             "Life Insurance",
//                             "Health Insurance",
//                             "Retirement Fund",
//                             "Wealth Creation",
//                           ].map((item) => (
//                             <Form.Check
//                               key={item}
//                               type="checkbox"
//                               label={item}
//                               value={item}
//                               checked={formData?.financialInfo?.futurePriorities.includes(
//                                 item
//                               )}
//                               onChange={(e) =>
//                                 handleCheckboxChange(e, "futurePriorities")
//                               }
//                             />
//                           ))}
//                         </div>

//                         {/* Column 2 */}
//                         <div className="col-md-4">
//                           {[
//                             "Child Higher Education",
//                             "Child Professional Education",
//                             "Child Marriage",
//                             "Property Investment",
//                           ].map((item) => (
//                             <Form.Check
//                               key={item}
//                               type="checkbox"
//                               label={item}
//                               value={item}
//                               checked={formData?.financialInfo?.futurePriorities.includes(
//                                 item
//                               )}
//                               onChange={(e) =>
//                                 handleCheckboxChange(e, "futurePriorities")
//                               }
//                             />
//                           ))}
//                         </div>

//                         {/* Column 3 */}
//                         <div className="col-md-4">
//                           {[
//                             "Purchase House",
//                             "Purchase Car",
//                             "Business Fund Creation",
//                             "Business Expansion",
//                           ].map((item) => (
//                             <Form.Check
//                               key={item}
//                               type="checkbox"
//                               label={item}
//                               value={item}
//                               checked={formData?.financialInfo?.futurePriorities.includes(
//                                 item
//                               )}
//                               onChange={(e) =>
//                                 handleCheckboxChange(e, "futurePriorities")
//                               }
//                             />
//                           ))}
//                         </div>

//                         <Row className="mb-3">
//                           <h5 className="mt-4">Have You Any Need</h5>
//                           <Col>
//                             <Form.Control
//                               placeholder="Financial Products"
//                               type="text"
//                               name="needs.financialProducts"
//                               value={formData?.needs?.financialProducts}
//                               onChange={handleChange}
//                             />
//                           </Col>
//                           <Col>
//                             <Form.Control
//                               placeholder="Any Correction"
//                               type="text"
//                               name="needs.anyCorrection"
//                               value={formData?.needs?.anyCorrection}
//                               onChange={handleChange}
//                             />
//                           </Col>
//                           <Col>
//                             <Form.Control
//                               placeholder="Any Updation"
//                               name="needs.anyUpdation"
//                               value={formData?.needs?.anyUpdation}
//                               onChange={handleChange}
//                             />
//                           </Col>
//                         </Row>
//                         <Row className="mb-2">
//                           <Col md={12}>
//                             <Form.Check
//                               inline
//                               type="checkbox"
//                               label="Financial Calculation"
//                               name="needs.financialCalculation"
//                               checked={formData?.needs?.financialCalculation}
//                               onChange={handleChange}
//                             />
//                             <Form.Check
//                               inline
//                               type="checkbox"
//                               label="Assessment of Need"
//                               name="needs.assesmentOfNeed"
//                               checked={formData?.needs?.assesmentOfNeed}
//                               onChange={handleChange}
//                             />
//                             <Form.Check
//                               inline
//                               type="checkbox"
//                               label="Portfolio Management"
//                               name="needs.portfolioManagement"
//                               checked={formData?.needs?.portfolioManagement}
//                               onChange={handleChange}
//                             />
//                             <Form.Check
//                               inline
//                               type="checkbox"
//                               label="Door Step Services"
//                               name="needs.doorStepServices"
//                               checked={formData?.needs?.doorStepServices}
//                               onChange={handleChange}
//                             />
//                             <Form.Check
//                               inline
//                               type="checkbox"
//                               label="Purchase New Products"
//                               name="needs.purchaseNewProducts"
//                               checked={formData?.needs?.purchaseNewProducts}
//                               onChange={handleChange}
//                             />
//                           </Col>
//                         </Row>

//                         <div></div>

//                         <div className="d-flex justify-content-between mt-4">
//                           <button
//                             type="button"
//                             className="btn btn-secondary"
//                             onClick={() => setActiveTab("financial")}
//                           >
//                             <FaArrowLeft /> Previous
//                           </button>



//                           <Button
//                             onClick={() => setActiveTab("proposed plan")}
//                             // type="submit"

//                             className=" btn btn-secondary mt-2 "
//                             style={{
//                               width: "200px",
//                               backgroundColor: "#0d6efd",
//                               color: "white",
//                               padding: "8px 20px",
//                               borderRadius: "5px",
//                               fontSize: "16px",
//                               cursor: "pointer",
//                               boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//                             }}
//                           >
//                             {formData?._id ? "Update" : "Next"}

//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}


//             {/* // fifth tab */}

//             {activeTab === "proposed plan" && (
//               <div>
//                 <ProposedPlan
//                   plans={safePlans}
//                   onPlansChange={(newPlans) =>
//                     setFormData((p) => ({ ...p, proposedPlan: newPlans }))
//                   }
//                   memberOptions={getAllMemberNames()}
//                 />

//                 <div className="d-flex justify-content-between mt-4">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setActiveTab("priorities")}
//                   >
//                     <FaArrowLeft /> Previous
//                   </button>
//                   {!isUpdated && (
//                     <Button type="submit" className="btn btn-primary">
//                       {formData._id ? "Update" : "Submit"}
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Form>
//         </div>
//       </div>

//       {/* open modals  */}





//       {openModals && openModals.map((modal,index)=>{



//  <Modal
//             key={modal.id}
//             show={modal.show}
//             onHide={() => closeModal(modal.id)}
//             backdrop={false}
//             centered
//             size="lg"
//           >
//             <Modal.Header closeButton>
//               <Modal.Title>{modal.selectedItem} Data</Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//               <Form>
//                 {/* Insurance Form */}
//                 {modal.selectedGroup === "insurance" && (
//                   <>
//                     <h5 className="mb-3 text-primary">Insurance Form</h5>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Submissions Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.insurance.submissionsDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "submissionsDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Member Name</Form.Label>
//                           <Form.Select
//                             value={formData.financialInfo.insurance.memberName || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "memberName")}
//                             required
//                           >
//                             <option value="">Select Member</option>
//                             {formData?.personalDetails?.groupName && (
//                               <option value={formData.personalDetails.groupName}>
//                                 {formData.personalDetails.groupName}
//                               </option>
//                             )}
//                             {formData?.familyMembers?.map((fm, idx) => (
//                               <option key={idx} value={fm.name}>
//                                 {fm.name}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Insurance Company</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.insurance.insuranceCompany || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "insuranceCompany")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Policy No</Form.Label>
//                           <Form.Control
//                             type="number"
//                             value={formData.financialInfo.insurance.policyNumber || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "policyNumber")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Sum Assured</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.insurance.sumAssured || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "sumAssured")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Premium</Form.Label>
//                           <Form.Control
//                             type="number"
//                             value={formData.financialInfo.insurance.premium || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "premium")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Mode</Form.Label>
//                           <Form.Select
//                             value={formData.financialInfo.insurance.mode || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "mode")}
//                           >
//                             <option value="">Select Mode</option>
//                             <option value="Monthly">Monthly</option>
//                             <option value="Quarterly">Quarterly</option>
//                             <option value="Half-Yearly">Half-Yearly</option>
//                             <option value="Yearly">Yearly</option>
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Start Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.insurance.startDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "startDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Maturity Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.insurance.maturityDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "insurance", "maturityDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Upload Document</Form.Label>
//                       <Form.Control type="file" />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Plan Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={formData.financialInfo.insurance.planName || ""}
//                         onChange={(e) => handleFinancialInfoChange(e, "insurance", "planName")}
//                       />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Remarks</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={formData.financialInfo.insurance.remarks || ""}
//                         onChange={(e) => handleFinancialInfoChange(e, "insurance", "remarks")}
//                       />
//                     </Form.Group>
//                   </>
//                 )}

//                 {/* Investment Form */}
//                 {modal.selectedGroup === "investment" && (
//                   <>
//                     <h5 className="mb-3 text-success">Investment Form</h5>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Submissions Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.investment.submissionsDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "investment", "submissionsDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Member Name</Form.Label>
//                           <Form.Select
//                             value={formData.financialInfo.investment.memberName || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "investment", "memberName")}
//                             required
//                           >
//                             <option value="">Select Member</option>
//                             {formData?.personalDetails?.groupName && (
//                               <option value={formData.personalDetails.groupName}>
//                                 {formData.personalDetails.groupName}
//                               </option>
//                             )}
//                             {formData?.familyMembers?.map((fm, idx) => (
//                               <option key={idx} value={fm.name}>
//                                 {fm.name}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Financial Product</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.investment.financialProduct || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "investment", "financialProduct")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Co Name</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.investment.coName || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "investment", "coName")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Plan Name</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.investment.planName || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "investment", "planName")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Amount</Form.Label>
//                           <Form.Control
//                             type="number"
//                             value={formData.financialInfo.investment.amount || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "investment", "amount")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Start Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.investment.startDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "investment", "startDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Maturity Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.investment.maturityDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "investment", "maturityDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Upload Investment Document</Form.Label>
//                       <Form.Control type="file" />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Remarks</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={formData.financialInfo.investment.remarks || ""}
//                         onChange={(e) => handleFinancialInfoChange(e, "investment", "remarks")}
//                       />
//                     </Form.Group>
//                   </>
//                 )}

//                 {/* Loan Form */}
//                 {modal.selectedGroup === "loan" && (
//                   <>
//                     <h5 className="mb-3 text-danger">Loan Form</h5>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Submissions Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.loan.submissionsDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "submissionsDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Member Name</Form.Label>
//                           <Form.Select
//                             value={formData.financialInfo.loan.memberName || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "memberName")}
//                             required
//                           >
//                             <option value="">Select Member</option>
//                             {formData?.personalDetails?.groupName && (
//                               <option value={formData.personalDetails.groupName}>
//                                 {formData.personalDetails.groupName}
//                               </option>
//                             )}
//                             {formData?.familyMembers?.map((fm, idx) => (
//                               <option key={idx} value={fm.name}>
//                                 {fm.name}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Type of Loan</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.loan.loanType || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "loanType")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>CO Name</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.loan.coName || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "coName")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Loan A/c No</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.loan.loanAccountNumber || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "loanAccountNumber")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Outstanding Loan</Form.Label>
//                           <Form.Control
//                             type="number"
//                             value={formData.financialInfo.loan.outstandingLoan || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "outstandingLoan")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Interest Rate (%)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             value={formData.financialInfo.loan.interestRate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "interestRate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Term</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.financialInfo.loan.term || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "term")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Start Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.loan.startDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "startDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Maturity Date</Form.Label>
//                           <Form.Control
//                             type="date"
//                             value={formData.financialInfo.loan.maturityDate || ""}
//                             onChange={(e) => handleFinancialInfoChange(e, "loan", "maturityDate")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Upload Loan Document</Form.Label>
//                       <Form.Control type="file" />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Remarks</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={formData.financialInfo.loan.remarks || ""}
//                         onChange={(e) => handleFinancialInfoChange(e, "loan", "remarks")}
//                       />
//                     </Form.Group>
//                   </>
//                 )}

//                 {/* Future Priorities Form */}
//                 {modal.selectedGroup === "futurePriorities" && (
//                   <>
//                     <h5 className="mb-3 text-info">Future Priorities Form</h5>
//                     <Row className="mb-3">
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Priority Name</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.futurePriorities.priorityName || ""}
//                             onChange={(e) => handleFuturePrioritiesChange(e, "priorityName")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Member Name</Form.Label>
//                           <Form.Select
//                             value={formData.futurePriorities.memberName || ""}
//                             onChange={(e) => handleFuturePrioritiesChange(e, "memberName")}
//                             required
//                           >
//                             <option value="">Select Member</option>
//                             {formData?.personalDetails?.groupName && (
//                               <option value={formData.personalDetails.groupName}>
//                                 {formData.personalDetails.groupName}
//                               </option>
//                             )}
//                             {formData?.familyMembers?.map((fm, idx) => (
//                               <option key={idx} value={fm.name}>
//                                 {fm.name}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group>
//                           <Form.Label>Approx Amount</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.futurePriorities.approxAmount || ""}
//                             onChange={(e) => handleFuturePrioritiesChange(e, "approxAmount")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row className="mb-3">
//                       <Col md={6}>
//                         <Form.Group>
//                           <Form.Label>Duration</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.futurePriorities.duration || ""}
//                             onChange={(e) => handleFuturePrioritiesChange(e, "duration")}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={6}>
//                         <Form.Group>
//                           <Form.Label>Remark</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={formData.futurePriorities.remark || ""}
//                             onChange={(e) => handleFuturePrioritiesChange(e, "remark")}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                   </>
//                 )}

//                 {/* Proposed Plan Form */}
//                 {modal.selectedGroup === "proposedPlan" && (
//                   <>
//                     <h5 className="mb-3 text-info">Proposed Plan Form</h5>
//                     {formData.proposedPlan.map((plan, planIndex) => (
//                       <div key={planIndex}>
//                         <Row className="mb-3">
//                           <Col md={4}>
//                             <Form.Group>
//                               <Form.Label>Created Date</Form.Label>
//                               <Form.Control
//                                 type="date"
//                                 value={plan.createdDate || ""}
//                                 onChange={(e) => handleProposedPlanChange(e, planIndex, "createdDate")}
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col md={4}>
//                             <Form.Group>
//                               <Form.Label>Member Name</Form.Label>
//                               <Form.Select
//                                 value={plan.memberName || ""}
//                                 onChange={(e) => handleProposedPlanChange(e, planIndex, "memberName")}
//                                 required
//                               >
//                                 <option value="">Select Member</option>
//                                 {formData?.personalDetails?.groupName && (
//                                   <option value={formData.personalDetails.groupName}>
//                                     {formData.personalDetails.groupName}
//                                   </option>
//                                 )}
//                                 {formData?.familyMembers?.map((fm, idx) => (
//                                   <option key={idx} value={fm.name}>
//                                     {fm.name}
//                                   </option>
//                                 ))}
//                               </Form.Select>
//                             </Form.Group>
//                           </Col>
//                           <Col md={4}>
//                             <Form.Group>
//                               <Form.Label>Financial Product</Form.Label>
//                               <Form.Control
//                                 type="text"
//                                 value={plan.financialProduct || ""}
//                                 onChange={(e) => handleProposedPlanChange(e, planIndex, "financialProduct")}
//                               />
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                         <Row className="mb-3">
//                           <Col md={4}>
//                             <Form.Group>
//                               <Form.Label>Financial Company</Form.Label>
//                               <Form.Control
//                                 type="text"
//                                 value={plan.financialCompany || ""}
//                                 onChange={(e) => handleProposedPlanChange(e, planIndex, "financialCompany")}
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col md={4}>
//                             <Form.Group>
//                               <Form.Label>Plan Name</Form.Label>
//                               <Form.Control
//                                 type="text"
//                                 value={plan.planName || ""}
//                                 onChange={(e) => handleProposedPlanChange(e, planIndex, "planName")}
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col md={4}>
//                             <Form.Group>
//                               <Form.Label>Upload Document</Form.Label>
//                               <Form.Control type="file" />
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Remarks</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={plan.remarks || ""}
//                             onChange={(e) => handleProposedPlanChange(e, planIndex, "remarks")}
//                           />
//                         </Form.Group>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </Form>
//             </Modal.Body>

//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => closeModal(modal.id)}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={() => closeModal(modal.id)}>
//                 Save
//               </Button>
//               <Button
//                 variant="primary"
//                 onClick={() => openNewModal(modal.selectedGroup, modal.selectedItem)}
//               >
//                 Add More
//               </Button>
//             </Modal.Footer>
//           </Modal>
  


//       })}


     

      
      














//     </>
//   );
// };

// export default ClientFirstFrom;








import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
import { fetchOccupations } from "../../../redux/feature/OccupationType/OccupationThunx";
import { fetchLeadOccupationDetails } from "../../../redux/feature/LeadOccupation/OccupationThunx";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import ProposedPlan from "./proposedPlan";
import {
  createClientFirstForm,
  fetchByidClientFirstForm,
  updateClientFirstForm,
} from "../../../redux/feature/ClientRedux/ClientThunx";
import {
  FaUser,
  FaUsers,
  FaRupeeSign,
  FaBullseye,
  FaHandshake,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const ClientFirstFrom = ({ isEdit, onDataChange }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("personal");
  const dispatch = useDispatch();
  const [StoreData, setStoreData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openModals, setOpenModals] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [selectedItem, setSelectedItem] = useState(""); // e.g., "LIC Policy"
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleNext = () => {
    navigate("/next-page"); // Replace with your actual route
  };




  const [formData, setFormData] = useState({
    personalDetails: {
      groupCode: "",
      salutation: "",
      groupName: "",
      gender: "",
      organisation: "",
      designation: "",
      mobileNo: "",
      contactNo: "",
      whatsappNo: "",
      emailId: "",
      paName: "",
      paMobileNo: "",
      annualIncome: 0,
      grade: "",

      // Address Info
      preferredAddressType: "resi",
      resiAddr: "",
      resiLandmark: "",
      resiPincode: "",
      officeAddr: "",
      officeLandmark: "",
      officePincode: "",
      preferredMeetingAddr: "",
      preferredMeetingArea: "",
      // Area:"",
      city: "",
      bestTime: "",
      adharNumber: "",
      panCardNumber: "",
      hobbies: "",
      nativePlace: "",
      socialLink: "",
      habits: "",
      leadSource: "",
      leadName: "",
      leadOccupation: "",
      leadOccupationType: "",
      leadPerson: "",
      callingPurpose: "",
      name: "",
      allocatedCRE: "",
      remark: "",
    },

    education: {
      types: "",
      schoolName: "",
      schoolSubjects: "",
      collegeName: "",
      collegeCourse: "",
      instituteName: "",
      professionalDegree: "",
    },

    familyMembers: [
      {
        title: "",
        name: "",
        relation: "",
        dobActual: "",
        dobRecord: "",
        marriageDate: "",
        occupation: "",
        annualIncome: "",
        includeHealth: false,
        healthHistory: {
          submissionDate: "",
          diseaseName: "",
          since: "",
          height: "",
          weight: "",
          remark: "",
        },
      },
    ],

    financialInfo: {
      insuranceInvestment: [],
      futurePriorities: [],
      loans: [],
    },

    needs: {
      financialProducts: "",
      anyCorrection: "",
      anyUpdation: "",
      financialCalculation: false,
      assesmentOfNeed: false,
      portfolioManagement: false,
      doorStepServices: false,
      purchaseNewProducts: false,
    },

    proposedPlan: [
    
    ],
  });

  const safePlans = Array.isArray(formData.proposedPlan)
  ? formData.proposedPlan
  : [formData.proposedPlan || {}];

  useEffect(() => {
    if (isEdit && Object.keys(isEdit).length) {
      setFormData(isEdit); // set form fields from edit data
    }
  }, [isEdit]);
  useEffect(() => {
    dispatch(fetchLeadOccupationDetails());
    dispatch(fetchDetails());
    dispatch(fetchOccupations());
  }, [dispatch]);

  
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // yyyy-mm-dd
    setCurrentDate(formattedDate);
  }, []);

  //new handle chnage on checkbox
  const handleCheckboxChange = (e, group) => {
    const { value, checked } = e.target;
    // console.log(value, checked)
    if (checked) {
      setSelectedItem(value); // e.g., LIC Policy
      setSelectedGroup(group); // e.g., insurance, investments, loans
      setShowModal(true);
      openNewModal(group, value); //  open a new modal with group and selected item
      console.log(showModal);
    }

    setFormData((prev) => {
      const currentGroup = prev.financialInfo[group] || [];

      const updatedGroup = checked
        ? [...currentGroup, value]
        : currentGroup.filter((v) => v !== value);

      console.log(formData.financialInfo);
      return {
        ...prev,
        financialInfo: {
          ...prev.financialInfo,
          [group]: updatedGroup,
        },
      };
    });
  };

  const openNewModal = (group, item) => {
    const newModal = {
      id: Date.now(), // unique ID
      show: true,
      selectedItem: item,
      selectedGroup: group,
    };

    setOpenModals((prev) => [...prev, newModal]);
  };

  const closeModal = (id) => {
    setOpenModals((prev) =>
      prev.map((modal) => (modal.id === id ? { ...modal, show: false } : modal))
    );
  };

  //  NEW — keeps meeting address + area separate
  const handleRadioChange = (e) => {
    const value = e.target.value; // "resi" or "office"

    setFormData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        preferredAddressType: value, // ✔ just set the radio choice
        // preferredMeetingAddr, preferredMeetingArea stay as-is
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");

      setFormData((prev) => {
        const newVal =
          type === "checkbox" ? checked : type === "file" ? files[0] : value;

        const updatedSection = { ...prev[section], [field]: newVal };

        // ── annualIncome → grade mapping ────────────────────────────────
        if (section === "personalDetails" && field === "annualIncome") {
          let grade = "";
          if (newVal === "25 lakh to 1 Cr.") grade = 1;
          else if (newVal === "5 to 25 lakh") grade = 2;
          else if (newVal === "2.5 to 5 lakh") grade = 3;

          updatedSection.grade = grade;
        }
        // ────────────────────────────────────────────────────────────────

        return { ...prev, [section]: updatedSection };
      });
    } else {
      // non-nested fields
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  const handleFamilyMemberChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      const members = [...prev.familyMembers];

      if (keys.length === 1) {
        members[index][keys[0]] = type === "checkbox" ? checked : value;

        // ✅ self चुनते ही personalDetails से कॉपी करो
        if (keys[0] === "relation" && value === "self") {
          const { groupName, annualIncome } = prev.personalDetails;
          members[index].name = groupName || ""; // personalDetails.name if you prefer
          members[index].annualIncome = annualIncome || "";
        }

        // ❕ Optional: self हटाते ही खाली कर सकते हो (अभी नहीं कर रहे)
        if (keys[0] === "relation" && value !== "self") {
          members[index].name = "";
          members[index].annualIncome = "";
        }
      } else if (keys.length === 2) {
        members[index][keys[0]][keys[1]] = value;
      }

      console.log(formData.familyMembers);
      return {
        ...prev,
        familyMembers: members,
      };
    });
  };

  const [futurePriorityFormData, setFuturePriorityFormData] = useState({
    object: "",
    member: "",
    approxAmount: "",
    duration: "",
    remark: "",
  });

  useEffect(() => {
    if (StoreData) {
      const init = async () => {
        try {
          const res = await dispatch(
            fetchByidClientFirstForm({ id: StoreData._id })
          ).unwrap();
          setFormData(res);
          setFetchedData(res);
          console.log(fetchedData);

          // console.log(res, "asjdhakjshdjkahdkjahdhja");
          if (res) {
            setFormData(res);
          }
        } catch (error) {
          console.log(error, "Error in client first form");
          // alert("Error fetching client data: " + error.message);
        }
      };
      init();
    }
  }, [StoreData]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData?._id) {
        console.log("Form Data before Api call", formData);
        // UPDATE
        const updatedRes = await dispatch(
          updateClientFirstForm({ id: formData?._id, formData })
        ).unwrap();
        console.log("form data after Api Call", formData);
        alert("Form updated successfully.");
        setStoreData(updatedRes);
        // setIsUpdated(true); //  hide button after update
        onDataChange(updatedRes);
      } else {
        // CREATE
        const res = await dispatch(createClientFirstForm(formData)).unwrap();
        if (res && res._id) {
          alert("Form saved successfully.");
          setStoreData(res);
          setIsUpdated(false);
          onDataChange(res);
        } else {
          alert("Form submission failed. Please try again.");
        }
      }
    } catch (err) {
      alert("Something went wrong while saving or updating the form.");
      console.log(err, "error in first form");
    }
  };

  const removeFamilyMember = (index) => {
    setFormData((prev) => {
      const updated = [...prev.familyMembers];
      updated.splice(index, 1);
      return { ...prev, familyMembers: updated };
    });
  };

  // --------------------------lead cource and lead occupation -----------------------------
  const leadOccupations = useSelector((state) => state.leadOccupation.details);

  const leadSources = useSelector((state) => state.leadsource.leadsourceDetail);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchLeadOccupationDetails()).unwrap();
        await dispatch(fetchDetails()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  const handleProposedPlanFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      proposedPlan: {
        ...prev.proposedPlan,
        [fieldName]: value,
      },
    }));

    console.log(formData.proposedPlan);
  };

  const handleProposedPlanUpload = (urls) => {
    if (!urls || urls.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      proposedPlan: {
        ...prev.proposedPlan,
        upload: Array.isArray(urls) ? urls : [urls],
      },
    }));
    console.log(formData.proposedPlan.upload);
  };


  const emptyProposedPlan = {
  date: "",
  memberName: "",
  financialProduct: "",
  company: "",
  planName: "",
  upload: [],
};
proposedPlan: [];


const addProposedPlan = () =>
  setFormData((p) => ({
    ...p,
    proposedPlan: [...p.proposedPlan, { ...emptyProposedPlan }],
  }));

const removeProposedPlan = (idx) =>
  setFormData((p) => ({
    ...p,
    proposedPlan: p.proposedPlan.filter((_, i) => i !== idx),
  }));

  // Helper function to get member names
  // यह सभी मौजूदा नाम देगा
  const getAllMemberNames = () => {
    const list = [];
    // प्राइमरी client
    if (formData?.personalDetails?.groupName)
      list.push(formData.personalDetails.groupName);
    // family members
    formData?.familyMembers?.forEach((m) => {
      if (m.name) list.push(m.name);
    });
    return list;
  };
  return (
    <>
      <div className="container py-5">
        {/* <h2 className="text-success fw-bold mb-4 text-center">Simple Bootstrap Tab</h2> */}

        <ul
          className="nav nav-pills mb-3 bg-white shadow-lg"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link custom-tab ${
                activeTab === "personal" ? "active-custom" : ""
              }`}
              onClick={() => setActiveTab("personal")}
            >
              <FaUser className="me-2" /> Personal Details
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={`nav-link custom-tab ${
                activeTab === "siddhant" ? "active-custom" : ""
              }`}
              onClick={() => setActiveTab("siddhant")}
            >
              <FaUsers className="me-2" /> Add Family Details
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={`nav-link custom-tab ${
                activeTab === "financial" ? "active-custom" : ""
              }`}
              onClick={() => setActiveTab("financial")}
            >
              <FaRupeeSign className="me-2" /> Financial Details
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={`nav-link custom-tab ${
                activeTab === "priorities" ? "active-custom" : ""
              }`}
              onClick={() => setActiveTab("priorities")}
            >
              <FaBullseye className="me-2" /> Future's Priorities
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={`nav-link custom-tab ${
                activeTab === "proposed plan" ? "active-custom" : ""
              }`}
              onClick={() => setActiveTab("proposed plan")}
            >
              <FaBullseye className="me-2" /> proposed financial plan
            </button>
          </li>

          
        </ul>

        <div className="tab-content p-4 border rounded bg-light">
          {/* -----------------First Tab ----------------------- */}
          <Form onSubmit={handleSubmit}>
            {activeTab === "personal" && (
              <div className="personal-detail">
                <div className="personal-details">
                  <h5 className="mt-4">Personal Details</h5>
                  <Row className="mb-4">
                    <Col md={2}>
                      <Form.Group controlId="groupCode">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Group Code
                        </Form.Label>
                        <Form.Control
                          name="personalDetails.groupCode"
                          type="text"
                          placeholder="Group Code"
                          value={formData?.personalDetails?.groupCode}
                          onChange={handleChange}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group controlId="salutation">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Select
                        </Form.Label>
                        <Form.Select
                          name="personalDetails.salutation"
                          value={formData?.personalDetails?.salutation}
                          onChange={handleChange}
                          size="sm"
                        >
                          <option value="">Select</option>
                          <option>Mr.</option>
                          <option>Mrs.</option>
                          <option>Ms.</option>
                          <option>Mast.</option>
                          <option>Shri.</option>
                          <option>Smt.</option>
                          <option>Kum.</option>
                          <option>Kr.</option>
                          <option>Dr.</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group controlId="fmailyHead">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          // color="primary"
                          className="fw-medium"
                        >
                          Group Head
                        </Form.Label>
                        <Form.Control
                          name="personalDetails.groupName"
                          type="text"
                          placeholder="Fmaily Head"
                          value={formData?.personalDetails?.groupName}
                          onChange={handleChange}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="gender">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Gender
                        </Form.Label>
                        <Form.Select
                          name="personalDetails.gender"
                          value={formData?.personalDetails?.gender}
                          onChange={handleChange}
                          size="sm"
                        >
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group
                        style={{ color: "#00008B" }}
                        controlId="organisation"
                      >
                        <Form.Label className="fw-medium">
                          Organisation
                        </Form.Label>
                        <Form.Control
                          name="personalDetails.organisation"
                          type="text"
                          placeholder="Organisation"
                          value={formData?.personalDetails?.organisation}
                          onChange={handleChange}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="designation">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Designation
                        </Form.Label>
                        <Form.Control
                          name="personalDetails.designation"
                          type="text"
                          placeholder="Designation"
                          value={formData?.personalDetails?.designation}
                          onChange={handleChange}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="annualIncome">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Annual Income
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="personalDetails.annualIncome"
                          value={formData?.personalDetails?.annualIncome || ""}
                          onChange={handleChange}
                          size="sm"
                        >
                          <option value="">-- Select --</option>
                          <option value="25 lakh to 1 Cr.">
                            25 lakh to 1 Cr.
                          </option>
                          <option value="5 to 25 lakh">5 to 25 lakh</option>
                          <option value="2.5 to 5 lakh">2.5 to 5 lakh</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={1}>
                      <Form.Group controlId="grade">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Grade
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="personalDetails.grade"
                          value={formData?.personalDetails?.grade || ""}
                          size="sm"
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={3}>
                      <Form.Group controlId="mobileNo">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Mobile Number
                        </Form.Label>
                        <Form.Control
                          name="personalDetails.mobileNo"
                          type="text"
                          placeholder="mobile number"
                          value={formData?.personalDetails?.mobileNo}
                          onChange={handleChange}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="contactNo">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Contact Number
                        </Form.Label>
                        <Form.Control
                          name="personalDetails.contactNo"
                          type="text"
                          placeholder="Contact Number"
                          value={formData?.personalDetails?.contactNo}
                          onChange={handleChange}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="whatsappNo">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Whatsapp Number
                        </Form.Label>
                        <Form.Control
                          name="personalDetails.whatsappNo"
                          type="text"
                          placeholder="Whatsapp Number"
                          value={formData?.personalDetails?.whatsappNo}
                          onChange={handleChange}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="emailId">
                        <Form.Label
                          style={{ color: "#00008B" }}
                          className="fw-medium"
                        >
                          Email Id
                        </Form.Label>
                        <Form.Control
                          name="personalDetails.emailId"
                          type="text"
                          placeholder="Email id"
                          value={formData?.personalDetails?.emailId}
                          onChange={handleChange}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={3}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        PA Name
                      </Form.Label>
                      <Form.Control
                        name="personalDetails.paName"
                        value={formData?.personalDetails?.paName}
                        onChange={handleChange}
                        placeholder="PA Name"
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        PA Number
                      </Form.Label>
                      <Form.Control
                        name="personalDetails.paMobileNo"
                        value={formData?.personalDetails?.paMobileNo}
                        onChange={handleChange}
                        placeholder="PA Number"
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Aadhar Number
                      </Form.Label>
                      <Form.Control
                        placeholder="Aadhar Number"
                        name="personalDetails.adharNumber"
                        type="number"
                        value={formData?.personalDetails?.adharNumber}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium "
                      >
                        PAN Number
                      </Form.Label>
                      <Form.Control
                        placeholder="PAN Number"
                        name="personalDetails.panCardNumber"
                        type="text"
                        value={formData?.personalDetails?.panCardNumber}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  {/* Resi & Office Address */}
                  <Row className="mb-4">
                    <Col md={1} style={{ color: "#00008B" }} className="mt-2">
                      <Form.Check
                        type="radio"
                        label="Select"
                        name="preferredAddressType"
                        checked={formData.preferredAddressType === "resi"}
                        onChange={() => handleAddressTypeChange("resi")}
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Resi Address
                      </Form.Label>
                      <Form.Control
                        name="resiAddr"
                        value={formData.resiAddr}
                        // ={formData.preferredAddressType !== "resi"}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Landmark
                      </Form.Label>
                      <Form.Control
                        name="resiLandmark"
                        value={formData.resiLandmark}
                        // disabled={formData.preferredAddressType !== "resi"}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Pin Code
                      </Form.Label>
                      <Form.Control
                        name="resiPincode"
                        value={formData.resiPincode}
                        // disabled={formData.preferredAddressType !== "resi"}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={1} style={{ color: "#00008B" }} className="mt-4">
                      <Form.Check
                        type="radio"
                        label="Select"
                        name="preferredAddressType"
                        checked={formData.preferredAddressType === "office"}
                        onChange={() => handleAddressTypeChange("office")}
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Office Address
                      </Form.Label>
                      <Form.Control
                        name="officeAddr"
                        value={formData.officeAddr}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Landmark
                      </Form.Label>
                      <Form.Control
                        name="officeLandmark"
                        value={formData.officeLandmark}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Pin Code
                      </Form.Label>
                      <Form.Control
                        name="officePincode"
                        value={formData.officePincode}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  {/* Meeting Address */}
                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Preferred Meeting Address
                      </Form.Label>
                      <Form.Control
                        name="personalDetails.preferredMeetingAddr"
                        value={formData?.personalDetails?.preferredMeetingAddr}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Area
                      </Form.Label>
                      <Form.Control
                        name="personalDetails.preferredMeetingArea"
                        value={formData?.personalDetails?.preferredMeetingArea}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        City
                      </Form.Label>
                      <Form.Control
                        name="personalDetails.city"
                        value={formData?.personalDetails?.city}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={2}>
                      <Form.Label
                        style={{ color: "#00008B" }}
                        className="fw-medium"
                      >
                        Best Time
                      </Form.Label>
                      <Form.Select
                        id="bestTime"
                        name="personalDetails.bestTime"
                        value={formData?.personalDetails?.bestTime}
                        onChange={handleChange}
                      >
                        <option value="">-- Select Time --</option>
                        <option value="10 AM to 2 PM">10 AM to 2 PM</option>
                        <option value="2 PM to 7 PM">2 PM to 7 PM</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <Row className="mb-4 align-items-end">
                    {/* Education Type Dropdown */}
                    <Col md={4} className="mt-2">
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Education Type
                      </Form.Label>
                      <Form.Select
                        name="education.types"
                        value={formData?.education?.types || "school"} // Default to "school"
                        onChange={handleChange}
                      >
                        <option value="school">School</option>
                        <option value="college">College</option>
                        <option value="professional">
                          Professional Degree
                        </option>
                      </Form.Select>
                    </Col>

                    {/* School Fields */}
                    {formData?.education?.types === "school" && (
                      <>
                        <Col md={4}>
                          <Form.Label
                            className="fw-medium"
                            style={{ color: "#00008B" }}
                          >
                            School Name
                          </Form.Label>
                          <Form.Control
                            name="education.schoolName"
                            type="text"
                            placeholder="Enter School Name"
                            value={formData?.education?.schoolName || ""}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Label
                            className="fw-medium"
                            style={{ color: "#00008B" }}
                          >
                            Subjects
                          </Form.Label>
                          <Form.Control
                            name="education.schoolSubjects"
                            type="text"
                            placeholder="Enter Subjects"
                            value={formData?.education?.schoolSubjects || ""}
                            onChange={handleChange}
                          />
                        </Col>
                      </>
                    )}

                    {/* College Fields */}
                    {formData?.education?.types === "college" && (
                      <>
                        <Col md={4}>
                          <Form.Label
                            className="fw-medium"
                            style={{ color: "#00008B" }}
                          >
                            College Name
                          </Form.Label>
                          <Form.Control
                            name="education.collegeName"
                            type="text"
                            placeholder="Enter College Name"
                            value={formData?.education?.collegeName || ""}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Label
                            className="fw-medium"
                            style={{ color: "#00008B" }}
                          >
                            Course/Degree
                          </Form.Label>
                          <Form.Control
                            name="education.collegeCourse"
                            type="text"
                            placeholder="Enter Course"
                            value={formData?.education?.collegeCourse || ""}
                            onChange={handleChange}
                          />
                        </Col>
                      </>
                    )}

                    {/* Professional Fields */}
                    {formData?.education?.types === "professional" && (
                      <>
                        <Col md={4}>
                          <Form.Label
                            className="fw-medium"
                            style={{ color: "#00008B" }}
                          >
                            Institute Name
                          </Form.Label>
                          <Form.Control
                            name="education.instituteName"
                            type="text"
                            placeholder="Enter Institute Name"
                            value={formData?.education?.instituteName || ""}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Label
                            className="fw-medium"
                            style={{ color: "#00008B" }}
                          >
                            Degree
                          </Form.Label>
                          <Form.Control
                            name="education.professionalDegree"
                            type="text"
                            placeholder="Enter Degree Name"
                            value={
                              formData?.education?.professionalDegree || ""
                            }
                            onChange={handleChange}
                          />
                        </Col>
                      </>
                    )}
                  </Row>

                  {/* Preferences: Hobbies, Native Place, Social Link, Habits */}
                  <Row className="mb-4">
                    <Col md={3}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Native Place
                      </Form.Label>
                      <Form.Control
                        placeholder="Native Place"
                        name="personalDetails.nativePlace"
                        type="text"
                        value={formData?.personalDetails?.nativePlace}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Hobbies
                      </Form.Label>
                      <Form.Control
                        placeholder="Hobbies"
                        name="personalDetails.hobbies"
                        type="text"
                        value={formData?.personalDetails?.hobbies}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Social Link
                      </Form.Label>
                      <Form.Control
                        placeholder="Social Link"
                        name="personalDetails.socialLink"
                        type="text"
                        value={formData?.personalDetails?.socialLink}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Habits
                      </Form.Label>
                      <Form.Control
                        placeholder="Habits"
                        name="personalDetails.habits"
                        type="text"
                        value={formData?.personalDetails?.habits}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  {/* Lead Info */}

                  <Row className="mb-4">
                    <Col md={3}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Lead Source
                      </Form.Label>
                      <Form.Select
                        name="personalDetails.leadSource"
                        value={formData?.personalDetails?.leadSource}
                        onChange={handleChange}
                      >
                        <option value="">Select Lead Source</option>
                        {leadSources.map((source) => (
                          <option key={source._id} value={source.leadName}>
                            {source.leadName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Lead Name
                      </Form.Label>
                      <Form.Control
                        name="personalDetails.leadName"
                        placeholder="Lead Name"
                        value={formData?.personalDetails?.leadName}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Lead Occupation
                      </Form.Label>
                      <Form.Select
                        name="personalDetails.leadOccupation"
                        value={formData?.personalDetails?.leadOccupation}
                        onChange={handleChange}
                      >
                        <option value="">Select Lead Occupation</option>
                        {leadOccupations.map((occupation) => (
                          <option
                            key={occupation._id}
                            value={occupation.leadName}
                          >
                            {occupation.leadName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Occupation Type
                      </Form.Label>
                      <Form.Control
                        name="personalDetails.leadOccupationType"
                        placeholder="Occupation Type"
                        value={formData?.personalDetails?.leadOccupationType}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col md={4}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Select Purpose
                      </Form.Label>
                      <Form.Select
                        name="personalDetails.callingPurpose"
                        value={formData?.personalDetails?.callingPurpose}
                        onChange={handleChange}
                      >
                        <option value="">Select Purpose</option>
                        <option value="Servicing">Servicing</option>
                        <option value="Sales">Sales</option>
                      </Form.Select>
                    </Col>

                    <Col md={4}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Select Name
                      </Form.Label>
                      <Form.Select
                        name="personalDetails.name"
                        value={formData?.personalDetails?.name}
                        onChange={handleChange}
                      >
                        <option value="">Select Name</option>
                        <option value="LIC">LIC</option>
                        <option value="Portfolio Management">
                          Portfolio Management
                        </option>
                      </Form.Select>
                    </Col>

                    <Col md={4}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        CRE Name
                      </Form.Label>
                      <Form.Control
                        placeholder="Allocated CRE"
                        name="personalDetails.allocatedCRE"
                        type="text"
                        value={formData?.personalDetails?.allocatedCRE}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  {/* Calling Purpose, Name, Allocated CRE */}
                  <Row className="mb-2"></Row>

                  {/* remark */}
                  <Row className="mb-2">
                    <Col md={12}>
                      <Form.Label
                        className="fw-medium"
                        style={{ color: "#00008B" }}
                      >
                        Remark
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter any remarks"
                        name="personalDetails.remark"
                        value={formData?.personalDetails?.remark}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  {/*  Buttons Added Here */}
                  <Row className="m-auto mt-3">
                    <div className="d-flex justify-content-end mt-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setActiveTab("siddhant")}
                      >
                        Next <FaArrowRight />
                      </button>
                    </div>
                  </Row>
                </div>
              </div>
            )}

            {/* -----------------Second Tab ----------------------- */}
            {activeTab === "siddhant" && (
              <div className="family-detials">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mt-4 fw-medium">Add Family Details</h5>
                  <Button
                    variant="success"
                    className="mb-1"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        familyMembers: [
                          ...prev.familyMembers,
                          {
                            title: "",
                            name: "",
                            relation: "",
                            dobActual: "",
                            dobRecord: "",
                            marriageDate: "",
                            occupation: "",
                            annualIncome: "",
                            includeHealth: false,
                            healthHistory: {
                              submissionDate: "",
                              diseaseName: "",
                              since: "",
                              height: "",
                              weight: "",
                              remark: "",
                            },
                          },
                        ],
                      }));
                    }}
                  >
                    <FaPlus className="mb-1" />
                  </Button>
                </div>

                {formData?.familyMembers?.map((member, index) => (
                  <div key={index} className="border rounded p-3 mb-3">
                    <Row className="mb-2">
                      <Col md={2}>
                        <Form.Group controlId={`title-${index}`}>
                          <Form.Label
                            style={{ color: "#00008B" }}
                            className="fw-medium"
                          >
                            Mr/Mrs
                          </Form.Label>
                          <Form.Select
                            placeholder="Mr/Mrs"
                            name="title"
                            value={member.title}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                          >
                            <option value="">Select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={4}>
                        <Form.Group controlId={`name-${index}`}>
                          <Form.Label
                            style={{ color: "#00008B" }}
                            className="fw-medium"
                          >
                            Name
                          </Form.Label>
                          <Form.Control
                            placeholder="Name"
                            name="name"
                            value={member.name}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={3}>
                        <Form.Group controlId={`relation-${index}`}>
                          <Form.Label
                            style={{ color: "#00008B" }}
                            className="fw-medium"
                          >
                            Relation
                          </Form.Label>
                          <Form.Select
                            name="relation"
                            value={member.relation}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                          >
                            <option value="">Select Relation</option>
                            {[
                              "self",
                              "Wife",
                              "Husband",
                              "Son",
                              "Daughter",
                              "Mother",
                              "Father",
                              "Brother",
                              "Sister",
                              "Brother-in-law",
                              "Sister-in-law",
                              "Other",
                            ].map((rel) => (
                              <option key={rel} value={rel}>
                                {rel}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={3}>
                        <Form.Group controlId={`annualIncome-${index}`}>
                          <Form.Label
                            style={{ color: "#00008B" }}
                            className="fw-medium"
                          >
                            Annual Income
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Annual Income"
                            name="annualIncome"
                            value={member.annualIncome}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col xs={12} md={4}>
                        <Form.Group controlId={`occupation-${index}`}>
                          <Form.Label
                            style={{ color: "#00008B" }}
                            className="fw-medium"
                          >
                            Occupation
                          </Form.Label>
                          <Form.Control
                            placeholder="Occupation"
                            name="occupation"
                            value={member.occupation}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={3}>
                        <Form.Group controlId={`dobActual-${index}`}>
                          <Form.Label
                            style={{ color: "#00008B" }}
                            className="fw-medium"
                          >
                            Date of Birth (Actual)
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="dobActual"
                            value={member.dobActual}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={3}>
                        <Form.Group controlId={`dobRecord-${index}`}>
                          <Form.Label
                            style={{ color: "#00008B" }}
                            className="fw-medium"
                          >
                            Date of Birth (Record)
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="dobRecord"
                            value={member.dobRecord}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={2}>
                        <Form.Group controlId={`marriageDate-${index}`}>
                          <Form.Label
                            style={{ color: "#00008B" }}
                            className="fw-medium"
                          >
                            Date of Marriage
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="marriageDate"
                            value={member.marriageDate}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <div className="text-end">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFamilyMember(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Row>

                    <Form.Check
                      className="mb-3"
                      label="Add Health Details"
                      name="includeHealth"
                      type="checkbox"
                      checked={member.includeHealth}
                      onChange={(e) => handleFamilyMemberChange(e, index)}
                      style={{ position: "relative", bottom: "14px" }}
                    />

                    {member.includeHealth && (
                      <>
                        <h6 className="mb-3">Health History</h6>
                        <Row className="mb-3">
                          <Col md={2}>
                            <Form.Group controlId={`submissionDate-${index}`}>
                              <Form.Label
                                style={{ color: "#00008B" }}
                                className="small"
                              >
                                Submission Date
                              </Form.Label>
                              <Form.Control
                                name="healthHistory.submissionDate"
                                type="date"
                                value={member.healthHistory.submissionDate}
                                onChange={(e) =>
                                  handleFamilyMemberChange(e, index)
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group controlId={`diseaseName-${index}`}>
                              <Form.Label
                                style={{ color: "#00008B" }}
                                className="small"
                              >
                                Disease Name
                              </Form.Label>
                              <Form.Control
                                name="healthHistory.diseaseName"
                                value={member.healthHistory.diseaseName}
                                onChange={(e) =>
                                  handleFamilyMemberChange(e, index)
                                }
                                placeholder="Disease Name"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <Form.Group controlId={`since-${index}`}>
                              <Form.Label
                                style={{ color: "#00008B" }}
                                className="small"
                              >
                                Since
                              </Form.Label>
                              <Form.Control
                                name="healthHistory.since"
                                type="text"
                                value={member.healthHistory.since}
                                onChange={(e) =>
                                  handleFamilyMemberChange(e, index)
                                }
                                placeholder="Since"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <Form.Group controlId={`height-${index}`}>
                              <Form.Label
                                style={{ color: "#00008B" }}
                                className="small"
                              >
                                Height
                              </Form.Label>
                              <Form.Control
                                name="healthHistory.height"
                                value={member.healthHistory.height}
                                onChange={(e) =>
                                  handleFamilyMemberChange(e, index)
                                }
                                placeholder="Height"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <Form.Group controlId={`weight-${index}`}>
                              <Form.Label
                                style={{ color: "#00008B" }}
                                className="small"
                              >
                                Weight
                              </Form.Label>
                              <Form.Control
                                name="healthHistory.weight"
                                value={member.healthHistory.weight}
                                onChange={(e) =>
                                  handleFamilyMemberChange(e, index)
                                }
                                placeholder="Weight"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col>
                            <Form.Group controlId={`remark-${index}`}>
                              <Form.Label
                                style={{ color: "#00008B" }}
                                className="small"
                              >
                                Remark
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                name="healthHistory.remark"
                                value={member.healthHistory.remark}
                                onChange={(e) =>
                                  handleFamilyMemberChange(e, index)
                                }
                                placeholder="Remark"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )}
                  </div>
                ))}

                {/* ✅ Submit and Next Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setActiveTab("personal")}
                  >
                    <FaArrowLeft /> Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setActiveTab("financial")}
                  >
                    Next <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* -----------------Third Tab ----------------------- */}
            {activeTab === "financial" && (
              <div>
                <div className="financial-detail">
                  <h5 className="mt-4">Financial Details</h5>
                  <div className="row">
                    {/* Insurance */}
                    <div className="col-md-4" style={{ color: "#00008B" }}>
                      <h6 className="text-warning fw-bold">Insurance</h6>
                      {[
                        "LIC Policy",
                        "Pvt. Life Policy",
                        "Health Policy",
                        "Motor Policy",
                        "Fire Policy",
                        "Other Policy",
                      ].map((item) => (
                        <Form.Check
                          key={item}
                          type="checkbox"
                          label={item}
                          value={item}
                          checked={formData?.financialInfo?.insuranceInvestment.includes(
                            item
                          )}
                          onChange={(e) => handleCheckboxChange(e, "insurance")}
                        />
                      ))}
                    </div>

                    {/* Investment */}
                    <div className="col-md-4" style={{ color: "#00008B" }}>
                      <h6 className="text-warning fw-bold">Investment</h6>
                      {[
                        "Deposits",
                        "Mutual Fund",
                        "Stock Market",
                        "Gold",
                        "Property",
                        "Other Investment",
                      ].map((item) => (
                        <Form.Check
                          key={item}
                          type="checkbox"
                          label={item}
                          value={item}
                          checked={formData?.financialInfo?.insuranceInvestment.includes(
                            item
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e, "investment")
                          }
                        />
                      ))}
                    </div>

                    {/* Loan */}
                    <div className="col-md-4" style={{ color: "#00008B" }}>
                      <h6 className="text-warning fw-bold">
                        Loan & Liabilities
                      </h6>
                      {[
                        "Business Loan",
                        "Home Loan",
                        "Vehicle Loan",
                        "Personal Loan",
                        "Gold Loan",
                        "Other Loan",
                      ].map((item) => (
                        <Form.Check
                          key={item}
                          type="checkbox"
                          label={item}
                          value={item}
                          checked={formData?.financialInfo?.loans.includes(
                            item
                          )}
                          onChange={(e) => handleCheckboxChange(e, "loan")}
                        />
                      ))}
                    </div>
                  </div>
                  &nbsp; &nbsp;
                  {/* Submit upper details only */}
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setActiveTab("siddhant")}
                    >
                      <FaArrowLeft /> Previous
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setActiveTab("priorities")}
                    >
                      Next <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* -----------------fourth Tab ----------------------- */}

            {activeTab === "priorities" && (
              <div>
                <div className="financial-detail">
                  {/* Future's Priorities */}
                  <div className="row mt-4">
                    <div className="col-12">
                      <h6
                        className="fw-bold"
                        style={{ color: "", textDecoration: "" }}
                      >
                        FUTURE'S PRIORITIES
                      </h6>
                      <div className="row">
                        {/* Column 1 */}
                        <div className="col-md-4">
                          {[
                            "Life Insurance",
                            "Health Insurance",
                            "Retirement Fund",
                            "Wealth Creation",
                          ].map((item) => (
                            <Form.Check
                              key={item}
                              type="checkbox"
                              label={item}
                              value={item}
                              checked={formData?.financialInfo?.futurePriorities.includes(
                                item
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(e, "futurePriorities")
                              }
                            />
                          ))}
                        </div>

                        {/* Column 2 */}
                        <div className="col-md-4">
                          {[
                            "Child Higher Education",
                            "Child Professional Education",
                            "Child Marriage",
                            "Property Investment",
                          ].map((item) => (
                            <Form.Check
                              key={item}
                              type="checkbox"
                              label={item}
                              value={item}
                              checked={formData?.financialInfo?.futurePriorities.includes(
                                item
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(e, "futurePriorities")
                              }
                            />
                          ))}
                        </div>

                        {/* Column 3 */}
                        <div className="col-md-4">
                          {[
                            "Purchase House",
                            "Purchase Car",
                            "Business Fund Creation",
                            "Business Expansion",
                          ].map((item) => (
                            <Form.Check
                              key={item}
                              type="checkbox"
                              label={item}
                              value={item}
                              checked={formData?.financialInfo?.futurePriorities.includes(
                                item
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(e, "futurePriorities")
                              }
                            />
                          ))}
                        </div>

                        <Row className="mb-3">
                          <h5 className="mt-4">Have You Any Need</h5>
                          <Col>
                            <Form.Control
                              placeholder="Financial Products"
                              type="text"
                              name="needs.financialProducts"
                              value={formData?.needs?.financialProducts}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              placeholder="Any Correction"
                              type="text"
                              name="needs.anyCorrection"
                              value={formData?.needs?.anyCorrection}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              placeholder="Any Updation"
                              name="needs.anyUpdation"
                              value={formData?.needs?.anyUpdation}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col md={12}>
                            <Form.Check
                              inline
                              type="checkbox"
                              label="Financial Calculation"
                              name="needs.financialCalculation"
                              checked={formData?.needs?.financialCalculation}
                              onChange={handleChange}
                            />
                            <Form.Check
                              inline
                              type="checkbox"
                              label="Assessment of Need"
                              name="needs.assesmentOfNeed"
                              checked={formData?.needs?.assesmentOfNeed}
                              onChange={handleChange}
                            />
                            <Form.Check
                              inline
                              type="checkbox"
                              label="Portfolio Management"
                              name="needs.portfolioManagement"
                              checked={formData?.needs?.portfolioManagement}
                              onChange={handleChange}
                            />
                            <Form.Check
                              inline
                              type="checkbox"
                              label="Door Step Services"
                              name="needs.doorStepServices"
                              checked={formData?.needs?.doorStepServices}
                              onChange={handleChange}
                            />
                            <Form.Check
                              inline
                              type="checkbox"
                              label="Purchase New Products"
                              name="needs.purchaseNewProducts"
                              checked={formData?.needs?.purchaseNewProducts}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>

                        <div></div>

                        <div className="d-flex justify-content-between mt-4">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setActiveTab("financial")}
                          >
                            <FaArrowLeft /> Previous
                          </button>

                      

                          <Button
                            onClick={() => setActiveTab("proposed plan")}
                            // type="submit"

                            className=" btn btn-secondary mt-2 "
                            style={{
                              width: "200px",
                              backgroundColor: "#0d6efd",
                              color: "white",
                              padding: "8px 20px",
                              borderRadius: "5px",
                              fontSize: "16px",
                              cursor: "pointer",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            {formData?._id ? "Update" : "Next"}
                            
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

         
            {/* // fifth tab */}

           {activeTab === "proposed plan" && (
  <div>
   <ProposedPlan
  plans={safePlans}
  onPlansChange={(newPlans) =>
    setFormData((p) => ({ ...p, proposedPlan: newPlans }))
  }
  memberOptions={getAllMemberNames()}
/>

    <div className="d-flex justify-content-between mt-4">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setActiveTab("priorities")}
      >
        <FaArrowLeft /> Previous
      </button>
      {!isUpdated && (
        <Button type="submit" className="btn btn-primary">
          {formData._id ? "Update" : "Submit"}
        </Button>
      )}
    </div>
  </div>
)}
          </Form>
        </div>
      </div>

      {/* open modals  */}

      {openModals.map((modal, index) => {
        return (
          <Modal
            key={modal.id}
            show={modal.show}
            onHide={() => closeModal(modal.id)}
            backdrop={false}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title> {selectedItem} Data </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                {/* Insurance Form */}

                {selectedGroup === "insurance" && (
                  <>
                    <h5 className="mb-3 text-primary">Insurance Form</h5>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Submissions Date</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Enter Submission Date"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Member Name</Form.Label>
                          <Form.Select
                            value={modal.memberName || ""}
                            onChange={(e) =>
                              setOpenModals((prev) =>
                                prev.map((m) =>
                                  m.id === modal.id
                                    ? { ...m, memberName: e.target.value }
                                    : m
                                )
                              )
                            }
                            required
                          >
                            <option value="">-- Select Member --</option>
                            {(() => {
                              const list = [];
                            
                              if (formData?.personalDetails?.groupName)
                          
                              formData?.familyMembers?.forEach((fm) => {
                                if (fm.name) list.push(fm.name);
                              });
                              return list.map((name, idx) => (
                                <option key={idx} value={name}>
                                  {name}
                                </option>
                              ));
                            })()}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Insurance Company</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Insurance Company"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Policy No</Form.Label>
                          <Form.Control type="number" placeholder="Policy No" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Plan Name</Form.Label>
                          <Form.Control type="text" placeholder="" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>SA</Form.Label>
                          <Form.Control type="text" placeholder="" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Mode</Form.Label>
                          <Form.Control type="text" placeholder="" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Premium</Form.Label>
                          <Form.Control type="number" placeholder="Premium" />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Maturity Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Upload Document</Form.Label>
                          <Form.Control type="file" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control type="text" placeholder="Enter Remarks" />
                      </Form.Group>
                    </Col>
                  </>
                )}

                {/* Investment Form */}
                {selectedGroup === "investment" && (
                  <>
                    <h5 className="mb-3 text-success">Investment Form</h5>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Submission Date</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Enter Submission Date"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)} 
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Member Name</Form.Label>
                          <Form.Select
                            value={modal.memberName || ""}
                            onChange={(e) =>
                              setOpenModals((prev) =>
                                prev.map((m) =>
                                  m.id === modal.id
                                    ? { ...m, memberName: e.target.value }
                                    : m
                                )
                              )
                            }
                            required
                          >
                            <option value="">-- Select Member --</option>
                            {(() => {
                              const list = [];
                              // प्राइमरी client
                              if (formData?.personalDetails?.groupName)
                                list.push(formData.personalDetails.groupName);
                              // family members
                              formData?.familyMembers?.forEach((fm) => {
                                if (fm.name) list.push(fm.name);
                              });
                              return list.map((name, idx) => (
                                <option key={idx} value={name}>
                                  {name}
                                </option>
                              ));
                            })()}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Financial Product</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Financial Product "
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Co Name</Form.Label>
                          <Form.Control type="text" placeholder="Co Name" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Plan Name</Form.Label>
                          <Form.Control type="text" placeholder="Plan name" />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Amout</Form.Label>
                          <Form.Control type="number" />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Maturity Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Upload Investment Document</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Remarks</Form.Label>
                      <Form.Control type="text" placeholder="Enter Remarks" />
                    </Form.Group>
                  </>
                )}

                {/* Loan Form */}
                {selectedGroup === "loan" && (
                  <>
                    <h5 className="mb-3 text-danger">Loan Form</h5>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Submissions Date</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Enter Submission Date"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)} // optional, if editable
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Member Name</Form.Label>
                          <Form.Select
                            value={modal.memberName || ""}
                            onChange={(e) =>
                              setOpenModals((prev) =>
                                prev.map((m) =>
                                  m.id === modal.id
                                    ? { ...m, memberName: e.target.value }
                                    : m
                                )
                              )
                            }
                            required
                          >
                            <option value="">-- Select Member --</option>
                            {(() => {
                              const list = [];
                              // प्राइमरी client
                              if (formData?.personalDetails?.groupName)
                                list.push(formData.personalDetails.groupName);
                              // family members
                              formData?.familyMembers?.forEach((fm) => {
                                if (fm.name) list.push(fm.name);
                              });
                              return list.map((name, idx) => (
                                <option key={idx} value={name}>
                                  {name}
                                </option>
                              ));
                            })()}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Type of Loan</Form.Label>
                          <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>CO Name</Form.Label>
                          <Form.Control type="text" placeholder="" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label> Loan A/c No</Form.Label>
                          <Form.Control type="text" placeholder="laon A/c no" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Outstanding Loan</Form.Label>
                          <Form.Control type="number" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Interest Rate (%)</Form.Label>
                          <Form.Control type="number" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Trem</Form.Label>
                          <Form.Control type="Text" />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Maturity Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Upload Loan Document</Form.Label>
                        <Form.Control type="file" />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control type="text" placeholder="Enter Remarks" />
                      </Form.Group>
                    </Col>
                  </>
                )}

                {selectedGroup === "Proposed Financial Plan" && (
                  <>
                    <h5 className="mb-3 text-danger">Loan Form</h5>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Submission Date</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Submission Date"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Member Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Type of Loan</Form.Label>
                          <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>CO Name</Form.Label>
                          <Form.Control type="number" placeholder="₹" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label> Loan A/c No</Form.Label>
                          <Form.Control type="text" placeholder="laon A/c no" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Outstanding Loan</Form.Label>
                          <Form.Control type="number" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Interest Rate (%)</Form.Label>
                          <Form.Control type="number" />
                        </Form.Group>
                      </Col>
                      <Col md={8}>
                        <Form.Group>
                          <Form.Label>Trem</Form.Label>
                          <Form.Control type="Text" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Upload Loan Document</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </>
                )}

                {/* Future Priorities Form */}
                {selectedGroup === "futurePriorities" && (
                  <>
                    <h5 className="mb-3 text-info">Future Priorities Form</h5>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Object</Form.Label>
                          <Form.Select
                            value={
                              futurePriorityFormData.object || selectedItem
                            }
                            onChange={(e) =>
                              setFuturePriorityFormData((prev) => ({
                                ...prev,
                                object: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select Object</option>
                            <option value="Life Insurance">
                              Life Insurance
                            </option>
                            <option value="Health Insurance">
                              Health Insurance
                            </option>
                            <option value="Retirement Fund">
                              Retirement Fund
                            </option>
                            <option value="Wealth Creation">
                              Wealth Creation
                            </option>
                            <option value="Child Higher Education">
                              Child Higher Education
                            </option>
                            <option value="Child Professional Education">
                              Child Professional Education
                            </option>
                            <option value="Child Marriage">
                              Child Marriage
                            </option>
                            <option value="Property Investment">
                              Property Investment
                            </option>
                            <option value="Purchase House">
                              Purchase House
                            </option>
                            <option value="Purchase Car">Purchase Car</option>
                            <option value="Business Fund Creation">
                              Business Fund Creation
                            </option>
                            <option value="Business Expansion">
                              Business Expansion
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Member Name</Form.Label>
                          <Form.Select
                            value={modal.memberName || ""}
                            onChange={(e) =>
                              setOpenModals((prev) =>
                                prev.map((m) =>
                                  m.id === modal.id
                                    ? { ...m, memberName: e.target.value }
                                    : m
                                )
                              )
                            }
                            required
                          >
                            <option value="">-- Select Member --</option>
                            {(() => {
                              const list = [];
                              // प्राइमरी client
                              if (formData?.personalDetails?.groupName)
                                list.push(formData.personalDetails.groupName);
                              // family members
                              formData?.familyMembers?.forEach((fm) => {
                                if (fm.name) list.push(fm.name);
                              });
                              return list.map((name, idx) => (
                                <option key={idx} value={name}>
                                  {name}
                                </option>
                              ));
                            })()}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Approx Amount</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Amount"
                            value={futurePriorityFormData.approxAmount || ""}
                            onChange={(e) =>
                              setFuturePriorityFormData((prev) => ({
                                ...prev,
                                approxAmount: e.target.value,
                              }))
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Duration</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Duration"
                            value={futurePriorityFormData.duration || ""}
                            onChange={(e) =>
                              setFuturePriorityFormData((prev) => ({
                                ...prev,
                                duration: e.target.value,
                              }))
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Remark</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Remark"
                            value={futurePriorityFormData.remark || ""}
                            onChange={(e) =>
                              setFuturePriorityFormData((prev) => ({
                                ...prev,
                                remark: e.target.value,
                              }))
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal(modal.id)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => closeModal(modal.id)}>
                Save
              </Button>
              <Button
                variant="primary"
                onClick={() => openNewModal(modal.category, modal.selectedItem)}
              >
                Add More
              </Button>
            </Modal.Footer>
          </Modal>
        );
      })}
    </>
  );
};

export default ClientFirstFrom;









