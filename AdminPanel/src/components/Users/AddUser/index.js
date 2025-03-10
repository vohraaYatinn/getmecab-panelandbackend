"use client";
import React, { useState } from "react";

import { Row, Col, Card, Form } from "react-bootstrap";

const AddUser = ({formData, setFormData, handleAdd}) => {


  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData.email))
      tempErrors.email = "Invalid email format.";
    if (!formData.phone_number) tempErrors.phone_number = "Phone number is required.";
    if (!formData.password) tempErrors.password = "Password is required.";
    if (!formData.aadhaar_number) tempErrors.aadhaar_number = "Aadhar is required.";
    if (!formData.license_number) tempErrors.license_number = "License is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = () => {
    if (validate()) {
      try {
        console.log(formData)
        handleAdd(formData)
        // const response = await axios.post("/api/driver-onboarding/", formData);
        // alert("Driver onboarded successfully!");
      } catch (error) {
        console.error(error);
        // alert("Error onboarding driver. Ensure email and phone number are unique.");
      }
    }
  };


  return (
    <>
      <Form>
        <Row>



        <Col lg={12}>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <Form >
            <Row>
              <Col sm={6} lg={6}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Name</label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-55"
                    placeholder="Enter name"
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={6} lg={6}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Email</label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-55"
                    placeholder="Enter email address"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={6} lg={6}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Phone Number</label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="h-55"
                    placeholder="Enter phone number"
                    isInvalid={!!errors.phone_number}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone_number}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={6} lg={6}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Password</label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-55"
                    placeholder="Enter password"
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={6} lg={6}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">aadhaar Card</label>
                  <Form.Control
                    type="text"
                    name="aadhaar_number"
                    value={formData.aadhaar_number}
                    onChange={handleChange}
                    className="h-55"
                    placeholder="Enter aadhaar number"
                    isInvalid={!!errors.aadhaar_number}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.aadhaar_number}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={6} lg={6}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">License Number</label>
                  <Form.Control
                    type="text"
                    name="license_number"sda
                    value={formData.license_number}
                    onChange={handleChange}
                    className="h-55"
                    placeholder="Enter license doc"
                    isInvalid={!!errors.license_number}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.license_number}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={12} lg={12}>
                <div className="d-flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white"
                    onClick={() => setFormData({ name: "", email: "", phone_number: "", password: "" })}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary py-2 px-4 fw-medium fs-16"
                    onClick={(e)=>{
                      e.preventDefault()
                      handleSubmit()
                    }}
                  >
                    Add Driver
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Col>




        </Row>
      </Form>
    </>
  );
};

export default AddUser;
