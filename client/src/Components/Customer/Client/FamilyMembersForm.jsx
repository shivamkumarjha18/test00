import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Placeholder for the new thunk
const addFamilyMembers = (data) => ({ type: 'client/addFamilyMembers', payload: data });

const FamilyMembersForm = ({ clientId, onBack, onNext }) => {
  const dispatch = useDispatch();
  const [familyMembers, setFamilyMembers] = useState([
    {
      title: '',
      name: '',
      relation: '',
      dobActual: '',
      dobRecord: '',
      marriageDate: '',
      occupation: '',
      annualIncome: '',
      includeHealth: false,
      healthHistory: {
        submissionDate: '',
        diseaseName: '',
        since: '',
        height: '',
        weight: '',
        remark: '',
      },
    },
  ]);

  const handleFamilyMemberChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split('.');

    setFamilyMembers((prev) => {
      const members = [...prev];
      if (keys.length === 1) {
        members[index][keys[0]] = type === 'checkbox' ? checked : value;
      } else if (keys.length === 2) {
        members[index][keys[0]][keys[1]] = value;
      }
      return members;
    });
  };

  const addFamilyMember = () => {
    setFamilyMembers((prev) => [
      ...prev,
      {
        title: '', name: '', relation: '', dobActual: '', dobRecord: '', marriageDate: '',
        occupation: '', annualIncome: '', includeHealth: false,
        healthHistory: { submissionDate: '', diseaseName: '', since: '', height: '', weight: '', remark: '' },
      },
    ]);
  };

  const removeFamilyMember = (index) => {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await dispatch(addFamilyMembers({ clientId, familyMembers }));
      toast.success("Family members saved successfully!");
      if(onNext) onNext();
    } catch (error) {
      toast.error("Failed to save family members.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="family-detials">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mt-4 fw-medium">Add Family Details</h5>
          <Button variant="success" className="mb-1" onClick={addFamilyMember}>
            <FaPlus className="mb-1" />
          </Button>
        </div>

        {familyMembers.map((member, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <Row className="mb-2">
                <Col md={2}>
                    <Form.Group controlId={`title-${index}`}>
                    <Form.Label style={{ color: "#00008B" }} className="fw-medium">Mr/Mrs</Form.Label>
                    <Form.Select placeholder="Mr/Mrs" name="title" value={member.title} onChange={(e) => handleFamilyMemberChange(e, index)}>
                        <option value="">Select</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group controlId={`name-${index}`}>
                    <Form.Label style={{ color: "#00008B" }} className="fw-medium">Name</Form.Label>
                    <Form.Control placeholder="Name" name="name" value={member.name} onChange={(e) => handleFamilyMemberChange(e, index)}/>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group controlId={`relation-${index}`}>
                    <Form.Label style={{ color: "#00008B" }} className="fw-medium">Relation</Form.Label>
                    <Form.Select name="relation" value={member.relation} onChange={(e) => handleFamilyMemberChange(e, index)}>
                        <option value="">Select Relation</option>
                        {["self", "Wife", "Husband", "Son", "Daughter", "Mother", "Father", "Brother", "Sister", "Brother-in-law", "Sister-in-law", "Other"].map((rel) => (
                        <option key={rel} value={rel}>{rel}</option>
                        ))}
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group controlId={`annualIncome-${index}`}>
                    <Form.Label style={{ color: "#00008B" }} className="fw-medium">Annual Income</Form.Label>
                    <Form.Control type="text" placeholder="Annual Income" name="annualIncome" value={member.annualIncome} onChange={(e) => handleFamilyMemberChange(e, index)}/>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col xs={12} md={4}>
                    <Form.Group controlId={`occupation-${index}`}>
                    <Form.Label style={{ color: "#00008B" }} className="fw-medium">Occupation</Form.Label>
                    <Form.Control placeholder="Occupation" name="occupation" value={member.occupation} onChange={(e) => handleFamilyMemberChange(e, index)}/>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group controlId={`dobActual-${index}`}>
                    <Form.Label style={{ color: "#00008B" }} className="fw-medium">Date of Birth (Actual)</Form.Label>
                    <Form.Control type="date" name="dobActual" value={member.dobActual} onChange={(e) => handleFamilyMemberChange(e, index)}/>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group controlId={`dobRecord-${index}`}>
                    <Form.Label style={{ color: "#00008B" }} className="fw-medium">Date of Birth (Record)</Form.Label>
                    <Form.Control type="date" name="dobRecord" value={member.dobRecord} onChange={(e) => handleFamilyMemberChange(e, index)}/>
                    </Form.Group>
                </Col>
                <Col xs={12} md={2}>
                    <Form.Group controlId={`marriageDate-${index}`}>
                    <Form.Label style={{ color: "#00008B" }} className="fw-medium">Date of Marriage</Form.Label>
                    <Form.Control type="date" name="marriageDate" value={member.marriageDate} onChange={(e) => handleFamilyMemberChange(e, index)}/>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
              <div className="text-end">
                <Button variant="danger" size="sm" onClick={() => removeFamilyMember(index)}>Remove</Button>
              </div>
            </Row>

            <Form.Check className="mb-3" label="Add Health Details" name="includeHealth" type="checkbox" checked={member.includeHealth} onChange={(e) => handleFamilyMemberChange(e, index)} style={{ position: "relative", bottom: "14px" }}/>

            {member.includeHealth && (
              <>
                <h6 className="mb-3">Health History</h6>
                <Row className="mb-3">
                  <Col md={2}><Form.Group controlId={`submissionDate-${index}`}><Form.Label style={{ color: "#00008B" }} className="small">Submission Date</Form.Label><Form.Control name="healthHistory.submissionDate" type="date" value={member.healthHistory.submissionDate} onChange={(e) => handleFamilyMemberChange(e, index)}/></Form.Group></Col>
                  <Col md={4}><Form.Group controlId={`diseaseName-${index}`}><Form.Label style={{ color: "#00008B" }} className="small">Disease Name</Form.Label><Form.Control name="healthHistory.diseaseName" value={member.healthHistory.diseaseName} onChange={(e) => handleFamilyMemberChange(e, index)} placeholder="Disease Name"/></Form.Group></Col>
                  <Col md={2}><Form.Group controlId={`since-${index}`}><Form.Label style={{ color: "#00008B" }} className="small">Since</Form.Label><Form.Control name="healthHistory.since" type="text" value={member.healthHistory.since} onChange={(e) => handleFamilyMemberChange(e, index)} placeholder="Since"/></Form.Group></Col>
                  <Col md={2}><Form.Group controlId={`height-${index}`}><Form.Label style={{ color: "#00008B" }} className="small">Height</Form.Label><Form.Control name="healthHistory.height" value={member.healthHistory.height} onChange={(e) => handleFamilyMemberChange(e, index)} placeholder="Height"/></Form.Group></Col>
                  <Col md={2}><Form.Group controlId={`weight-${index}`}><Form.Label style={{ color: "#00008B" }} className="small">Weight</Form.Label><Form.Control name="healthHistory.weight" value={member.healthHistory.weight} onChange={(e) => handleFamilyMemberChange(e, index)} placeholder="Weight"/></Form.Group></Col>
                </Row>
                <Row className="mb-3">
                  <Col><Form.Group controlId={`remark-${index}`}><Form.Label style={{ color: "#00008B" }} className="small">Remark</Form.Label><Form.Control as="textarea" rows={2} name="healthHistory.remark" value={member.healthHistory.remark} onChange={(e) => handleFamilyMemberChange(e, index)} placeholder="Remark"/></Form.Group></Col>
                </Row>
              </>
            )}
          </div>
        ))}

        <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={onBack}><FaArrowLeft /> Previous</Button>
            <Button variant="primary" type="submit">Save & Next <FaArrowRight /></Button>
        </div>
      </div>
    </Form>
  );
};

export default FamilyMembersForm;
