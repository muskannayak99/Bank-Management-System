import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateStaff } from "../../API/staffAPI";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { useValidation } from "../../utils/validations";

function EditStaff({ iscollapsed, setIsCollapsed }) {
  const { validateStaffData } = useValidation();
  const { t } = useTranslation();
  const location = useLocation();
  const { item } = location.state || {};
  console.log(item);

  const [staffData, setStaffData] = useState(item || {});
  const [errors, setErrors] = useState({});
  const [selectImage, setSelectImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (item) {
      setStaffData(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("name is", name);
    console.log("value is", value);

    if (name === "profileImage") {
      setSelectImage(files[0]);
    } else {
      setStaffData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = staffData._id;
    console.log("id is", id);

    console.log(handleSubmit);
    console.log(staffData);

    const formData = new FormData();
    Object.keys(staffData).forEach((key) => {
      formData.append(key, staffData[key]);
    });
    if (selectImage) {
      formData.append("profileImage", selectImage);
    }

    const validationErrors = validateStaffData(staffData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("FormData content", formData);

      try {
        const data = await updateStaff(id, formData);
        console.log(data);
        toast.success(t("UPDATED_STAFF"));
        setTimeout(() => {
          navigate("/staff");
        }, 1000);
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ [error.response.data.field]: t(error.response.data.msg) });
        } else {
          toast.error(t("An unexpected error occurred."));
        }
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
                                <Link to="/staff">{t("STAFF_MANAGEMENT")}</Link>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {t("EDIT_STAFF")}
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
                              src={
                                selectImage
                                  ? URL.createObjectURL(selectImage)
                                  : `http://localhost:8080${staffData.profileImage}`
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
                            {t("FULL_NAME")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            name="staffName"
                            value={staffData.staffName}
                            onChange={handleChange}
                          />
                          {errors.staffName && (
                            <p className="required-validation">
                              {errors.staffName}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="role" className="custom-form-label">
                            {t("STAFF_POSITION")}
                            <span className="required-validation">*</span>
                          </label>
                          <select
                            className="custom-input-field"
                            name="staffPosition"
                            value={staffData.staffPosition}
                            onChange={handleChange}
                          >
                            <option>{t("SELECT_POSITION")}</option>
                            <option value="Branch Maneger" selected>
                              {t("BRANCH_MANAGER")}
                            </option>
                            <option value="Assistant Maneger">
                              {t("ASSISTENT_MANAGER")}
                            </option>
                            <option value="Account Maneger">
                              {t("ACCOUNT_MANAGER")}
                            </option>
                            <option value="Loan Officer">
                              {t("LOAN_OFFICER")}
                            </option>
                            <option value="Personal Banker">
                              {t("PERSONAL_BANKER")}
                            </option>
                            <option value="Cashier">{t("Cashier")}</option>
                            <option value="Maintenance">
                              {t("MAINTENANCE")}
                            </option>
                            <option value="Security">{t("SECURITY")}</option>
                          </select>
                          {errors.staffPosition && (
                            <p className="required-validation">
                              {errors.staffPosition}
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
                            value={staffData.phoneNum}
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
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="email"
                            className="custom-input-field"
                            id="email"
                            name="email"
                            value={staffData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <p className="required-validation">
                              {errors.email}
                            </p>
                          )}
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
                            value={staffData.staffSalary}
                            onChange={handleChange}
                          />
                          {errors.staffSalary && (
                            <p className="required-validation">
                              {errors.staffSalary}
                            </p>
                          )}
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
                                value="male"
                                onChange={handleChange}
                                checked={staffData.gender === "male"}
                              />
                              <label className="ps-1" htmlFor="male">
                                {t("MALE")}
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={handleChange}
                                checked={staffData.gender === "female"}
                              />
                              <label className="ps-1" htmlFor="female">
                                {t("FEMALE")}
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="other"
                                type="radio"
                                name="gender"
                                value="other"
                                onChange={handleChange}
                                checked={staffData.gender === "other"}
                              />
                              <label className="ps-1" htmlFor="other">
                                {t("OTHER")}
                              </label>
                            </div>
                          </span>
                          {errors.gender && (
                            <p className="required-validation">
                              {errors.gender}
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
                            value={staffData.description}
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

export default EditStaff;
