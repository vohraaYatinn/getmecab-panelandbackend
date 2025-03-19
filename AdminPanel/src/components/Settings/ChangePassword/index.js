"use client";

import { Row, Col, Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import AlertMessage from '@/components/AlertMessage/AlertMessage';

import useAxios from "@/network/useAxios";
import { changePassword } from "@/urls/urls";
import { useEffect ,useState} from "react";



const ResetPasswordForm = () => {
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordResponce,
    changePasswordError,
          changePasswordLoading,
          changePasswordSubmit
  ] = useAxios()

  // Handle form submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if(!oldPassword){
      setAlert({ message: "Old password is required", variant: "danger" });
      return;
    }
   else if(!newPassword){
      setAlert({ message: "New password is required", variant: "danger" });
      return;
    }
   else  if(!confirmPassword){
      setAlert({ message: "Confirm password is required", variant: "danger" });
      return;
    }
    else if (newPassword !== confirmPassword) {
      setAlert({ message: "Passwords do not match", variant: "danger" });
      return;
    }
else if (oldPassword && newPassword && confirmPassword) {
  changePasswordSubmit(changePassword({
    old_password: oldPassword,
    new_password: newPassword,
  }))
}
  };
  useEffect(()=>{
if(changePasswordResponce["result"] == 'success'){
  setAlert({ message: "Password updated successfully", variant: "success" });
  setOldPassword("");
  setNewPassword("");
  setConfirmPassword("");
}
if (changePasswordResponce['result'] == 'fail'){
  if (error.response) {
    setAlert({
      message: error.response.data.error || "Failed to update password",
      variant: "danger",
    });
  } else {
    setAlert({ message: "An error occurred, please try again.", variant: "danger" });
  }

}
  },[changePasswordResponce])

  useEffect(()=>{

      if (changePasswordError.response) {
        setAlert({
          message: changePasswordError.response.data.error || "Failed to update password",
          variant: "danger",
        });
      } 
  },[changePasswordError])

  return (
    <>
      <div className="auth-main-content m-auto m-1230 px-3">
        <Row className="align-items-center">
          <Col lg={6} className="d-none d-lg-block">
            <Image
              src="/images/reset.jpg"
              className="rounded-3"
              alt="reset"
              width={646}
              height={804}
            />
          </Col>

          <Col lg={6}>
            <div className="mw-480 ms-lg-auto">
              <div className="d-inline-block mb-4">
                <Image
                  src="/images/logo.svg"
                  className="rounded-3 for-light-logo"
                  alt="login"
                  width={100}
                  height={26}
                />
                <Image
                  src="/images/white-logo.svg"
                  className="rounded-3 for-dark-logo"
                  alt="login"
                  width={100}
                  height={26}
                />
              </div>

              <h3 className="fs-28 mb-2">Reset Password?</h3>
              <p className="fw-medium fs-16 mb-4">
                Enter your new password and confirm it another time in the field below.
              </p>
              <AlertMessage
                message={alert.message}
                variant={alert.variant}
                onClose={() => setAlert({ message: "", variant: "" })}
              />
              <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Old Password</label>
                  <Form.Control
                    type="password"
                    className="h-55"
                    placeholder="Type your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">New Password</label>
                  <Form.Control
                    type="password"
                    className="h-55"
                    placeholder="Type your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Confirm Password</label>
                  <Form.Control
                    type="password"
                    className="h-55"
                    placeholder="Type your confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary fw-medium py-2 px-3 w-100"
              
                  >
                    <div className="d-flex align-items-center justify-content-center py-1">
                      <span className="material-symbols-outlined fs-20 text-white me-2">
                        autorenew
                      </span>
                      <span>Send</span>
                    </div>
                  </button>
                </Form.Group>

                <Form.Group>
                  <p>
                    Back to{" "}
                    <Link
                      href="/authentication/sign-in/"
                      className="fw-medium text-primary text-decoration-none"
                    >
                      Sign In
                    </Link>
                  </p>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ResetPasswordForm;
