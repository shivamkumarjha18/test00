// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Form, Row, Col, Button } from "react-bootstrap";
// import { addFamilyMember } from "../../../redux/feature/ClientRedux/ClientThunx";
// import {toast} from "react-toastify"

// const FamilyMembersForm = ({ clientId,onClientCreated }) => {
//   const dispatch = useDispatch();
//   const [familyMembers, setFamilyMembers] = useState([]);

//   useEffect(() => {
//     // Fetch existing family members if clientId is provided
//     if (clientId) {
//       // Fetch family members from API or Redux store
//     }
//   }, [clientId]);

//   const handleAddMember = () => {
//     setFamilyMembers((prev) => [
//       ...prev,
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
//     ]);
//   };

//   const handleRemoveMember = (index) => {
//     setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleMemberChange = (e, index) => {
//     const { name, value, type, checked } = e.target;
//     const keys = name.split(".");

//     setFamilyMembers((prev) => {
//       const members = [...prev];
//       if (keys.length === 1) {
//         members[index][keys[0]] = type === "checkbox" ? checked : value;
//       } else if (keys.length === 2) {
//         members[index][keys[0]][keys[1]] = value;
//       }
//       return members;
//     });
//   };



// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const result = await dispatch(addFamilyMember({ clientId, membersArray: familyMembers }));
//   if(result){
//   setFamilyMembers([]);
//   toast.info("Family Members Added Successfully...")
//   const clientIdFromRedux = result?.payload; 
//   console.log("clientId in family details", clientIdFromRedux);
//   if (onClientCreated && clientIdFromRedux) onClientCreated(clientIdFromRedux);
//   }

// };





//   return (
//     <Form onSubmit={handleSubmit}>
//       {familyMembers.map((member, index) => (
//         <div key={index} className="border rounded p-3 mb-3">
//           <Row className="mb-2">
//             <Col md={2}>
//               <Form.Group controlId={`title-${index}`}>
//                 <Form.Label>Mr/Mrs</Form.Label>
//                 <Form.Select
//                   name="title"
//                   value={member.title}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 >
//                   <option value="">Select</option>
//                   <option>Mr.</option>
//                   <option>Mrs.</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group controlId={`name-${index}`}>
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   name="name"
//                   value={member.name}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`relation-${index}`}>
//                 <Form.Label>Relation</Form.Label>
//                 <Form.Select
//                   name="relation"
//                   value={member.relation}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 >
//                   <option value="">Select Relation</option>
//                   <option>self</option>
//                   <option>Wife</option>
//                   <option>Husband</option>
//                   <option>Son</option>
//                   <option>Daughter</option>
//                   <option>Mother</option>
//                   <option>Father</option>
//                   <option>Brother</option>
//                   <option>Sister</option>
//                   <option>Brother-in-law</option>
//                   <option>Sister-in-law</option>
//                   <option>Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`annualIncome-${index}`}>
//                 <Form.Label>Annual Income</Form.Label>
//                 <Form.Control
//                   name="annualIncome"
//                   value={member.annualIncome}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="mb-2">
//             <Col md={3}>
//               <Form.Group controlId={`dobActual-${index}`}>
//                 <Form.Label>DOB (Actual)</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="dobActual"
//                   value={member.dobActual}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`dobRecord-${index}`}>
//                 <Form.Label>DOB (Record)</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="dobRecord"
//                   value={member.dobRecord}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`marriageDate-${index}`}>
//                 <Form.Label>Marriage Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="marriageDate"
//                   value={member.marriageDate}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`occupation-${index}`}>
//                 <Form.Label>Occupation</Form.Label>
//                 <Form.Control
//                   name="occupation"
//                   value={member.occupation}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="mb-2">
//             <Col md={2}>
//               <Form.Group controlId={`includeHealth-${index}`}>
//                 <Form.Check
//                   type="checkbox"
//                   label="Include Health History"
//                   name="includeHealth"
//                   checked={member.includeHealth}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             {member.includeHealth && (
//               <Col md={10}>
//                 <Row>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.submissionDate-${index}`}>
//                       <Form.Label>Submission Date</Form.Label>
//                       <Form.Control
//                         type="date"
//                         name="healthHistory.submissionDate"
//                         value={member.healthHistory.submissionDate}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.diseaseName-${index}`}>
//                       <Form.Label>Disease Name</Form.Label>
//                       <Form.Control
//                         name="healthHistory.diseaseName"
//                         value={member.healthHistory.diseaseName}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.since-${index}`}>
//                       <Form.Label>Since</Form.Label>
//                       <Form.Control
//                         type="date"
//                         name="healthHistory.since"
//                         value={member.healthHistory.since ?? ''}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.height-${index}`}>
//                       <Form.Label>Height</Form.Label>
//                       <Form.Control
//                         name="healthHistory.height"
//                         value={member.healthHistory.height}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.weight-${index}`}>
//                       <Form.Label>Weight</Form.Label>
//                       <Form.Control
//                         name="healthHistory.weight"
//                         value={member.healthHistory.weight}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.remark-${index}`}>
//                       <Form.Label>Remark</Form.Label>
//                       <Form.Control
//                         name="healthHistory.remark"
//                         value={member.healthHistory.remark}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Col>
//             )}
//           </Row>
//           <Button
//             variant="danger"
//             className="mt-2"
//             onClick={() => handleRemoveMember(index)}
//           >
//             Remove Member
//           </Button>
//         </div>
//       ))}
//       <Button variant="success" onClick={handleAddMember} type="button" className="me-2">
//         Add Member
//       </Button>
//       <Button type="submit" className="btn btn-primary">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default FamilyMembersForm;






// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Form, Row, Col, Button } from "react-bootstrap";
// import { addFamilyMember } from "../../../redux/feature/ClientRedux/ClientThunx";
// import { toast } from "react-toastify";

// const FamilyMembersForm = ({ clientId, clientData, onClientCreated }) => {
//   const dispatch = useDispatch();
//   const [familyMembers, setFamilyMembers] = useState([]);

//   useEffect(() => {
//     // If editing, load existing members from clientData
//     if (clientData && clientData.familyMembers) {
//       setFamilyMembers(clientData.familyMembers);
//     }
//     // Optionally: if clientId exists but no clientData, fetch members from API
//     else if (clientId) {
//       // dispatch(fetchFamilyMembers(clientId));
//     }
//   }, [clientData, clientId]);

//   const handleAddMember = () => {
//     setFamilyMembers((prev) => [
//       ...prev,
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
//     ]);
//   };

//   const handleRemoveMember = (index) => {
//     setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleMemberChange = (e, index) => {
//     const { name, value, type, checked } = e.target;
//     const keys = name.split(".");

//     setFamilyMembers((prev) => {
//       const members = [...prev];
//       if (keys.length === 1) {
//         members[index][keys[0]] = type === "checkbox" ? checked : value;
//       } else if (keys.length === 2) {
//         members[index][keys[0]][keys[1]] = value;
//       }
//       return members;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Choose ID: either from clientData (edit) or clientId (new)
//     const idToUse = clientData?._id || clientId;
//     if (!idToUse) {
//       toast.error("No client ID found!");
//       return;
//     }

//     const result = await dispatch(addFamilyMember({ clientId: idToUse, membersArray: familyMembers }));
//     if (result) {
//       setFamilyMembers([]);
//       toast.info("Family Members Added Successfully...");
//       const returnedId = result?.payload;
//       console.log("Client ID in family details:", returnedId);
//       if (onClientCreated && returnedId) onClientCreated(returnedId);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       {familyMembers.map((member, index) => (
//         <div key={index} className="border rounded p-3 mb-3">
//           <Row className="mb-2">
//             <Col md={2}>
//               <Form.Group controlId={`title-${index}`}>
//                 <Form.Label>Mr/Mrs</Form.Label>
//                 <Form.Select
//                   name="title"
//                   value={member.title}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 >
//                   <option value="">Select</option>
//                   <option>Mr.</option>
//                   <option>Mrs.</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group controlId={`name-${index}`}>
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   name="name"
//                   value={member.name}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`relation-${index}`}>
//                 <Form.Label>Relation</Form.Label>
//                 <Form.Select
//                   name="relation"
//                   value={member.relation}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 >
//                   <option value="">Select Relation</option>
//                   <option>self</option>
//                   <option>Wife</option>
//                   <option>Husband</option>
//                   <option>Son</option>
//                   <option>Daughter</option>
//                   <option>Mother</option>
//                   <option>Father</option>
//                   <option>Brother</option>
//                   <option>Sister</option>
//                   <option>Brother-in-law</option>
//                   <option>Sister-in-law</option>
//                   <option>Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`annualIncome-${index}`}>
//                 <Form.Label>Annual Income</Form.Label>
//                 <Form.Control
//                   name="annualIncome"
//                   value={member.annualIncome}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className="mb-2">
//             <Col md={3}>
//               <Form.Group controlId={`dobActual-${index}`}>
//                 <Form.Label>DOB (Actual)</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="dobActual"
//                   value={member.dobActual}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`dobRecord-${index}`}>
//                 <Form.Label>DOB (Record)</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="dobRecord"
//                   value={member.dobRecord}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`marriageDate-${index}`}>
//                 <Form.Label>Marriage Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="marriageDate"
//                   value={member.marriageDate}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group controlId={`occupation-${index}`}>
//                 <Form.Label>Occupation</Form.Label>
//                 <Form.Control
//                   name="occupation"
//                   value={member.occupation}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className="mb-2">
//             <Col md={2}>
//               <Form.Group controlId={`includeHealth-${index}`}>
//                 <Form.Check
//                   type="checkbox"
//                   label="Include Health History"
//                   name="includeHealth"
//                   checked={member.includeHealth}
//                   onChange={(e) => handleMemberChange(e, index)}
//                 />
//               </Form.Group>
//             </Col>
//             {member.includeHealth && (
//               <Col md={10}>
//                 <Row>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.submissionDate-${index}`}>
//                       <Form.Label>Submission Date</Form.Label>
//                       <Form.Control
//                         type="date"
//                         name="healthHistory.submissionDate"
//                         value={member.healthHistory.submissionDate}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.diseaseName-${index}`}>
//                       <Form.Label>Disease Name</Form.Label>
//                       <Form.Control
//                         name="healthHistory.diseaseName"
//                         value={member.healthHistory.diseaseName}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.since-${index}`}>
//                       <Form.Label>Since</Form.Label>
//                       <Form.Control
//                         type="date"
//                         name="healthHistory.since"
//                         value={member.healthHistory.since ?? ''}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.height-${index}`}>
//                       <Form.Label>Height</Form.Label>
//                       <Form.Control
//                         name="healthHistory.height"
//                         value={member.healthHistory.height}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.weight-${index}`}>
//                       <Form.Label>Weight</Form.Label>
//                       <Form.Control
//                         name="healthHistory.weight"
//                         value={member.healthHistory.weight}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={2}>
//                     <Form.Group controlId={`healthHistory.remark-${index}`}>
//                       <Form.Label>Remark</Form.Label>
//                       <Form.Control
//                         name="healthHistory.remark"
//                         value={member.healthHistory.remark}
//                         onChange={(e) => handleMemberChange(e, index)}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Col>
//             )}
//           </Row>

//           <Button
//             variant="danger"
//             className="mt-2"
//             onClick={() => handleRemoveMember(index)}
//           >
//             Remove Member
//           </Button>
//         </div>
//       ))}
//       <Button variant="success" onClick={handleAddMember} type="button" className="me-2">
//         Add Member
//       </Button>
//       <Button type="submit" className="btn btn-primary">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default FamilyMembersForm;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addFamilyMember } from "../../../redux/feature/ClientRedux/ClientThunx";
import { toast } from "react-toastify";

const FamilyMembersForm = ({ clientId, clientData, onClientCreated }) => {
  const dispatch = useDispatch();
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    // If editing, load existing members from clientData
    if (clientData && clientData.familyMembers) {
      setFamilyMembers(clientData.familyMembers.map(member => ({ ...member }))); // Create extensible copies
    }
    // Optionally: if clientId exists but no clientData, fetch members from API
    else if (clientId) {
      // dispatch(fetchFamilyMembers(clientId));
    }
  }, [clientData, clientId]);

  const handleAddMember = () => {
    setFamilyMembers((prev) => [
      ...prev,
      {
        title: "",
        name: "",
        relation: "",
        dobActual: "",
        dobRecord: "",
        marriageDate: "",
        occupation: "",
        annualIncome: "",
        contactNo: "", // Added contactNo field
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
    ]);
  };

  const handleRemoveMember = (index) => {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMemberChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    setFamilyMembers((prev) => {
      const members = [...prev];
      const member = { ...members[index] }; // Create a new object to ensure extensibility
      if (keys.length === 1) {
        member[keys[0]] = type === "checkbox" ? checked : value;
      } else if (keys.length === 2) {
        member[keys[0]] = { ...member[keys[0]], [keys[1]]: value };
      }
      members[index] = member; // Replace with new object
      return members;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Choose ID: either from clientData (edit) or clientId (new)
    const idToUse = clientData?._id || clientId;
    if (!idToUse) {
      toast.error("No client ID found!");
      return;
    }

    // Validate required contactNo
    const invalidMembers = familyMembers.filter(
      (member) => !member.contactNo || isNaN(Number(member.contactNo))
    );
    if (invalidMembers.length > 0) {
      toast.error("Please provide a valid contact number for all members.");
      return;
    }

    const result = await dispatch(
      addFamilyMember({
        clientId: idToUse,
        membersArray: familyMembers.map((member) => ({
          ...member,
          contactNo: Number(member.contactNo), // Convert to number
        })),
      })
    );
    if (result) {
      setFamilyMembers([]);
      toast.info("Family Members Added Successfully...");
      const returnedId = result?.payload;
      console.log("Client ID in family details:", returnedId);
      if (onClientCreated && returnedId) onClientCreated(returnedId);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {familyMembers.map((member, index) => (
        <div key={index} className="border rounded p-3 mb-3">
          <Row className="mb-2">
            <Col md={2}>
              <Form.Group controlId={`title-${index}`}>
                <Form.Label>Mr/Mrs</Form.Label>
                <Form.Select
                  name="title"
                  value={member.title}
                  onChange={(e) => handleMemberChange(e, index)}
                >
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId={`name-${index}`}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`relation-${index}`}>
                <Form.Label>Relation</Form.Label>
                <Form.Select
                  name="relation"
                  value={member.relation}
                  onChange={(e) => handleMemberChange(e, index)}
                >
                  <option value="">Select Relation</option>
                  <option>self</option>
                  <option>Wife</option>
                  <option>Husband</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Brother</option>
                  <option>Sister</option>
                  <option>Brother-in-law</option>
                  <option>Sister-in-law</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`contactNo-${index}`}>
                <Form.Label>Contact No <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="contactNo"
                  value={member.contactNo}
                  onChange={(e) => handleMemberChange(e, index)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={3}>
              <Form.Group controlId={`dobActual-${index}`}>
                <Form.Label>DOB (Actual)</Form.Label>
                <Form.Control
                  type="date"
                  name="dobActual"
                  value={member.dobActual}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`dobRecord-${index}`}>
                <Form.Label>DOB (Record)</Form.Label>
                <Form.Control
                  type="date"
                  name="dobRecord"
                  value={member.dobRecord}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`marriageDate-${index}`}>
                <Form.Label>Marriage Date</Form.Label>
                <Form.Control
                  type="date"
                  name="marriageDate"
                  value={member.marriageDate}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`occupation-${index}`}>
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  name="occupation"
                  value={member.occupation}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={2}>
              <Form.Group controlId={`annualIncome-${index}`}>
                <Form.Label>Annual Income</Form.Label>
                <Form.Control
                  name="annualIncome"
                  value={member.annualIncome}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId={`includeHealth-${index}`}>
                <Form.Check
                  type="checkbox"
                  label="Include Health History"
                  name="includeHealth"
                  checked={member.includeHealth}
                  onChange={(e) => handleMemberChange(e, index)}
                />
              </Form.Group>
            </Col>
            {member.includeHealth && (
              <Col md={8}>
                <Row>
                  <Col md={2}>
                    <Form.Group controlId={`healthHistory.submissionDate-${index}`}>
                      <Form.Label>Submission Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="healthHistory.submissionDate"
                        value={member.healthHistory.submissionDate}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`healthHistory.diseaseName-${index}`}>
                      <Form.Label>Disease Name</Form.Label>
                      <Form.Control
                        name="healthHistory.diseaseName"
                        value={member.healthHistory.diseaseName}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`healthHistory.since-${index}`}>
                      <Form.Label>Since</Form.Label>
                      <Form.Control
                        type="date"
                        name="healthHistory.since"
                        value={member.healthHistory.since ?? ''}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`healthHistory.height-${index}`}>
                      <Form.Label>Height</Form.Label>
                      <Form.Control
                        name="healthHistory.height"
                        value={member.healthHistory.height}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`healthHistory.weight-${index}`}>
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        name="healthHistory.weight"
                        value={member.healthHistory.weight}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`healthHistory.remark-${index}`}>
                      <Form.Label>Remark</Form.Label>
                      <Form.Control
                        name="healthHistory.remark"
                        value={member.healthHistory.remark}
                        onChange={(e) => handleMemberChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>

          <Button
            variant="danger"
            className="mt-2"
            onClick={() => handleRemoveMember(index)}
          >
            Remove Member
          </Button>
        </div>
      ))}
      <Button variant="success" onClick={handleAddMember} type="button" className="me-2">
        Add Member
      </Button>
      <Button type="submit" className="btn btn-primary">
        Submit
      </Button>
    </Form>
  );
};

export default FamilyMembersForm;