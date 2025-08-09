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
