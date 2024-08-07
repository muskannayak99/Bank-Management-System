import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { verifyOtp } from "../../API/userAPI";
import AuthContext from "../../Context/AuthContext";

function VerifyOtp({
  email,
  fullname,
  phoneNum,
  password,
  images,
  navigate,
  setOtpSent,
}) {
  const { t } = useTranslation();
  const { signup } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp({
        email,
        otp,
        fullname,
        phoneNum,
        password,
      });
      if (response.status) {
        signup(response.token);
        toast.success(t("REGISTERED_SUCCESS"));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      if (err.response && err.response.data) {
        setErrors(t(err.response.data.message));
      }
    }
  };

  const handleBack = () => {
    setOtpSent && setOtpSent(false);
  };
  return (
    <div className="login">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 noPadding mx-auto login-formCenterAlign">
            <div className="login-form">
              <div className="header-img">
                <img src={images.logo} alt="" />
              </div>
              <div className="heading-text">
                <h3>{t("VERIFY_OTP")}</h3>
                <p>{t("ENTER_OTP_EMAIL")}</p>
              </div>
              <div className="form">
                <form className="row g-2" onSubmit={handleVerifyOtp}>
                  <div className="col-md-12">
                    <label htmlFor="otp" className="custom-form-label">
                      {t("OTP")}
                    </label>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      type="test"
                      className="custom-input-field"
                      id="otp"
                      placeholder={t("ENTER_OTP")}
                    />
                    {errors && <p className="required-validation">{errors}</p>}
                  </div>
                  <div className="col-md-12 mt-4">
                    <button className="custom-btn">{t("VERIFY_OTP")}</button>
                  </div>
                  <p className="d-flex mt-4 justify-content-center">
                    <Link to="/" onClick={handleBack}>
                      {t("BACK")}
                    </Link>
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
  );
}

export default VerifyOtp;
