"use client";

import { Row, Col, Dropdown, Card, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import EditUserModal from "./EditUser";
import ActionSheet from "@/components/ActionSheet/ActionSheet";

const TeamMembers = ({data,setSelectId,actionResponse,actionLoading,actionSubmit}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverId,setDriverId] = useState(null)
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
const actionConfirm = () =>{
  setSelectId(driverId)
}
  
  const handleEditClick = (user) => {
    if (!user) return;  // Prevent errors if user is undefined

    const temp = {
        id: user.id,
        name: user?.user?.first_name || "",  // Ensure default values
        email: user?.user?.email || "",
        phone_number: user?.user?.phone_number || "",
        aadhaar_number: user?.aadhaar_number || "",
        license_number: user?.license_number || "",
    };

    setSelectedRecord(prev => {
        // Only update if data is different to prevent unnecessary re-renders
        return JSON.stringify(prev) !== JSON.stringify(temp) ? temp : prev;
    });

    setShowModal(true);
};

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <Form className="position-relative table-src-form me-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search here"
              />
              <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">
                search
              </span>
            </Form>

            <Link
              href="/drivers/add-user/"
              className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
            >
              <span className="py-sm-1 d-block">
                <i className="ri-add-line d-none d-sm-inline-block"></i>
                <span>Add New Driver</span>
              </span>
            </Link>
          </div>
        </Card.Body>
      </Card>

      <Row>
      {data.map((driver) => (
        <div key={driver.id} className="col-sm-6 col-lg-4 col-xxl-3">
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/user-60.jpg"
                      className="wh-65 rounded-circle"
                      alt="user"
                      width={65}
                      height={65}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="text-decoration-none text-secondary fw-medium fs-16">
                      {driver.user.username || "N/A"}
                    </div>
                    <span className="d-block">{driver.user.role}</span>
                  </div>
                </div>


                <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2" 
 onClick={() => handleEditClick(driver)}
              >
                <span className="material-symbols-outlined fs-16 text-danger">
                  edit
                </span>
              </button>
                <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2" 
              onClick={()=>{
                
                setIsModalOpen(true)
                
              }}
              >
                <span className="material-symbols-outlined fs-16 text-danger">
                  delete
                </span>
              </button>
              </div>

              <div className="d-flex align-items-center mb-2 pb-1">
                <span className="text-secondary">Joined Date:</span>
                <span className="ms-1">{new Date(driver.timestamp).toLocaleDateString()}</span>
              </div>

              <div className="d-flex align-items-center mb-2 pb-1">
                <span className="text-secondary">Email Address:</span>
                <span className="ms-1">{driver.user.email}</span>
              </div>

              <div className="d-flex align-items-center mb-2 pb-1">
                <span className="text-secondary">Phone Number:</span>
                <span className="ms-1">{driver.user.phone_number}</span>
              </div>

              <div className="d-flex align-items-center mb-4">
                <span className="text-secondary">Location:</span>
                <span className="ms-1">{`${driver.city}, ${driver.state}`}</span>
              </div>

            </Card.Body>
          </Card>
        </div>
      ))}

      </Row>
      {selectedRecord && (
        <EditUserModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          selectedRecord={selectedRecord}
          actionResponse={actionResponse} actionLoading={actionLoading}
          actionSubmit = {actionSubmit}
        />
      )}
            <ActionSheet
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={actionConfirm}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item?"
            />
    </>
  );
};

export default TeamMembers;
