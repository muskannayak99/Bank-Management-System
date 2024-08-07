import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOtp from "./VerifyOtp";
import { images } from "../../assests/Images";
import { useTranslation } from "react-i18next";
import { signup } from "../../API/userAPI";
import { useValidation } from "../../utils/validations";

function Signup() {
  const { t } = useTranslation();
  const { validateUser } = useValidation();
  const [fullname, setFullname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateUser(
      fullname,
      phoneNum,
      email,
      password,
      confirmPassword
    );
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await signup({
          fullname,
          email,
          phoneNum,
          password,
          confirmPassword,
        });

        if (response.status) {
          toast.success(t("OTP_SENT"), { autoClose: 1000 });
          setOtpSent(true);
        } else {
          setErrors({ email: t(response.message) });
        }
      } catch (err) {
        console.error("Signup error:", err);
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
      {!otpSent ? (
        <div className="login">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 noPadding mx-auto login-formCenterAlign">
                <div className="login-form">
                  <div className="header-img">
                    <img src={images.logo} alt="" />
                  </div>
                  <div className="heading-text">
                    <h3>{t("SIGNUP")}</h3>
                    <p>{t("LOGIN_DETAILS")}</p>
                  </div>
                  <div className="form">
                    <form className="row g-2" onSubmit={handleSubmit}>
                      <div className="col-md-12">
                        <label htmlFor="name" className="custom-form-label">
                          {t("FULL_NAME")}
                        </label>
                        <input
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          type="text"
                          className="custom-input-field"
                          id="Name"
                          placeholder={t("ENTER_NAME")}
                        />
                        {errors.fullname && (
                          <p className="required-validation">
                            {errors.fullname}
                          </p>
                        )}
                      </div>
                      <div className="col-md-12">
                        <label
                          htmlFor="phoneNuber"
                          className="custom-form-label"
                        >
                          {t("PHONE_NO")}
                        </label>
                        <input
                          value={phoneNum}
                          onChange={(e) => setPhoneNum(e.target.value)}
                          type="text"
                          className="custom-input-field"
                          id="phoneNuber"
                          placeholder={t("ENTER_NUMBER")}
                        />
                        {errors.phoneNum && (
                          <p className="required-validation">
                            {errors.phoneNum}
                          </p>
                        )}
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="email" className="custom-form-label">
                          {t("EMAIL")}
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          className="custom-input-field"
                          id="email"
                          placeholder={t("ENTER_EMAIL")}
                        />
                        {errors.email && (
                          <p className="required-validation">{errors.email}</p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="password" className="custom-form-label">
                          {t("PASSWORD")}
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
                            id="lastname"
                            placeholder={t("ENTER_PASSWORD")}
                          />
                        </div>
                        {errors.password && (
                          <p className="required-validation">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="password" className="custom-form-label">
                          {t("CONFIRM_PASSWORD")}
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type={confirmPasswordVisible ? "text" : "password"}
                            className="custom-input-field"
                            id="lastname"
                            placeholder={t("ENTER_PASSWORD")}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="required-validation">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                      <div className="col-md-12 mt-4">
                        <button className="custom-btn">{t("SIGNUP")}</button>
                      </div>
                      <p className="d-flex mt-4 justify-content-center">
                        {t("ALREADY_REGISTER")} &nbsp;
                        <Link to="/login">{t("LOGIN")}</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6 noPadding mx-auto">
                <div className="rightBGColor">
                  <img
                    src={images.RightAuthImg}
                    alt=""
                    className="img-fluid "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VerifyOtp
          email={email}
          fullname={fullname}
          phoneNum={phoneNum}
          password={password}
          images={images}
          navigate={navigate}
          setOtpSent={setOtpSent}
        />
      )}
    </>
  );
}

export default Signup;
