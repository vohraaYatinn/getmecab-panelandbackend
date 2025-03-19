"use client";

import { Row, Col, Form } from "react-bootstrap";
import Image from "next/image";
import useAxios from "@/network/useAxios";
import { useEffect } from "react";
import { getProfileData } from "@/urls/urls";

const AccountSettings = () => {
  const [profileData,profileError,profileLoading,profileFetch] = useAxios()
  useEffect(()=>{
    profileFetch(getProfileData())
  },[])
  
  return (
    <>
      {/* <div className="mb-4">
        <h4 className="fs-20 mb-1">Profile</h4>
        <p className="fs-15">Update your photo and personal details here.</p>
      </div> */}

      <Form>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-4">
              <label className="label text-secondary">First Name</label>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  className="text-dark ps-5 h-55"
                  defaultValue={profileData?.data?.first_name?profileData?.data?.first_name:'N/A'}
                />
                <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20"></i>
              </Form.Group>
            </Form.Group>
          </Col>



      

          <Col lg={6}>
            <Form.Group className="mb-4">
              <label className="label text-secondary">Phone</label>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  className="text-dark ps-5 h-55"
                  defaultValue={profileData?.data?.phone_number?profileData?.data?.phone_number:'N/A'}
                />
                <i className="ri-phone-line position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20"></i>
              </Form.Group>
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="mb-4">
              <label className="label text-secondary">Email</label>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  className="text-dark ps-5 h-55"
                  defaultValue={profileData?.data?.email?profileData?.data?.email:'N/A'}
                />
                <i className="ri-mail-line position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20"></i>
              </Form.Group>
            </Form.Group>
          </Col>
        </Row>

      </Form>
    </>
  );
};

export default AccountSettings;
