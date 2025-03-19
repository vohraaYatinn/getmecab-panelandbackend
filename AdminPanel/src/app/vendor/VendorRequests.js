"use client";

import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import useAxios from '@/network/useAxios';
import { getPendingVendorRequests,getVendorRequests, vendorRequestAction } from '@/urls/urls';
import ActionSheet from "@/components/ActionSheet/ActionSheet";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import Pagination from "@/components/Apps/Contacts/Pagination";

const VendorRequests = (activeTab) => {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [action, setAction] = useState('');
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const [
    requestsResponse,
    requestsError,
    requestsLoading,
    requestsSubmit,
  ] = useAxios();

  const [
    actionResponse,
    actionError,
    actionLoading,
    actionSubmit,
  ] = useAxios();

  useEffect(() => {
    fetchRequests();
  }, [currentPage]);

  useEffect(() => {
    if (requestsResponse?.result === 'success') {
      setRequests(requestsResponse.data);
      setTotalItems(requestsResponse.total || requestsResponse.data.length);
      setTotalPages(Math.ceil((requestsResponse.total || requestsResponse.data.length) / itemsPerPage));
    }
  }, [requestsResponse]);

  useEffect(() => {
    if (actionResponse?.result === 'success') {
      setAlert({ message: actionResponse.message, variant: "success" });
      setIsModalOpen(false);
      fetchRequests();
    }
  }, [actionResponse]);

  const fetchRequests = () => {
    if(activeTab?.activeTab === 'requests'){
      requestsSubmit(getPendingVendorRequests({
        page: currentPage,
        page_size: itemsPerPage
      }));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAction = (request, actionType) => {
    setAlert({ message: "", variant: "" });
    setSelectedRequest(request);
    setAction(actionType);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    await actionSubmit(vendorRequestAction({
      request_id: selectedRequest.id,
      action: action,
      password: 'default_password123' // You might want to generate this or get it from user input
    }));
  };

  return (
    <>
      <div className="default-table-area style-two default-table-width">
        <div className="table-responsive">
          <Table className="align-middle">
            <thead>
              <tr>
                <th scope="col">Vendor Name</th>
                <th scope="col">Company</th>
                <th scope="col">Contact</th>
                <th scope="col">PAN</th>
                <th scope="col">GST</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.vendor_name}</td>
                  <td>{request.company_name}</td>
                  <td>
                    {request.email}<br/>
                    {request.phone_number}
                  </td>
                  <td>{request.pan_number}</td>
                  <td>{request.gst_number}</td>
                  <td>
                    <span className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.status === 'pending' && (
                      <div className="d-flex align-items-center gap-1">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAction(request, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleAction(request, 'reject')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />

      <ActionSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={`${action === 'approve' ? 'Approve' : 'Reject'} Vendor Request`}
        message={`Are you sure you want to ${action} this vendor request?`}
        alert={alert}
        loading={actionLoading}
      />

      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
    </>
  );
};

export default VendorRequests; 