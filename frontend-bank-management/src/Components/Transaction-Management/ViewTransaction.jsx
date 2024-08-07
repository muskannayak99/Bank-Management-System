import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";

function ViewTransaction({ iscollapsed, setIsCollapsed }) {
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
                                <Link to="/transaction">
                                  {t("TRANSACTION_MANAGEMENT")}
                                </Link>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {t("VIEW_TRANSACTION")}
                              </li>
                            </ol>
                          </nav>
                          <h3>{t("TRANSACTION")}</h3>
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
                          <label
                            htmlFor="fullname"
                            className="custom-form-label"
                          >
                            {t("FULL_NAME")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="test"
                            className="custom-input-field"
                            id="fullname"
                            name="customerName"
                            value={indivisualData.customerName}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="balance"
                            className="custom-form-label"
                          >
                            {t("BALANCE")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="balance"
                            name="balance"
                            value={indivisualData.balance}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="deposit"
                            className="custom-form-label"
                          >
                            {t("DEPOSIT")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="deposit"
                            name="deposit"
                            value={indivisualData.deposit}
                            disabled
                          />
                        </div>

                        <div className="col-md-4">
                          <label
                            htmlFor="withdraw"
                            className="custom-form-label"
                          >
                            {t("WITHDRAW")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="withdraw"
                            name="withdraw"
                            value={indivisualData.withdraw}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="transactionDate "
                            className="custom-form-label"
                          >
                            {t("TRANSACTION_DATE")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="transactionDate"
                            name="transactionDate"
                            value={indivisualData.transactionDate}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email" className="custom-form-label">
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
                        <div className="col-md-12">
                          <label htmlFor="status" className="custom-form-label">
                            {t("STATUS")}
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
                              <label htmlFor="active">{t("ACTIVE")}</label>
                            </div>
                            <div className="containGender">
                              <input
                                id="deactive"
                                type="radio"
                                name="accountStatus"
                                value="deactive"
                                checked={
                                  indivisualData.accountStatus === "deactive"
                                }
                              />
                              <label htmlFor="deactive">{t("DEACTIVE")}</label>
                            </div>
                          </span>
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

export default ViewTransaction;
