import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { updateProfile } from "../../API/userAPI";
import { useValidation } from "../../utils/validations";
import AuthContext from "../../Context/AuthContext";

function Profile({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const { validateProfile } = useValidation();
  const { user } = useContext(AuthContext);

  const [loggedAdmin, setLoggedAdmin] = useState(user);
  console.log("login user is",loggedAdmin);
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedAdmin(user)
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name is", name);
    console.log("value is", value);
    setLoggedAdmin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProfile(loggedAdmin);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("fullname", loggedAdmin.fullname);
      formData.append("email", loggedAdmin.email);
      formData.append("phoneNum", loggedAdmin.phoneNum);
      if (profileImage) formData.append("profileImage", profileImage);

      console.log(formData);
      // console.log("logged admin in handle submit profile",loggedAdmin);

      const id = loggedAdmin._id;
      console.log("id in profile handle submit", id);

      try {
        const res = await updateProfile(id, formData);
        console.log(res);
        if (res.status) {
          toast.success(t("UPDATED_PROFILE"));
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
                          <h3>{t("PROFILE")}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 align-self-center">
                      <img
                        src={images.profileImage}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-lg-6 align-self-center">
                      <form className="row g-3">
                        <div className="col-md-12">
                          <div className="addProjectlogo">
                            <div className="upload-img-box">
                              <div className="circle">
                                <img
                                  src={
                                    profileImage
                                      ? URL.createObjectURL(profileImage)
                                      : `http://localhost:8080${user.profileImage}`
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
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="fullname"
                            className="custom-htmlForm-label"
                          >
                            {t("FULL_NAME")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            value={loggedAdmin.fullname}
                            name="fullname"
                            onChange={handleChange}
                          />
                          {errors.fullname && (
                            <p className="required-validation">
                              {errors.fullname}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="email"
                            className="custom-htmlForm-label"
                          >
                            {t("EMAIL")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="email"
                            className="custom-input-field"
                            id="email"
                            value={loggedAdmin.email}
                            name="email"
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <p className="required-validation">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="contact-number"
                            className="custom-htmlForm-label"
                          >
                            {t("PHONE_NO")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="phoneNum"
                            value={loggedAdmin.phoneNum}
                            name="phoneNum"
                            onChange={handleChange}
                          />
                          {errors.phoneNum && (
                            <p className="required-validation">
                              {errors.phoneNum}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-6"
                          >
                            {t("SAVE")}
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

export default Profile;
