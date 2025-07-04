"use client";

import { useState } from "react";
import { Dropdown, Card, Table, Button } from "react-bootstrap";
import Image from "next/image";

const topInstructorsData = [
  {
    image: "/images/user-13.jpg",
    name: "Admin Clark",
    designation: "Big Data",
    courses: 55,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
    ],
  },
  {
    image: "/images/user-14.jpg",
    name: "Ava Turner",
    designation: "UX/UI",
    courses: 120,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-half-fill",
      },
    ],
  },
  {
    image: "/images/user-15.jpg",
    name: "Lucas Morgan",
    designation: "Developer",
    courses: 86,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-line",
      },
    ],
  },
  {
    image: "/images/user-16.jpg",
    name: "Isabella Cooper",
    designation: "Designer",
    courses: 75,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-half-fill",
      },
    ],
  },
  {
    image: "/images/user-17.jpg",
    name: "Isabella Cooper",
    designation: "Designer",
    courses: 75,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-half-fill",
      },
    ],
  },
  {
    image: "/images/user-18.jpg",
    name: "Lucas Morgan",
    designation: "Developer",
    courses: 86,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-line",
      },
    ],
  },
  {
    image: "/images/user-19.jpg",
    name: "Ava Lee",
    designation: "UX/UI",
    courses: 120,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-half-fill",
      },
    ],
  },
  {
    image: "/images/user-20.jpg",
    name: "Morgan TA",
    designation: "Developer",
    courses: 86,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-line",
      },
    ],
  },
  {
    image: "/images/user-21.jpg",
    name: "Cooper SA",
    designation: "Designer",
    courses: 75,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-half-fill",
      },
    ],
  },
  {
    image: "/images/user-22.jpg",
    name: "Jhon Smith",
    designation: "Designer",
    courses: 75,
    ratings: [
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-fill",
      },
      {
        star: "ri-star-half-fill",
      },
    ],
  },

];

const RecentCustomerRatings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = topInstructorsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = topInstructorsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <h3 className="mb-0">Recent Customer Ratings</h3>

              <Dropdown className="action-opt">
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className="bg-transparent p-0"
                >
                  <span className="material-symbols-outlined">more_horiz</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="bg-white border box-shadow">
                  <Dropdown.Item href="#">
                    <span className="material-symbols-outlined">schedule</span>
                    Today
                  </Dropdown.Item>

                  <Dropdown.Item href="#">
                    <span className="material-symbols-outlined">pie_chart</span>
                    Last 7 Days
                  </Dropdown.Item>

                  <Dropdown.Item href="#">
                    <i className="material-symbols-outlined">refresh</i>
                    Last Month
                  </Dropdown.Item>

                  <Dropdown.Item href="#">
                    <span className="material-symbols-outlined">
                      calendar_today
                    </span>
                    Last 1 Year
                  </Dropdown.Item>

                  <Dropdown.Item href="#">
                    <span className="material-symbols-outlined">bar_chart</span>
                    All Time
                  </Dropdown.Item>

                  <Dropdown.Item href="#">
                    <i className="material-symbols-outlined">visibility</i>
                    View
                  </Dropdown.Item>

                  <Dropdown.Item href="#">
                    <i className="material-symbols-outlined">delete</i>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="default-table-area style-two top-instructors">
            <div className="table-responsive">
              <Table className="table align-middle border-0">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Ratings</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((value, i) => (
                    <tr key={i}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <Image
                              src={value.image}
                              className="wh-44 rounded-circle"
                              alt="user"
                              width={44}
                              height={44}
                            />
                          </div>
                          <div className="flex-grow-1 ms-2 position-relative top-2">
                            <h6 className="mb-0 fs-14 fw-medium">
                              {value.name}
                            </h6>
                            <span className="fs-12 text-body">
                              {value.designation}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>55</td>

                      <td>
                        <ul className="ps-0 mb-0 list-unstyled d-flex gap-1">
                          {value.ratings.slice(0, 5).map((value, i) => (
                            <li key={i}>
                              <i
                                className={`text-rating-color fs-16 ${value.star}`}
                              ></i>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="p-4">
            <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
              <span className="fs-12 fw-medium">
                {startIndex + 1} -{" "}
                {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
                {totalItems}
              </span>

              <div className="d-flex align-items-center">
                <ul className="pagination mb-0 justify-content-center">
                  <li className="page-item">
                    <Button
                      className="page-link icon"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      <span className="material-symbols-outlined">
                        keyboard_arrow_left
                      </span>
                    </Button>
                  </li>

                  <li className="page-item">
                    <Button
                      className="page-link icon"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <span className="material-symbols-outlined">
                        keyboard_arrow_right
                      </span>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecentCustomerRatings;
