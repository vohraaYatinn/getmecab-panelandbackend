"use client";

import { Table } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";
import SearchForm from "../SearchForm";
import { useState, useEffect } from 'react';
import {test_url_images } from "../../../../config/environment"
const allProductsData = [
  {
    id: "#JAN-999",
    img: "/images/product-1.jpg",
    title: "Smart Band",
    detailsLink: "/ecommerce/product-details",
    date: "08 Jun 2024",
    category: "Watch",
    price: "$35.00",
    order: 75,
    stock: "750",
    amount: "$2,625",
    rating: "5.00 (141 reviews)",
    status: "published",
  },
  {
    id: "#JAN-998",
    img: "/images/product-2.jpg",
    title: "Headphone",
    detailsLink: "/ecommerce/product-details",
    date: "07 Jun 2024",
    category: "Electronics",
    price: "$49.00",
    order: 25,
    stock: "825",
    amount: "$1,225",
    rating: "5.00 (69 reviews)",
    status: "draft",
  },
  {
    id: "#JAN-997",
    img: "/images/product-3.jpg",
    title: "iPhone 15 Plus",
    detailsLink: "/ecommerce/product-details",
    date: "06 Jun 2024",
    category: "Apple",
    price: "$99.00",
    order: 55,
    stock: "Stock Out",
    amount: "$5,445",
    rating: "5.00 (99 reviews)",
    status: "published",
  },
  {
    id: "#JAN-996",
    img: "/images/product-4.jpg",
    title: "Bluetooth Speaker",
    detailsLink: "/ecommerce/product-details",
    date: "05 Jun 2024",
    category: "Google",
    price: "$59.00",
    order: 40,
    stock: "535",
    amount: "$2,360",
    rating: "4.00 (75 reviews)",
    status: "published",
  },
  {
    id: "#JAN-995",
    img: "/images/product-5.jpg",
    title: "Airbuds 2nd Gen",
    detailsLink: "/ecommerce/product-details",
    date: "04 Jun 2024",
    category: "Headphone",
    price: "$79.00",
    order: 56,
    stock: "460",
    amount: "$4,424",
    rating: "5.00 (158 reviews)",
    status: "draft",
  },
  {
    id: "#JAN-999",
    img: "/images/product-1.jpg",
    title: "Smart Band",
    detailsLink: "/ecommerce/product-details",
    date: "08 Jun 2024",
    category: "Watch",
    price: "$35.00",
    order: 75,
    stock: "750",
    amount: "$2,625",
    rating: "5.00 (141 reviews)",
    status: "published",
  },
  {
    id: "#JAN-998",
    img: "/images/product-2.jpg",
    title: "Headphone",
    detailsLink: "/ecommerce/product-details",
    date: "07 Jun 2024",
    category: "Electronics",
    price: "$49.00",
    order: 25,
    stock: "825",
    amount: "$1,225",
    rating: "5.00 (69 reviews)",
    status: "draft",
  },
  {
    id: "#JAN-997",
    img: "/images/product-3.jpg",
    title: "iPhone 15 Plus",
    detailsLink: "/ecommerce/product-details",
    date: "06 Jun 2024",
    category: "Apple",
    price: "$99.00",
    order: 55,
    stock: "Stock Out",
    amount: "$5,445",
    rating: "5.00 (99 reviews)",
    status: "published",
  },
  {
    id: "#JAN-996",
    img: "/images/product-4.jpg",
    title: "Bluetooth Speaker",
    detailsLink: "/ecommerce/product-details",
    date: "05 Jun 2024",
    category: "Google",
    price: "$59.00",
    order: 40,
    stock: "535",
    amount: "$2,360",
    rating: "4.00 (75 reviews)",
    status: "published",
  },
  {
    id: "#JAN-995",
    img: "/images/product-5.jpg",
    title: "Airbuds 2nd Gen",
    detailsLink: "/ecommerce/product-details",
    date: "04 Jun 2024",
    category: "Headphone",
    price: "$79.00",
    order: 56,
    stock: "460",
    amount: "$4,424",
    rating: "5.00 (158 reviews)",
    status: "draft",
  },
];

const AllProducts = ({data}) => {
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
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage);
    }
  };
  return (
    <>
      {/* <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-lg-4 mb-3">
        <SearchForm />

        <Link
          href="/cabs/create-cab/"
          className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
        >
          <span className="py-sm-1 d-block">
            <i className="ri-add-line d-none d-sm-inline-block fs-18"></i>
            <span>Add New Product</span>
          </span>
        </Link>
      </div> */}

      <div className="default-table-area all-products">
  <div className="table-responsive">
    <Table className="align-middle">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Cab Image</th>
          <th scope="col">Cab Number</th>
          <th scope="col">Cab Name</th>
          <th scope="col">Cab Type</th>
          <th scope="col">Price Per Km</th>
          <th scope="col">Availability</th>
          <th scope="col">Timestamp</th>
          {/* <th scope="col">Action</th> */}
        </tr>
      </thead>

      <tbody>
        {tableData &&
           tableData.filter(item => item.is_available === true).map((value, i) => (
            <tr key={i}>
              <td>{value.id}</td>
              <td>
            <img
              src={`${test_url_images}${value.photo}`}  // Assuming 'photo' contains the image URL
            alt="Vehicle"
            style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
          />
        </td>
              <td>{value.cab_number}</td>
              <td>{value.cab_name}</td>
              <td>{value.cab_type}</td>
              <td>{value.price_per_km} ₹</td>
              <td>
                <span
                  className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${
                    value.is_available ? "text-success" : "text-danger"
                  }`}
                >
                  {value.is_available ? "Available" : "Not Available"}
                </span>
              </td>
              <td>{new Date(value.timestamp).toLocaleString()}</td>
              {/* <td>
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
                    <span className="material-symbols-outlined text-danger fs-16">
                      delete
                    </span>
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
      </tbody>
    </Table>
  </div>
  <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
</div>
    </>
  );
};

export default AllProducts;
