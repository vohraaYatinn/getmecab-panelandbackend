"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import useAxios from '@/network/useAxios';
import { getVendors, createVendor } from '@/urls/urls';
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import Pagination from "@/components/Apps/Contacts/Pagination";


const VendorList = (activeTab) => {
  const [vendors, setVendors] = useState([]);
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const [
    vendorsResponse,
    vendorsError,
    vendorsLoading,
    vendorsSubmit,
  ] = useAxios();


  useEffect(() => {
    fetchVendors();
  }, [currentPage]);

  useEffect(() => {
    if (vendorsResponse?.result === 'success') {
      setVendors(vendorsResponse.data);
      setTotalItems(vendorsResponse.total || vendorsResponse.data.length);
      setTotalPages(Math.ceil((vendorsResponse.total || vendorsResponse.data.length) / itemsPerPage));
    }
  }, [vendorsResponse]);


  const fetchVendors = () => {
    if(activeTab?.activeTab === 'vendors'){
      vendorsSubmit(getVendors({
        page: currentPage,
        page_size: itemsPerPage
      }));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <>

      <div className="default-table-area style-two default-table-width">
        <div className="table-responsive">
          <Table className="align-middle">
            <thead>
              <tr>
                <th scope="col">Vendor ID</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Company</th>
                <th scope="col">Contact</th>
                <th scope="col">PAN</th>
                <th scope="col">GST</th>
                {/* <th scope="col">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor?.id}>
                  <td>{vendor?.user?.username}</td>
                  <td>{vendor?.user?.first_name}</td>
                  <td>{vendor?.company_name}</td>
                  <td>
                    {vendor?.user?.email}<br/>  
                    {vendor?.user?.phone_number}
                  </td>
                  <td>{vendor?.pan_number}</td>
                  <td>{vendor.gst_number}</td>
                  {/* <td>
                    <span className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${vendor.vendor_request.status.toLowerCase()}`}>
                      {vendor.vendor_request.status}
                    </span>
                  </td> */}
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


      <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
    </>
  );
};

export default VendorList; 