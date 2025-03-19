"use client";

import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Card, Form, Table, Button } from "react-bootstrap";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import Image from "next/image";
import { returnTripType } from "@/commons/commonFunctions,";
import AssignDriver from "./assignDriver";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import useAxios from '@/network/useAxios';
import ActionSheet from "@/components/ActionSheet/ActionSheet";

const LeadsTable = ({data, setSelected, deleteRequested,status,setStatus,changeStatus,setIsChange,setIsDeleted,ActionResponse, fetchData}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // Modal states
  const [isShowModal, setShowModal] = useState("false");
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [titleMessage,setTitleMessage]=useState({title:'',message:''});
  const [isModalOpenAssignDriver,setIsModalOpenAssignDriver] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [bookingId,setBookingId] = useState(null);
  const [action,setAction] = useState('');

  const handleToggleShowModal = () => {
    setShowModal(!isShowModal);
  };

  const [actionResponse, actionError, actionLoading, actionSubmit] = useAxios();

  const handleSelect = (eventKey) => {
    setStatus(eventKey);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage);
    }
  };

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
                  {tableData.map((defaultValue, i) => (
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
                        <span className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${defaultValue.status.toLowerCase()}`}>
                          {defaultValue.status}
                        </span>
                      </td>
                      <td className="text-body">
                        {defaultValue.bidding_status || "N/A"}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <button 
                            className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                            onClick={() => {
                              setBookingId(defaultValue.id);
                              setIsModalOpenAssignDriver(true);
                            }}
                          >
                            <span className="material-symbols-outlined fs-16 text-primary">
                              visibility
                            </span>
                          </button>

                          <Dropdown 
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
                              {/* <Dropdown.Item eventKey="driver assigned" active={status === "driver assigned"}>
                                Driver Assigned
                              </Dropdown.Item> */}
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
    </>
  );
};

export default LeadsTable;
