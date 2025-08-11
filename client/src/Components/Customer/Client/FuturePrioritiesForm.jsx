<<<<<<< HEAD
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Placeholder for the new thunk
const addFuturePriorities = (data) => ({ type: 'client/addFuturePriorities', payload: data });

const FuturePrioritiesForm = ({ clientId, onBack, onNext }) => {
  const dispatch = useDispatch();
  const [priorities, setPriorities] = useState({
    futurePriorities: [],
    needs: {
      financialProducts: '',
      anyCorrection: '',
      anyUpdation: '',
=======

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Form, Row, Col, Button } from "react-bootstrap";
// import { addFuturePrioritiesAndNeeds } from "../../../redux/feature/ClientRedux/ClientThunx";
// import {toast} from "react-toastify"

// const futurePriorityOptions = [
//   [
//     "Life Insurance",
//     "Health Insurance",
//     "Retirement Fund",
//     "Wealth Creation",
//   ],
//   [
//     "Child Higher Education",
//     "Child Professional Education",
//     "Child Marriage",
//     "Property Investment",
//   ],
//   [
//     "Purchase House",
//     "Purchase Car",
//     "Business Fund Creation",
//     "Business Expansion",
//   ],
// ];

// const FuturePrioritiesForm = ({ clientId, onClientCreated }) => {
//   const dispatch = useDispatch();
//   const [futurePriorities, setFuturePriorities] = useState([]);
//   const [futurePriorityForms, setFuturePriorityForms] = useState({});
//   const [needs, setNeeds] = useState({
//     createdDate: new Date(),
//     memberName: "",
//     financialProduct: "",
//     financialCompany: "",
//     planName: "",
//     documents: [],
//     financialCalculation: false,
//     assesmentOfNeed: false,
//     portfolioManagement: false,
//     doorStepServices: false,
//     purchaseNewProducts: false,
//   });

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setNeeds((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNeeds((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFuturePriorityChange = (e) => {
//     const { value, checked } = e.target;
//     setFuturePriorities((prev) =>
//       checked ? [...prev, value] : prev.filter((item) => item !== value)
//     );
//   };

//   const handleFormChange = (priority, field, value) => {
//     setFuturePriorityForms((prev) => ({
//       ...prev,
//       [priority]: {
//         ...prev[priority],
//         [field]: field === "approxAmount" ? parseFloat(value) : value,
//         members: field === "members" ? value.split(',').map(item => item.trim()) : prev[priority]?.members,
//       },
//     }));
//   };

//   const handleSaveForm = (priority) => {
//     console.log(`Saving form for ${priority}:`, futurePriorityForms[priority]);
//     // when i save this form save that priority in state and clear the form and close
    
//   };

//   const handleCloseForm = (priority) => {
//     setFuturePriorityForms((prev) => {
//       const newForms = { ...prev };
//       delete newForms[priority];
//       return newForms;
//     });
//     setFuturePriorities((prev) => prev.filter((p) => p !== priority));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Aggregate future priorities data
//     const aggregatedFuturePriorities = futurePriorities.map((priority) => ({
//       priorityName: futurePriorityForms[priority]?.priorityName || "",
//       members: futurePriorityForms[priority]?.members || [],
//       approxAmount: futurePriorityForms[priority]?.approxAmount || 0,
//       duration: futurePriorityForms[priority]?.duration || "",
//       remark: futurePriorityForms[priority]?.remark || "",
//     }));

//     console.log("Aggregated Future Priorities:", aggregatedFuturePriorities);

//     const result = await dispatch(addFuturePrioritiesAndNeeds({ clientId, futurePriorities: aggregatedFuturePriorities, needs }));
//     const clientIdFromRedux = result?.payload;
//     if (onClientCreated && clientIdFromRedux) onClientCreated(clientIdFromRedux);

//     // Clear form data after submission
//     setFuturePriorities([]);
//     setFuturePriorityForms({});
//     setNeeds({
//       createdDate: new Date(),
//       memberName: "",
//       financialProduct: "",
//       financialCompany: "",
//       planName: "",
//       documents: [],
//       financialCalculation: false,
//       assesmentOfNeed: false,
//       portfolioManagement: false,
//       doorStepServices: false,
//       purchaseNewProducts: false,
//     });
//     toast.info("Future Priorities Added Successfully.")
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       {/* Future Priorities in 3 columns */}
//       <Row className="mb-3">
//         {futurePriorityOptions.map((column, colIdx) => (
//           <Col md={4} key={colIdx}>
//             {column.map((option) => (
//               <Form.Check
//                 key={option}
//                 type="checkbox"
//                 label={option}
//                 value={option}
//                 checked={futurePriorities.includes(option)}
//                 onChange={handleFuturePriorityChange}
//               />
//             ))}
//           </Col>
//         ))}
//       </Row>

//       {/* Dynamic forms for selected future priorities */}
//       {futurePriorities.map((priority) => (
//         <div key={priority} className="border p-3 mb-3">
//           <h5 className="text-info">{priority} Form</h5>
//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Priority Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={futurePriorityForms[priority]?.priorityName || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "priorityName", e.target.value)
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Members</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={futurePriorityForms[priority]?.members?.join(', ') || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "members", e.target.value)
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Approx Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={futurePriorityForms[priority]?.approxAmount || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "approxAmount", e.target.value)
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Duration</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={futurePriorityForms[priority]?.duration || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "duration", e.target.value)
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Remark</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={futurePriorityForms[priority]?.remark || ""}
//                   onChange={(e) =>
//                     handleFormChange(priority, "remark", e.target.value)
//                   }
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Button
//             variant="primary"
//             className="me-2"
//             onClick={() => handleSaveForm(priority)}
//           >
//             Save
//           </Button>
//           <Button
//             variant="secondary"
//             onClick={() => handleCloseForm(priority)}
//           >
//             Close
//           </Button>
//         </div>
//       ))}

//       <Row className="mb-3">
//         <Col md={12}>
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Financial Calculation"
//             name="financialCalculation"
//             checked={needs.financialCalculation}
//             onChange={handleCheckboxChange}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Assessment of Need"
//             name="assesmentOfNeed"
//             checked={needs.assesmentOfNeed}
//             onChange={handleCheckboxChange}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Portfolio Management"
//             name="portfolioManagement"
//             checked={needs.portfolioManagement}
//             onChange={handleCheckboxChange}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Door Step Services"
//             name="doorStepServices"
//             checked={needs.doorStepServices}
//             onChange={handleCheckboxChange}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             label="Purchase New Products"
//             name="purchaseNewProducts"
//             checked={needs.purchaseNewProducts}
//             onChange={handleCheckboxChange}
//           />
//         </Col>
//       </Row>
//       <Row className="mb-3">
//         <Col md={4}>
//           <Form.Group controlId="financialProducts">
//             <Form.Label>Financial Products</Form.Label>
//             <Form.Control
//               type="text"
//               name="financialProducts"
//               value={needs.financialProducts}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={4}>
//           <Form.Group controlId="anyCorrection">
//             <Form.Label>Any Correction</Form.Label>
//             <Form.Control
//               type="text"
//               name="anyCorrection"
//               value={needs.anyCorrection}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={4}>
//           <Form.Group controlId="anyUpdation">
//             <Form.Label>Any Updation</Form.Label>
//             <Form.Control
//               type="text"
//               name="anyUpdation"
//               value={needs.anyUpdation}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//         </Col>
//       </Row>
//       <Button type="submit" className="btn btn-primary">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default FuturePrioritiesForm;






import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addFuturePrioritiesAndNeeds } from "../../../redux/feature/ClientRedux/ClientThunx";
import { toast } from "react-toastify";

const futurePriorityOptions = [
  ["Life Insurance", "Health Insurance", "Retirement Fund", "Wealth Creation"],
  [
    "Child Higher Education",
    "Child Professional Education",
    "Child Marriage",
    "Property Investment",
  ],
  [
    "Purchase House",
    "Purchase Car",
    "Business Fund Creation",
    "Business Expansion",
  ],
];

const FuturePrioritiesForm = ({ clientId, onClientCreated }) => {
  const dispatch = useDispatch();
  const [futurePriorities, setFuturePriorities] = useState([]);
  const [futurePriorityForms, setFuturePriorityForms] = useState({});
  const [savedFuturePriorityForms, setSavedFuturePriorityForms] = useState({});
  const [needs, setNeeds] = useState({
    createdDate: new Date(),
    memberName: "",
    financialProduct: "",
    financialCompany: "",
    planName: "",
    documents: [],
    financialCalculation: false,
    assesmentOfNeed: false,
    portfolioManagement: false,
    doorStepServices: false,
    purchaseNewProducts: false,
    anyCorrection: "",
    anyUpdation: "",
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNeeds((prev) => ({ ...prev, [name]: checked }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNeeds((prev) => ({ ...prev, [name]: value }));
  };

  const handleFuturePriorityChange = (e) => {
    const { value, checked } = e.target;
    setFuturePriorities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleFormChange = (priority, field, value) => {
    setFuturePriorityForms((prev) => ({
      ...prev,
      [priority]: {
        ...prev[priority],
        [field]: field === "approxAmount" ? parseFloat(value) : value,
        members:
          field === "members"
            ? value.split(",").map((item) => item.trim())
            : prev[priority]?.members,
      },
    }));
  };

  const handleSaveForm = (priority) => {
    const formData = futurePriorityForms[priority];

    if (
      !formData?.priorityName ||
      !formData?.members ||
      !formData?.approxAmount ||
      !formData?.duration
    ) {
      toast.error("Please complete all required fields before saving.");
      return;
    }

    // Save to saved forms
    setSavedFuturePriorityForms((prev) => ({
      ...prev,
      [priority]: formData,
    }));

    // Clear current form
    setFuturePriorityForms((prev) => {
      const newForms = { ...prev };
      delete newForms[priority];
      return newForms;
    });

    // Close the form UI
    setFuturePriorities((prev) => prev.filter((p) => p !== priority));
    toast.success(`${priority} saved.`);
  };

  const handleCloseForm = (priority) => {
    setFuturePriorityForms((prev) => {
      const newForms = { ...prev };
      delete newForms[priority];
      return newForms;
    });
    setFuturePriorities((prev) => prev.filter((p) => p !== priority));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aggregatedFuturePriorities = Object.entries(savedFuturePriorityForms).map(
      ([priority, data]) => ({
        priorityName: data?.priorityName || "",
        members: data?.members || [],
        approxAmount: data?.approxAmount || 0,
        duration: data?.duration || "",
        remark: data?.remark || "",
      })
    );

    const result = await dispatch(
      addFuturePrioritiesAndNeeds({
        clientId,
        futurePriorities: aggregatedFuturePriorities,
        needs,
      })
    );

    if(result){
        const clientIdFromRedux = result?.payload;
    if (onClientCreated && clientIdFromRedux) onClientCreated(clientIdFromRedux);

    setFuturePriorities([]);
    setFuturePriorityForms({});
    setSavedFuturePriorityForms({});
    setNeeds({
      createdDate: new Date(),
      memberName: "",
      financialProduct: "",
      financialCompany: "",
      planName: "",
      documents: [],
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
      financialCalculation: false,
      assesmentOfNeed: false,
      portfolioManagement: false,
      doorStepServices: false,
      purchaseNewProducts: false,
<<<<<<< HEAD
    }
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setPriorities(prev => {
        const newPriorities = checked
            ? [...prev.futurePriorities, value]
            : prev.futurePriorities.filter(p => p !== value);
        return { ...prev, futurePriorities: newPriorities };
    });
  };

  const handleNeedsChange = (e) => {
    const { name, value, type, checked } = e.target;
    const field = name.split('.')[1];
    setPriorities(prev => ({
        ...prev,
        needs: {
            ...prev.needs,
            [field]: type === 'checkbox' ? checked : value
        }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await dispatch(addFuturePriorities({ clientId, priorities }));
      toast.success("Future priorities saved successfully!");
      if (onNext) onNext();
    } catch (error) {
      toast.error("Failed to save future priorities.");
=======
      anyCorrection: "",
      anyUpdation: "",
    });

    toast.info("Future Priorities Added Successfully.");
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
<<<<<<< HEAD
      <div className="financial-detail">
        <div className="row mt-4">
          <div className="col-12">
            <h6 className="fw-bold">FUTURE'S PRIORITIES</h6>
            <Row>
              <Col md={4}>
                {["Life Insurance", "Health Insurance", "Retirement Fund", "Wealth Creation"].map((item) => (
                  <Form.Check key={item} type="checkbox" label={item} value={item} onChange={handleCheckboxChange} />
                ))}
              </Col>
              <Col md={4}>
                {["Child Higher Education", "Child Professional Education", "Child Marriage", "Property Investment"].map((item) => (
                  <Form.Check key={item} type="checkbox" label={item} value={item} onChange={handleCheckboxChange} />
                ))}
              </Col>
              <Col md={4}>
                {["Purchase House", "Purchase Car", "Business Fund Creation", "Business Expansion"].map((item) => (
                  <Form.Check key={item} type="checkbox" label={item} value={item} onChange={handleCheckboxChange} />
                ))}
              </Col>
            </Row>
          </div>
        </div>
        <Row className="mb-3 mt-4">
          <h5>Have You Any Need</h5>
          <Col>
            <Form.Control placeholder="Financial Products" type="text" name="needs.financialProducts" value={priorities.needs.financialProducts} onChange={handleNeedsChange} />
          </Col>
          <Col>
            <Form.Control placeholder="Any Correction" type="text" name="needs.anyCorrection" value={priorities.needs.anyCorrection} onChange={handleNeedsChange} />
          </Col>
          <Col>
            <Form.Control placeholder="Any Updation" name="needs.anyUpdation" value={priorities.needs.anyUpdation} onChange={handleNeedsChange} />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={12}>
            <Form.Check inline type="checkbox" label="Financial Calculation" name="needs.financialCalculation" checked={priorities.needs.financialCalculation} onChange={handleNeedsChange} />
            <Form.Check inline type="checkbox" label="Assessment of Need" name="needs.assesmentOfNeed" checked={priorities.needs.assesmentOfNeed} onChange={handleNeedsChange} />
            <Form.Check inline type="checkbox" label="Portfolio Management" name="needs.portfolioManagement" checked={priorities.needs.portfolioManagement} onChange={handleNeedsChange} />
            <Form.Check inline type="checkbox" label="Door Step Services" name="needs.doorStepServices" checked={priorities.needs.doorStepServices} onChange={handleNeedsChange} />
            <Form.Check inline type="checkbox" label="Purchase New Products" name="needs.purchaseNewProducts" checked={priorities.needs.purchaseNewProducts} onChange={handleNeedsChange} />
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={onBack}><FaArrowLeft /> Previous</Button>
          <Button variant="primary" type="submit">Save & Next <FaArrowRight /></Button>
        </div>
      </div>
=======
      <Row className="mb-3">
        {futurePriorityOptions.map((column, colIdx) => (
          <Col md={4} key={colIdx}>
            {column.map((option) => (
              <Form.Check
                key={option}
                type="checkbox"
                label={option}
                value={option}
                checked={futurePriorities.includes(option)}
                onChange={handleFuturePriorityChange}
              />
            ))}
          </Col>
        ))}
      </Row>

      {futurePriorities.map((priority) => (
        <div key={priority} className="border p-3 mb-3">
          <h5 className="text-info">{priority} Form</h5>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Priority Name</Form.Label>
                <Form.Control
                  type="text"
                  value={futurePriorityForms[priority]?.priorityName || ""}
                  onChange={(e) =>
                    handleFormChange(priority, "priorityName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Members</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    futurePriorityForms[priority]?.members?.join(", ") || ""
                  }
                  onChange={(e) =>
                    handleFormChange(priority, "members", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Approx Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={futurePriorityForms[priority]?.approxAmount || ""}
                  onChange={(e) =>
                    handleFormChange(priority, "approxAmount", e.target.value)
                  }
                  required
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
                  value={futurePriorityForms[priority]?.duration || ""}
                  onChange={(e) =>
                    handleFormChange(priority, "duration", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  type="text"
                  value={futurePriorityForms[priority]?.remark || ""}
                  onChange={(e) =>
                    handleFormChange(priority, "remark", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className="me-2" onClick={() => handleSaveForm(priority)}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => handleCloseForm(priority)}>
            Close
          </Button>
        </div>
      ))}

      <Row className="mb-3">
        <Col md={12}>
          <Form.Check
            inline
            type="checkbox"
            label="Financial Calculation"
            name="financialCalculation"
            checked={needs.financialCalculation}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            inline
            type="checkbox"
            label="Assessment of Need"
            name="assesmentOfNeed"
            checked={needs.assesmentOfNeed}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            inline
            type="checkbox"
            label="Portfolio Management"
            name="portfolioManagement"
            checked={needs.portfolioManagement}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            inline
            type="checkbox"
            label="Door Step Services"
            name="doorStepServices"
            checked={needs.doorStepServices}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            inline
            type="checkbox"
            label="Purchase New Products"
            name="purchaseNewProducts"
            checked={needs.purchaseNewProducts}
            onChange={handleCheckboxChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="financialProduct">
            <Form.Label>Financial Products</Form.Label>
            <Form.Control
              type="text"
              name="financialProduct"
              value={needs.financialProduct}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="anyCorrection">
            <Form.Label>Any Correction</Form.Label>
            <Form.Control
              type="text"
              name="anyCorrection"
              value={needs.anyCorrection}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="anyUpdation">
            <Form.Label>Any Updation</Form.Label>
            <Form.Control
              type="text"
              name="anyUpdation"
              value={needs.anyUpdation}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit" className="btn btn-primary">
        Submit
      </Button>
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
    </Form>
  );
};

export default FuturePrioritiesForm;
