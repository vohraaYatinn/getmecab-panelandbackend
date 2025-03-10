"use client";

import React, { useState,useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Card, Form, Table, Button } from "react-bootstrap";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";

import { returnTripType } from "@/commons/commonFunctions,";
import AssignDriver from "./assignDriver";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import useAxios from '@/network/useAxios';
import ActionSheet from "@/components/ActionSheet/ActionSheet";
import { BookingService } from '@/urls/urls';

const LeadsTable = ({data, setSelected, deleteRequested,status,setStatus,changeStatus,setIsChange,setIsDeleted,ActionResponse}) => {
  // Modal
  const [isShowModal, setShowModal] = useState("false");
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [titleMessage,setTitleMessage]=useState({title:'',message:''})
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_number: '',
    customer_email: '',
    pickup_location: '',
    drop_location: '',
    trip_type: '',
    pickup_date: '',
    drop_date: '',
    trip_km: 0,
    fare: '',
    buy_cost: '',
  });

  const handleToggleShowModal = () => {
    setShowModal(!isShowModal);
  };

  const [
    actionResponse,
    actionError,
    actionLoading,
    actionSubmit,
  ]=useAxios();
const [isModalOpenAssignDriver,setIsModalOpenAssignDriver] = useState(false)
const [isModalOpen,setIsModalOpen] = useState(false)
const [bookingId,setBookingId] = useState(null)
const [action,setAction] = useState('')

  const handleSelect = (eventKey) => {
    console.log('caleed2',eventKey)
    setStatus(eventKey);

  };
useEffect(()=>{
if (actionResponse['message']){
  setAlert({ message: actionResponse['message'], variant: "success" });
  setIsModalOpenAssignDriver(false)
  setBookingId(null)

}
},[actionResponse])

useEffect(()=>{
  if (ActionResponse['result'] == 'success'){
setIsModalOpen(false)
  
  }
  else   if (ActionResponse['error']){
    setAlert({ message: actionResponse['error'], variant: "success" });
    
  
  }
  },[ActionResponse])
const actionConfirm=()=>{
  if (action=='status')
  setIsChange(true)
else if (action == 'delete')
  setIsDeleted(true)
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await BookingService.createBooking(formData);

      if (response.message) {
        setAlert({ message: response.message, variant: "success" });
        handleToggleShowModal();
        // Reset form
        setFormData({
          customer_name: '',
          customer_number: '',
          customer_email: '',
          pickup_location: '',
          drop_location: '',
          trip_type: '',
          pickup_date: '',
          drop_date: '',
          trip_km: 0,
          fare: '',
          buy_cost: '',
        });
      }
    } catch (error) {
      setAlert({ 
        message: error.error || "An error occurred while creating the booking", 
        variant: "danger" 
      });
    }
  };

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-4">
            <SearchForm />

            <div className="text-end">
              <button
                className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
                onClick={handleToggleShowModal}
              >
                <span className="py-sm-1 d-block">
                  <i className="ri-add-line"></i>
                  <span>Create Booking</span>
                </span>
              </button>
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
                    <th scope="col">KM</th>
                    <th scope="col">Status</th>
                    <th scope="col">Bidding Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                {data &&
      data.slice(0, 10).map((defaultValue, i) => (
        <tr key={i}>
        

          <td>
            <b>{defaultValue.user?.first_name || "N/A"}</b><br/> {defaultValue.user?.email || "N/A"}<br/> {defaultValue.user?.phone_number || "N/A"}
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
            {`${defaultValue.trip_km} km` || "N/A"}
          </td>

          <td>
            <span
              className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${defaultValue.status.toLowerCase()}`}
            >
              {defaultValue.status}
            </span>
          </td>

          <td className="text-body">
            {defaultValue.bidding_status || "N/A"}
          </td>

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
          </td>
        </tr>
      ))}
  </tbody>
              </Table>

              {/* Pagination */}
              <Pagination />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <div className={`custom-modal right ${isShowModal ? "" : "show"}`}>
        <div className="custom-modal-content position-relative z-3">
          <div className="border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
            <h3 className="fs-18 mb-0">Add New Booking</h3>

            <div className="close-link" onClick={handleToggleShowModal}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>

          <div className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="label">Trip Type</Form.Label>
                <Form.Select 
                  className="text-dark"
                  name="trip_type"
                  value={formData.trip_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Trip Type</option>
                  <option value="one_way">One Way</option>
                  <option value="round">Round Trip</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Pickup City</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Enter pickup city"
                  name="pickup_location"
                  value={formData.pickup_location}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Drop City</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Enter drop city"
                  name="drop_location"
                  value={formData.drop_location}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Pickup Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  className="text-dark"
                  name="pickup_date"
                  value={formData.pickup_date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {formData.trip_type === 'round' && (
                <div className="round-trip-fields">
                  <Form.Group className="mb-4">
                    <Form.Label className="label">Drop Date & Time (Round Trip)</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      className="text-dark"
                      name="drop_date"
                      value={formData.drop_date}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>
              )}

              <Form.Group className="mb-4">
                <Form.Label className="label">Trip Cost</Form.Label>
                <Form.Control
                  type="number"
                  className="text-dark"
                  placeholder="Enter trip cost"
                  name="fare"
                  value={formData.fare}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Buy Cost</Form.Label>
                <Form.Control
                  type="number"
                  className="text-dark"
                  placeholder="Enter buy cost"
                  name="buy_cost"
                  value={formData.buy_cost}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Enter customer name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Customer Number</Form.Label>
                <Form.Control
                  type="tel"
                  className="text-dark"
                  placeholder="Enter customer number"
                  name="customer_number"
                  value={formData.customer_number}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Customer Email</Form.Label>
                <Form.Control
                  type="email"
                  className="text-dark"
                  placeholder="Enter customer email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="d-flex gap-3">
                <Button
                  variant="primary"
                  type="submit"
                  className="text-white fw-semibold py-2 px-2 px-sm-3"
                  disabled={actionLoading}
                >
                  <span className="py-sm-1 d-block">
                    <i className="ri-add-line text-white"></i>{" "}
                    <span>{actionLoading ? 'Creating...' : 'Create Booking'}</span>
                  </span>
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>

        <div className="close-outside" onClick={handleToggleShowModal}></div>
      </div>
      <AssignDriver
                isOpen={isModalOpenAssignDriver}
                onClose={() => setIsModalOpenAssignDriver(false)}
                bookingId={bookingId}
                actionResponse={actionResponse}
                actionSubmit={actionSubmit}
            />
            <ActionSheet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={actionConfirm}
                title={titleMessage.title}
                message={titleMessage.message}
            />
    </>
  );
};

export default LeadsTable;
