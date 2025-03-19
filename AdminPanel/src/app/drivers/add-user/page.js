"use client";

import { Breadcrumb } from "react-bootstrap";
import AddUser from "@/components/Users/AddUser";
import { addDriverAdmin } from "@/urls/urls";
import useAxios from "@/network/useAxios";
import { useState,useEffect } from "react";
import AlertMessage from '@/components/AlertMessage/AlertMessage';
import { useRouter } from "next/navigation";

export default function Page() {
  const route = useRouter()
  const [alert, setAlert] = useState({ message: "", variant: "" });
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone_number: "",
      password: "",
      aadhaar_number: "",
      license_number: "",
      photo:null
    });
  
  const [
    bookingResponse,
    bookingError,
    bookingLoading,
    bookingFetch,
  ] = useAxios();

    const handleAdd = (formData) => {
      console.log(formData)
      bookingFetch(addDriverAdmin(formData));
    };

    useEffect(()=>{
      if(bookingResponse['result']=='success'){
        setAlert({message:'Driver Added Succesfully.',variant:'success'})
        route.push("/drivers/")
        
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
      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />

      <AddUser formData={formData} setFormData={setFormData} handleAdd={handleAdd} bookingLoading={bookingLoading}/>
    </>
  );
}
