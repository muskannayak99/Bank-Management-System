import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { changePassword } from "../../API/userAPI";
import { useValidation } from "../../utils/validations";
import { jwtDecode } from "jwt-decode";

function Change_password({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const { validateChangePassword } = useValidation();
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldpasswordVisible, setOldpasswordVisible] = useState(false);
  const [newpasswordVisible, setNewpasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateChangePassword(
      oldpassword,
      newpassword,
      confirmPassword
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const data = {
        oldpassword,
        newpassword,
        confirmPassword,
      };
      // const userId = JSON.parse(localStorage.getItem("user"))._id;
      // const userId = JSON.parse(localStorage.getItem("token")).id;

      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      console.log("id", userId);
      try {
        const response = await changePassword(userId, data);
        if (response.status) {
          toast.success(t("UPDATED_PASSWORD"));
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (err) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.field === "oldpassword"
        ) {
          setBackendError(t(err.response.data.msg));
        } else {
          console.log(err);
        }
      }
    }
  };

  const toggleOldPasswordVisibility = () => {
    setOldpasswordVisible(!oldpasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewpasswordVisible(!newpasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <ToastContainer />
      <div className="wrapper">
        <Sidebar iscollapsed={iscollapsed} images={images} />
        <div
          className={`main-container ${
            iscollapsed ? "main-content_large" : ""
          }`}
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
                          <h3>{t("CHANGE_PASSWORD")}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 align-self-center">
                      <img
                        src={images.changepassword}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-lg-6 align-self-center">
                      <form className="row g-3">
                        <div className="col-md-12">
                          <label for="fullname" className="custom-form-label">
                            {t("PASSWORD")}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput">
                            <img
                              src={
                                oldpasswordVisible ? images.eye : images.offeye
                              }
                              alt=""
                              className="eyeIconView"
                              onClick={toggleOldPasswordVisibility}
                              style={{ cursor: "pointer" }}
                            />
                            <input
                              value={oldpassword}
                              onChange={(e) => {
                                setOldpassword(e.target.value);
                                setBackendError("");
                              }}
                              type={oldpasswordVisible ? "text" : "password"}
                              className="custom-input-field"
                              id="password"
                              placeholder={t("ENTER_OLD_PASSWORD")}
                            />
                          </div>
                          {errors.oldpassword ? (
                            <p className="required-validation">
                              {errors.oldpassword}
                            </p>
                          ) : (
                            backendError && (
                              <p className="required-validation">
                                {backendError}
                              </p>
                            )
                          )}
                        </div>
                        <div className="col-md-12">
                          <label for="fullname" className="custom-form-label">
                            {t("NEW_PASSWORD")}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput">
                            <img
                              src={
                                newpasswordVisible ? images.eye : images.offeye
                              }
                              alt=""
                              className="eyeIconView"
                              onClick={toggleNewPasswordVisibility}
                              style={{ cursor: "pointer" }}
                            />
                            <input
                              value={newpassword}
                              onChange={(e) => setNewpassword(e.target.value)}
                              type={newpasswordVisible ? "text" : "password"}
                              className="custom-input-field"
                              id="password"
                              placeholder={t("ENTER_NEW_PASSWORD")}
                            />
                          </div>
                          {errors.newpassword && (
                            <p className="required-validation">
                              {errors.newpassword}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12">
                          <label for="fullname" className="custom-form-label">
                            {t("CONFIRM_PASSWORD")}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput">
                            <img
                              src={
                                confirmPasswordVisible
                                  ? images.eye
                                  : images.offeye
                              }
                              alt=""
                              className="eyeIconView"
                              onClick={toggleConfirmPasswordVisibility}
                              style={{ cursor: "pointer" }}
                            />
                            <input
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              value={confirmPassword}
                              type={
                                confirmPasswordVisible ? "text" : "password"
                              }
                              className="custom-input-field"
                              id="password"
                              placeholder={t("ENTER_CONFIRM_PASSWORD")}
                            />
                          </div>
                          {errors.confirmPassword && (
                            <p className="required-validation">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            {t("CHANGE_PASSWORD")}
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

export default Change_password;
