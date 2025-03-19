"use client";
  
import { Row, Col, Breadcrumb } from "react-bootstrap";
import AnnualProfit from '@/components/Crm/AnnualProfit';
import RevenueGrowth from '@/components/Crm/RevenueGrowth';
import LeadConversion from '@/components/Crm/LeadConversion';
import TotalOrders from '@/components/Crm/TotalOrders';
import LeadsTable from '@/components/Crm/LeadsTable';
import useAxios from "@/network/useAxios";
import { deleteBooking, getBookingsAdmin, getBookingsAdminAnalytics,changeBookingStatus } from "@/urls/urls";
import { useEffect } from "react";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
export default function Page() {
  const [data, setData] = useState([])
  const [dataAnalytics, setDataAnalytics] = useState({})
  const [status, setStatus] = useState("");
  const [isChange,setIsChange] = useState(false)
  const [isDeleted,setIsDeleted] = useState(false)
   const [alert, setAlert] = useState({ message: "", variant: "" });
  const [
    bookingResponse,
    bookingError,
    bookingLoading,
    bookingFetch,
  ] = useAxios();
  const [
    AnalyticsbookingResponse,
    AnalyticsbookingError,
    AnalyticsbookingLoading,
    AnalyticsbookingFetch,
  ] = useAxios();
  const [
    ActionResponse,
    ActionRError,
    ActionRLoading,
    ActionRFetch,
  ] = useAxios();
  const [selected, setSelected] = useState(false)
  const fetchActivityByIdfunction = () => {
    bookingFetch(getBookingsAdmin({}));
  };
  const fetchActivityByIdAnalyticsfunction = () => {
    AnalyticsbookingFetch(getBookingsAdminAnalytics({}));
  };
  const deleteRequested = () => {
    ActionRFetch(deleteBooking({id:selected}));
    setIsDeleted(false)
    setSelected(null)
  };
  const changeStatus = () => {
if(selected && status && isChange)
    {
      ActionRFetch(changeBookingStatus({id:selected,status:status}));
      setSelected(null)
      setStatus(null)
      setIsChange(false)

}
  };

useEffect(()=>{
  if (isDeleted && selected){
    deleteRequested()


  }
  else if (isChange && status && selected){
changeStatus()
  }

},[status,selected,isChange,isDeleted])

useEffect(()=>{
  console.log(ActionResponse['result'])
if (ActionResponse['result'] == 'success')
{
  fetchActivityByIdfunction()
  fetchActivityByIdAnalyticsfunction()
  setAlert({ message: ActionResponse['result'], variant: "success" });

}
},[ActionResponse])

useEffect(()=>{
  fetchActivityByIdfunction()
  fetchActivityByIdAnalyticsfunction()
},[])
useEffect(()=>{

  if(bookingResponse?.result == "success"){
    console.log("from bookingResponse")
    console.log(bookingResponse,bookingResponse?.data)
    setData(bookingResponse)
    console.log(bookingResponse?.data)
  }
},[bookingResponse])
useEffect(()=>{
  if(AnalyticsbookingResponse?.result == "success"){
    setDataAnalytics(AnalyticsbookingResponse?.data)
    console.log(AnalyticsbookingResponse?.data)
  }
},[AnalyticsbookingResponse])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Manage Bookings</h3>
 
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>
            <span className="fw-medium">Bookings</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />

      <Row>
        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <RevenueGrowth dataAnalytics={dataAnalytics}/>
        </Col>

        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <LeadConversion dataAnalytics={dataAnalytics}/>
        </Col>

        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <TotalOrders dataAnalytics={dataAnalytics}/>
        </Col>

        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <AnnualProfit dataAnalytics={dataAnalytics}/>
        </Col>
      </Row> 

      <LeadsTable data={data} setSelected={setSelected} deleteRequested={deleteRequested}
      status={status} setStatus={setStatus} changeStatus={changeStatus} setIsChange={setIsChange}
      setIsDeleted={setIsDeleted} ActionResponse={ActionResponse}
      />
    </>
  );
}
