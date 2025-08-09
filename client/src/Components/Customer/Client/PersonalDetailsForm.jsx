import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails } from '../../../redux/feature/LeadSource/LeadThunx';
import { fetchLeadOccupationDetails } from '../../../redux/feature/LeadOccupation/OccupationThunx';

const PersonalDetailsForm = ({ onDataChange, initialData, isEditMode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    personalDetails: {
      groupCode: '',
      salutation: '',
      groupName: '',
      gender: '',
      organisation: '',
      designation: '',
      mobileNo: '',
      contactNo: '',
      whatsappNo: '',
      emailId: '',
      paName: '',
      paMobileNo: '',
      annualIncome: 0,
      grade: '',
      preferredAddressType: 'resi',
      resiAddr: '',
      resiLandmark: '',
      resiPincode: '',
      officeAddr: '',
      officeLandmark: '',
      officePincode: '',
      preferredMeetingAddr: '',
      preferredMeetingArea: '',
      city: '',
      bestTime: '',
      adharNumber: '',
      panCardNumber: '',
      hobbies: '',
      nativePlace: '',
      socialLink: '',
      habits: '',
      leadSource: '',
      leadName: '',
      leadOccupation: '',
      leadOccupationType: '',
      leadPerson: '',
      callingPurpose: '',
      name: '',
      allocatedCRE: '',
      remark: '',
    },
    education: {
      types: 'school',
      schoolName: '',
      schoolSubjects: '',
      collegeName: '',
      collegeCourse: '',
      instituteName: '',
      professionalDegree: '',
    },
  });

  const leadOccupations = useSelector((state) => state.leadOccupation.details);
  const leadSources = useSelector((state) => state.leadsource.leadsourceDetail);

  useEffect(() => {
    dispatch(fetchLeadOccupationDetails());
    dispatch(fetchDetails());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split('.');

    setFormData((prev) => {
      const newVal = type === 'checkbox' ? checked : value;
      const updatedSection = { ...prev[section], [field]: newVal };

      if (section === 'personalDetails' && field === 'annualIncome') {
        let grade = '';
        if (newVal === '25 lakh to 1 Cr.') grade = 1;
        else if (newVal === '5 to 25 lakh') grade = 2;
        else if (newVal === '2.5 to 5 lakh') grade = 3;
        updatedSection.grade = grade;
      }

      const newFormData = { ...prev, [section]: updatedSection };
      onDataChange(newFormData); // Pass the whole form data up
      return newFormData;
    });
  };

  const handleAddressTypeChange = (type) => {
    setFormData(prev => {
        const newFormData = {
            ...prev,
            personalDetails: {
                ...prev.personalDetails,
                preferredAddressType: type
            }
        };
        onDataChange(newFormData);
        return newFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataChange(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="personal-detail">
        <div className="personal-details">
          <h5 className="mt-4">Personal Details</h5>
          <Row className="mb-4">
            <Col md={2}>
              <Form.Group controlId="groupCode">
                <Form.Label style={{ color: '#00008B' }} className="fw-medium">Group Code</Form.Label>
                <Form.Control name="personalDetails.groupCode" type="text" placeholder="Group Code" value={formData?.personalDetails?.groupCode} onChange={handleChange} size="sm" />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="salutation">
                <Form.Label style={{ color: '#00008B' }} className="fw-medium">Select</Form.Label>
                <Form.Select name="personalDetails.salutation" value={formData?.personalDetails?.salutation} onChange={handleChange} size="sm">
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
                <Form.Label style={{ color: '#00008B' }} className="fw-medium">Group Head</Form.Label>
                <Form.Control name="personalDetails.groupName" type="text" placeholder="Fmaily Head" value={formData?.personalDetails?.groupName} onChange={handleChange} size="sm" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="gender">
                <Form.Label style={{ color: '#00008B' }} className="fw-medium">Gender</Form.Label>
                <Form.Select name="personalDetails.gender" value={formData?.personalDetails?.gender} onChange={handleChange} size="sm">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {/* ... more form rows ... */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group style={{ color: "#00008B" }} controlId="organisation">
                <Form.Label className="fw-medium">Organisation</Form.Label>
                <Form.Control name="personalDetails.organisation" type="text" placeholder="Organisation" value={formData?.personalDetails?.organisation} onChange={handleChange} size="sm"/>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="designation">
                <Form.Label style={{ color: "#00008B" }} className="fw-medium">Designation</Form.Label>
                <Form.Control name="personalDetails.designation" type="text" placeholder="Designation" value={formData?.personalDetails?.designation} onChange={handleChange} size="sm"/>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="annualIncome">
                <Form.Label style={{ color: "#00008B" }} className="fw-medium">Annual Income</Form.Label>
                <Form.Control as="select" name="personalDetails.annualIncome" value={formData?.personalDetails?.annualIncome || ""} onChange={handleChange} size="sm">
                  <option value="">-- Select --</option>
                  <option value="25 lakh to 1 Cr.">25 lakh to 1 Cr.</option>
                  <option value="5 to 25 lakh">5 to 25 lakh</option>
                  <option value="2.5 to 5 lakh">2.5 to 5 lakh</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group controlId="grade">
                <Form.Label style={{ color: "#00008B" }} className="fw-medium">Grade</Form.Label>
                <Form.Control type="text" name="personalDetails.grade" value={formData?.personalDetails?.grade || ""} size="sm" readOnly/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={3}>
              <Form.Group controlId="mobileNo">
                <Form.Label style={{ color: "#00008B" }} className="fw-medium">Mobile Number</Form.Label>
                <Form.Control name="personalDetails.mobileNo" type="text" placeholder="mobile number" value={formData?.personalDetails?.mobileNo} onChange={handleChange} size="sm"/>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="contactNo">
                <Form.Label style={{ color: "#00008B" }} className="fw-medium">Contact Number</Form.Label>
                <Form.Control name="personalDetails.contactNo" type="text" placeholder="Contact Number" value={formData?.personalDetails?.contactNo} onChange={handleChange} size="sm"/>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="whatsappNo">
                <Form.Label style={{ color: "#00008B" }} className="fw-medium">Whatsapp Number</Form.Label>
                <Form.Control name="personalDetails.whatsappNo" type="text" placeholder="Whatsapp Number" value={formData?.personalDetails?.whatsappNo} onChange={handleChange} size="sm"/>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="emailId">
                <Form.Label style={{ color: "#00008B" }} className="fw-medium">Email Id</Form.Label>
                <Form.Control name="personalDetails.emailId" type="text" placeholder="Email id" value={formData?.personalDetails?.emailId} onChange={handleChange} size="sm"/>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={3}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">PA Name</Form.Label>
              <Form.Control name="personalDetails.paName" value={formData?.personalDetails?.paName} onChange={handleChange} placeholder="PA Name"/>
            </Col>
            <Col md={3}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">PA Number</Form.Label>
              <Form.Control name="personalDetails.paMobileNo" value={formData?.personalDetails?.paMobileNo} onChange={handleChange} placeholder="PA Number"/>
            </Col>
            <Col md={3}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Aadhar Number</Form.Label>
              <Form.Control placeholder="Aadhar Number" name="personalDetails.adharNumber" type="number" value={formData?.personalDetails?.adharNumber} onChange={handleChange}/>
            </Col>
            <Col md={3}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium ">PAN Number</Form.Label>
              <Form.Control placeholder="PAN Number" name="personalDetails.panCardNumber" type="text" value={formData?.personalDetails?.panCardNumber} onChange={handleChange}/>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={1} style={{ color: "#00008B" }} className="mt-2">
                <Form.Check type="radio" label="Resi" name="preferredAddressType" value="resi" checked={formData.personalDetails.preferredAddressType === 'resi'} onChange={() => handleAddressTypeChange('resi')} />
            </Col>
            <Col md={4}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Resi Address</Form.Label>
              <Form.Control name="personalDetails.resiAddr" value={formData.personalDetails.resiAddr} onChange={handleChange}/>
            </Col>
            <Col md={4}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Landmark</Form.Label>
              <Form.Control name="personalDetails.resiLandmark" value={formData.personalDetails.resiLandmark} onChange={handleChange}/>
            </Col>
            <Col md={3}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Pin Code</Form.Label>
              <Form.Control name="personalDetails.resiPincode" value={formData.personalDetails.resiPincode} onChange={handleChange}/>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={1} style={{ color: "#00008B" }} className="mt-4">
              <Form.Check type="radio" label="Office" name="preferredAddressType" value="office" checked={formData.personalDetails.preferredAddressType === 'office'} onChange={() => handleAddressTypeChange('office')} />
            </Col>
            <Col md={4}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Office Address</Form.Label>
              <Form.Control name="personalDetails.officeAddr" value={formData.personalDetails.officeAddr} onChange={handleChange}/>
            </Col>
            <Col md={4}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Landmark</Form.Label>
              <Form.Control name="personalDetails.officeLandmark" value={formData.personalDetails.officeLandmark} onChange={handleChange}/>
            </Col>
            <Col md={3}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Pin Code</Form.Label>
              <Form.Control name="personalDetails.officePincode" value={formData.personalDetails.officePincode} onChange={handleChange}/>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={4}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Preferred Meeting Address</Form.Label>
              <Form.Control name="personalDetails.preferredMeetingAddr" value={formData?.personalDetails?.preferredMeetingAddr} onChange={handleChange}/>
            </Col>
            <Col md={4}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Area</Form.Label>
              <Form.Control name="personalDetails.preferredMeetingArea" value={formData?.personalDetails?.preferredMeetingArea} onChange={handleChange}/>
            </Col>
            <Col md={2}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">City</Form.Label>
              <Form.Control name="personalDetails.city" value={formData?.personalDetails?.city} onChange={handleChange}/>
            </Col>
            <Col md={2}>
              <Form.Label style={{ color: "#00008B" }} className="fw-medium">Best Time</Form.Label>
              <Form.Select id="bestTime" name="personalDetails.bestTime" value={formData?.personalDetails?.bestTime} onChange={handleChange}>
                <option value="">-- Select Time --</option>
                <option value="10 AM to 2 PM">10 AM to 2 PM</option>
                <option value="2 PM to 7 PM">2 PM to 7 PM</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-4 align-items-end">
            <Col md={4} className="mt-2">
              <Form.Label className="fw-medium" style={{ color: "#00008B" }}>Education Type</Form.Label>
              <Form.Select name="education.types" value={formData?.education?.types || "school"} onChange={handleChange}>
                <option value="school">School</option>
                <option value="college">College</option>
                <option value="professional">Professional Degree</option>
              </Form.Select>
            </Col>
            {formData?.education?.types === "school" && (
              <>
                <Col md={4}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>School Name</Form.Label><Form.Control name="education.schoolName" type="text" placeholder="Enter School Name" value={formData?.education?.schoolName || ""} onChange={handleChange}/></Col>
                <Col md={4}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Subjects</Form.Label><Form.Control name="education.schoolSubjects" type="text" placeholder="Enter Subjects" value={formData?.education?.schoolSubjects || ""} onChange={handleChange}/></Col>
              </>
            )}
            {formData?.education?.types === "college" && (
              <>
                <Col md={4}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>College Name</Form.Label><Form.Control name="education.collegeName" type="text" placeholder="Enter College Name" value={formData?.education?.collegeName || ""} onChange={handleChange}/></Col>
                <Col md={4}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Course/Degree</Form.Label><Form.Control name="education.collegeCourse" type="text" placeholder="Enter Course" value={formData?.education?.collegeCourse || ""} onChange={handleChange}/></Col>
              </>
            )}
            {formData?.education?.types === "professional" && (
              <>
                <Col md={4}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Institute Name</Form.Label><Form.Control name="education.instituteName" type="text" placeholder="Enter Institute Name" value={formData?.education?.instituteName || ""} onChange={handleChange}/></Col>
                <Col md={4}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Degree</Form.Label><Form.Control name="education.professionalDegree" type="text" placeholder="Enter Degree Name" value={formData?.education?.professionalDegree || ""} onChange={handleChange}/></Col>
              </>
            )}
          </Row>

          <Row className="mb-4">
            <Col md={3}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Native Place</Form.Label><Form.Control placeholder="Native Place" name="personalDetails.nativePlace" type="text" value={formData?.personalDetails?.nativePlace} onChange={handleChange}/></Col>
            <Col md={3}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Hobbies</Form.Label><Form.Control placeholder="Hobbies" name="personalDetails.hobbies" type="text" value={formData?.personalDetails?.hobbies} onChange={handleChange}/></Col>
            <Col md={3}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Social Link</Form.Label><Form.Control placeholder="Social Link" name="personalDetails.socialLink" type="text" value={formData?.personalDetails?.socialLink} onChange={handleChange}/></Col>
            <Col md={3}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Habits</Form.Label><Form.Control placeholder="Habits" name="personalDetails.habits" type="text" value={formData?.personalDetails?.habits} onChange={handleChange}/></Col>
          </Row>

          <Row className="mb-4">
            <Col md={3}>
              <Form.Label className="fw-medium" style={{ color: "#00008B" }}>Lead Source</Form.Label>
              <Form.Select name="personalDetails.leadSource" value={formData?.personalDetails?.leadSource} onChange={handleChange}>
                <option value="">Select Lead Source</option>
                {leadSources.map((source) => (<option key={source._id} value={source.leadName}>{source.leadName}</option>))}
              </Form.Select>
            </Col>
            <Col md={3}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Lead Name</Form.Label><Form.Control name="personalDetails.leadName" placeholder="Lead Name" value={formData?.personalDetails?.leadName} onChange={handleChange}/></Col>
            <Col md={3}>
              <Form.Label className="fw-medium" style={{ color: "#00008B" }}>Lead Occupation</Form.Label>
              <Form.Select name="personalDetails.leadOccupation" value={formData?.personalDetails?.leadOccupation} onChange={handleChange}>
                <option value="">Select Lead Occupation</option>
                {leadOccupations.map((occupation) => (<option key={occupation._id} value={occupation.leadName}>{occupation.leadName}</option>))}
              </Form.Select>
            </Col>
            <Col md={3}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Occupation Type</Form.Label><Form.Control name="personalDetails.leadOccupationType" placeholder="Occupation Type" value={formData?.personalDetails?.leadOccupationType} onChange={handleChange}/></Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <Form.Label className="fw-medium" style={{ color: "#00008B" }}>Select Purpose</Form.Label>
              <Form.Select name="personalDetails.callingPurpose" value={formData?.personalDetails?.callingPurpose} onChange={handleChange}>
                <option value="">Select Purpose</option>
                <option value="Servicing">Servicing</option>
                <option value="Sales">Sales</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label className="fw-medium" style={{ color: "#00008B" }}>Select Name</Form.Label>
              <Form.Select name="personalDetails.name" value={formData?.personalDetails?.name} onChange={handleChange}>
                <option value="">Select Name</option>
                <option value="LIC">LIC</option>
                <option value="Portfolio Management">Portfolio Management</option>
              </Form.Select>
            </Col>
            <Col md={4}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>CRE Name</Form.Label><Form.Control placeholder="Allocated CRE" name="personalDetails.allocatedCRE" type="text" value={formData?.personalDetails?.allocatedCRE} onChange={handleChange}/></Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}><Form.Label className="fw-medium" style={{ color: "#00008B" }}>Remark</Form.Label><Form.Control as="textarea" rows={3} placeholder="Enter any remarks" name="personalDetails.remark" value={formData?.personalDetails?.remark} onChange={handleChange}/></Col>
          </Row>

          <Row className="m-auto mt-3">
            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" className="btn btn-primary">
                {isEditMode ? 'Update & Next' : 'Save & Next'} <FaArrowRight />
              </Button>
            </div>
          </Row>
        </div>
      </div>
    </Form>
  );
};

export default PersonalDetailsForm;
