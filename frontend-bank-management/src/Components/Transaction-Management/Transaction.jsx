import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import DeleteTransaction from "./DeleteTransaction";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { fetchTransactions } from "../../API/transactionAPI";

function Transaction({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();

  const [transaction, setTransaction] = useState([]);
  const [searchTransaction, setSearchTransaction] = useState("");
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
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransaction(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadTransactions();
  }, [isDelete]);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const transactions = transaction.filter((value) => {
    const searchString = searchTransaction.toLowerCase();
    return (
      value.customerName.toLowerCase().includes(searchString) ||
      value.transactionDate.toLowerCase().includes(searchString)
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
                        <h3>{t("TRANSACTION_MANAGEMENT")}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex">
                    <div className="buttons d-flex">
                      <Link to="/addtransaction" className="ctr-btn">
                        <img src={images.add} alt="" />
                      </Link>
                    </div>
                    <input
                      type="text"
                      className="custom-input-field"
                      placeholder={t("SEARCH_TRANSACTION")}
                      value={searchTransaction}
                      onChange={(e) => setSearchTransaction(e.target.value)}
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
                            <th scope="col">{t("CUSTOMER_NAME")}</th>
                            <th scope="col">{t("BALANCE")}</th>
                            <th scope="col">{t("WITHDRAW")}</th>
                            <th scope="col">{t("DEPOSIT")}</th>
                            <th scope="col">{t("TRANSACTION_DATE")}</th>
                            <th scope="col">{t("ACTION")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((item, index) => (
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
                              <td>{item.balance}</td>
                              <td>{item.withdraw}</td>
                              <td>{item.deposit}</td>
                              <td>{dateFormat(item.transactionDate)}</td>
                              <td>
                                <div className="action-btn">
                                  <Link
                                    to="/edittransaction"
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
                                    to="/viewtransaction"
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
          <DeleteTransaction
            DeleteEvent={{ isDelete, deleteHandle }}
            images={images}
          />
        </div>
      </div>
    </>
  );
}

export default Transaction;
