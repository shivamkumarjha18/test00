

// import React, { useEffect, useState } from "react";
// import { Button, Modal, Form, Table, Image, Toast } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { createKyc, deleteKyc, fetchKycsByClient, updateKyc } from "../../../redux/feature/ClientRedux/KycThunx";
// import { toast } from "react-toastify";

// const KYCComponent = ({ id }) => {
//   console.log("Client ID received", id);
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);
//   const [kycData, setKycData] = useState([]);
//   const [form, setForm] = useState({
//     clientId: id,
//     memberName: "",
//     documentName: "",
//     documentNumber: "",
//     remark: "",
//     document: null,
//   });
//   const [preview, setPreview] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const data = useSelector((state) => state?.Kyc?.kycData);
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [activeImage, setActiveImage] = useState(null);

//   // Helper function to format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   useEffect(() => {
//     if (data) {
//       setKycData(data);
//       console.log("Total KYCs", kycData);
//     }
//   }, [data]);

//   useEffect(() => {
//     dispatch(fetchKycsByClient(id));
//   }, [dispatch, id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     const newValue =
//       type === "checkbox"
//         ? checked
//         : type === "file"
//           ? files[0]
//           : value;

//     setForm({ ...form, [name]: newValue });

//     if (type === "file" && files[0]) {
//       setPreview(URL.createObjectURL(files[0]));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('memberName', form.memberName);
//     formData.append('documentName', form.documentName);
//     formData.append('documentNumber', form.documentNumber);
//     formData.append('remark', form.remark);
//     formData.append('document', form.document);

//     dispatch(createKyc({ clientId: form.clientId, formData }))
//       .unwrap()
//       .then(() => {
//         const newEntry = {
//           ...form,
//           createdOn: new Date().toLocaleDateString("en-GB"),
//           previewUrl: preview,
//         };

//         setKycData([...kycData, newEntry]);
//         setForm({
//           clientId: id,
//           memberName: "",
//           documentName: "",
//           documentNumber: "",
//           remark: "",
//           document: null,
//         });
//         setPreview(null);
//         setShowModal(false);
//         dispatch(fetchKycsByClient(id));
//         toast.success("KYC created successfully.");
//       })
//       .catch((error) => {
//         console.error('Error creating KYC:', error);
//       });
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("memberName", form.memberName);
//     formData.append("documentName", form.documentName);
//     formData.append("documentNumber", form.documentNumber);
//     formData.append("remark", form.remark);

//     // Only append new document if uploaded
//     if (form.document) {
//       formData.append("document", form.document);
//     }

//     dispatch(updateKyc({ id: editId, formData }))
//       .unwrap()
//       .then(() => {
//         toast.success("KYC updated successfully.");
//         setForm({
//           clientId: id,
//           memberName: "",
//           documentName: "",
//           documentNumber: "",
//           remark: "",
//           document: null,
//         });
//         setPreview(null);
//         setShowModal(false);
//         setEditMode(false);
//         setEditId(null);
//         dispatch(fetchKycsByClient(id));
//       })
//       .catch((error) => {
//         console.error("Error updating KYC:", error);
//         toast.error("Failed to update KYC.");
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <Button variant="primary" onClick={() => setShowModal(true)}>
//         + Add KYC
//       </Button>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editMode ? 'Edit KYC Document' : 'Add KYC Document'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={editMode ? handleEditSubmit : handleSubmit}>
//             <Form.Group>
//               <Form.Label>Member Name</Form.Label>
//               <Form.Select
//                 name="memberName"
//                 value={form.memberName}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Member</option>
//                 <option>VINOD</option>
//                 <option>Priti</option>
//                 <option>abhay</option>
//                 <option>anaya</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mt-2">
//               <Form.Label>Document Name</Form.Label>
//               <Form.Select
//                 name="documentName"
//                 value={form.documentName}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Document</option>
//                 {[
//                   "Registration form",
//                   "Rough data sheet",
//                   "School certificate",
//                   "Aadhar Card",
//                   "Pan Card",
//                   "Photo",
//                   "Driving License",
//                   "Voter Id",
//                   "Policy Status"
//                 ].map((doc, index) => (
//                   <option key={index} value={doc}>
//                     {doc}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mt-2">
//               <Form.Label>Document No</Form.Label>
//               <Form.Control
//                 name="documentNumber"
//                 value={form.documentNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mt-2">
//               <Form.Label>Remark.</Form.Label>
//               <Form.Control
//                 name="remark"
//                 value={form.remark}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mt-2">
//               <Form.Label>Select File</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="document"
//                 onChange={handleChange}
//                  required
//               />

//               {preview && (
//                 <div className="mt-2">
//                   <Image
//                     src={preview}
//                     alt="Preview"
//                     thumbnail
//                     style={{ maxHeight: 150 }}
//                   />
//                 </div>
//               )}
//             </Form.Group>

//             <div className="d-flex justify-content-end mt-3">
//               <Button type="submit" variant="success">
//                 {editMode ? 'Update' : 'OK'}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Submitted KYC Table */}

//       <Table striped bordered hover responsive className="mt-4">
//         <thead className=" text-center">
//           <tr>
//             <th>Member Name</th>
//             <th>Document Name</th>
//             <th>Document No</th>
//             <th>Submission Date</th>
//             <th>Preview</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {kycData && kycData.map((item, index) => (
//             <tr key={index} className="align-middle text-center">
//               <td>{item?.memberName}</td>
//               <td>{item?.documentName}</td>
//               <td>{item?.documentNumber}</td>
//               <td>{formatDate(item?.createdAt)}</td>
//               <td>
//                 {item?.fileUrl && (
//                   <Image
//                     src={item.fileUrl}
//                     alt="thumb"
//                     thumbnail
//                     width={60}
//                     height={40}
//                     style={{ objectFit: "cover", cursor: "pointer" }}
//                     onClick={() => {
//                       setActiveImage(item.fileUrl);
//                       setShowPreviewModal(true);
//                     }}
//                   />
//                 )}
//               </td>
//               <td>
//                 <div className="d-flex gap-2 justify-content-center">
//                   <Button
//                     variant="outline-primary"
//                     size="sm"
//                     onClick={() => {
//                       setForm({
//                         clientId: id,
//                         memberName: item?.memberName,
//                         documentName: item?.documentName,
//                         documentNumber: item?.documentNumber,
//                         remark: item?.remark,
//                         document: null,
//                       });
//                       setPreview(item?.fileUrl);
//                       setEditMode(true);
//                       setEditId(item?._id);
//                       setShowModal(true);
//                     }}
//                   >
//                     Edit
//                   </Button>

//                   <Button
//                     variant="outline-danger"
//                     size="sm"
//                     onClick={() => {
//                       if (window.confirm("Are you sure you want to delete this document?")) {
//                         dispatch(deleteKyc(item._id))
//                           .unwrap()
//                           .then(() => {
//                             toast.success("KYC deleted successfully.");
//                             dispatch(fetchKycsByClient(id));
//                           })
//                           .catch((error) => {
//                             console.error('Error deleting KYC:', error);
//                             toast.error("Failed to delete KYC.");
//                           });
//                       }
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Image Preview Modal */}
//       <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)} centered size="lg">
//         <Modal.Header closeButton />
//         <Modal.Body className="text-center">
//           {activeImage && (
//             <Image
//               src={activeImage}
//               alt="Preview"
//               fluid
//               style={{ maxHeight: "80vh", objectFit: "contain" }}
//             />
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default KYCComponent;





import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table, Image, Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createKyc, deleteKyc, fetchKycsByClient, updateKyc } from "../../../redux/feature/ClientRedux/KycThunx";
import { toast } from "react-toastify";

const KYCComponent = ({ id, familyMembers }) => {
  console.log("Client ID received", id);
  console.log("family memebers", familyMembers)
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [kycData, setKycData] = useState([]);
  const [form, setForm] = useState({
    clientId: id,
    memberName: "",
    documentName: "",
    documentNumber: "",
    remark: "",
    document: null,
  });
  const [preview, setPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const data = useSelector((state) => state?.Kyc?.kycData);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Helper function to download image
  const downloadImage = (imageUrl, fileName) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'document';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Download failed:', error);
        toast.error('Failed to download document');
      });
  };

  useEffect(() => {
    if (data) {
      setKycData(data);
      console.log("Total KYCs", kycData);
    }
  }, [data]);

  useEffect(() => {
    dispatch(fetchKycsByClient(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "file"
          ? files[0]
          : value;

    setForm({ ...form, [name]: newValue });

    if (type === "file" && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('memberName', form.memberName);
    formData.append('documentName', form.documentName);
    formData.append('documentNumber', form.documentNumber);
    formData.append('remark', form.remark);
    formData.append('document', form.document);

    dispatch(createKyc({ clientId: form.clientId, formData }))
      .unwrap()
      .then(() => {
        const newEntry = {
          ...form,
          createdOn: new Date().toLocaleDateString("en-GB"),
          previewUrl: preview,
        };

        setKycData([...kycData, newEntry]);
        setForm({
          clientId: id,
          memberName: "",
          documentName: "",
          documentNumber: "",
          remark: "",
          document: null,
        });
        setPreview(null);
        setShowModal(false);
        dispatch(fetchKycsByClient(id));
        toast.success("KYC created successfully.");
      })
      .catch((error) => {
        console.error('Error creating KYC:', error);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("memberName", form.memberName);
    formData.append("documentName", form.documentName);
    formData.append("documentNumber", form.documentNumber);
    formData.append("remark", form.remark);

    // Only append new document if uploaded
    if (form.document) {
      formData.append("document", form.document);
    }

    dispatch(updateKyc({ id: editId, formData }))
      .unwrap()
      .then(() => {
        toast.success("KYC updated successfully.");
        setForm({
          clientId: id,
          memberName: "",
          documentName: "",
          documentNumber: "",
          remark: "",
          document: null,
        });
        setPreview(null);
        setShowModal(false);
        setEditMode(false);
        setEditId(null);
        dispatch(fetchKycsByClient(id));
      })
      .catch((error) => {
        console.error("Error updating KYC:", error);
        toast.error("Failed to update KYC.");
      });
  };

  return (
    <div className="container mt-4">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        + Add KYC
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit KYC Document' : 'Add KYC Document'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editMode ? handleEditSubmit : handleSubmit}>
            <Form.Group>
              <Form.Label>Member Name</Form.Label>
              <Form.Select
                name="memberName"
                value={form.memberName}
                onChange={handleChange}
                required={!editMode}
              >
                <option value="">Select Member</option>
                {
                  familyMembers?.map((member)=>{
                    return <option>{member?.name}</option>
                  })
                }
                {/* <option>VINOD</option>
                <option>Priti</option>
                <option>abhay</option>
                <option>anaya</option> */}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Document Name</Form.Label>
              <Form.Select
                name="documentName"
                value={form.documentName}
                onChange={handleChange}
                required={!editMode}
              >
                <option value="">Select Document</option>
                {[
                  "Registration form",
                  "Rough data sheet",
                  "School certificate",
                  "Aadhar Card",
                  "Pan Card",
                  "Photo",
                  "Driving License",
                  "Voter Id",
                  "Policy Status"
                ].map((doc, index) => (
                  <option key={index} value={doc}>
                    {doc}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Document No</Form.Label>
              <Form.Control
                name="documentNumber"
                value={form.documentNumber}
                onChange={handleChange}
                required={!editMode}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Remark.</Form.Label>
              <Form.Control
                name="remark"
                value={form.remark}
                onChange={handleChange}
                required={!editMode}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Select File</Form.Label>
              <Form.Control
                type="file"
                name="document"
                onChange={handleChange}
                required={!editMode}
              />

              {preview && (
                <div className="mt-2">
                  <Image
                    src={preview}
                    alt="Preview"
                    thumbnail
                    style={{ maxHeight: 150 }}
                  />
                </div>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button type="submit" variant="success">
                {editMode ? 'Update' : 'OK'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Submitted KYC Table */}

      <Table striped bordered hover responsive className="mt-4">
        <thead className=" text-center">
          <tr>
            <th>Member Name</th>
            <th>Document Name</th>
            <th>Document No</th>
            <th>Submission Date</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {kycData && kycData.map((item, index) => (
            <tr key={index} className="align-middle text-center">
              <td>{item?.memberName}</td>
              <td>{item?.documentName}</td>
              <td>{item?.documentNumber}</td>
              <td>{formatDate(item?.createdAt)}</td>
              <td>
                {item?.fileUrl && (
                  <Image
                    src={item.fileUrl}
                    alt="thumb"
                    thumbnail
                    width={60}
                    height={40}
                    style={{ objectFit: "cover", cursor: "pointer" }}
                    onClick={() => {
                      setActiveImage(item.fileUrl);
                      setShowPreviewModal(true);
                    }}
                  />
                )}
              </td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setForm({
                        clientId: id,
                        memberName: item?.memberName,
                        documentName: item?.documentName,
                        documentNumber: item?.documentNumber,
                        remark: item?.remark,
                        document: null,
                      });
                      setPreview(item?.fileUrl);
                      setEditMode(true);
                      setEditId(item?._id);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this document?")) {
                        dispatch(deleteKyc(item._id))
                          .unwrap()
                          .then(() => {
                            toast.success("KYC deleted successfully.");
                            dispatch(fetchKycsByClient(id));
                          })
                          .catch((error) => {
                            console.error('Error deleting KYC:', error);
                            toast.error("Failed to delete KYC.");
                          });
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Image Preview Modal */}
      <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Document Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {activeImage && (
            <div>
              <Image
                src={activeImage}
                alt="Preview"
                fluid
                style={{ maxHeight: "80vh", objectFit: "contain" }}
              />
              <div className="mt-3">
                <Button
                  variant="primary"
                  onClick={() => downloadImage(activeImage, 'document')}
                >
                  Download Document
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default KYCComponent;