"use client";

import { Row, Col, Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAxios from "@/network/useAxios";
import { login } from "@/urls/urls";
import { useEffect ,useState} from "react";
import AlertMessage from '@/components/AlertMessage/AlertMessage';

const SignInForm = () => {
  const route = useRouter()
  const [phone_number, setphone_number] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [loginResponce,
    loginError,
          loginLoading,
          loginSubmit
  ] = useAxios()
  const loginFun= async (e) => {
    e.preventDefault();
    if(phone_number.length==10){
   
    loginSubmit(login({ phone_number:phone_number,password:password}))
  }

else{
  setAlert({message:'Invalid Phone Number',variant:'danger'})
}
}

  useEffect(()=>{
    console.log(loginResponce)
if(loginResponce['access']){
  const token = loginResponce['access']; 
  localStorage.setItem("token", token);

  route.push("/dashboard")
}
  },[loginResponce])


  useEffect(()=>{
    console.log(loginError)
    if(loginError['message']){
setAlert({message:'Invalid credentials',variant:'danger'})
    }
      },[loginError])
  
  return (
    <>
        
      <div className="auth-main-content m-auto m-1230 px-3">
        <Row className="align-items-center">
          <Col lg={6} className="d-none d-lg-block">
            <Image
              src="/images/login.png"
              className="rounded-3"
              alt="login"
              width={646}
              height={804}
            />
          </Col>

          <Col lg={6}>
            <div className="mw-480 ms-lg-auto">
              <div className="d-inline-block mb-4">
                <Image
                  src="/images/logo.svg"
                  className=" for-light-logo"
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

              <h3 className="fs-28 mb-2">Welcome back to GetMeCab!</h3>
              <p className="fw-medium fs-16 mb-4">
                Sign In with admin account
              </p>

              <AlertMessage
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "" })}
      />
              <Form onSubmit={loginFun}>
  <Form.Group className="mb-4">
    <label className="label text-secondary">Phone Number</label>
    <Form.Control
      type="phone"
      className="h-55"
      placeholder="Enter your number"
      value={phone_number}
      onChange={(e) => setphone_number(e.target.value)}
    />
  </Form.Group>

  <Form.Group className="mb-4">
    <label className="label text-secondary">Password</label>
    <Form.Control
      type="password"
      className="h-55"
      placeholder="Type password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </Form.Group>

  <Form.Group className="mb-4">
    <button  
      type="submit"  // ADD THIS TO PREVENT RELOAD
      className="btn btn-primary fw-medium py-2 px-3 w-100"
      disabled={!phone_number || !password}
    >
      <div className="d-flex align-items-center justify-content-center py-1">
        <span className="material-symbols-outlined fs-20 text-white me-2">login</span>
        <span>Sign In</span>
      </div>
    </button>
  </Form.Group>
</Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignInForm;
