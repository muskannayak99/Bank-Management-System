import React from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { images } from "../../assests/Images";
import { deleteCustomer } from "../../API/customerAPI";

function Delete_Customer({ DeleteEvent }) {
  const { t } = useTranslation();
  const { isDelete, deleteHandle } = DeleteEvent;
  const { flag, item } = isDelete;

  const myStyle = {
    display: flag ? "block" : "none",
  };

  const handleDelete = async (item) => {
    const id = item._id;
    try {
      await deleteCustomer(id);
      deleteHandle(false, item);
      toast.success(t("DELETED_CUSTOMER"), { autoClose: 1000 });
    } catch (error) {
      console.error(error);
      toast.error(t("Failed to delete customer"), { autoClose: 3000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`modal fade customDesign ${flag && "show"}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={flag ? "true" : "false"}
        style={myStyle}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                &nbsp;
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  deleteHandle(false, item);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={images.deleteModal_icon}
                alt=""
                className="mainIconModal"
              />
              <h2>{t("DELETE_CUSTOMER")}</h2>
              <p>
                {t("CONFIRM_DELETE")} {item.customerName}?
              </p>
              <div className="footbutton">
                <button
                  type="button"
                  className="custom-btn cancelBtn"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    deleteHandle(false, item);
                  }}
                >
                  {t("CANCEL")}
                </button>
                <button
                  type="button"
                  className="custom-btn custom-btnCus"
                  onClick={() => {
                    handleDelete(item);
                  }}
                >
                  {t("CONFIRM")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Delete_Customer;
