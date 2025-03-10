"use client";

import { Card, Table } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";
import SearchForm from "./SearchForm";

const ordersData = [
  {
    orderID: "#JAN-2345",
    customerImg: "/images/user-1.jpg",
    customerName: "Sarah Johnson",
    items: 120,
    created: "12 Jun 2024",
    total: "$10,490",
    vendor: "Dennis Matthews",
    status: "shipped",
  },
  {
    orderID: "#JAN-1323",
    customerImg: "/images/user-2.jpg",
    customerName: "Michael Smith",
    items: 62,
    created: "11 Jun 2024",
    total: "$6,575",
    vendor: "Kathryn Turner",
    status: "confirmed",
  },
  {
    orderID: "#DEC-1234",
    customerImg: "/images/user-3.jpg",
    customerName: "Emily Brown",
    items: 49,
    created: "10 Jun 2024",
    total: "$12,870",
    vendor: "John Valdez",
    status: "pending",
  },
  {
    orderID: "#DEC-3567",
    customerImg: "/images/user-4.jpg",
    customerName: "Jason Lee",
    items: 25,
    created: "09 Jun 2024",
    total: "$7,895",
    vendor: "Douglas Harvey",
    status: "shipped",
  },
  {
    orderID: "#DEC-1098",
    customerImg: "/images/user-5.jpg",
    customerName: "Ashley Davis",
    items: 82,
    created: "08 Jun 2024",
    total: "$4,680",
    vendor: "Susan Rader",
    status: "rejected",
  },
  {
    orderID: "#JAN-2345",
    customerImg: "/images/user-1.jpg",
    customerName: "Sarah Johnson",
    items: 120,
    created: "12 Jun 2024",
    total: "$10,490",
    vendor: "Dennis Matthews",
    status: "shipped",
  },
  {
    orderID: "#JAN-1323",
    customerImg: "/images/user-2.jpg",
    customerName: "Michael Smith",
    items: 62,
    created: "11 Jun 2024",
    total: "$6,575",
    vendor: "Kathryn Turner",
    status: "confirmed",
  },
  {
    orderID: "#DEC-1234",
    customerImg: "/images/user-3.jpg",
    customerName: "Emily Brown",
    items: 49,
    created: "10 Jun 2024",
    total: "$12,870",
    vendor: "John Valdez",
    status: "pending",
  },
  {
    orderID: "#DEC-3567",
    customerImg: "/images/user-4.jpg",
    customerName: "Jason Lee",
    items: 25,
    created: "09 Jun 2024",
    total: "$7,895",
    vendor: "Douglas Harvey",
    status: "shipped",
  },
];

const OrdersTable = () => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-lg-4 mb-3">
            <SearchForm />

            <Link
              href="#"
              className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
            >
              <span className="py-sm-1 d-block">
                <i className="ri-add-line d-none d-sm-inline-block fs-18"></i>
                <span>Add New Order</span>
              </span>
            </Link>
          </div>

          <div className="default-table-area ec-recent-orders">
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Items</th>
                    <th scope="col">Created</th>
                    <th scope="col">Total</th>
                    <th scope="col">Vendor</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {ordersData &&
                    ordersData.slice(0, 10).map((value, i) => (
                      <tr key={i}>
                        <td>{value.orderID}</td>

                        <td>
                          <div className="d-flex align-items-center">
                            <Image
                              src={value.customerImg}
                              className="wh-40 rounded-3"
                              alt="product-1"
                              width={40}
                              height={40}
                            />
                            <div className="ms-2 ps-1">
                              <h6 className="fw-medium fs-14 m-0">
                                {value.customerName}
                              </h6>
                            </div>
                          </div>
                        </td>

                        <td>{value.items}</td>

                        <td>{value.created}</td>

                        <td>{value.total}</td>

                        <td>{value.vendor}</td>

                        <td>
                          <span
                            className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${value.status}`}
                          >
                            {value.status}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-primary">
                                visibility
                              </span>
                            </button>

                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-body">
                                edit
                              </span>
                            </button>

                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
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
            </div>

            {/* Pagination */}
            <Pagination />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default OrdersTable;
