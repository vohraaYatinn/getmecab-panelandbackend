"use client";

import { Modal, Button, Form } from "react-bootstrap";
import { cabUpdateSubmit } from "@/urls/urls";
import { useEffect } from "react";
import useAxios from "@/network/useAxios";
import ActionSheet from "@/components/ActionSheet/ActionSheet";
import { useState } from 'react';

export default function EditCab({ show, handleClose, formData, setFormData ,setAlert}) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [
    cabResponse,
    cabError,
    cabLoading,
    cabSubmit,
  ] = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    cabSubmit(cabUpdateSubmit(formData))
  };
  const actionConfirm = () =>{
    cabSubmit(cabUpdateSubmit(formData))
  }
  const handleSubmitModal = ()=>{
    setIsModalOpen(true)
  }
  useEffect(()=>{
if (cabResponse['result'] == 'success'){
  setAlert({ message: cabResponse['result'], variant: "success" });
handleClose()
}
  },[cabResponse])

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Cab</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitModal}>
          <Form.Group className="mb-3">
            <Form.Label>Cab Number</Form.Label>
            <Form.Control
              type="text"
              name="cab_number"
              value={formData.cab_number}
              onChange={handleChange}
              placeholder="Enter cab number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cab Name</Form.Label>
            <Form.Control
              type="text"
              name="cab_name"
              value={formData.cab_name}
              onChange={handleChange}
              placeholder="Enter cab name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cab Type</Form.Label>
            <Form.Select name="cab_type" value={formData.cab_type} onChange={handleChange}>
              <option value="SUV">SUV</option>
              <option value="SEDAN">Sedan</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price Per KM</Form.Label>
            <Form.Control
              type="number"
              name="price_per_km"
              value={formData.price_per_km}
              onChange={handleChange}
              placeholder="Enter price per KM"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check 
              type="checkbox"
              label="Available"
              name="is_available"
              checked={formData.is_available}
              onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button disabled={cabLoading} variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button disabled={cabLoading} variant="primary" type="submit">
              Edit Cab
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <ActionSheet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={actionConfirm}
                title="Edit Cab"
                message="Are you sure you want to edit cab detail?"
            />
    </Modal>
  );
}
