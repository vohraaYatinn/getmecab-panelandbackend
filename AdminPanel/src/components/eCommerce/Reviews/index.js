"use client";

import Image from "next/image";
import { Card, Table, Form } from "react-bootstrap";
import Link from "next/link";

const Reviews = ({data}) => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 mb-md-4">
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
          </div>

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
            {data && data.map((item) => (
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
                 
                    <button className="ps-0 border-0 bg-transparent lh-1">
                      <span className="material-symbols-outlined text-danger fs-16">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>



        </Card.Body>
      </Card>
    </>
  );
};

export default Reviews;
