import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import DeleteStaff from "./DeleteStaff";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { fetchStaff } from "../../API/staffAPI";

function Staff({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();

  const [seacrhStaff, setSearchStaff] = useState("");
  const [staff, setStaff] = useState([]);
  const [isDelete, setIsDelete] = useState({
    flag: false,
    item: {},
  });
  console.log("isdelete", isDelete);

  const deleteHandle = (flag, item) => {
    setIsDelete({
      flag: flag,
      item: item,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStaff();
        setStaff(data.allstaff);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isDelete]);

  const staffs = staff.filter((value) => {
    const searchString = seacrhStaff.toLowerCase();
    return (
      value.staffName.toLowerCase().includes(searchString) ||
      value.staffPosition.toLowerCase().includes(searchString) ||
      value.gender.toLowerCase().startsWith(searchString)
    );
  });

  return (
    <>
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
                <div className="row justify-content-between align-items-center mb-3">
                  <div className="col-lg-4">
                    <div className="greetingsText">
                      <div className="greetingsText-heading">
                        <h3>{t("STAFF_MANAGEMENT")}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex">
                    <div className="buttons d-flex">
                      <Link to="/addstaff" className="ctr-btn">
                        <img src={images.add} alt="" />
                      </Link>
                    </div>
                    <input
                      type="text"
                      className="custom-input-field"
                      placeholder={t("SEARCH_STAFF")}
                      value={seacrhStaff}
                      onChange={(e) => setSearchStaff(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xxl-12">
                    <div className="table-responsive">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th scope="col">{t("ID")}</th>
                            <th scope="col">{t("STAFF_NAME")}</th>
                            <th scope="col">{t("STAFF_POSITION")}</th>
                            <th scope="col">{t("GENDER")}</th>
                            <th scope="col">{t("SALARY")}</th>
                            <th scope="col">{t("ACTION")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {staffs.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td className="d-flex">
                                <span className="d-flex align-items-center cusProfileCir">
                                  <img
                                    src={
                                      item.profileImage
                                        ? `http://localhost:8080${item.profileImage}`
                                        : images.avatar
                                    }
                                    alt=""
                                  />
                                  <span>{item.staffName}</span>
                                </span>
                              </td>
                              <td>{item.staffPosition}</td>
                              <td>{item.gender}</td>
                              <td>{item.staffSalary}</td>
                              <td>
                                <div className="action-btn">
                                  <Link to="/editstaff" state={{ item }}>
                                    <img src={images.Edit} alt="" />
                                  </Link>
                                  <Link
                                    onClick={(e) => deleteHandle(true, item)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    <img src={images.Delete} alt="" />
                                  </Link>
                                  <Link to="/viewstaff" state={{ item }}>
                                    <img src={images.view} alt="" />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DeleteStaff
            DeleteEvent={{ isDelete, deleteHandle }}
            images={images}
          />
        </div>
      </div>
    </>
  );
}

export default Staff;
