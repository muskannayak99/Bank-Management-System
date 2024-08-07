import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { forgotpassword } from "../../API/userAPI";
import { useValidation } from "../../utils/validations";

function ForgotPassword() {
  const { t } = useTranslation();
  const { validateForgotPassword } = useValidation();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForgotPassword(email);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await forgotpassword(email);
        if (response.status) {
          toast.success(t("CHECK_RESET_LINK"));
          setTimeout(() => navigate("/login"), 1000);
        } else {
          setErrors({ email: t(response.message) });
        }
      } catch (err) {
        console.error(err);
      }
    }
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
                  <h3>{t("FORGOT_PASSWORD")}</h3>
                  <p>{t("ENTER_EMAIL_ACCOUNT")}</p>
                </div>
                <div className="form" onSubmit={handleSubmit}>
                  <form className="row g-2">
                    <div className="col-md-12">
                      <label className="custom-form-label">{t("EMAIL")}</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="custom-input-field"
                        id="email"
                        placeholder={t("ENTER_EMAIL_ADDRESS")}
                      />
                      {errors.email && (
                        <p className="required-validation">{errors.email}</p>
                      )}
                    </div>

                    <div className="col-md-12 mt-4">
                      <button className="custom-btn">{t("CONTINUE")}</button>
                    </div>
                    <p className="d-flex mt-4 justify-content-center">
                      <Link to="/login">{t("BACK")}</Link>
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

export default ForgotPassword;
