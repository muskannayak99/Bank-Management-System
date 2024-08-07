import React from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { images } from "../../assests/Images";
import "react-toastify/dist/ReactToastify.css";
import { deleteStaff } from "../../API/staffAPI";

function DeleteStaff({ DeleteEvent }) {
  const { t } = useTranslation();
  const { isDelete, deleteHandle } = DeleteEvent;
  const { flag, item } = isDelete;

  const myStyle = {
    display: flag ? "block" : "none",
  };

  const handleDelete = async (item) => {
    const id = item._id;
    try {
      await deleteStaff(id);
      deleteHandle(false, item);
      toast.success(t("DELETED_STAFF"), { autoClose: 1000 });
    } catch (error) {
      console.error(error);
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
              <h2>{t("DELETE_STAFF")}</h2>
              <p>
                {t("CONFIRM_DELETE")} {item.staffName}?
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

export default DeleteStaff;
