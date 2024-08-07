import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

function Header({ iscollapsed, setIsCollapsed, images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const { i18n, t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  const isOpenHandler = () => {
    setIsOpen(!isOpen);
  };
  const isCloseHandler = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", isCloseHandler);
    return () => {
      document.removeEventListener("mousedown", isCloseHandler);
    };
  }, []);

  // const logout = () => {
  //   // window.localStorage.removeItem("isLoggin");
  //   window.localStorage.removeItem("token");
  //   // setLoggedUser(null);
  // };

  const ChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageDropdownOpen(false);
  };

  return (
    <>
      <nav className="header-nav">
        <div className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="row w-100">
              <div className="col-xxl-12 d-flex justify-content-between">
                <button
                  className="collapse-btn"
                  onClick={() => {
                    setIsCollapsed(!iscollapsed);
                  }}
                >
                  <img src={images.collapsbtn} alt="" />
                </button>

                <div className="dropdown">
                  <button
                    className="collapse-btn"
                    type="button"
                    id="languageDropdownButton"
                    aria-expanded={languageDropdownOpen ? "true" : "false"}
                    onClick={() =>
                      setLanguageDropdownOpen(!languageDropdownOpen)
                    }
                  >
                    <img src={images.language_icon} alt="" />
                    {/* {i18n.language === "en" ? t("English") : t("Spanish")}  */}
                  </button>
                  <ul
                    className={`dropdown-menu ${
                      languageDropdownOpen ? "show" : ""
                    }`}
                    aria-labelledby="languageDropdownButton"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          ChangeLanguage("en");
                        }}
                      >
                        {t("ENGLISH")}
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          ChangeLanguage("es");
                        }}
                      >
                        {t("SPANISH")}
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="avatar">
                  <div className="dropdown">
                    <span className="d-flex align-items-center cusProfileCir">
                      <button
                        className={`dropdown-toggle ${isOpen ? "show" : ""}`}
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded={isOpen ? "true" : "false"}
                        onClick={isOpenHandler}
                      >
                        <img
                          src={
                            user?.profileImage
                              ? `http://localhost:8080${user.profileImage}`
                              : images.avatar
                          }
                          alt=""
                        />
                        <h6>
                          {user?.fullname}
                          <span>{t("ADMIN")}</span>
                        </h6>
                      </button>
                    </span>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          {t("PROFILE")}
                        </Link>
                      </li>
                      <li>
                        <Link to="/changepassword" className="dropdown-item">
                          {t("CHANGE_PASSWORD")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/login"
                          className="dropdown-item"
                          onClick={logout}
                        >
                          {t("LOGOUT")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
