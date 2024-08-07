import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { images } from "../../assests/Images";
import { updateTransaction } from "../../API/transactionAPI";
import { useValidation } from "../../utils/validations";

function EditTransaction({ iscollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const { validateTransactionData } = useValidation();
  const location = useLocation();
  const { indivisualData } = location.state || {};
  console.log(indivisualData);

  const [transactionData, setTransactionData] = useState(indivisualData || {});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name is", name);
    console.log("value is", value);

    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = transactionData._id;
    console.log("id is", id);
    console.log(transactionData);

    const validationErrors = validateTransactionData(transactionData);
    setErrors(validationErrors);
    console.log(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await updateTransaction(id, transactionData);
        console.log("res is", res);
        if (res.status) {
          // toast.success(res.msg);
          toast.success(t("UPDATED_TRANSACTION"));
          setTimeout(() => {
            navigate("/transaction");
          }, 1000);
        }else {
          setErrors({ [res.field]: t(res.msg) });
        }
      } catch (error) {
        if (error.res && error.res.data && error.res.data.msg) {
          setErrors({ [error.res.data.field]: t(error.res.data.msg) });
        } else {
          console.error(error);
        }
      }
    }
  };
  return (
    <>
      <ToastContainer />
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
                                {t("EDIT_TRANSACTION")}
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
                            name="customerName"
                            value={transactionData.customerName}
                            onChange={handleChange}
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
                            name="balance"
                            value={transactionData.balance}
                            onChange={handleChange}
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
                            name="deposit"
                            value={transactionData.deposit}
                            onChange={handleChange}
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
                            name="withdraw"
                            value={transactionData.withdraw}
                            onChange={handleChange}
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
                            name="transactionDate"
                            value={transactionData.transactionDate}
                            onChange={handleChange}
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
                            name="accountNum"
                            value={transactionData.accountNum}
                            onChange={handleChange}
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
                                name="accountStatus"
                                value="active"
                                checked={
                                  transactionData.accountStatus === "active"
                                }
                                onChange={handleChange}
                              />
                              <label htmlFor="active">{t("ACTIVE")}</label>
                            </div>
                            <div className="containGender">
                              <input
                                id="deactive"
                                type="radio"
                                name="accountStatus"
                                value="deactive"
                                checked={
                                  transactionData.accountStatus === "deactive"
                                }
                                onChange={handleChange}
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
                        {errors.general && (
                          <p className="required-validation">
                            {errors.general}
                          </p>
                        )}
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            {t("UPDATE")}
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

export default EditTransaction;
