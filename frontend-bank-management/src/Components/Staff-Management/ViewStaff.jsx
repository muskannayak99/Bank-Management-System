import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";

function ViewStaff({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { item } = location.state || {};
  console.log(item);

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
                                <Link to="/staff">{t("STAFF_MANAGEMENT")}</Link>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {t("VIEW_STAFF")}
                              </li>
                            </ol>
                          </nav>
                          <h3>{t("STAFF")}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2">
                      <div className="addProjectlogo">
                        <div className="upload-img-box">
                          <div className="circle">
                            <img
                              // src={images.dummyProfile}
                              src={
                                item.profileImage
                                  ? `http://localhost:8080${item.profileImage}`
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
                            name="staffName"
                            value={item.staffName}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="role" className="custom-form-label">
                            {t("STAFF_POSITION")}
                            <span className="required-validation">*</span>
                          </label>
                          <select
                            className="custom-input-field"
                            name="staffPosition"
                            value={item.staffPosition}
                            disabled
                          >
                            <option>Select Position</option>
                            <option value="Branch Maneger" selected>
                              Branch Maneger
                            </option>
                            <option value="Assistent Manager">
                              Assistent Manager
                            </option>
                            <option value="Account Manager">
                              Account Manager
                            </option>
                            <option value="Loan Officer">Loan Officer</option>
                            <option value="Personal Banker">
                              Personal Banker
                            </option>
                            <option value="CASHIER">Cashier</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Security">Security</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="contact-number"
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
                            value={item.phoneNum}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email" className="custom-form-label">
                            {t("EMAIL")}
                          </label>
                          <input
                            type="email"
                            className="custom-input-field"
                            id="email"
                            name="email"
                            value={item.email}
                            disabled
                          />
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="salary" className="custom-form-label">
                            {t("SALARY")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="salary"
                            name="staffSalary"
                            value={item.staffSalary}
                            disabled
                          />
                        </div>

                        <div className="col-md-8">
                          <label htmlFor="gender" className="custom-form-label">
                            {t("GENDER")}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="male"
                                type="radio"
                                name="gender"
                                value="gender"
                                checked={item.gender === "male"}
                              />
                              <label htmlFor="male">{t("MALE")}</label>
                            </div>
                            <div className="containGender">
                              <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="gender"
                                checked={item.gender === "female"}
                              />
                              <label htmlFor="female">{t("FEMALE")}</label>
                            </div>
                            <div className="containGender">
                              <input
                                id="other"
                                type="radio"
                                name="gender"
                                value="gender"
                                checked={item.gender === "other"}
                              />
                              <label for="other">{t("OTHER")}</label>
                            </div>
                          </span>
                        </div>

                        <div className="col-md-8">
                          <label
                            htmlFor="description"
                            className="custom-form-label"
                          >
                            {t("ADDRESS")}
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="description"
                            name="description"
                            value={item.description}
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

export default ViewStaff;
