"use client";

import ProductsList from '@/components/eCommerce/ProductsList';
import useAxios from '@/network/useAxios';
import { getAllCabs } from '@/urls/urls';
import { useEffect } from 'react';
import { useState } from 'react';
import { Breadcrumb } from "react-bootstrap";
import AlertMessage from '@/components/AlertMessage/AlertMessage';

export default function Page() {
     
  const [data, setData] = useState([])
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [
    driversResponse,
    driversError,
    driversLoading,
    driversFetch,
  ] = useAxios();
  const [fetchNew,setFetchNew] = useState(true)
  const fetchActivityByIdfunction = () => {
    driversFetch(getAllCabs({}));
  };
useEffect(()=>{
  fetchActivityByIdfunction()
},[fetchNew])
useEffect(()=>{
  if(driversResponse?.result == "success"){
    setData(driversResponse?.data)
    console.log(driversResponse?.data)
    setFetchNew(false)
  }
},[driversResponse])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Products List</h3>
 
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>
            <span className="fw-medium">Manage Cabs</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
      <ProductsList data={data} setFetchNew={setFetchNew} setAlert={setAlert}/>
    </>
  );
}
