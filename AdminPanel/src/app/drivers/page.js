"use client";

import { Breadcrumb } from "react-bootstrap";
import TeamMembers from "@/components/Users/TeamMembers";
import { useState } from "react";
import useAxios from "@/network/useAxios";
import { getDriversAdmin,deleteDriver } from "@/urls/urls";
import { useEffect } from "react";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
export default function Page() {
    
  const [data, setData] = useState([])
  const [selectId,setSelectId] = useState(null)
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [
    driversResponse,
    driversError,
    driversLoading,
    driversFetch,
  ] = useAxios();
  const [
    actionResponse,
    actionError,
    actionLoading,
    actionSubmit,
  ] = useAxios();


useEffect(()=>{
if (selectId){
actionSubmit(deleteDriver({id:selectId}))
setSelectId(null)
}
},[selectId])

  const fetchActivityByIdfunction = () => {
    driversFetch(getDriversAdmin({}));
  };
useEffect(()=>{
  fetchActivityByIdfunction()
},[])
useEffect(()=>{
  if(actionResponse?.result == "success" ){
   fetchActivityByIdfunction()
     setAlert({ message: actionResponse?.result, variant: "success" });
  }
},[actionResponse])


useEffect(()=>{
  if(driversResponse?.result == "success" ||actionResponse?.result == "success" ){
    setData(driversResponse?.data)
    console.log(driversResponse?.data)
  }
},[driversResponse])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Drivers Team</h3>
 
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

 
          <Breadcrumb.Item active>
            <span className="fw-medium">Drivers</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
      <TeamMembers data={data} setSelectId={setSelectId} 
       actionResponse={actionResponse} actionLoading={actionLoading}
       actionSubmit = {actionSubmit}
       />
    </>
  );
}
