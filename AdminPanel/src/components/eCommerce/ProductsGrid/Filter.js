"use client";

import { Card, Form } from "react-bootstrap";

const Filter = () => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-sm-flex justify-content-between align-items-center flex-wrap gap-2">
            <h4 className="fs-16 fw-medium mb-2 mb-sm-0">Filter</h4>

            <Form className="default-src-form">
              <div className="d-sm-flex flex-wrap gap-3">
                <div className="position-relative mb-2 mb-sm-0">
                  <Form.Control
                    type="text"
                    className="rounded-1"
                    placeholder="Search here"
                  />

                  <span className="material-symbols-outlined fs-18 position-absolute top-50 start-0 translate-middle-y">
                    thumb_down
                  </span>
                </div>

                <div>
                  <Form.Select
                    className="form-control rounded-1 py-0 fs-14 ps-3 bg-transparent pe-5"
                    aria-label="Default select example"
                  >
                    <option defaultValue="0">Default Shorting</option>
                    <option defaultValue="1">Apple</option>
                    <option defaultValue="2">SAMSUNG</option>
                    <option defaultValue="3">T-Shirts</option>
                  </Form.Select>
                </div>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Filter;
