import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { addTransaction } from "../../API/transactionAPI";
import { useValidation } from "../../utils/validations";

function AddTransaction({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const { validateTransaction } = useValidation();
  const [customerName, setCustomerName] = useState("");
  const [balance, setBalance] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [deposit, setDeposit] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [accountNum, setAccountNum] = useState();
  const [accountStatus, setAccountStatus] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(handleSubmit);
    console.log(customerName);
    console.log(balance);
    console.log(withdraw);
    console.log(deposit);
    console.log(transactionDate);
    console.log(accountStatus);
    console.log(accountNum);

    const formErrors = validateTransaction(
      customerName,
      accountNum,
      balance,
      withdraw,
      deposit,
      transactionDate,
      accountStatus
    );
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await addTransaction({
          customerName,
          balance,
          withdraw,
          deposit,
          transactionDate,
          accountNum,
          accountStatus,
        });
        console.log(response);
        if (response.status) {
          toast.success(t("ADDED_NEW_TRANSACTION"));
          setTimeout(() => {
            navigate("/transaction");
          }, 1000);
        }else {
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

  return (
    <>
      <ToastContainer />
      <div className="wrapper">
        <Sidebar scollapsed={iscollapsed} images={images} />
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
                <div className="form-body">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="greetingsText mb-3">
                        <div className="greetingsText-heading">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                              <li className="breadcrumb-item">
                                <Link to="/transaction">
                                  {t("TRANSACTION_MANAGEMENT")}
                                </Link>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {t("ADD_TRANSACTION")}
                              </li>
                            </ol>
                          </nav>
                          <h3>{t("TRANSACTION")}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                        <div className="col-md-4">
                          <label
                            htmlFor="fullname"
                            className="custom-form-label"
                          >
                            {t("FULL_NAME")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="test"
                            className="custom-input-field"
                            id="fullname"
                            placeholder={t("ENTER_NAME")}
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                          />
                          {errors.customerName && (
                            <p className="required-validation">
                              {errors.customerName}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="balance"
                            className="custom-form-label"
                          >
                            {t("BALANCE")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="balance"
                            placeholder={t("ENTER_AMOUNT")}
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                          />
                          {errors.balance && (
                            <p className="required-validation">
                              {errors.balance}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="deposit"
                            className="custom-form-label"
                          >
                            {t("DEPOSIT")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="deposit"
                            placeholder={t("ENTER_AMOUNT")}
                            value={deposit}
                            onChange={(e) => setDeposit(e.target.value)}
                          />
                          {errors.deposit && (
                            <p className="required-validation">
                              {errors.deposit}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="withdraw"
                            className="custom-form-label"
                          >
                            {t("WITHDRAW")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="withdraw"
                            placeholder={t("ENTER_AMOUNT")}
                            value={withdraw}
                            onChange={(e) => setWithdraw(e.target.value)}
                          />
                          {errors.withdraw && (
                            <p className="required-validation">
                              {errors.withdraw}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="transactionDate "
                            className="custom-form-label"
                          >
                            {t("TRANSACTION_DATE")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="transactionDate"
                            value={transactionDate}
                            onChange={(e) => setTransactionDate(e.target.value)}
                          />
                          {errors.transactionDate && (
                            <p className="required-validation">
                              {errors.transactionDate}
                            </p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="accountnumber"
                            className="custom-form-label"
                          >
                            {t("ACCOUNT_NUMBER")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="accountnumber"
                            placeholder={t("ENTER_NUMBER")}
                            value={accountNum}
                            onChange={(e) => setAccountNum(e.target.value)}
                          />
                          {errors.accountNum && (
                            <p className="required-validation">
                              {errors.accountNum}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="status" className="custom-form-label">
                            {t("STATUS")}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="active"
                                type="radio"
                                name="status"
                                value="active"
                                checked={accountStatus === "active"}
                                onChange={(e) =>
                                  setAccountStatus(e.target.value)
                                }
                              />
                              <label htmlFor="active">{t("ACTIVE")}</label>
                            </div>
                            <div className="containGender">
                              <input
                                id="deactive"
                                type="radio"
                                name="status"
                                value="deactive"
                                checked={accountStatus === "deactive"}
                                onChange={(e) =>
                                  setAccountStatus(e.target.value)
                                }
                              />
                              <label htmlFor="deactive">{t("DEACTIVE")}</label>
                            </div>
                          </span>
                          {errors.accountStatus && (
                            <p className="required-validation">
                              {errors.accountStatus}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            {t("ADD_TRANSACTION")}
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

export default AddTransaction;
