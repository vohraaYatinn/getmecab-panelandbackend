"use client";
  
import { Breadcrumb } from "react-bootstrap";
import DealsTable from '@/components/Crm/DealsTable';
import { useState } from "react";
import useAxios from "@/network/useAxios";
import { deleteCoupon, getAllCoupons } from "@/urls/urls";
import { useEffect } from "react";

export default function Page() {
  const [data, setData] = useState([])
  const [
    driversResponse,
    driversError,
    driversLoading,
    driversFetch,
  ] = useAxios();
  const [
    bookingResponse,
    bookingError,
    bookingLoading,
    bookingFetch,
  ] = useAxios();
  const [
    actionResponse,
    actionError,
    actionLoading,
    actionFetch,
  ] = useAxios();
  const fetchActivityByIdfunction = () => {
    driversFetch(getAllCoupons({}));
  };
  const deleteCouponFunc = (id) => {
    actionFetch(deleteCoupon({id:id}));
  };
useEffect(()=>{
  fetchActivityByIdfunction()
},[bookingResponse, actionResponse])
useEffect(()=>{
  if(driversResponse?.result == "success"){
    setData(driversResponse?.data)
    console.log(driversResponse?.data)
  }
},[driversResponse])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Deals</h3>
 
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>
            <span className="fw-medium">Coupons</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
  
      <DealsTable data={data} bookingFetch={bookingFetch} deleteCoupon={deleteCouponFunc}/>
    </>
  );
}
