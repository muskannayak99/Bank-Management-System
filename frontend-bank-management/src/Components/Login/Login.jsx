import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { loginUser } from "../../API/userAPI";
import { useValidation } from "../../utils/validations";
import AuthContext from "../../Context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const { t } = useTranslation();
  const { validateLogin } = useValidation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("credentials"));
    if (savedCredentials) {
      setEmail(savedCredentials.email);
      setPassword(savedCredentials.password);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateLogin(email, password);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await loginUser({ email, password });

        if (response.status) {
          login(response.token);

          if (rememberMe) {
            localStorage.setItem(
              "credentials",
              JSON.stringify({ email, password })
            );
          } else {
            localStorage.removeItem("credentials");
          }
          toast.success(t("LOGIN_SUCCESS"));
          setTimeout(() => navigate("/dashboard"), 1000);
        } else {
          setErrors({ [response.field]: t(response.msg) });
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.msg) {
          setErrors({ [err.response.data.field]: t(err.response.data.msg) });
        } else {
          console.error(err);
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
                  <h3>{t("LOGIN")}</h3>
                  <p>{t("LOGIN_DETAILS")}</p>
                </div>
                <div className="form">
                  <form className="row g-2" onSubmit={handleSubmit}>
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
                    <div className="col-md-12">
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
                          id="password"
                          placeholder={t("ENTER_PASSWORD")}
                        />
                      </div>
                      {errors.password && (
                        <p className="required-validation">{errors.password}</p>
                      )}
                    </div>
                    <div className="forget-password">
                      <div className="form-check d-flex">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          id="flexCheckChecked"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        &nbsp;
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          {t("REMEMBER_ME")}
                        </label>
                      </div>
                      <Link to="/forgotpassword" className="password-btn">
                        {t("FORGOT_PASSWORD")}
                      </Link>
                    </div>
                    <div className="col-md-12 mt-4">
                      <button type="submit" className="custom-btn">
                        {t("LOGIN")}
                      </button>
                    </div>
                    <p className="d-flex mt-4 justify-content-center">
                      {t("DONT_HAVE_ACCOUNT")} &nbsp;
                      <Link to="/">{t("SIGN_UP")}</Link>
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

export default Login;
