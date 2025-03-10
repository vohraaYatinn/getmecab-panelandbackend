"use client";

import Reviews from '@/components/eCommerce/Reviews';
import useAxios from '@/network/useAxios';
import { getAllReviews } from '@/urls/urls';
import { useEffect } from 'react';
import { useState } from 'react';
import { Breadcrumb } from "react-bootstrap";

export default function Page() {
  
  const [data, setData] = useState([])
  const [
    driversResponse,
    driversError,
    driversLoading,
    driversFetch,
  ] = useAxios();
  const fetchActivityByIdfunction = () => {
    driversFetch(getAllReviews({}));
  };
useEffect(()=>{
  fetchActivityByIdfunction()
},[])
useEffect(()=>{
  if(driversResponse?.result == "success"){
    setData(driversResponse?.data)
    console.log(driversResponse?.data)
  }
},[driversResponse])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Reviews</h3>
 
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          
          <Breadcrumb.Item active>
            <span className="fw-medium">Reviews</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Reviews data={data}/>
    </>
  );
}
