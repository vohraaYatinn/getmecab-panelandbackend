"use client";

import CreateProduct from '@/components/eCommerce/CreateProduct';
import useAxios from '@/network/useAxios';
import { addCabAdmin } from '@/urls/urls';
import { useEffect, useState } from 'react';
import { Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/navigation";
import AlertMessage from '@/components/AlertMessage/AlertMessage';

export default function Page() {
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const route = useRouter()
    const [formData, setFormData] = useState({
      cab_number: "",
      cab_name: "",
      cab_type: "SUV",
      price_per_km: "",
      is_available: true,
      photo:null
    });
    const [
      bookingResponse,
      bookingError,
      bookingLoading,
      bookingFetch,
    ] = useAxios();
  
      const handleAdd = (formData) => {
        bookingFetch(addCabAdmin(formData));
      };

useEffect(()=>{
if(bookingResponse['result']=='success'){
  setAlert({message:'Cab Added Succesfully.',variant:'success'})
  route.push("/cabs/manage-cabs")
  
}
},[bookingResponse])
      useEffect(()=>{
if(bookingError){
  setAlert({message:bookingError.response.data.error,variant:'danger'})
}
      },[bookingError])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Cab Management</h3>
 
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <span className="fw-medium">eCommerce</span>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>
            <span className="fw-medium">Create Product</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />

      <CreateProduct formData={formData} setFormData={setFormData} handleAdd={handleAdd} alert={alert}/>
    </>
  );
}
