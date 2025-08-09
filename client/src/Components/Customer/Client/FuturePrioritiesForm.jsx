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
      financialCalculation: false,
      assesmentOfNeed: false,
      portfolioManagement: false,
      doorStepServices: false,
      purchaseNewProducts: false,
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
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
    </Form>
  );
};

export default FuturePrioritiesForm;
