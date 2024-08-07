import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";

function Dashboard({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const [totalCustomer, setTotalCustomer] = useState([]);
  const [totalStaff, setTotalStaff] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState([]);

  useEffect(() => {
    const fun1 = async () => {
      try {
        const [customerRes, staffRes, transactionRes] = await Promise.all([
          axios.get("http://localhost:8080/customer/allcustomerview"),
          axios.get("http://localhost:8080/staff/allstaffview"),
          axios.get("http://localhost:8080/transaction/alltransactionview"),
        ]);

        setTotalCustomer(customerRes.data.allcustomer);
        setTotalStaff(staffRes.data.allstaff);
        setTotalTransaction(transactionRes.data.alltransaction);
      } catch (error) {
        console.error(error);
      }
    };
    fun1();
  }, []);
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
                <div className="row">
                  <div className="col-xxl-12">
                    <div className="greetingsText">
                      <div className="greetingsText-heading">
                        <h3>{t("DASHBOARD")}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xxl-12">
                    <div className="row">
                      <div className="col-lg-3 col-md-6 mb-3">
                        <div className="custom-card offlinewelcome">
                          <div className="left-data">
                            <div className="heading">
                              <h2 className="count">{t("WELCOME")}</h2>
                              <span>{t("NATIONAL_BANK")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6  mb-3">
                        <div className="custom-card ">
                          <div className="left-data">
                            <div className="heading">
                              <h2 className="count">{totalCustomer.length}</h2>
                              <span>{t("TOTAL_CUSTOMER")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6  mb-3">
                        <div className="custom-card ">
                          <div className="left-data">
                            <div className="heading">
                              <h2 className="count">{totalStaff.length}</h2>
                              <span>{t("TOTAL_STAFF")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6  mb-3">
                        <div className="custom-card ">
                          <div className="left-data">
                            <div className="heading">
                              <h2 className="count">
                                {totalTransaction.length}
                              </h2>
                              <span>{t("TOTAL_TRANSACTION")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Dashboard;
