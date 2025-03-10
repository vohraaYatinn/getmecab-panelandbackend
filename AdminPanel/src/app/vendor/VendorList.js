"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import useAxios from '@/network/useAxios';
import { getVendors, createVendor } from '@/urls/urls';
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import Pagination from "@/components/Apps/Contacts/Pagination";
import ActionSheet from "@/components/ActionSheet/ActionSheet";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    vendor_name: '',
    phone_number: '',
    email: '',
    company_name: '',
    pan_number: '',
    gst_number: '',
    password: 'default_password123'
  });
  const itemsPerPage = 10;

  const [
    vendorsResponse,
    vendorsError,
    vendorsLoading,
    vendorsSubmit,
  ] = useAxios();

  const [
    createResponse,
    createError,
    createLoading,
    createSubmit,
  ] = useAxios();

  useEffect(() => {
    fetchVendors();
  }, [currentPage]);

  useEffect(() => {
    if (vendorsResponse?.result === 'success') {
      setVendors(vendorsResponse.data);
      setTotalItems(vendorsResponse.total || vendorsResponse.data.length);
      setTotalPages(Math.ceil((vendorsResponse.total || vendorsResponse.data.length) / itemsPerPage));
    }
  }, [vendorsResponse]);

  useEffect(() => {
    if (createResponse?.result === 'success') {
      setAlert({ message: createResponse.message, variant: "success" });
      setIsModalOpen(false);
      setFormData({
        vendor_name: '',
        phone_number: '',
        email: '',
        company_name: '',
        pan_number: '',
        gst_number: '',
        password: 'default_password123'
      });
      fetchVendors();
    }
  }, [createResponse]);

  const fetchVendors = () => {
    vendorsSubmit(getVendors({
      page: currentPage,
      page_size: itemsPerPage
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubmit(createVendor(formData));
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-4">
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create Vendor
        </Button>
      </div>

      <div className="default-table-area style-two default-table-width">
        <div className="table-responsive">
          <Table className="align-middle">
            <thead>
              <tr>
                <th scope="col">Vendor ID</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Company</th>
                <th scope="col">Contact</th>
                <th scope="col">PAN</th>
                <th scope="col">GST</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td>{vendor.vendor_id}</td>
                  <td>{vendor.vendor_request.vendor_name}</td>
                  <td>{vendor.vendor_request.company_name}</td>
                  <td>
                    {vendor.vendor_request.email}<br/>
                    {vendor.vendor_request.phone_number}
                  </td>
                  <td>{vendor.vendor_request.pan_number}</td>
                  <td>{vendor.vendor_request.gst_number}</td>
                  <td>
                    <span className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${vendor.vendor_request.status.toLowerCase()}`}>
                      {vendor.vendor_request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />

      <ActionSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        title="Create New Vendor"
      >
        <Form>
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
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
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
        </Form>
      </ActionSheet>

      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
    </>
  );
};

export default VendorList; 