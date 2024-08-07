import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { addCustomer } from "../../API/customerAPI";
import { useValidation } from "../../utils/validations";

function Add_Customer({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const { validateAddCustomer } = useValidation();
  const [customerName, setCustomerName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(handleSubmit);
    console.log(customerName);
    console.log(phoneNum);
    console.log(email);
    console.log(accountNum);
    console.log(registerDate);
    console.log(accountType);
    console.log(accountStatus);
    console.log(description);
    // console.log(profileImage);

    const formErrors = validateAddCustomer(
      customerName,
      phoneNum,
      email,
      accountNum,
      registerDate,
      accountType,
      accountStatus,
      profileImage
    );

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const formData = new FormData();
      formData.append("customerName", customerName);
      formData.append("email", email);
      formData.append("phoneNum", phoneNum);
      formData.append("accountNum", accountNum);
      formData.append("registerDate", registerDate);
      formData.append("accountType", accountType);
      formData.append("accountStatus", accountStatus);
      formData.append("description", description);
      if (profileImage) formData.append("profileImage", profileImage);

      try {
        const response = await addCustomer(formData);
        if (response.status) {
          toast.success(t("ADDED_NEW_CUSTOMER"));
          setTimeout(() => {
            navigate("/customer");
          }, 1000);
        } else {
          setErrors({ [response.field]: t(response.msg) });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
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
                                {t("ADD_CUSTOMER")}
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
                                profileImage
                                  ? URL.createObjectURL(profileImage)
                                  : `http://localhost:8080${profileImage}`
                              }
                              alt=""
                            />
                          </div>
                          <div className="p-image ml-auto">
                            <label htmlFor="logoSelect">
                              <div>
                                <img src={images.camera} alt="" />
                              </div>
                            </label>
                            <input
                              className="file-upload"
                              id="logoSelect"
                              name="projectLogo"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                        <h6>{t("PROFILE_IMAGE")}</h6>
                        {errors.profileImage && (
                          <p className="required-validation">
                            {errors.profileImage}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                        <div className="col-md-4">
                          <label
                            htmlFor="fullname"
                            className="custom-form-label"
                          >
                            {t("CUSTOMER_NAME")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            placeholder={t("ENTER_NAME")}
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                          />
                          {errors.customerName && (
                            <p className="required-validation">
                              {errors.customerName}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="" className="custom-form-label">
                            {t("PHONE_NO")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id=""
                            placeholder={t("ENTER_NUMBER")}
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                          />
                          {errors.phoneNum && (
                            <p className="required-validation">
                              {errors.phoneNum}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email" className="custom-form-label">
                            {t("EMAIL")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="email"
                            placeholder={t("ENTER_EMAIL")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <p className="required-validation">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="accountnumber"
                            className="custom-form-label"
                          >
                            {t("ACCOUNT_NUMBER")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="accountnumber"
                            placeholder={t("ENTER_NUMBER")}
                            value={accountNum}
                            onChange={(e) => setAccountNum(e.target.value)}
                          />
                          {errors.accountNum && (
                            <p className="required-validation">
                              {errors.accountNum}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="" className="custom-form-label">
                            {t("REGISTER_DATE")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id=""
                            value={registerDate}
                            onChange={(e) => setRegisterDate(e.target.value)}
                          />
                          {errors.registerDate && (
                            <p className="required-validation">
                              {errors.registerDate}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email" className="custom-form-label">
                            {t("ACCOUNT_TYPE")}
                            <span className="required-validation">*</span>
                          </label>
                          <select
                            className="custom-input-field"
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                          >
                            <option value="" selected>
                              {t("SELECT_TYPE")}
                            </option>
                            <option value="SAVING_ACC">
                              {t("SAVING_ACC")}
                            </option>
                            <option value="Salary Account">
                              {t("SALARY_ACC")}
                            </option>
                            <option value="Fixed Deposit Account">
                              {t("FIXED_DEPOSIT_ACC")}
                            </option>
                            <option value="Current Account">
                              {t("CURRENT_ACC")}
                            </option>
                          </select>
                          {errors.accountType && (
                            <p className="required-validation">
                              {errors.accountType}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="status" className="custom-form-label">
                            {t("ACCOUNT_STATUS")}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="active"
                                type="radio"
                                name="status"
                                value="active"
                                checked={accountStatus === "active"}
                                onChange={(e) =>
                                  setAccountStatus(e.target.value)
                                }
                              />
                              <label className="ps-1" htmlFor="active">
                                {t("ACTIVE")}
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="deactive"
                                type="radio"
                                name="status"
                                value="deactive"
                                checked={accountStatus === "deactive"}
                                onChange={(e) =>
                                  setAccountStatus(e.target.value)
                                }
                              />
                              <label className="ps-1" htmlFor="deactive">
                                {t("DEACTIVE")}
                              </label>
                            </div>
                          </span>
                          {errors.accountStatus && (
                            <p className="required-validation">
                              {errors.accountStatus}
                            </p>
                          )}
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
                            placeholder={t("ENTER_ADDRESS")}
                            rows="6"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            {t("ADD_CUSTOMER")}
                          </button>
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

export default Add_Customer;
