"use client";

import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import AlertMessage from "@/components/AlertMessage/AlertMessage";

const CreateProduct = ({ formData, setFormData, handleAdd, alert }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.cab_number.trim()) newErrors.cab_number = "Cab number is required";
    if (!formData.cab_name.trim()) newErrors.cab_name = "Cab name is required";
    if (!formData.cab_type) newErrors.cab_type = "Cab type is required";
    if (!formData.price_per_km || formData.price_per_km <= 0) newErrors.price_per_km = "Valid price per km is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    
    if (!validateForm()) return;
    
    try {
      handleAdd(formData);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };
  return (
    <>
      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={12} xxl={12}>
            <Card className="bg-white border-0 rounded-3 mb-4">
              <Card.Body className="p-4">
                <h3 className="mb-3">Add a Cab</h3>

                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-secondary">Cab Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="cab_number"
                        value={formData.cab_number}
                        onChange={handleChange}
                        placeholder="Enter cab number"
                        isInvalid={!!errors.cab_number}
                      />
                      <Form.Control.Feedback type="invalid">{errors.cab_number}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-secondary">Cab Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="cab_name"
                        value={formData.cab_name}
                        onChange={handleChange}
                        placeholder="Enter cab name"
                        isInvalid={!!errors.cab_name}
                      />
                      <Form.Control.Feedback type="invalid">{errors.cab_name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-secondary">Cab Type</Form.Label>
                      <Form.Select
                        name="cab_type"
                        value={formData.cab_type}
                        onChange={handleChange}
                        isInvalid={!!errors.cab_type}
                      >
                        <option value="">Select Cab Type</option>
                        <option value="SUV">SUV</option>
                        <option value="SEDAN">SEDAN</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.cab_type}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-secondary">Price per Kilometer</Form.Label>
                      <Form.Control
                        type="number"
                        name="price_per_km"
                        value={formData.price_per_km}
                        onChange={handleChange}
                        placeholder="Enter price per km"
                        isInvalid={!!errors.price_per_km}
                      />
                      <Form.Control.Feedback type="invalid">{errors.price_per_km}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={6} lg={6}>
        <Form.Group className="mb-4">
          <label className="label text-secondary">Profile Picture</label>
          <Form.Control
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="h-55"
            isInvalid={!!errors.photo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.photo}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-secondary">Availability</Form.Label>
                      <Form.Check
                        type="checkbox"
                        name="is_available"
                        label="Available"
                        checked={formData.is_available}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="primary" className="mt-3">
                  Add Cab
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateProduct;
