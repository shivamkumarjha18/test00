// import { Form, Col, Row } from "react-bootstrap";
// import FileUpload from "../../FileUpload";

// const ProposedPlan = ({
//   data,
//   onFieldChange,
//   onUpload,
//   memberOptions
// }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onFieldChange(name, value);
//   };

//   return (
//     <div className="mt-4">
//       <h5>Proposed Financial Plan</h5>
//       <Row className="g-3">
//         <Col xs={12} md={4} lg={2}>
//           <Form.Group>
//             <Form.Label>Created Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="date"
//               value={data.date || ""}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={12} md={4} lg={2}>
//           <Form.Group>
//             <Form.Label>Member Name</Form.Label>
//             <Form.Select
//               name="memberName"
//               value={data.memberName || ""}
//               onChange={handleChange}
//             >
//               <option value="">Select Member</option>
//               {memberOptions.map((member, i) => (
//                 <option key={i} value={member.name}>
//                   {member.name} ({member.relation})
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>
//         <Col xs={12} md={4} lg={2}>
//           <Form.Group>
//             <Form.Label>Financial Product</Form.Label>
//             <Form.Control
//               type="text"
//               name="financialProduct"
//               placeholder="Financial Product"
//               value={data.financialProduct || ""}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={12} md={6} lg={2}>
//           <Form.Group>
//             <Form.Label>Financial Company</Form.Label>
//             <Form.Control
//               type="text"
//               name="company"
//               placeholder="Company"
//               value={data.company || ""}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={12} md={6} lg={2}>
//           <Form.Group>
//             <Form.Label>Plan Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="planName"
//               placeholder="Plan Name"
//               value={data.planName || ""}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={12} md={6} lg={2}>
//           <Form.Group>
//             <Form.Label>Upload Document</Form.Label>
//             <FileUpload
//               name="proposedPlan"
//               onUpload={onUpload}
//             />
//           </Form.Group>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ProposedPlan;   
import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FileUpload from "../../FileUpload";

const emptyPlan = {
  date: "",
  memberName: "",
  financialProduct: "",
  company: "",
  planName: "",
  upload: [],
};

const ProposedPlan = ({ plans, onPlansChange, memberOptions }) => {
  // add
  const addPlan = () => onPlansChange([...plans, { ...emptyPlan }]);

  // remove
  const removePlan = (idx) =>
    onPlansChange(plans.filter((_, i) => i !== idx));

  // field change
  const handleField = (idx, name, value) => {
    const updated = [...plans];
    updated[idx][name] = value;
    onPlansChange(updated);
  };

  // file upload
  const handleUpload = (idx, urls) => {
    const updated = [...plans];
    updated[idx].upload = Array.isArray(urls) ? urls : [urls];
    onPlansChange(updated);
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Proposed Financial Plan</h5>
        <Button variant="success" onClick={addPlan}>
          + Add Plan
        </Button>
      </div>

      {plans && plans?.map((plan, idx) => (
        <div key={idx} className="border rounded p-3 mb-3">
          <Row className="g-3 align-items-end">
            <Col xs={12} md={3} lg={2}>
              <Form.Group>
                <Form.Label>Created Date</Form.Label>
                <Form.Control
                  type="date"
                  value={plan.date}
                  onChange={(e) => handleField(idx, "date", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={3} lg={2}>
              <Form.Label>Member Name</Form.Label>
              <Form.Select
                value={plan.memberName}
                onChange={(e) =>
                  handleField(idx, "memberName", e.target.value)
                }
              >
                <option value="">Select Member</option>
                {memberOptions.map((m, i) => (
                  <option key={i} value={m.name}>
                    {m.name} ({m.relation})
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} md={3} lg={2}>
              <Form.Label>Financial Product</Form.Label>
              <Form.Control
                placeholder="Product"
                value={plan.financialProduct}
                onChange={(e) =>
                  handleField(idx, "financialProduct", e.target.value)
                }
              />
            </Col>

            <Col xs={12} md={3} lg={2}>
              <Form.Label>Company</Form.Label>
              <Form.Control
                placeholder="Company"
                value={plan.company}
                onChange={(e) => handleField(idx, "company", e.target.value)}
              />
            </Col>

            <Col xs={12} md={3} lg={2}>
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                placeholder="Plan Name"
                value={plan.planName}
                onChange={(e) => handleField(idx, "planName", e.target.value)}
              />
            </Col>

            <Col xs={12} md={3} lg={2}>
              <Form.Label>Upload Document</Form.Label>
              <FileUpload
                onUpload={(urls) => handleUpload(idx, urls)}
              />
            </Col>

            <Col xs={12} md="auto" className="text-end">
              <Button
                variant="danger"
                size="sm"
                onClick={() => removePlan(idx)}
              >
                Remove
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default ProposedPlan;