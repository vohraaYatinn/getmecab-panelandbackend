"use client";

import React, { useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";
import VendorRequests from "./VendorRequests";
import VendorList from "./VendorList";

import { Breadcrumb } from "react-bootstrap";

export default function Page() {
  const [activeTab, setActiveTab] = useState("requests");
  const [key, setKey] = useState(0);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <>


      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Vendor Management</h3>
             
        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>
            <span className="fw-medium">Vendor Management</span>
          </Breadcrumb.Item>
        </Breadcrumb>
          </div>

          <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
            <Nav variant="pills" className="border-bottom px-4">
              <Nav.Item>
                <Nav.Link eventKey="requests" className="border-0 rounded-0">
                  Vendor Requests
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="vendors" className="border-0 rounded-0">
                  Approved Vendors
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="requests" key={`requests-${key}`}>
                <VendorRequests />
              </Tab.Pane>
              <Tab.Pane eventKey="vendors" key={`vendors-${key}`}>
                <VendorList />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </>
  );
}
