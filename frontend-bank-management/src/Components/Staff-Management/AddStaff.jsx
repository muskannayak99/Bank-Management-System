import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { addStaff } from "../../API/staffAPI";
import { useValidation } from "../../utils/validations";

function AddStaff({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const { validateStaff } = useValidation();
  const [staffName, setStaffName] = useState("");
  const [staffPosition, setStaffPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [staffSalary, setStaffSalary] = useState("");
  const [gender, setGender] = useState("");
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
    console.log(staffName);
    console.log(staffPosition);
    console.log(phoneNum);
    console.log(email);
    console.log(staffSalary);
    console.log(gender);
    console.log(description);
    console.log(profileImage);

    const formErrors = validateStaff(
      staffName,
      staffPosition,
      email,
      phoneNum,
      staffSalary,
      gender,
      profileImage
    );

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const formData = new FormData();
      formData.append("staffName", staffName);
      formData.append("email", email);
      formData.append("phoneNum", phoneNum);
      formData.append("staffPosition", staffPosition);
      formData.append("staffSalary", staffSalary);
      formData.append("gender", gender);
      formData.append("description", description);
      if (profileImage) formData.append("profileImage", profileImage);

      try {
        const response = await addStaff(formData);
        if (response.status) {
          toast.success(t("ADDED_NEW_STAFF"));
          setTimeout(() => {
            navigate("/staff");
          }, 1000);
        } else {
          setErrors({ [response.field]: t(response.msg) });
        }
      } catch (error) {
        console.error(error);
        toast.error(t("FAILD"));
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="wraper">
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
                                {t("ADD_STAFF")}
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
                            {t("FULL_NAME")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="test"
                            className="custom-input-field"
                            id="fullname"
                            placeholder={t("ENTER_NAME")}
                            value={staffName}
                            onChange={(e) => setStaffName(e.target.value)}
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
                            value={staffPosition}
                            onChange={(e) => setStaffPosition(e.target.value)}
                          >
                            <option>{t("SELECT_POSITION")}</option>
                            <option value="Branch Manager">
                              {t("BRANCH_MANAGER")}
                            </option>
                            <option value="Assistent Manager">
                              {t("ASSISTENT_MANAGER")}
                            </option>
                            <option value="Account Manager">
                              {t("ACCOUNT_MANAGER")}
                            </option>
                            <option value="Loan Officer">
                              {t("LOAN_OFFICER")}
                            </option>
                            <option value="Personal Banker">
                              {t("PERSONAL_BANKER")}
                            </option>
                            <option value="Cashier">{t("CASHIER")}</option>
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
                            type="email"
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
                          <label htmlFor="salary" className="custom-form-label">
                            {t("SALARY")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="salary"
                            placeholder={t("ENTER_SALARY")}
                            value={staffSalary}
                            onChange={(e) => setStaffSalary(e.target.value)}
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
                                checked={gender === "male"}
                                onChange={(e) => setGender(e.target.value)}
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
                                checked={gender === "female"}
                                onChange={(e) => setGender(e.target.value)}
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
                                checked={gender === "other"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ps-1" htmlFor="other">
                                {t("OTHER")}
                              </label>
                            </div>
                          </span>
                          {errors.staffSalary && (
                            <p className="required-validation">
                              {errors.staffSalary}
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
                            {t("ADD_STAFF")}
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

export default AddStaff;
