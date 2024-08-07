import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";

function View_Customer({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();

  const location = useLocation();
  const { indivisualData } = location.state || {};
  console.log(indivisualData);

  return (
    <>
      <div className="wrapper">
        <Sidebar iscollapsed={iscollapsed} images={images} />
        <div
          className={`main-container ${iscollapsed && "main-content_large"}`}
        >
          <Header
            iscollapsed={iscollapsed}
            setIsCollapsed={setIsCollapsed}
            images={images}
          />
          <div className="content">
            <div className="row mb-3">
              <div className="col-xxl-12">
                <div className="form-body">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="greetingsText mb-3">
                        <div className="greetingsText-heading">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                              <li className="breadcrumb-item">
                                <Link to="/customer">
                                  {t("CUSTOMER_MANAGEMENT")}
                                </Link>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {t("VIEW_CUSTOMER")}
                              </li>
                            </ol>
                          </nav>
                          <h3>{t("CUSTOMER")}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2">
                      <div className="addProjectlogo">
                        <div className="upload-img-box">
                          <div className="circle">
                            <img
                              src={
                                indivisualData.profileImage
                                  ? `http://localhost:8080${indivisualData.profileImage}`
                                  : images.avatar
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <h6>{t("PROFILE_IMAGE")}</h6>
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                        <div className="col-md-4">
                          <label for="fullname" className="custom-form-label">
                            {t("CUSTOMER_NAME")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            name="customerName"
                            value={indivisualData.customerName}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            for="contact-number"
                            className="custom-form-label"
                          >
                            {t("PHONE_NO")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="contact-number"
                            name="phoneNum"
                            value={indivisualData.phoneNum}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label for="email" className="custom-form-label">
                            {t("EMAIL")}
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="email"
                            name="email"
                            value={indivisualData.email}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            for="accountnumber"
                            className="custom-form-label"
                          >
                            {t("ACCOUNT_NUMBER")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="accountnumber"
                            name="accountNum"
                            value={indivisualData.accountNum}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label for="date" className="custom-form-label">
                            {t("REGISTER_DATE")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="date"
                            name="registerDate"
                            value={indivisualData.registerDate}
                          />
                        </div>
                        <div className="col-md-4">
                          <label for="type" className="custom-form-label">
                            {t("ACCOUNT_TYPE")}
                          </label>
                          <select
                            className="custom-input-field"
                            id="type"
                            name="accountType"
                            value={indivisualData.accountType}
                            disabled
                          >
                            <option>Select Type</option>
                            <option value="Savings Account" selected>
                              Savings Account
                            </option>
                            <option value="Salary Account">
                              Salary Account
                            </option>
                            <option value="Fixed Deposit Account">
                              Fixed Deposit Account
                            </option>
                          </select>
                        </div>
                        <div className="col-md-12">
                          <label for="status" className="custom-form-label">
                            {t("ACCOUNT_STATUS")}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="active"
                                type="radio"
                                name="accountStatus"
                                value="active"
                                checked={
                                  indivisualData.accountStatus === "active"
                                }
                              />
                              <label for="active">{t("ACTIVE")}</label>
                            </div>
                            <div className="containGender" disabled>
                              <input
                                id="deactive"
                                type="radio"
                                name="status"
                                value="deactive"
                                checked={
                                  indivisualData.accountStatus === "deactive"
                                }
                              />
                              <label for="deactive">{t("DEACTIVE")}</label>
                            </div>
                          </span>
                        </div>

                        <div className="col-md-8">
                          <label
                            for="description"
                            className="custom-form-label"
                          >
                            {t("ADDRESS")}
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="description"
                            name="description"
                            value={indivisualData.description}
                            disabled
                            rows="6"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default View_Customer;
