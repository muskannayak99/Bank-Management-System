import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import Delete_Customer from "./Delete_Customer";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { getAllCustomers } from "../../API/customerAPI";

function Customer({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();

  const [searchCustomer, setSearchCustomer] = useState("");
  const [customer, setCustomer] = useState([]);
  const [isDelete, setIsDelete] = useState({
    flag: false,
    item: {},
  });
  // console.log("isdelete", isDelete);

  const deleteHandle = (flag, item) => {
    setIsDelete({
      flag: flag,
      item: item,
    });
  };

  useEffect(() => {
    const fetch = async (req, res) => {
      try {
        const data = await getAllCustomers();
        setCustomer(data.allcustomer);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetch();
  }, [isDelete]);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const customers = customer.filter((value) => {
    const searchString = searchCustomer.toLowerCase();
    return (
      value.customerName.toLowerCase().includes(searchString) ||
      value.registerDate.toLowerCase().includes(searchString) ||
      value.accountStatus.toLowerCase().startsWith(searchString) ||
      value.accountType.toLowerCase().includes(searchString)
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
                        <h3>{t("CUSTOMER_MANAGEMENT")}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex">
                    <div className="buttons d-flex">
                      <Link to="/addcustomer" className="ctr-btn">
                        <img src={images.add} alt="" />
                      </Link>
                    </div>
                    <input
                      type="text"
                      className="custom-input-field"
                      placeholder={t("SEARCH_CUSTOMER")}
                      value={searchCustomer}
                      onChange={(e) => setSearchCustomer(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xxl-12">
                    <div className="table-responsive">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th scope="col">{t("CUSTOMER_ID")}</th>
                            <th scope="col">{t("CUSTOMER_NAME")}</th>
                            <th scope="col">{t("ACCOUNT_NO")}</th>
                            <th scope="col">{t("REGISTER_DATE")}</th>
                            <th scope="col">{t("ACCOUNT_TYPE")}</th>
                            <th scope="col">{t("ACCOUNT_STATUS")}</th>
                            <th scope="col">{t("ACTION")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <span className="d-flex align-items-center cusProfileCir">
                                  <img
                                    src={
                                      item.profileImage
                                        ? `http://localhost:8080${item.profileImage}`
                                        : images.avatar
                                    }
                                    alt=""
                                  />
                                  <span>{item.customerName}</span>
                                </span>
                              </td>
                              <td>{item.accountNum}</td>
                              <td>{dateFormat(item.registerDate)}</td>
                              <td>{item.accountType}</td>
                              <td>{item.accountStatus}</td>
                              <td>
                                <div className="action-btn">
                                  <Link
                                    to="/editcustomer"
                                    state={{ indivisualData: item }}
                                  >
                                    <img src={images.Edit} alt="" />
                                  </Link>
                                  <Link
                                    onClick={(e) => deleteHandle(true, item)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    <img src={images.Delete} alt="" />
                                  </Link>
                                  <Link
                                    to="/viewcustomer"
                                    state={{ indivisualData: item }}
                                  >
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
          <Delete_Customer
            DeleteEvent={{ isDelete, deleteHandle }}
            images={images}
          />
        </div>
      </div>
    </>
  );
}

export default Customer;
