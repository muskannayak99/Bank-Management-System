import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { resetPassword } from "../../API/userAPI";
import { useValidation } from "../../utils/validations";

function ResetPassword() {
  const { t } = useTranslation();
  const { validateResetPassword } = useValidation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token:", token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateResetPassword(password, confirmPassword);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await resetPassword(token, {
          password,
          confirmPassword,
        });
        if (response.status) {
          toast.success(t("PASSWORD_CHANGED"));
          setTimeout(() => navigate("/login"), 1000);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 noPadding mx-auto login-formCenterAlign">
              <div className="login-form">
                <div className="header-img">
                  <img src={images.logo} alt="" />
                </div>
                <div className="heading-text">
                  <h3>{t("RESET_PASSWORD")}</h3>
                  <p>{t("ACCOUNT_DETAILS")}</p>
                </div>
                <div className="form">
                  <form className="row g-2" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                      <label className="custom-form-label">
                        {t("NEW_PASSWORD")}
                      </label>
                      <div className="possionIconInput">
                        <img
                          src={passwordVisible ? images.eye : images.offeye}
                          alt=""
                          className="eyeIconView"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={passwordVisible ? "text" : "password"}
                          className="custom-input-field"
                          id="newPassword"
                          placeholder={t("ENTER_NEW_PASSWORD")}
                        />
                      </div>
                      {errors.password && (
                        <p className="required-validation">{errors.password}</p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="confirmPassword"
                        className="custom-form-label"
                      >
                        {t("CONFIRM_PASSWORD")}
                      </label>
                      <div className="possionIconInput">
                        <img
                          src={
                            confirmPasswordVisible ? images.eye : images.offeye
                          }
                          alt=""
                          className="eyeIconView"
                          onClick={toggleConfirmPasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                        <input
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type={confirmPasswordVisible ? "text" : "password"}
                          className="custom-input-field"
                          id="confirmPassword"
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
                      <button className="custom-btn">
                        {t("RESET_PASSWORD")}
                      </button>
                    </div>
                    <p className="d-flex mt-4 justify-content-center">
                      <Link to="/forgotpassword">{t("BACK")}</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6 noPadding mx-auto">
              <div className="rightBGColor">
                <img src={images.RightAuthImg} alt="" className="img-fluid " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
