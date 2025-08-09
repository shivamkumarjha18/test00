import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Placeholder for the new thunk
const addFinancialInfo = (data) => ({ type: 'client/addFinancialInfo', payload: data });

const FinancialInfoForm = ({ clientId, onBack, onNext }) => {
  const dispatch = useDispatch();
  const [financialInfo, setFinancialInfo] = useState({
    insurance: [],
    investments: [],
    loans: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const handleCheckboxChange = (e, group) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedGroup(group);
      setSelectedItem(value);
      setShowModal(true);
    }
  };

  const handleModalSave = (data) => {
    setFinancialInfo(prev => ({
        ...prev,
        [selectedGroup]: [...prev[selectedGroup], data]
    }));
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await dispatch(addFinancialInfo({ clientId, financialInfo }));
      toast.success("Financial info saved successfully!");
      if(onNext) onNext();
    } catch (error) {
      toast.error("Failed to save financial info.");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="financial-detail">
          <h5 className="mt-4">Financial Details</h5>
          <Row>
            <Col md={4} style={{ color: '#00008B' }}>
              <h6 className="text-warning fw-bold">Insurance</h6>
              {['LIC Policy', 'Pvt. Life Policy', 'Health Policy', 'Motor Policy', 'Fire Policy', 'Other Policy'].map((item) => (
                <Form.Check key={item} type="checkbox" label={item} value={item} onChange={(e) => handleCheckboxChange(e, 'insurance')} />
              ))}
            </Col>
            <Col md={4} style={{ color: '#00008B' }}>
              <h6 className="text-warning fw-bold">Investment</h6>
              {['Deposits', 'Mutual Fund', 'Stock Market', 'Gold', 'Property', 'Other Investment'].map((item) => (
                <Form.Check key={item} type="checkbox" label={item} value={item} onChange={(e) => handleCheckboxChange(e, 'investments')} />
              ))}
            </Col>
            <Col md={4} style={{ color: '#00008B' }}>
              <h6 className="text-warning fw-bold">Loan & Liabilities</h6>
              {['Business Loan', 'Home Loan', 'Vehicle Loan', 'Personal Loan', 'Gold Loan', 'Other Loan'].map((item) => (
                <Form.Check key={item} type="checkbox" label={item} value={item} onChange={(e) => handleCheckboxChange(e, 'loans')} />
              ))}
            </Col>
          </Row>
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={onBack}><FaArrowLeft /> Previous</Button>
            <Button variant="primary" type="submit">Save & Next <FaArrowRight /></Button>
          </div>
        </div>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem} Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Based on selectedGroup, render a specific form. For brevity, this is a simplified example */}
            <p>Form for {selectedItem} in {selectedGroup} group.</p>
            <Button variant="primary" onClick={() => handleModalSave({ item: selectedItem, details: '...' })}>Save</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FinancialInfoForm;
