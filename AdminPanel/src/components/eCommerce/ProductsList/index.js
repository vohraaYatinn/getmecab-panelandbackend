"use client";

import { Card, Tab, Tabs } from "react-bootstrap";
import AllProducts from './AllProducts';
import PublishedProducts from './PublishedProducts';
import DraftProducts from './DraftProducts';
import { useEffect, useState } from "react";
import useAxios from "@/network/useAxios";
import { deleteCab } from "@/urls/urls";

const ProductsList = ({data,setFetchNew,setAlert}) => {
  const [selectId,setSelectId] = useState(null)
  const [
    actionResponse,
    actionError,
    actionLoading,
    actionSubmit,
  ] = useAxios();


useEffect(()=>{
if (selectId){
actionSubmit(deleteCab({id:selectId}))
setSelectId(null)
}
},[selectId])


useEffect(()=>{
  console.log(actionResponse)
if (actionResponse['result'] =='success'){
  setFetchNew(true)
  setAlert({ message: actionResponse['result'], variant: "success" });
}
},[actionResponse])
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <Tabs
            defaultActiveKey="allCabs"
            id="uncontrolled-tab-example"
            className="border-0 gap-3 mb-lg-4 mb-3 products-list-tabs"
          >
            <Tab eventKey="allCabs" title="All Cabs">
              <AllProducts data={data}  setFetchNew={setFetchNew}/>
            </Tab>

            <Tab eventKey="bookedCabs" title="Booked Cabs">
              <PublishedProducts data={data} setSelectId={setSelectId}/>
            </Tab>

            <Tab eventKey="idlecabs" title="Idle Cabs">
              <DraftProducts data={data} setSelectId={setSelectId}/>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductsList;