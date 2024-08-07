import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { updateCustomer } from "../../API/customerAPI";
import { useValidation } from "../../utils/validations";

function Edit_Customer({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const { validateCustomerData } = useValidation();

  const location = useLocation();
  const { indivisualData } = location.state || {};
  console.log(indivisualData);
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState(indivisualData || {});
  const [errors, setErrors] = useState({});
  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    if (indivisualData) {
      setCustomerData(indivisualData);
    }
  }, [indivisualData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("name is", name);
    console.log("value is", value);

    if (name === "profileImage") {
      setSelectImage(files[0]);
    } else {
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = customerData._id;
    console.log("id is", id);

    console.log(customerData);

    const formData = new FormData();
    Object.keys(customerData).forEach((key) => {
      formData.append(key, customerData[key]);
    });
    if (selectImage) {
      formData.append("profileImage", selectImage);
    }

    const validationErrors = validateCustomerData(customerData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("FormData content", formData);

      const fun = async (req, res) => {
        try {
          const data = await updateCustomer(id, formData); // Use the updateCustomer function
          if (data) {
            toast.success(t("UPDATED_CUSTOMER"));
            setTimeout(() => {
              navigate("/customer");
            }, 1000);
          }
        } catch (error) {
          console.log(error);
          if (error.field) {
            setErrors({ [error.field]: t(error.msg) });
          } else {
            toast.error(t("An unexpected error occurred."));
          }
        }
      };
      fun();
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
                                {t("EDIT_CUSTOMER")}
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
                                selectImage
                                  ? URL.createObjectURL(selectImage)
                                  : `http://localhost:8080${customerData.profileImage}`
                              }
                              alt=""
                            />
                          </div>
                          <div className="p-image ml-auto">
                            <label htmlFor="logoSelect">
                              <div>
                                <img src={images.editIcon} alt="" />
                              </div>
                            </label>
                            <input
                              className="file-upload"
                              id="logoSelect"
                              name="profileImage"
                              type="file"
                              accept="image/*"
                              onChange={handleChange}
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
                            {t("CUSTOMER_NAME")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            name="customerName"
                            value={customerData.customerName}
                            onChange={handleChange}
                          />
                          {errors.customerName && (
                            <p className="required-validation">
                              {errors.customerName}
                            </p>
                          )}
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
                            value={customerData.phoneNum}
                            onChange={handleChange}
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
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="email"
                            name="email"
                            value={customerData.email}
                            onChange={handleChange}
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
                            {t("ACOUNT_NUMBER")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="accountnumber"
                            name="accountNum"
                            value={customerData.accountNum}
                            onChange={handleChange}
                          />
                          {errors.accountNum && (
                            <p className="required-validation">
                              {errors.accountNum}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="date" className="custom-form-label">
                            {t("REGISTER_DATE")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="date"
                            name="registerDate"
                            value={customerData.registerDate}
                            onChange={handleChange}
                          />
                          {errors.registerDate && (
                            <p className="required-validation">
                              {errors.registerDate}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="type" className="custom-form-label">
                            {t("ACCOUNT_TYPE")}
                            <span className="required-validation">*</span>
                          </label>
                          <select
                            className="custom-input-field"
                            id="type"
                            name="accountType"
                            value={customerData.accountType}
                            onChange={handleChange}
                          >
                            <option value="">{t("SELECT_TYPE")}</option>
                            <option value="Savings Account" selected>
                              {t("Savings Account")}
                            </option>
                            <option value="Salary Account">
                              {t("Salary Account")}
                            </option>
                            <option value="Fixed Deposit Account">
                              {t("Fixed Deposit Account")}
                            </option>
                            <option value="Current Account">
                              {t("Current Account")}
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
                                name="accountStatus"
                                value="active"
                                checked={
                                  customerData.accountStatus === "active"
                                }
                                onChange={handleChange}
                              />
                              <label className="ps-1" htmlFor="active">
                                {t("ACTIVE")}
                              </label>
                            </div>

                            <div className="containGender">
                              <input
                                id="deactive"
                                type="radio"
                                name="accountStatus"
                                value="deactive"
                                checked={
                                  customerData.accountStatus === "deactive"
                                }
                                onChange={handleChange}
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
                            name="description"
                            value={customerData.description}
                            onChange={handleChange}
                            rows="6"
                          ></textarea>
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            {t("UPDATE")}
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

export default Edit_Customer;
