
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { createClient, updateClientPersonalDetails } from "../../../redux/feature/ClientRedux/ClientThunx";
import { fetchDetails } from "../../../redux/feature/LeadSource/LeadThunx";
import { getAllOccupations } from "../../../redux/feature/LeadOccupation/OccupationThunx";
import { getAllOccupationTypes } from "../../../redux/feature/OccupationType/OccupationThunx";
import { toast } from "react-toastify";

const incomeOptions = [
  { value: "25 lakh to 1 Cr.", label: "25 lakh to 1 Cr." },
  { value: "5 to 25 lakh", label: "5 to 25 lakh" },
  { value: "2.5 to 5 lakh", label: "2.5 to 5 lakh" },
];

const gradeMap = {
  "25 lakh to 1 Cr.": 1,
  "5 to 25 lakh": 2,
  "2.5 to 5 lakh": 3,
};

const PersonalDetailsForm = ({ isEdit, clientData, onClientCreated }) => {
  const dispatch = useDispatch();
  const initialFormState = {
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
    annualIncome: "",
    grade: "",
    preferredAddressType: "resi",
    resiAddr: "",
    resiLandmark: "",
    resiPincode: "",
    officeAddr: "",
    officeLandmark: "",
    officePincode: "",
    preferredMeetingAddr: "",
    preferredMeetingArea: "",
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
  };

  const [formData, setFormData] = useState(initialFormState);
  const { leadsourceDetail } = useSelector((state) => state.leadsource);
  const {  alldetails} = useSelector((state) => state.leadOccupation);
  const {  alldetailsForTypes } = useSelector((state) => state.OccupationType);


  useEffect(() => {
    dispatch(fetchDetails());
    dispatch(getAllOccupationTypes());
    dispatch(getAllOccupations());

  }, [dispatch]);

  useEffect(() => {
    if (isEdit && clientData) {
      setFormData(clientData.personalDetails);
    } else {
      setFormData(initialFormState);
    }
  }, [isEdit, clientData]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      grade: gradeMap[prev.annualIncome] || "",
    }));
  }, [formData.annualIncome]);

  useEffect(() => {
    if (formData.preferredAddressType === "resi") {
      setFormData((prev) => ({
        ...prev,
        preferredMeetingAddr: prev.resiAddr,
      }));
    } else if (formData.preferredAddressType === "office") {
      setFormData((prev) => ({
        ...prev,
        preferredMeetingAddr: prev.officeAddr,
      }));
    }
  }, [formData.preferredAddressType, formData.resiAddr, formData.officeAddr]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      preferredAddressType: type,
      preferredMeetingAddr: type === "resi" ? prev.resiAddr : prev.officeAddr,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit && clientData?._id) {
      console.log(formData)
     const result = await dispatch(updateClientPersonalDetails({ id: clientData._id, personalDetails:formData }));
      if(result){
        setFormData(initialFormState);
        toast.info("CLient details updated successfully");
        if (onClientCreated) onClientCreated(clientData._id);
      }
    } else {
      const resultAction = await dispatch(createClient({ personalDetails: formData }));
      if (resultAction) {
        toast.success("Client Created Successfully");
        setFormData(initialFormState);
        const clientId = resultAction?.payload;
        if (onClientCreated && clientId) onClientCreated(clientId);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-4">
        <Col md={2}>
          <Form.Group controlId="salutation">
            <Form.Label>Salutation</Form.Label>
            <Form.Select
              name="salutation"
              value={formData.salutation ?? ""}
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
          <Form.Group controlId="groupName">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              name="groupName"
              type="text"
              placeholder="Group Name"
              value={formData.groupName ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender ?? ""}
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
          <Form.Group controlId="organisation">
            <Form.Label>Organisation</Form.Label>
            <Form.Control
              name="organisation"
              type="text"
              placeholder="Organisation"
              value={formData.organisation ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              name="designation"
              type="text"
              placeholder="Designation"
              value={formData.designation ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="annualIncome">
            <Form.Label style={{ color: "#00008B" }} className="fw-medium">
              Annual Income
            </Form.Label>
            <Form.Select
              name="annualIncome"
              value={formData.annualIncome ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">-- Select --</option>
              {incomeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={1}>
          <Form.Group controlId="grade">
            <Form.Label style={{ color: "#00008B" }} className="fw-medium">
              Grade
            </Form.Label>
            <Form.Control
              type="text"
              name="grade"
              value={formData.grade ?? ""}
              size="sm"
              readOnly
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group controlId="mobileNo">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              name="mobileNo"
              type="text"
              placeholder="Mobile No"
              value={formData.mobileNo ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="contactNo">
            <Form.Label>Contact No</Form.Label>
            <Form.Control
              name="contactNo"
              type="text"
              placeholder="Contact No"
              value={formData.contactNo ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="whatsappNo">
            <Form.Label>Whatsapp No</Form.Label>
            <Form.Control
              name="whatsappNo"
              type="text"
              placeholder="Whatsapp No"
              value={formData.whatsappNo ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="emailId">
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              name="emailId"
              type="email"
              placeholder="Email Id"
              value={formData.emailId ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group controlId="paName">
            <Form.Label>PA Name</Form.Label>
            <Form.Control
              name="paName"
              type="text"
              placeholder="PA Name"
              value={formData.paName ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="paMobileNo">
            <Form.Label>PA Mobile No</Form.Label>
            <Form.Control
              name="paMobileNo"
              type="text"
              placeholder="PA Mobile No"
              value={formData.paMobileNo ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="adharNumber">
            <Form.Label>Aadhar Number</Form.Label>
            <Form.Control
              name="adharNumber"
              type="text"
              placeholder="Aadhar Number"
              value={formData.adharNumber ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="panCardNumber">
            <Form.Label>PAN Card Number</Form.Label>
            <Form.Control
              name="panCardNumber"
              type="text"
              placeholder="PAN Card Number"
              value={formData.panCardNumber ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={1} className="mt-2">
          <Form.Check
            type="radio"
            label="Residential"
            name="preferredAddressType"
            checked={formData.preferredAddressType === "resi"}
            onChange={() => handleAddressTypeChange("resi")}
          />
        </Col>
        <Col md={4}>
          <Form.Group controlId="resiAddr">
            <Form.Label>Residential Address</Form.Label>
            <Form.Control
              name="resiAddr"
              type="text"
              placeholder="Residential Address"
              value={formData.resiAddr ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="resiLandmark">
            <Form.Label>Residential Landmark</Form.Label>
            <Form.Control
              name="resiLandmark"
              type="text"
              placeholder="Residential Landmark"
              value={formData.resiLandmark ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="resiPincode">
            <Form.Label>Residential Pincode</Form.Label>
            <Form.Control
              name="resiPincode"
              type="text"
              placeholder="Residential Pincode"
              value={formData.resiPincode ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={1} className="mt-2">
          <Form.Check
            type="radio"
            label="Office"
            name="preferredAddressType"
            checked={formData.preferredAddressType === "office"}
            onChange={() => handleAddressTypeChange("office")}
          />
        </Col>
        <Col md={4}>
          <Form.Group controlId="officeAddr">
            <Form.Label>Office Address</Form.Label>
            <Form.Control
              name="officeAddr"
              type="text"
              placeholder="Office Address"
              value={formData.officeAddr ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="officeLandmark">
            <Form.Label>Office Landmark</Form.Label>
            <Form.Control
              name="officeLandmark"
              type="text"
              placeholder="Office Landmark"
              value={formData.officeLandmark ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="officePincode">
            <Form.Label>Office Pincode</Form.Label>
            <Form.Control
              name="officePincode"
              type="text"
              placeholder="Office Pincode"
              value={formData.officePincode ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="preferredMeetingAddr">
            <Form.Label>Preferred Meeting Address</Form.Label>
            <Form.Control
              name="preferredMeetingAddr"
              type="text"
              placeholder="Preferred Meeting Address"
              value={formData.preferredMeetingAddr ?? ""}
              onChange={handleChange}
              size="sm"
              readOnly
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="preferredMeetingArea">
            <Form.Label>Preferred Meeting Area</Form.Label>
            <Form.Control
              name="preferredMeetingArea"
              type="text"
              placeholder="Preferred Meeting Area"
              value={formData.preferredMeetingArea ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              type="text"
              placeholder="City"
              value={formData.city ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="bestTime">
            <Form.Label>Best Time</Form.Label>
            <Form.Select
              name="bestTime"
              value={formData.bestTime ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">-- Select Time --</option>
              <option value="10 AM to 2 PM">10 AM to 2 PM</option>
              <option value="2 PM to 7 PM">2 PM to 7 PM</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="hobbies">
            <Form.Label>Hobbies</Form.Label>
            <Form.Control
              name="hobbies"
              type="text"
              placeholder="Hobbies"
              value={formData.hobbies ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="nativePlace">
            <Form.Label>Native Place</Form.Label>
            <Form.Control
              name="nativePlace"
              type="text"
              placeholder="Native Place"
              value={formData.nativePlace ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="socialLink">
            <Form.Label>Social Link</Form.Label>
            <Form.Control
              name="socialLink"
              type="text"
              placeholder="Social Link"
              value={formData.socialLink ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="habits">
            <Form.Label>Habits</Form.Label>
            <Form.Control
              name="habits"
              type="text"
              placeholder="Habits"
              value={formData.habits ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="leadSource">
            <Form.Label>Lead Source</Form.Label>
            <Form.Select
              name="leadSource"
              value={formData.leadSource ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">Select Lead Source</option>
              {leadsourceDetail?.map((item) => (
                <option key={item._id} value={item.leadType}>
                  {item.leadType}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="leadName">
            <Form.Label>Lead Name</Form.Label>
            <Form.Control
              name="leadName"
              type="text"
              placeholder="Lead Name"
              value={formData.leadName ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="leadOccupation">
            <Form.Label>Lead Occupation</Form.Label>
            <Form.Select
              name="leadOccupation"
              value={formData.leadOccupation ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">Select Lead Occupation</option>
              {alldetails && alldetails.map((item) => (
                <option key={item._id} value={item.leadOccupation}>
                  {item.leadOccupation}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="leadOccupationType">
            <Form.Label>Lead Occupation Type</Form.Label>
            <Form.Select
              name="leadOccupationType"
              value={formData.leadOccupationType ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">Select Lead Occupation Type</option>
              {alldetailsForTypes && alldetailsForTypes.map((item) => (
                <option key={item._id} value={item.occupationType}>
                  {item.occupationType}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="leadPerson">
            <Form.Label>Lead Person</Form.Label>
            <Form.Select
              name="leadPerson"
              value={formData.leadPerson ?? ""}
              onChange={handleChange}
              size="sm"
            >
              <option value="">Select Lead Person</option>
              {leadsourceDetail?.map((item) => (
                <option key={item._id} value={item.sourceName}>
                  {item.sourceName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="callingPurpose">
            <Form.Label>Calling Purpose</Form.Label>
            <Form.Control
              name="callingPurpose"
              type="text"
              placeholder="Calling Purpose"
              value={formData.callingPurpose ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="allocatedCRE">
            <Form.Label>Allocated CRE</Form.Label>
            <Form.Control
              name="allocatedCRE"
              type="text"
              placeholder="Allocated CRE"
              value={formData.allocatedCRE ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group controlId="remark">
            <Form.Label>Remark</Form.Label>
            <Form.Control
              name="remark"
              as="textarea"
              rows={2}
              placeholder="Remark"
              value={formData.remark ?? ""}
              onChange={handleChange}
              size="sm"
            />
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit" className="btn btn-primary">
        {isEdit && clientData?._id ? "Update" : "Create"}
      </Button>
    </Form>
  );
};

export default PersonalDetailsForm;