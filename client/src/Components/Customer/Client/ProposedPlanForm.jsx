<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Placeholder for the new thunk
const addProposedPlan = (data) => ({ type: 'client/addProposedPlan', payload: data });

const ProposedPlanForm = ({ clientId, onBack, memberOptions }) => {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([
    {
      createdDate: '',
      memberName: '',
      financialProduct: '',
      financialCompany: '',
      planName: '',
      documents: [],
    },
  ]);

  const handlePlanChange = (e, index) => {
    const { name, value } = e.target;
    setPlans(prev => {
        const newPlans = [...prev];
        newPlans[index][name] = value;
        return newPlans;
    });
  };

  const addPlan = () => {
    setPlans(prev => [...prev, { createdDate: '', memberName: '', financialProduct: '', financialCompany: '', planName: '', documents: [] }]);
  };

  const removePlan = (index) => {
    setPlans(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await dispatch(addProposedPlan({ clientId, plans }));
      toast.success("Proposed plan saved successfully!");
    } catch (error) {
      toast.error("Failed to save proposed plan.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="mt-4 fw-medium">Proposed Financial Plan</h5>
            <Button variant="success" onClick={addPlan}>Add Plan</Button>
        </div>

        {plans.map((plan, index) => (
            <div key={index} className="border rounded p-3 mb-3">
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Created Date</Form.Label>
                            <Form.Control type="date" name="createdDate" value={plan.createdDate} onChange={(e) => handlePlanChange(e, index)} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Member Name</Form.Label>
                            <Form.Select name="memberName" value={plan.memberName} onChange={(e) => handlePlanChange(e, index)} required>
                                <option value="">Select Member</option>
                                {memberOptions && memberOptions.map((name, idx) => (
                                    <option key={idx} value={name}>{name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Financial Product</Form.Label>
                            <Form.Control type="text" name="financialProduct" value={plan.financialProduct} onChange={(e) => handlePlanChange(e, index)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Financial Company</Form.Label>
                            <Form.Control type="text" name="financialCompany" value={plan.financialCompany} onChange={(e) => handlePlanChange(e, index)} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Plan Name</Form.Label>
                            <Form.Control type="text" name="planName" value={plan.planName} onChange={(e) => handlePlanChange(e, index)} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Upload Document</Form.Label>
                            <Form.Control type="file" multiple />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-end">
                    <Button variant="danger" size="sm" onClick={() => removePlan(index)}>Remove</Button>
                </div>
            </div>
        ))}

        <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={onBack}><FaArrowLeft /> Previous</Button>
            <Button variant="primary" type="submit">Submit All</Button>
        </div>
    </Form>
  );
};

export default ProposedPlanForm;
=======

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addProposedFinancialPlan } from "../../../redux/feature/ClientRedux/ClientThunx";
import { toast } from "react-toastify";

const ProposedPlanForm = ({ clientId, onClientCreated }) => {
  const dispatch = useDispatch();

  const [plans, setPlans] = useState([{
    createdDate: "",
    memberName: "",
    financialProduct: "",
    financialCompany: "",
    planName: "",
    documents: [], // This will store actual File objects
  }]);
  const [savedPlans, setSavedPlans] = useState([]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newPlans = [...plans];
    newPlans[index] = {
      ...newPlans[index],
      [name]: value
    };
    setPlans(newPlans);
  };

  const handleFileUpload = (index, e) => {
    const files = e.target.files;
    const newPlans = [...plans];
    newPlans[index] = {
      ...newPlans[index],
      documents: files ? Array.from(files) : [] // Store actual File objects
    };
    setPlans(newPlans);
  };

  const addPlan = () => {
    setPlans([...plans, {
      createdDate: "",
      memberName: "",
      financialProduct: "",
      financialCompany: "",
      planName: "",
      documents: []
    }]);
  };

  const removePlan = (index) => {
    const newPlans = [...plans];
    newPlans.splice(index, 1);
    setPlans(newPlans);
  };

  const savePlan = (index) => {
    const planToSave = plans[index];
    
    // Validate that all required fields are filled
    if (!planToSave.createdDate || !planToSave.memberName || 
        !planToSave.financialProduct || !planToSave.financialCompany || 
        !planToSave.planName) {
      toast.error("Please fill in all required fields before saving the plan");
      return;
    }

    // Check if documents are uploaded
    if (!planToSave.documents || planToSave.documents.length === 0) {
      toast.error("Please upload at least one document for this plan");
      return;
    }

    const newSavedPlans = [...savedPlans, planToSave];
    setSavedPlans(newSavedPlans);
    removePlan(index);
    toast.success("Plan saved successfully");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   // Check if there are any saved plans
  //   if (savedPlans.length === 0) {
  //     toast.error("Please save at least one plan before submitting");
  //     return;
  //   }

  //   // Check if at least one plan has documents
  //   const hasDocuments = savedPlans.some(plan => plan.documents && plan.documents.length > 0);
  //   if (!hasDocuments) {
  //     toast.error("Please upload at least one document");
  //     return;
  //   }

  //   try {
  //     // Create FormData to handle file uploads
  //     const formData = new FormData();
      
  //     // Add plan data as JSON string (non-file data)
  //     const planData = savedPlans.map(plan => ({
  //       createdDate: plan.createdDate,
  //       memberName: plan.memberName,
  //       financialProduct: plan.financialProduct,
  //       financialCompany: plan.financialCompany,
  //       planName: plan.planName,
  //       documentCount: plan.documents ? plan.documents.length : 0
  //     }));
      
  //     formData.append('planData', JSON.stringify(planData));
      
  //     // Add ALL files with the field name 'documents' (matching upload.array("documents"))
  //     savedPlans.forEach((plan, planIndex) => {
  //       if (plan.documents && plan.documents.length > 0) {
  //         plan.documents.forEach((file) => {
  //           formData.append('documents', file); // This matches your backend upload.array("documents")
  //         });
  //       }
  //     });

  //     // Log FormData contents for debugging
  //     console.log('FormData contents:');
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }

  //     // Dispatch the FormData with clientId
  //     await dispatch(addProposedFinancialPlan({ clientId, formData }));
  //     toast.success("Proposed Plans Added Successfully!");
      
  //     // Reset form
  //     setSavedPlans([]);
  //     setPlans([{
  //       createdDate: "",
  //       memberName: "",
  //       financialProduct: "",
  //       financialCompany: "",
  //       planName: "",
  //       documents: [],
  //     }]);
      
  //     if (onClientCreated) onClientCreated();
  //   } catch (error) {
  //     toast.error("Failed to submit plans. Please try again.");
  //     console.error("Submit error:", error);
  //   }
  // };



  const handleSubmit = async (e) => {
  e.preventDefault();

  if (savedPlans.length === 0) {
    toast.error("Please save at least one plan before submitting");
    return;
  }

  try {
    for (const plan of savedPlans) {
      const formData = new FormData();
      formData.append('createdDate', plan.createdDate);
      formData.append('memberName', plan.memberName);
      formData.append('financialProduct', plan.financialProduct);
      formData.append('financialCompany', plan.financialCompany);
      formData.append('planName', plan.planName);

      plan.documents.forEach(file => {
        formData.append('documents', file);
      });

     const result = await dispatch(addProposedFinancialPlan({ clientId, formData }));
     if(result){
         setSavedPlans([]);
    setPlans([{
      createdDate: "",
      memberName: "",
      financialProduct: "",
      financialCompany: "",
      planName: "",
      documents: [],
    }]);
    toast.success("All Proposed Plans Submitted!");
     }
    }

  

  } catch (error) {
    toast.error("Failed to submit plans. Please try again.");
    console.error("Submit error:", error);
  }
};

  return (
    <div>
      {/* Display saved plans */}
      {savedPlans.length > 0 && (
        <div className="mb-4">
          <h5>Saved Plans ({savedPlans.length})</h5>
          {savedPlans.map((savedPlan, index) => (
            <div key={index} className="border p-2 mb-2 bg-light">
              <strong>{savedPlan.planName}</strong> - {savedPlan.memberName} 
              ({savedPlan.documents.length} document(s))
            </div>
          ))}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        {plans.map((plan, index) => (
          <div key={index} className="border p-3 mb-3">
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId={`createdDate-${index}`}>
                  <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="createdDate"
                    value={plan.createdDate}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`memberName-${index}`}>
                  <Form.Label>Member Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="memberName"
                    value={plan.memberName}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`financialProduct-${index}`}>
                  <Form.Label>Financial Product <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="financialProduct"
                    value={plan.financialProduct}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId={`financialCompany-${index}`}>
                  <Form.Label>Company <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="financialCompany"
                    value={plan.financialCompany}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`planName-${index}`}>
                  <Form.Label>Plan Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="planName"
                    value={plan.planName}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`documents-${index}`}>
                  <Form.Label>Upload Document <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="file"
                    name="documents"
                    onChange={(e) => handleFileUpload(index, e)}
                    multiple
                    required
                  />
                  {plan.documents.length > 0 && (
                    <small className="text-muted">
                      {plan.documents.length} file(s) selected
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex gap-2">
              <Button variant="danger" onClick={() => removePlan(index)}>
                Remove Plan
              </Button>
              <Button variant="success" onClick={() => savePlan(index)}>
                Save Plan
              </Button>
            </div>
          </div>
        ))}
        
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={addPlan}>
            Add Another Plan
          </Button>
          
          <Button 
            type="submit" 
            variant="success"
            disabled={savedPlans.length === 0}
          >
            Submit All Plans ({savedPlans.length})
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProposedPlanForm;
>>>>>>> c8eddd2 (Completed clients full forms with backend and redux as well as clients tab status and delete)
