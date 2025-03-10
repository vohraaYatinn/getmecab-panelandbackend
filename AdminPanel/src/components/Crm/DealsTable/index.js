"use client";

import React, { useState } from "react";
import { Card, Form, Table, Button, Row, Col } from "react-bootstrap";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import useAxios from "@/network/useAxios";
import { addCouponAdmin } from "@/urls/urls";


const DealsTable = ({data, bookingFetch, deleteCoupon}) => {

  const [formData, setFormData] = useState({
    code: "",
    discount_percentage: "",
    max_discount_amount: "",
    valid_from: "",
    valid_until: "",
    is_active: true,
    usage_limit: "",
  });



  const handleAdd = (formData) => {
    bookingFetch(addCouponAdmin(formData));
    handleToggleShowModal()
  };
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Coupon code is required.";
    if (!formData.discount_percentage || formData.discount_percentage <= 0 || formData.discount_percentage > 100)
      newErrors.discount_percentage = "Enter a valid discount percentage (1-100).";
    if (!formData.max_discount_amount || formData.max_discount_amount <= 0)
      newErrors.max_discount_amount = "Enter a valid maximum discount amount.";
    if (!formData.valid_from) newErrors.valid_from = "Start date is required.";
    if (!formData.valid_until) newErrors.valid_until = "Expiry date is required.";
    if (new Date(formData.valid_from) >= new Date(formData.valid_until))
      newErrors.valid_until = "Expiry date must be later than the start date.";
    if (!formData.usage_limit || formData.usage_limit <= 0)
      newErrors.usage_limit = "Enter a valid usage limit.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      console.log(formData)
      handleAdd(formData)
      // const response = await axios.post("YOUR_API_ENDPOINT/add-coupon/", formData, {
      //   headers: {
      //     Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
      //   },
      // });

      // if (response.status === 201) {
      //   setSuccessMessage("Coupon added successfully!");
      //   setFormData({
      //     code: "",
      //     discount_percentage: "",
      //     max_discount_amount: "",
      //     valid_from: "",
      //     valid_until: "",
      //     is_active: true,
      //     usage_limit: "",
      //   });
      //   setErrors({});
      // }
      
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };


  // Modal
  const [isShowModal, setShowModal] = useState("false");
  const handleToggleShowModal = () => {
    setShowModal(!isShowModal);
  };

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-4">
            <SearchForm />

            <div className="text-end">
              <button
                className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
                onClick={handleToggleShowModal}
              >
                <span className="py-sm-1 d-block">
                  <i className="ri-add-line"></i>
                  <span>Add New Coupon</span>
                </span>
              </button>
            </div>
          </div>

          <div className="default-table-area style-two default-table-width deals-table">
      <div className="table-responsive">
        <Table className="align-middle">
          <thead>
            <tr>
              <th scope="col">
                <Form>
                  <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    label="ID"
                  />
                </Form>
              </th>
              <th scope="col">Code</th>
              <th scope="col">Discount (%)</th>
              <th scope="col">Max Discount</th>
              <th scope="col">Valid From</th>
              <th scope="col">Valid Until</th>
              <th scope="col">Is Active</th>
              <th scope="col">Usage Limit</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Form>
                      <Form.Check
                        type="checkbox"
                        id={`checkbox-${item.id}`}
                        label={item.id}
                      />
                    </Form>
                  </td>
                  <td>{item.code}</td>
                  <td>{item.discount_percentage}</td>
                  <td>{item.max_discount_amount}</td>
                  <td>{new Date(item.valid_from).toLocaleDateString()}</td>
                  <td>{new Date(item.valid_until).toLocaleDateString()}</td>
                  <td>{item.is_active ? "Yes" : "No"}</td>
                  <td>{item.usage_limit}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
               
                      <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                      onClick={()=>{
                        deleteCoupon(item.id)
                      }}
                      >
                        <span className="material-symbols-outlined fs-16 text-danger">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <div className={`custom-modal right ${isShowModal ? "" : "show"}`}>
        <div className="custom-modal-content position-relative z-3">
          <div className="border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
            <h3 className="fs-18 mb-0">Add New Coupon</h3>

            <div className="close-link" onClick={handleToggleShowModal}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>

          <div className="p-4">
          <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">Coupon Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="Enter coupon code"
                      isInvalid={!!errors.code}
                    />
                    <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">Discount Percentage</Form.Label>
                    <Form.Control
                      type="number"
                      name="discount_percentage"
                      value={formData.discount_percentage}
                      onChange={handleChange}
                      placeholder="Enter discount percentage"
                      isInvalid={!!errors.discount_percentage}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.discount_percentage}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">Max Discount Amount</Form.Label>
                    <Form.Control
                      type="number"
                      name="max_discount_amount"
                      value={formData.max_discount_amount}
                      onChange={handleChange}
                      placeholder="Enter max discount amount"
                      isInvalid={!!errors.max_discount_amount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.max_discount_amount}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">Usage Limit</Form.Label>
                    <Form.Control
                      type="number"
                      name="usage_limit"
                      value={formData.usage_limit}
                      onChange={handleChange}
                      placeholder="Enter usage limit"
                      isInvalid={!!errors.usage_limit}
                    />
                    <Form.Control.Feedback type="invalid">{errors.usage_limit}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">Valid From</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="valid_from"
                      value={formData.valid_from}
                      onChange={handleChange}
                      isInvalid={!!errors.valid_from}
                    />
                    <Form.Control.Feedback type="invalid">{errors.valid_from}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary">Valid Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="valid_until"
                      value={formData.valid_until}
                      onChange={handleChange}
                      isInvalid={!!errors.valid_until}
                    />
                    <Form.Control.Feedback type="invalid">{errors.valid_until}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      name="is_active"
                      label="Is Active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="primary" className="mt-3">
                Add Coupon
              </Button>
            </Form>
          </div>
        </div>

        <div className="close-outside" onClick={handleToggleShowModal}></div>
      </div>
    </>
  );
};

export default DealsTable;
