"use client";
import { Row, Col } from "react-bootstrap";
import RevenueGrowth from "@/components/Dashboard/CRM/RevenueGrowth";
import LeadConversion from "@/components/Dashboard/CRM/LeadConversion";
import TotalOrders from "@/components/Dashboard/CRM/TotalOrders";
import AnnualProfit from "@/components/Dashboard/CRM/AnnualProfit";
import BalanceOverview from "@/components/Dashboard/CRM/BalanceOverview";
import LeadsBySource from "@/components/Dashboard/CRM/LeadsBySource";
import TopPerformer from "@/components/Dashboard/CRM/TopPerformer";
import RecentLeads from "@/components/Dashboard/CRM/RecentLeads";
import SalesReport from "@/components/Dashboard/CRM/SalesReport";
import TopProductsBySales from "@/components/Dashboard/CRM/TopProductsBySales";
import MapRounded from "@/components/Maps/MapRounded";
import useAxios from "@/network/useAxios";
import { getDashboardData } from "@/urls/urls";
import { useEffect } from "react";
import IdealDriver from "@/components/Dashboard/CRM/IdealDriver";
import TotalCab from "@/components/Dashboard/TotalCab";

export default function Page() {
  const[dashboardResponce,dashboardError,dashboardLoading,dashboardFetch]=useAxios()
useEffect(()=>{
  dashboardFetch(getDashboardData()) 
},[])
  return (
    <>
      <Row>
        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <RevenueGrowth data={dashboardResponce?.data?.bookingCompleted}/>
        </Col>

        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <LeadConversion data={dashboardResponce?.data?.bookingOngoing}/>
        </Col>

        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <TotalOrders data={dashboardResponce?.data?.total_driver}/>
        </Col>

        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <AnnualProfit data={dashboardResponce?.data?.ideal_driver}/>
        </Col>        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <TotalCab data={dashboardResponce?.data?.total_cab}/>
        </Col>
        <Col xs={12} sm={6} lg={6} xl={6} xxl={3}>
          <IdealDriver data={dashboardResponce?.data?.ideal_cab}/>
        </Col>
      </Row>



      <MapRounded />


      {/* <Row>
        <Col xs={12} lg={12} xl={8}>
          <BalanceOverview />
        </Col>

        <Col xs={12} lg={12} xl={4}>
        <TopPerformer />
        </Col>
      </Row> */}

      <Row>
       

        <Col xs={12} lg={12} xl={12} xxl={12}>
          <RecentLeads data={dashboardResponce?.data?.initiated_booking}/>
        </Col>
      </Row>

    </>
  );
}
