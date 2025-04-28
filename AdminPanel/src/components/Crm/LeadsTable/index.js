"use client";

import React, { useState, useEffect } from "react";
import { Dropdown ,Modal} from "react-bootstrap";
import { Card, Form, Table, Button } from "react-bootstrap";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import Image from "next/image";
import { returnTripType } from "@/commons/commonFunctions,";
import AssignDriver from "./assignDriver";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import useAxios from '@/network/useAxios';
import ActionSheet from "@/components/ActionSheet/ActionSheet";
import { bookingService } from "@/urls/urls";

const LeadsTable = ({data, setSelected, deleteRequested,status,setStatus,changeStatus,setIsChange,setIsDeleted,ActionResponse, setFetchData,setFetchPage}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [createResponse, createError, createLoading, createSubmit] = useAxios();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
    const [formErrors, setFormErrors] = useState({
      phone_number: "",
      email: ""
    });

  // Modal states
  //const [isShowModal, setShowModal] = useState("false");
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [titleMessage,setTitleMessage]=useState({title:'',message:''});
  const [isModalOpenAssignDriver,setIsModalOpenAssignDriver] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [bookingId,setBookingId] = useState(null);
  const [action,setAction] = useState('');
    const [formData, setFormData] = useState({
      customer_name: "",
      phone_number: "",
      email: "",
      pick :"",
      drop: "",
      pick_time:'',
      drop_time:"",
      trip_type:'',
      buy_cost:'',
      fare:'',
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = {};
      const phoneError = validatePhoneNumber(formData.phone_number);
      const emailError = validateEmail(formData.email);
  
      setFormErrors({
        phone_number: phoneError,
        email: emailError
      });
    
      const now = new Date();
      const pickDateTime = new Date(formData.pick_time);
      const dropDateTime = new Date(formData.drop_time);
    
      // Pick time must not be in the past
      if (pickDateTime < now) {
        errors.pick_time = "Pick time cannot be in the past.";
      }
    
      // Drop time must be after pick time (only if roundtrip selected)
      if (formData.trip_type === "roundtrip" && dropDateTime <= pickDateTime) {
        errors.drop_time = "Drop time must be after pick time.";
      }
    
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    
      // Clear form errors if any
      setFormErrors({});
    
      // Submit your form (API call or state update)
      console.log(formData);
     createSubmit(bookingService(formData));
      // optionally close modal or reset form
    };
    
    useEffect(()=>{
      console.log(createResponse)
if(createResponse?.message==='success'){
  setShowModal(false);
  setFormData({
    customer_name: "",
    phone_number: "",
    email: "",
    pick :"",
    drop: "",
    pick_time:'',
    drop_time:"",
    trip_type:'',
    buy_cost:'',
    fare:'',
  });
  setFormErrors({});
  setAlert({ message: 'Booking Created Succesfully', variant: "success" });
  setFetchData(true)
  setFetchPage(1)
}
    },[createResponse])

  const [actionResponse, actionError, actionLoading, actionSubmit] = useAxios();

  const handleSelect = (eventKey) => {
    setStatus(eventKey);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFetchPage(newPage);
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Please enter a valid 10-digit phone number starting with 6-9";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(value==='one_way'){
      setFormData(prev=>(
        {
          ...prev,['drop_time']:''
        }))
    }
  
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));}
  useEffect(() => {
    if (data) {
      setTableData(data.data || []);
      setTotalPages(data.total_pages || 1);
      setTotalItems(data.count || 0);
      setCurrentPage(data.current_page || 1);
    }
  }, [data]);

  useEffect(() => {
   
    if (actionResponse['message']){
      setAlert({ message: actionResponse['message'], variant: "success" });
      setIsModalOpenAssignDriver(false);
      setBookingId(null);
    }
  }, [actionResponse]);


  useEffect(() => {
    if (ActionResponse['result'] == 'success'){
      setIsModalOpen(false);
    } else if (ActionResponse['error']){
      setAlert({ message: actionResponse['error'], variant: "success" });
    }
  }, [ActionResponse]);

  const actionConfirm = () => {
    if (action=='status')
      setIsChange(true);
    else if (action == 'delete')
      setIsDeleted(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-4">
            {/* <SearchForm /> */}
            <div className="text-end">
              {/* Add lead button if needed */}
            </div>
          </div>
          <Button variant="primary" onClick={() => setShowModal(true)} className="border-0 rounded-0">
              Create Booking
            </Button>
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
                    <th scope="col">Buyed</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((defaultValue, i) => (
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
                        {`${defaultValue.buy_cost} km` || "N/A"}
                      </td>
                      <td>
                        <span className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${defaultValue.status.toLowerCase()}`}>
                          {defaultValue.status}
                        </span>
                      </td>
                      <td className="text-body">
                        {defaultValue.bidding_status==='open'?'Not Buyed':'Buyed' || "N/A"}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          {/* <button 
                            className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                            onClick={() => {
                              setBookingId(defaultValue.id);
                              setIsModalOpenAssignDriver(true);
                            }}
                          >
                            <span className="material-symbols-outlined fs-16 text-primary">
                              visibility
                            </span>
                          </button> */}

                          {/* <Dropdown 
                            onSelect={(eventKey) => {
                              setSelected(defaultValue.id);
                              handleSelect(eventKey);
                              setIsModalOpen(true);
                              setAction('status');
                              setTitleMessage({ 
                                title: 'Change Booking Status', 
                                message: "Are you sure you want to change booking status?"
                              });
                            }}
                          >
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
                              <Dropdown.Item eventKey="driver assigned" active={status === "driver assigned"}>
                                Driver Assigned
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
                          </Dropdown> */}

                          <button 
                            className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                            onClick={() => {
                              setSelected(defaultValue.id);
                              setAction('delete');
                              setIsModalOpen(true);
                              setTitleMessage({ 
                                title: 'Delete Booking', 
                                message: "Are you sure you want to delete this booking?"
                              });
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
                totalItems={totalItems}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modals */}
      {isModalOpenAssignDriver && (
        <AssignDriver
          show={isModalOpenAssignDriver}
          onHide={() => setIsModalOpenAssignDriver(false)}
          bookingId={bookingId}
          actionError={actionError}
          actionResponse={actionResponse}
          actionSubmit={actionSubmit}
        />
      )}

      <ActionSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={actionConfirm}
        title={titleMessage.title}
        message={titleMessage.message}
        alert={alert}
        loading={actionLoading}
      />

      {alert.message && (
        <AlertMessage
          variant={alert.variant}
          message={alert.message}
          onClose={() => setAlert({ message: "", variant: "" })}
        />
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Create New Vendor</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      {alert.message && showModal && (
        <AlertMessage
          message={alert.message}
          variant={alert.variant}
          onClose={() => setAlert({ message: "", variant: "" })}
        />
      )}

      <Form.Group className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          isInvalid={!!formErrors.phone_number}
          required
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.phone_number}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Enter a 10-digit phone number starting with 6-9
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          isInvalid={!!formErrors.email}
          required
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pick Location</Form.Label>
        <Form.Control
          type="text"
          name="pick"
          value={formData.pick}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Drop Location</Form.Label>
        <Form.Control
          type="text"
          name="drop"
          value={formData.drop}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Trip Type</Form.Label>
        <Form.Select
          name="trip_type"
          value={formData.trip_type}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Trip Type</option>
          <option value="one_way">One Way</option>
          <option value="round_trip">Round Trip</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pick Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="pick_time"
          value={formData.pick_time}
          onChange={handleInputChange}
          required
          isInvalid={!!formErrors.pick_time}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.pick_time}
        </Form.Control.Feedback>
      </Form.Group>



      {/* Only show Drop Time if trip_type is "roundtrip" */}
      {formData.trip_type === "round_trip" && (
        <Form.Group className="mb-3">
          <Form.Label>Drop Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="drop_time"
            value={formData.drop_time}
            onChange={handleInputChange}
            isInvalid={!!formErrors.drop_time}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.drop_time}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Buy Cost</Form.Label>
        <Form.Control
          type="number"
          name="buy_cost"
          value={formData.buy_cost}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fare</Form.Label>
        <Form.Control
          type="number"
          name="fare"
          value={formData.fare}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={createLoading}
        >
          {createLoading ? "Creating..." : "Create Booking"}
        </Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>

    </>
  );
};

export default LeadsTable;
