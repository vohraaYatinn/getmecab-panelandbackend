"use client";

import { Breadcrumb } from "react-bootstrap";
import AddUser from "@/components/Users/AddUser";
import { addDriverAdmin } from "@/urls/urls";
import useAxios from "@/network/useAxios";
import { useState } from "react";

export default function Page() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone_number: "",
      password: "",
      aadhaar_number: "",
      license_number: ""
    });
  
  const [
    bookingResponse,
    bookingError,
    bookingLoading,
    bookingFetch,
  ] = useAxios();

    const handleAdd = (formData) => {
      bookingFetch(addDriverAdmin(formData));
    };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Add Driver</h3>
 
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>
            <span className="fw-medium">Add Driver</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div> 

      <AddUser formData={formData} setFormData={setFormData} handleAdd={handleAdd}/>
    </>
  );
}
