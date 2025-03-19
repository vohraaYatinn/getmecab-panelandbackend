"use client";

import React, { useState, useEffect } from "react";
import { Card, Nav, Tab, Button, Modal, Form } from "react-bootstrap";
import VendorRequests from "./VendorRequests";
import VendorList from "./VendorList";
import useAxios from "@/network/useAxios";
import { createVendor, createVendorRequest } from "@/urls/urls";
import AlertMessage from "@/components/AlertMessage/AlertMessage";

import { Breadcrumb } from "react-bootstrap";

export default function Page() {
  const [activeTab, setActiveTab] = useState("requests");
  const [key, setKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [formData, setFormData] = useState({
    vendor_name: "",
    phone_number: "",
    email: "",
    company_name: "",
    pan_number: "",
    gst_number: ""
  });
  const [formErrors, setFormErrors] = useState({
    phone_number: "",
    email: ""
  });

  const [createResponse, createError, createLoading, createSubmit] = useAxios();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setKey(prevKey => prevKey + 1);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Please enter a valid 10-digit phone number starting with 6-9";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (name === 'phone_number' || name === 'email') {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before submission
    const phoneError = validatePhoneNumber(formData.phone_number);
    const emailError = validateEmail(formData.email);

    setFormErrors({
      phone_number: phoneError,
      email: emailError
    });

    // If there are any validation errors, don't submit
    if (phoneError || emailError) {
      return;
    }

    createSubmit(createVendorRequest(formData));
  };

  useEffect(() => {
    console.log(createResponse);
    if (createResponse && createResponse?.result === 'success') {
      setActiveTab('requests');
      setShowModal(false);
      setFormData({
        vendor_name: "",
        phone_number: "",
        email: "",
        company_name: "",
        pan_number: "",
        gst_number: ""
      });
      setFormErrors({
        phone_number: "",
        email: ""
      });
      setAlert({ message: "Vendor created successfully!", variant: "success" });
    }
  }, [createResponse]);

  useEffect(() => {
    console.log(createError);
    if (createError && createError?.response?.data?.result=='failure') {
      setAlert({ message: createError?.response?.data?.message || "Failed to create vendor", variant: "danger" });
    }
  }, [createError]);

  return (
    <>
      {!showModal && alert.message && (
        <AlertMessage
          message={alert.message}
          variant={alert.variant}
          onClose={() => setAlert({ message: "", variant: "" })}
        />
      )}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Vendor Management</h3>
       
       
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>
            <span className="fw-medium">Vendor Management</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
          <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
          <div className="row">
          <Button variant="primary" onClick={() => setShowModal(true)} className="border-0 rounded-0">
              Create Vendor
            </Button>
            <Nav variant="pills" className="border-bottom px-4">
             
              <Nav.Item>
                <Nav.Link eventKey="requests" className="border-0 rounded-0">
                  Vendor Requests
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="vendors" className="border-0 rounded-0">
                  Approved Vendors
                </Nav.Link>
              </Nav.Item>
            </Nav>

            </div>

            <Tab.Content>
              <Tab.Pane eventKey="requests" key={`requests-${key}`}>
                <VendorRequests activeTab={activeTab}/>
              </Tab.Pane>
              <Tab.Pane eventKey="vendors" key={`vendors-${key}`}>
                <VendorList activeTab={activeTab}/>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>

      {/* Create Vendor Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {alert.message && showModal && (
              <AlertMessage
                message={alert.message}
                variant={alert.variant}
                onClose={() => setAlert({ message: "", variant: "" })}
              />
            )}
            <Form.Group className="mb-3">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                name="vendor_name"
                value={formData.vendor_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                isInvalid={!!formErrors.phone_number}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone_number}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Enter a 10-digit phone number starting with 6-9
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!formErrors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PAN Number</Form.Label>
              <Form.Control
                type="text"
                name="pan_number"
                value={formData.pan_number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>GST Number</Form.Label>
              <Form.Control
                type="text"
                name="gst_number"
                value={formData.gst_number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={createLoading}
              >
                {createLoading ? "Creating..." : "Create Vendor"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>


    </>
  );
}
