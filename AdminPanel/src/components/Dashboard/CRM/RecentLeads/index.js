"use client";

import React, { useState } from "react";
import { Card, Form, Table, Button } from "react-bootstrap";
import Image from "next/image";
import { returnTripType } from "@/commons/commonFunctions,";
const recentLeadsData = [
  {
    customerImg: "/images/user-11.jpg",
    customerName: "David Brown",
    email: "david@trezo.com",
    source: "Organic",
    status: "confirmed",
  },
  {
    customerImg: "/images/user-12.jpg",
    customerName: "Sarah Miller",
    email: "sara@trezo.com",
    source: "Social",
    status: "pending",
  },
  {
    customerImg: "/images/user-13.jpg",
    customerName: "Michael Wilson",
    email: "micheal@trezo.com",
    source: "Website",
    status: "inProgress",
  },
  {
    customerImg: "/images/user-15.jpg",
    customerName: "Amanda Clark",
    email: "amanda@trezo.com",
    source: "Paid",
    status: "confirmed",
  },
  {
    customerImg: "/images/user-16.jpg",
    customerName: "Jennifer Taylor",
    email: "taylor@trezo.com",
    source: "Others",
    status: "rejected",
  },
  {
    customerImg: "/images/user-12.jpg",
    customerName: "Sarah Miller",
    email: "sara@trezo.com",
    source: "Social",
    status: "pending",
  },
  {
    customerImg: "/images/user-17.jpg",
    customerName: "Sarah Miller",
    email: "sara@trezo.com",
    source: "Social",
    status: "pending",
  },
  {
    customerImg: "/images/user-11.jpg",
    customerName: "David Brown",
    email: "david@trezo.com",
    source: "Organic",
    status: "confirmed",
  },
  {
    customerImg: "/images/user-18.jpg",
    customerName: "Jennifer Taylor",
    email: "taylor@trezo.com",
    source: "Others",
    status: "rejected",
  }, 
  {
    customerImg: "/images/user-13.jpg",
    customerName: "Michael Wilson",
    email: "micheal@trezo.com",
    source: "Website",
    status: "inProgress",
  },
];

const RecentLeads = ({data}) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [selectedItems, setSelectedItems] = useState([]);
  // const [isSelectAll, setIsSelectAll] = useState(false);

  // const pageSize = 5;
  // const totalPages = Math.ceil(recentLeadsData.length / pageSize);
  // const startIdx = (currentPage - 1) * pageSize;
  // const currentItems = recentLeadsData.slice(startIdx, startIdx + pageSize);

  // const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  // const handleNextPage = () =>
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // const handleSelectAll = (event) => {
  //   setIsSelectAll(event.target.checked);
  //   if (event.target.checked) {
  //     setSelectedItems(currentItems.map((item) => item.email));
  //   } else {
  //     setSelectedItems([]);
  //   }
  // };

  // const handleSelectItem = (email) => {
  //   if (selectedItems.includes(email)) {
  //     setSelectedItems(selectedItems.filter((item) => item !== email));
  //   } else {
  //     setSelectedItems([...selectedItems, email]);
  //   }
  // };

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-4">
            {/* <SearchForm /> */}

            <div className="text-end">
              {/* <button
                className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
                onClick={handleToggleShowModal}
              >
                <span className="py-sm-1 d-block">
                  <i className="ri-add-line"></i>
                  <span>Add New Lead</span>
                </span>
              </button> */}
            </div>
          </div>

          <div className="default-table-area style-two default-table-width">
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr>
               
                    <th scope="col">Customer</th>
                    <th scope="col">Location</th>
                    <th scope="col">Trip Type</th>
                    <th scope="col">Pickup Date</th>
                    <th scope="col">Fare</th>
                    <th scope="col">Buy Cost</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Bidding Status</th>
                    <th scope="col">Actions</th> */}
                  </tr>
                </thead>

                <tbody>
                {data &&
      data.slice(0, 10).map((defaultValue, i) => (
        <tr key={i}>
        

          <td>
            <b>{defaultValue?.customer_name || "N/A"}</b><br/> {defaultValue.customer_number || "N/A"}<br/> {defaultValue?.customer_email || "N/A"}
          </td>

         


          <td className="text-body">
           <b>Pickup:</b> {defaultValue.pickup_location || "N/A"}<br/>
           <b>Drop:</b> {defaultValue.drop_location || "N/A"}
          </td>

      

          <td className="text-body">
            {returnTripType(defaultValue.trip_type) || "N/A"}
          </td>

          <td className="text-body">
            {new Date(defaultValue.pickup_date).toLocaleString() || "N/A"}
          </td>

          <td className="text-body">
            {`₹${defaultValue.fare}` || "N/A"}
          </td>

          <td className="text-body">
            {`₹${defaultValue.buy_cost}` || "N/A"}
          </td>

          <td>
            <span
              className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${defaultValue.status.toLowerCase()}`}
            >
              {defaultValue?.bidding_status==='open'?'Not Buyed':'Buyed'}
            </span>
          </td>

          {/* <td className="text-body">
            {defaultValue.bidding_status || "N/A"}
          </td> */}
{/* 
          <td>
            <div className="d-flex align-items-center gap-1">
              <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
             onClick={()=>{
             setBookingId(defaultValue.id)
              setIsModalOpenAssignDriver(true)

            }}>
                <span className="material-symbols-outlined fs-16 text-primary">
                  visibility
                </span>
              </button>

<Dropdown onSelect={(eventKey)=>{
            
                setSelected(defaultValue.id)
              handleSelect(eventKey)
              setIsModalOpen(true)
              setAction('status')
              setTitleMessage({ title: 'Change Booking Status', message: " Are you sure you want to change booking status?"})
              }}>
      <Dropdown.Toggle
        className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
        variant="light"
      >
        <span className="material-symbols-outlined fs-16 text-body">edit</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item eventKey="booked" active={status === "booked"}>
          Booked
        </Dropdown.Item>
        <Dropdown.Item eventKey="ongoing" active={status === "ongoing"}>
          Ongoing
        </Dropdown.Item>
        <Dropdown.Item eventKey="Completed" active={status === "completed"}>
          Completed
        </Dropdown.Item>
        <Dropdown.Item eventKey="Cancelled" active={status === "cancelled"}>
          Cancelled
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

              <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2" 
              onClick={()=>{
               
                setSelected(defaultValue.id)
              
                setAction('delete')
                setIsModalOpen(true)
                setTitleMessage({ title: 'Delete Booking', message: " Are you sure you want to delete this booking?"});
                
              }}
              >
                <span className="material-symbols-outlined fs-16 text-danger">
                  delete
                </span>
              </button>
            </div>
          </td> */}
        </tr>
      ))}
  </tbody>
              </Table>

              {/* Pagination */}
              {/* <Pagination /> */}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      {/* <div className={`custom-modal right ${isShowModal ? "" : "show"}`}>
        <div className="custom-modal-content position-relative z-3">
          <div className="border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
            <h3 className="fs-18 mb-0">Add New Lead</h3>

            <div className="close-link" onClick={handleToggleShowModal}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>

          <div className="p-4">
            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="label">ID No</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="ID No"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">User Name</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="User Name"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Email</Form.Label>
                <Form.Control
                  type="email"
                  className="text-dark"
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Phone</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Phone"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Due Date</Form.Label>
                <Form.Control type="date" className="text-dark" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Company</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Company"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Lead Source</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Lead Source"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Status</Form.Label>
                <Form.Select
                  className="form-control text-dark"
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  <option defaultValue="0">Confirmed</option>
                  <option defaultValue="1">In Progress</option>
                  <option defaultValue="2">Pending</option>
                  <option defaultValue="3">Rejected</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="d-flex gap-3">
                <Button
                  variant="primary"
                  type="submit"
                  className="text-white fw-semibold py-2 px-2 px-sm-3"
                >
                  <span className="py-sm-1 d-block">
                    <i className="ri-add-line text-white"></i>{" "}
                    <span>Create New Lead</span>
                  </span>
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>

        <div className="close-outside" onClick={handleToggleShowModal}></div>
      </div> */}

    </>
  );
};

export default RecentLeads;
