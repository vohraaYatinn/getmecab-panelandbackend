"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  return (
    <>
      <ul className="ps-0 mb-4 list-unstyled d-flex flex-wrap gap-2 gap-lg-3">
        <li>
          <Link
            href="/settings/account-settings/"
            className={`btn border border-primary text-primary py-2 px-3 fw-semibold ${
              pathname === "/settings/account-settings/"
                ? "btn-primary text-white"
                : "bg-transparent"
            }`}
          >
            Account Settings
          </Link>
        </li>

        <li>
          <Link
            href="/settings/change-password/"
            className={`btn border border-primary text-primary py-2 px-3 fw-semibold ${
              pathname === "/settings/change-password/"
                ? "btn-primary text-white"
                : "bg-transparent"
            }`}
          >
            Change Password
          </Link>
        </li>

       
      </ul>
    </>
  );
};

export default Nav;
