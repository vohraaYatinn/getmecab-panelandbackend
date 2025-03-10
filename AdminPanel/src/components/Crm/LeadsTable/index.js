"use client";

import React, { useState,useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Card, Form, Table, Button, Modal } from "react-bootstrap";
import SearchForm from "./SearchForm";
import Pagination from "@/components/Apps/Contacts/Pagination";
import { useRouter } from "next/navigation";

import { returnTripType } from "@/commons/commonFunctions,";
import AssignDriver from "./assignDriver";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import useAxios from '@/network/useAxios';
import ActionSheet from "@/components/ActionSheet/ActionSheet";
import {bookingService, cityAutocomplete} from '@/urls/urls';

const LeadsTable = ({data, setSelected, deleteRequested,status,setStatus,changeStatus,setIsChange,setIsDeleted,ActionResponse, currentPage, totalPages, onPageChange, totalItems, itemsPerPage}) => {
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
    search: "",
    date: "",
    status: ""
  });

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const [
    cityAutocompleteResponse,
    cityAutocompleteError,
    cityAutocompleteLoading,
    cityAutocompleteSubmit,
  ] = useAxios();

  const router = useRouter();

  const handleToggleShowModal = () => {
    setShowModal(!isShowModal);
  };
const [actionResponse,
  actionError,
  actionLoading,
  actionSubmit,
]=useAxios();

  const [
    createBookingResponse,
    createBookingError,
    createBookingLoading,
    createBookingSubmit,
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
useEffect(()=>{
  if (createBookingResponse['message']){
    setAlert({ message: createBookingResponse['message'], variant: "success" });
    handleToggleShowModal();
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
},[createBookingResponse])

useEffect(() => {
  if (cityAutocompleteResponse?.cities) {
    if (activeField === 'pickup_location') {
      setPickupSuggestions(cityAutocompleteResponse.cities);
      setShowPickupSuggestions(true);
    } else if (activeField === 'drop_location') {
      setDropSuggestions(cityAutocompleteResponse.cities);
      setShowDropSuggestions(true);
    }
  }
}, [cityAutocompleteResponse, activeField]);

const handleLocationChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
  setActiveField(name);

  if (value.length >= 2) {
    cityAutocompleteSubmit(cityAutocomplete({search: value}));
  } else {
    if (name === 'pickup_location') {
      setPickupSuggestions([]);
      setShowPickupSuggestions(false);
    } else {
      setDropSuggestions([]);
      setShowDropSuggestions(false);
    }
  }
};

const handleSuggestionClick = (suggestion, field) => {
  setFormData(prev => ({
    ...prev,
    [field]: suggestion
  }));
  setActiveField(null);
  if (field === 'pickup_location') {
    setShowPickupSuggestions(false);
  } else {
    setShowDropSuggestions(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.pickup_location === formData.drop_location) {
      setAlert({ message: "Pickup and drop locations cannot be the same", variant: "danger" });
      return;
    }

    setIsSubmitting(true);
    try {
      await createBookingSubmit(bookingService(formData));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAction = (id, action) => {
    setSelected(id);
    if (action === 'delete') {
      setShowModal(true);
      setIsDeleted(true);
    } else if (action === 'status') {
      setIsChange(true);
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
                onClick={() => router.push('/panel/booking/create')}
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
                    <th scope="col">Sell Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                {data &&
      data.slice(0, 10).map((defaultValue, i) => (
        <tr key={i}>
        

          <td>
            <b>{defaultValue?.customer_name || "N/A"}</b><br/> {defaultValue?.customer_email || "N/A"}<br/> {defaultValue?.customer_number || "N/A"}
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
            {defaultValue.buy_cost || "N/A"}
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
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
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    className="text-dark"
                    placeholder="Enter pickup city"
                    name="pickup_location"
                    value={formData.pickup_location}
                    onChange={handleLocationChange}
                    onFocus={() => {
                      setShowPickupSuggestions(true);
                      setActiveField('pickup_location');
                    }}
                    required
                    disabled={isSubmitting}
                  />
                  {showPickupSuggestions && pickupSuggestions.length > 0 && activeField === 'pickup_location' && (
                    <div className="position-absolute w-100 bg-white border rounded-3 mt-1 shadow-sm" style={{ zIndex: 1000 }}>
                      {pickupSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 cursor-pointer hover-bg-light"
                          onClick={() => handleSuggestionClick(suggestion, 'pickup_location')}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Drop City</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    className="text-dark"
                    placeholder="Enter drop city"
                    name="drop_location"
                    value={formData.drop_location}
                    onChange={handleLocationChange}
                    onFocus={() => {
                      setShowDropSuggestions(true);
                      setActiveField('drop_location');
                    }}
                    required
                    disabled={isSubmitting}
                  />
                  {showDropSuggestions && dropSuggestions.length > 0 && activeField === 'drop_location' && (
                    <div className="position-absolute w-100 bg-white border rounded-3 mt-1 shadow-sm" style={{ zIndex: 1000 }}>
                      {dropSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 cursor-pointer hover-bg-light"
                          onClick={() => handleSuggestionClick(suggestion, 'drop_location')}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                  disabled={createBookingLoading || isSubmitting}
                >
                  <span className="py-sm-1 d-block">
                    <i className="ri-add-line text-white"></i>{" "}
                    <span>{createBookingLoading || isSubmitting ? 'Creating...' : 'Create Booking'}</span>
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
