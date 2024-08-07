import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ iscollapsed, images }) {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <>
      <div className={`sidebar ${iscollapsed ? "sidebar_small" : " "}`}>
        <header>
          <img
            src={iscollapsed ? images.small_logo : images.logo}
            className="logo"
            alt=""
          />
        </header>
        <div className="menu">
          <div
            className={`item ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <Link to="/dashboard">
              <img src={images.dashboard} alt="" />
              <span>{t("DASHBOARD")}</span>
            </Link>
          </div>
          <div
            className={`item ${
              location.pathname.toLowerCase().includes("customer") && "active"
            }`}
          >
            <Link to="/customer">
              <img src={images.customer} alt="" />
              <span>{t("CUSTOMER")}</span>
            </Link>
          </div>
          <div
            className={`item ${
              location.pathname.toLowerCase().includes("staff") && "active"
            }`}
          >
            <Link to="/staff">
              <img src={images.staff} alt="" />
              <span>{t("STAFF")}</span>
            </Link>
          </div>
          <div
            className={`item ${
              location.pathname.toLowerCase().includes("transaction") &&
              "active"
            }`}
          >
            <Link to="/transaction">
              <img src={images.transaction} alt="#" />
              <span>{t("TRANSACTION")}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
