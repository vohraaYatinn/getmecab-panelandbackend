import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import useAxios from "@/network/useAxios";
import { driverUpdateSubmitService } from "@/urls/urls";
import ActionSheet from "@/components/ActionSheet/ActionSheet";

const EditUserModal = ({ show, handleClose, selectedRecord, handleUpdate,actionResponse,actionLoading,actionSubmit }) => {
  const [formData, setFormData] = useState(selectedRecord);
  const [errors, setErrors] = useState({});
  console.log(selectedRecord)

  const driverUpdateSubmit = () => {
    actionSubmit(driverUpdateSubmitService(formData));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(()=>{
if(actionResponse['result'] == 'success'){
  handleClose()
}
  },[actionResponse])

  useEffect(() => {
    if (selectedRecord) {
      setFormData(selectedRecord);
    }
  }, [selectedRecord]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData.email))
      tempErrors.email = "Invalid email format.";
    if (!formData.phone_number) tempErrors.phone_number = "Phone number is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              isInvalid={!!errors.phone_number}
            />
            <Form.Control.Feedback type="invalid">{errors.phone_number}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Aadhaar Number</Form.Label>
            <Form.Control
              type="text"
              name="aadhaar_number"
              value={formData.aadhaar_number}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>License Number</Form.Label>
            <Form.Control
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button disabled={actionLoading} variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" disabled={actionLoading} className="ms-2" onClick={() => setIsModalOpen(true)}>Save Changes</Button>
          </div>
        </Form>
      </Modal.Body>
      <ActionSheet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={driverUpdateSubmit}
                title="Edit Driver"
                message="Are you sure you want to edit driver detail?"
            />
    </Modal>
    
  );
};

export default EditUserModal;
