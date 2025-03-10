"use client";

import { Dropdown } from "react-bootstrap";
import Image from "next/image"; 

const Profile = () => {
  return (
    <>
      <Dropdown className="admin-profile">
        <Dropdown.Toggle className="d-xxl-flex align-items-center bg-transparent border-0 text-start p-0 cursor">
          <div className="flex-shrink-0">
            <Image
              className="rounded-circle wh-40 administrator"
              src="/images/agent-1.png"
              alt="admin"
              width={40}
              height={40}
            />
          </div>

          <div className="flex-grow-1 ms-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-none d-xxl-block">
                <div className="d-flex align-content-center">
                  <h3>Admin</h3>
                </div>
              </div>
            </div>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="border-0 bg-white dropdown-menu-end">
          <div className="d-flex align-items-center info">
            <div className="flex-shrink-0">
              <Image
                className="rounded-circle wh-30 administrator"
                src="/images/agent-1.png"
                alt="admin"
                width={30}
                height={30}
              />
            </div>
            <div className="flex-grow-1 ms-2">
              <h3 className="fw-medium">CabMate Admin</h3>
              <span className="fs-12">Super Admin</span>
            </div>
          </div>

          <ul className="admin-link ps-0 mb-0 list-unstyled">
            <li>
              <a
                className="dropdown-item d-flex align-items-center text-body"
                href="/my-profile/"
              >
                <i className="material-symbols-outlined">account_circle</i>
                <span className="ms-2">My Profile</span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item d-flex align-items-center text-body"
                href="/settings/account-settings/"
              >
                <i className="material-symbols-outlined">settings</i>
                <span className="ms-2">Settings</span>
              </a>
            </li>

            <li>
              <a
                className="dropdown-item d-flex align-items-center text-body"
                href="/authentication/logout/"
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="ms-2">Logout</span>
              </a>
            </li>

          </ul>

       
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Profile;
