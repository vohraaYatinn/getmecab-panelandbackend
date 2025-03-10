"use client";

import { Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const ProductsGrid = () => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-6.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>

              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>

            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              Apple MacBook Pro 16.2&quot; with M3 Pro Chip
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $3479 <del className="fs-16 fw-normal">$3599</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-7.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>
              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>
            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              SAMSUNG Galaxy Tab A9+ Tablet 11”
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $549 <del className="fs-16 fw-normal">$649</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-half-fill fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-8.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>
              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>
            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              Apple iPhone 15 Pro Max (512 GB)
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $1479 <del className="fs-16 fw-normal">$1599</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-line fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-9.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>
              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>
            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              Gildan Men&apos;s Crew T-Shirts, Multipack
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $79 <del className="fs-16 fw-normal">$89</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-10.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>
              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>
            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              Skechers Men&apos;s Summits High Range
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $849 <del className="fs-16 fw-normal">$999</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-line fs-16 text-warning"></i>
                <i className="ri-star-line fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-11.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>
              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>
            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              Amazfit GTR 3 Smart Watch for Men
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $49 <del className="fs-16 fw-normal">$69</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-12.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>
              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>
            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              SOJOS Small Round Polarized Sunglasses
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $39 <del className="fs-16 fw-normal">$49</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-half-fill fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-13.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>
              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>
            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              Nautical Clock Ship Table Clock Brass Desk
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $25 <del className="fs-16 fw-normal">$39</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-line fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={6} lg={4}>
          <div className="mb-4 transition-y">
            <div className="position-relative mb-3">
              <Link href="/ecommerce/product-details">
                <Image
                  src="/images/product-14.jpg"
                  className="rounded-3"
                  alt="product"
                  width={1070}
                  height={1070}
                />
              </Link>
              <button
                type="button"
                className="bg-body-bg bg-for-dark-mode pt-2 ps-2 position-absolute bottom-0 end-0 rounded-3 rounded-bottom-0 rounded-end-0 border-0"
              >
                <span className="material-symbols-outlined fs-24 wh-60 lh-60 bg-primary hover-bg d-inline-block text-white text-center rounded-3">
                  shopping_cart
                </span>
              </button>
            </div>
            <Link
              href="/ecommerce/product-details"
              className="text-secondary text-decoration-none fs-16 hover d-block mb-4"
            >
              Carhartt, Durable, Adjustable Crossbody Bag
            </Link>

            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-20 mb-0">
                $149 <del className="fs-16 fw-normal">$299</del>
              </h2>
              <div className="d-flex flex-wrap gap-1">
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
                <i className="ri-star-fill fs-16 text-warning"></i>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={12} lg={12}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
                <span className="fs-12 fw-medium">
                  Showing 09 of 30 Results
                </span>

                <nav aria-label="Page navigation example">
                  <ul className="pagination mb-0 justify-content-center">
                    <li className="page-item">
                      <Link
                        className="page-link icon"
                        href="#"
                        aria-label="Previous"
                      >
                        <span className="material-symbols-outlined fs-24">
                          keyboard_arrow_left
                        </span>
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link active" href="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#">
                        4
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link icon"
                        href="#"
                        aria-label="Next"
                      >
                        <span className="material-symbols-outlined fs-24">
                          keyboard_arrow_right
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductsGrid;
