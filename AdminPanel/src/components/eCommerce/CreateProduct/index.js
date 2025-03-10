"use client";

import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";

const CreateProduct = ({formData, setFormData, handleAdd}) => {

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit =  () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      console.log(formData)
      handleAdd(formData)
      // const response = await axios.post("YOUR_API_ENDPOINT/add-cab/", formData, {
      //   headers: {
      //     Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
      //   },
      // });

      // if (response.status === 201) {
      //   setSuccessMessage("Cab added successfully!");
      //   setFormData({
      //     cab_number: "",
      //     cab_name: "",
      //     cab_type: "SUV",
      //     price_per_km: "",
      //     is_available: true,
      //   });
      // }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
  <Form>
  <Row >
      <Col lg={12} xxl={12}>
        <Card className="bg-white border-0 rounded-3 mb-4">
          <Card.Body className="p-4">
            <h3 className="mb-3">Add a Cab</h3>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form>
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
                      required
                    />
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
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">Cab Type</Form.Label>
                    <Form.Select
                      name="cab_type"
                      value={formData.cab_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="SUV">SUV</option>
                      <option value="SEDAN">SEDAN</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">
                      Price per Kilometer
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="price_per_km"
                      value={formData.price_per_km}
                      onChange={handleChange}
                      placeholder="Enter price per km"
                      required
                    />
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

              <Button onClick={(e)=>{
                e.preventDefault()
                handleSubmit()
              }} variant="primary" className="mt-3">
                Add Cab
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Form>
    </>
  );
};

export default CreateProduct;
