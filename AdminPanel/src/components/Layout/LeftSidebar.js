"use client";

import { Accordion } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const LeftSidebar = ({ toogleActive }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="sidebar-area">
        <div className="logo position-relative">
          <Link
            href="/dashboard/ecommerce/"
            className="d-block text-decoration-none position-relative"
          >
            <Image
              src="/images/logo.svg"
              alt="logo-icon"
              width={60}
              height={60}
            />
            <span className="logo-text fw-bold text-dark"></span>
          </Link>
          <button
            className="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y"
            onClick={toogleActive}
          >
            <i className="material-symbols-outlined fs-24">close</i>
          </button>
        </div>

        <div className="sidebar-menu">
        
          <Accordion defaultActiveKey="0" flush>

      

       

 

           
            
        
            <div className="menu-item">
              <Link
                href="/dashboard/"
                className={`menu-link ${
                  pathname === "/dashboard/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">dashboard</i>
                <span className="title">Dashboard</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                href="/panel/booking/"
                className={`menu-link ${pathname === "/panel/booking/" ? "active" : ""}`}
              >
                <i className="material-symbols-outlined">orders</i>
                <span className="title">Bookings</span>
              </Link>
            </div>
            <div className="menu-item">
              <Link
                href="/vendor/"
                className={`menu-link ${
                  pathname === "/vendor/" ? "active" : ""
                }`}
              >
                 <i className="material-symbols-outlined">people</i>
                <span className="title">Vendor</span>
              </Link>
            </div>
            <div className="menu-item">
              <Link
                href="/drivers/"
                className={`menu-link ${
                  pathname === "/drivers/" ? "active" : ""
                }`}
              >
                 <i className="material-symbols-outlined">people</i>
                <span className="title">Driver</span>
              </Link>
            </div>


            <div className="menu-item">
              <Link
                href="/cabs/manage-cabs/"
                className={`menu-link ${
                  pathname === "/cabs/manage-cabs/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">airport_shuttle</i>
                <span className="title">Cabs</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                href="/cabs/reviews/"
                className={`menu-link ${
                  pathname === "/cabs/reviews/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">star</i>
                <span className="title">Reviews</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                href="/panel/coupons/"
                className={`menu-link ${
                  pathname === "/panel/coupons/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">loyalty</i>
                <span className="title">Coupons</span>
              </Link>
            </div>

       

            <Accordion.Item eventKey="25">
              <Accordion.Header>
                <i className="material-symbols-outlined">settings</i>
                <span className="title">Settings</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/settings/account-settings/"
                      className={`menu-link ${
                        pathname === "/settings/account-settings/"
                          ? "active"
                          : ""
                      }`}
                    >
                      Account Settings
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/change-password/"
                      className={`menu-link ${
                        pathname === "/settings/change-password/"
                          ? "active"
                          : ""
                      }`}
                    >
                      Change Password
                    </Link>
                  </li>

     
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <Link
                href="/authentication/logout/"
                className={`menu-link ${
                  pathname === "/authentication/logout/" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="title">Logout</span>
              </Link>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
