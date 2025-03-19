"use client";

import Image from "next/image";
import { Card, Table, Form } from "react-bootstrap";
import Link from "next/link";
import Pagination from "./Pagination";
import React, { useState, useEffect } from "react";
import useAxios from "@/network/useAxios";
import { deleteReview } from "@/urls/urls";
import ActionSheet from "@/components/ActionSheet/ActionSheet";

const Reviews = ({data,setFetchNew,setAlert,alert}) => {
  const [isModalOpenAction, setIsModalOpenAction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (data) {
      setTableData(data.data || []);
      setTotalPages(data.total_pages || 1);
      setTotalItems(data.count || 0);
      setCurrentPage(data.current_page || 1);
    }
  }, [data]);
  const [cabDeleteRespnse,cabDeleteError,cabDeleteLoading,cabDeleteSubmit] = useAxios();
  const [Select_driver_id,setSelect_driver_id] = useState(null)
  const actionConfirm = () =>{
    cabDeleteSubmit(    deleteReview({id:Select_driver_id}))
  }
  useEffect(()=>{
    if(cabDeleteRespnse['result'] == 'success'){
      setAlert({ message: cabDeleteRespnse['result'], variant: "success" });
      setIsModalOpenAction(false);
      setSelect_driver_id(null)
      setFetchNew(true)
    }
  },[cabDeleteRespnse])
  useEffect(()=>{
    if(cabDeleteError && cabDeleteError['message']){
      setAlert({ message: cabDeleteError['message'], variant: "danger" });
      setIsModalOpenAction(false);
    }
  },[cabDeleteError])
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage);
    }
  };

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          {/* <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 mb-md-4">
            <Form className="position-relative table-src-form me-0">
              <Form.Control type="text" placeholder="Search here" />

              <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">
                search
              </span>
            </Form>

            <Form.Select
              className="month-select form-control"
              aria-label="Default select example"
            >
              <option defaultValue="0">Show All</option>
              <option defaultValue="1">Weekly</option>
              <option defaultValue="2">Monthly</option>
              <option defaultValue="3">Yearly</option>
            </Form.Select>
          </div> */}

          <div className="default-table-area manage-reviews-table">
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Reviewer</th>
              <th scope="col">Review</th>
              <th scope="col">Booking Details</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                   
                    <div className="ms-2 ps-1">
                      <h6 className="fw-medium fs-14 mb-0">{item.customer.username}</h6>
                      <span className="text-body">{item.customer.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-lg-center flex-wrap gap-1 mb-2">
                    {Array(item.rating)
                      .fill(0)
                      .map((_, idx) => (
                        <i key={idx} className="ri-star-fill fs-18 text-warning"></i>
                      ))}
                  </div>
                  <p className="mw-380">{item.review}</p>
                </td>
                <td>
                  <p>
                    From: <strong>{item.booking.pickup_location}</strong>
                  </p>
                  <p>
                    To: <strong>{item.booking.drop_location}</strong>
                  </p>
                </td>
                <td>
                  <span className="d-block">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <span className="d-block">
                    {new Date(item.created_at).toLocaleTimeString()}
                  </span>
                </td>
                <td>
                  <span className="badge bg-primary bg-opacity-10 text-primary p-2 fs-12 fw-normal">
                    {item.booking.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-3">
                 
                  <button
                        className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                        onClick={() => {
                          setIsModalOpenAction(true);
                          setSelect_driver_id(item.id)
                          // setTitleMessage({
                          //   title: 'Delete Cab',
                          //   message: "Are you sure you want to delete this cab ?"
                          // });
                        }}
                      >
                        <span className="material-symbols-outlined fs-16 text-body">
                          delete
                        </span>
                      </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      <ActionSheet
                isOpen={isModalOpenAction}
                onClose={() => setIsModalOpenAction(false)}
                onConfirm={actionConfirm}
                title="Delete Review"
                message="Are you sure you want to delete Review?"
                alert={alert}
                loading={cabDeleteLoading}
            />
    </>
  );
};

export default Reviews;
