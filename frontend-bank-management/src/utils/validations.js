import { useTranslation } from "react-i18next";

export const useValidation = () => {

  const { t } = useTranslation();

const validateProfile = (loggedAdmin) => {
    const errors = {};

    if (!loggedAdmin.fullname) {
      errors.fullname = t("VALIDATE_NAME");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loggedAdmin.email) {
      errors.email = t("VALIDATE_EMAIL");
    } else if (!emailPattern.test(loggedAdmin.email)) {
      errors.email = t("VALIDATE_EMAIL_FORMAT");
    }

    const phonePattern = /^\d{10}$/;
    if (!loggedAdmin.phoneNum) {
      errors.phoneNum = t("VALIDATE_PHONE_NO");
    } else if (!phonePattern.test(loggedAdmin.phoneNum)) {
      errors.phoneNum = t("VALIDATE_PHONE_DIGIT");
    }

    return errors;
  };

const validateChangePassword = ( oldpassword, newpassword, confirmPassword ) => {
    const errors = {};

    if (!oldpassword) {
      errors.oldpassword = t("VALIDATE_OLD_PASSWORD");
    } else if (oldpassword.length < 8) {
      errors.oldpassword = t("VALIDATE_PASSWORD_FORMAT");
    }

    if (!newpassword) {
      errors.newpassword = t("VALIDATE_NEW_PASSWORD");
    } else if (newpassword.length < 8) {
      errors.newpassword = t("VALIDATE_PASSWORD_FORMAT");
    }

    if (!confirmPassword) {
      errors.confirmPassword = t("VALIDATE_CONFIRM_PASSWORD");
    } else if (newpassword !== confirmPassword) {
      errors.confirmPassword = t("VALIDATE_PASSWORD_MISMATCH");
    }

    return errors;
  };

const validateUser = (fullname, phoneNum, email, password, confirmPassword) => {
    let formErrors = {};
  
    if (!fullname) formErrors.fullname = t("VALIDATE_NAME");
  
    const phonePattern = /^\d{10}$/;
    if (!phoneNum) {
      formErrors.phoneNum = t("VALIDATE_PHONE_NO");
    } else if (!phonePattern.test(phoneNum)) {
      formErrors.phoneNum = t("VALIDATE_PHONE_DIGIT");
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = t("VALIDATE_EMAIL");
    } else if (!emailPattern.test(email)) {
      formErrors.email = t("VALIDATE_EMAIL_FORMAT");
    }
  
    if (!password) {
      formErrors.password = t("VALIDATE_PASSWORD");
    } else if (password.length < 8) {
      formErrors.password = t("VALIDATE_PASSWORD_FORMAT");
    }
  
    if (!confirmPassword) {
      formErrors.confirmPassword = t("VALIDATE_CONFIRM_PASSWORD");
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = t("VALIDATE_PASSWORD_MISMATCH");
    }
  
    return formErrors;
}

const validateLogin = ( email, password) => {
  let formErrors = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    formErrors.email = t("VALIDATE_EMAIL");
  } else if (!emailPattern.test(email)) {
    formErrors.email = t("VALIDATE_EMAIL_FORMAT");
  }

  if (!password) {
    formErrors.password = t("VALIDATE_PASSWORD");
  } else if (password.length < 8) {
    formErrors.password = t("VALIDATE_PASSWORD_FORMAT");
  }

  return formErrors;
}

const validateForgotPassword = ( email ) => {
  let formErrors = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    formErrors.email = t("VALIDATE_EMAIL");
  } else if (!emailPattern.test(email)) {
    formErrors.email = t("VALIDATE_EMAIL_FORMAT");
  }
  return formErrors;
}

const validateResetPassword = ( password, confirmPassword) => {
  let formErrors = {};
  if (!password) {
    formErrors.password = t("VALIDATE_PASSWORD");
  } else if (password.length < 8) {
    formErrors.password = t("VALIDATE_PASSWORD_FORMAT");
  }

  if (!confirmPassword) {
    formErrors.confirmPassword = t("VALIDATE_CONFIRM_PASSWORD");
  } else if (password !== confirmPassword) {
    formErrors.confirmPassword = t("VALIDATE_PASSWORD_MISMATCH");
  }

  return formErrors;
}

const validateAddCustomer = (customerName, phoneNum, email, accountNum, registerDate, accountType, accountStatus, profileImage) => {
    const errors = {};

    if (!customerName) errors.customerName = t("VALIDATE_NAME");

    const phonePattern = /^\d{10}$/;
    if (!phoneNum) {
      errors.phoneNum = t("VALIDATE_PHONE_NO");
    } else if (!phonePattern.test(phoneNum)) {
      errors.phoneNum = t("VALIDATE_PHONE_DIGIT");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = t("VALIDATE_EMAIL");
    } else if (!emailPattern.test(email)) {
      errors.email = t("VALIDATE_EMAIL_FORMAT");
    }

    const accountPattern = /^\d{12}$/;
    if (!accountNum) {
      errors.accountNum = t("VALIDATE_ACCOUNT_NO");
    } else if (!accountPattern.test(accountNum)) {
      errors.accountNum = t("VALIDATE_ACC_DIGIT");
    }

    if (!registerDate) errors.registerDate = t("VALIDATE_DATE");
    if (!accountType) errors.accountType = t("VALIDATE_ACC_TYPE");
    if (!accountStatus) errors.accountStatus = t("VALIDATE_ACC_STATUS");
    if (!profileImage) errors.profileImage = t("VALIDATE_IMAGE");

    return errors;
  };

const validateCustomerData = (customerData) => {
    const errors = {};
  
    if (!customerData.customerName) {
      errors.customerName = t("VALIDATE_NAME");
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerData.email) {
      errors.email = t("VALIDATE_EMAIL");
    } else if (!emailPattern.test(customerData.email)) {
      errors.email = t("VALIDATE_EMAIL_FORMAT");
    }
  
    const phonePattern = /^\d{10}$/;
    if (!customerData.phoneNum) {
      errors.phoneNum = t("VALIDATE_PHONE_NO");
    } else if (!phonePattern.test(customerData.phoneNum)) {
      errors.phoneNum = t("VALIDATE_PHONE_DIGIT");
    }
  
    const accountPattern = /^\d{12}$/;
    if (!customerData.accountNum) {
      errors.accountNum = t("VALIDATE_ACCOUNT_NO");
    } else if (!accountPattern.test(customerData.accountNum)) {
      errors.accountNum = t("VALIDATE_ACC_DIGIT");
    }
  
    if (!customerData.registerDate) errors.registerDate = t("VALIDATE_DATE");
    if (!customerData.accountType) errors.accountType = t("VALIDATE_ACC_TYPE");
    if (!customerData.accountStatus) errors.accountStatus = t("VALIDATE_ACC_STATUS");
  
    return errors;
}

const validateStaff = ( staffName, staffPosition, email, phoneNum, staffSalary, gender, profileImage) => {
    let formErrors = {};
  
    if (!staffName) formErrors.staffName = t("VALIDATE_NAME");
    if (!staffPosition) formErrors.staffPosition = t("VALIDATE_STAFF_POSITION");
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = t("VALIDATE_EMAIL");
    } else if (!emailPattern.test(email)) {
      formErrors.email = t("VALIDATE_EMAIL_FORMAT");
    }
  
    const phonePattern = /^\d{10}$/;
    if (!phoneNum) {
      formErrors.phoneNum = t("VALIDATE_PHONE_NO");
    } else if (!phonePattern.test(phoneNum)) {
      formErrors.phoneNum = t("VALIDATE_PHONE_DIGIT");
    }
  
    const salaryPattern = /^\d+$/;
    if (!staffSalary) {
      formErrors.staffSalary = t("VALIDATE_SALARY");
    } else if (!salaryPattern.test(staffSalary)) {
      formErrors.staffSalary = t("VALIDATE_SALARY_DIGIT");
    }
  
    if (!gender) formErrors.gender = t("VALIDATE_GENDER");
    if (!profileImage) formErrors.profileImage = t("VALIDATE_IMAGE");
  
    return formErrors;
  };

const validateStaffData = (staffData) => {
  const errors = {};
  
    if (!staffData.staffName) {
      errors.staffName = t("VALIDATE_NAME");
    }

    if (!staffData.staffPosition) {
          errors.staffPosition = t("VALIDATE_STAFF_POSITION");
        }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!staffData.email) {
      errors.email = t("VALIDATE_EMAIL");
    } else if (!emailPattern.test(staffData.email)) {
      errors.email = t("VALIDATE_EMAIL_FORMAT");
    }
  
    const phonePattern = /^\d{10}$/;
    if (!staffData.phoneNum) {
      errors.phoneNum = t("VALIDATE_PHONE_NO");
    } else if (!phonePattern.test(staffData.phoneNum)) {
      errors.phoneNum = t("VALIDATE_PHONE_DIGIT");
    }
  
    const Pattern1 = /^\d+$/;
      if (!staffData.staffSalary){
        errors.staffSalary= t("VALIDATE_SALARY");
      } else if (!Pattern1.test(staffData.staffSalary)) {
        errors.staffSalary = t("VALIDATE_SALARY_DIGIT");
      }
  
      if (!staffData.gender) errors.gender = t("VALIDATE_GENDER");
  
      if (!staffData.profileImage) errors.profileImage = t("VALIDATE_IMAGE");
  
    return errors;
}  

const validateTransaction = (customerName, accountNum, balance, withdraw, deposit, transactionDate, accountStatus ) => {
  let formErrors = {};

    if (!customerName) formErrors.customerName = t("VALIDATE_NAME");

    const Pattern1 = /^\d{12}$/;
    if (!accountNum){
      formErrors.accountNum = t("VALIDATE_ACCOUNT_NO");
    }else if (!Pattern1.test(accountNum)) {
      formErrors.accountNum = t("VALIDATE_ACC_DIGIT");
    }

    const Pattern = /^\d+$/;
    if (!balance) {
      formErrors.balance = t("VALIDATE_BALANCE");
    } else if (!Pattern.test(balance)) {
      formErrors.balance = t("VALIDATE_BALANCE_DIGIT");
    }

    if (!withdraw){
      formErrors.withdraw = t("VALIDATE_WITHDRAW");
    }else if (!Pattern.test(withdraw)) {
      formErrors.withdraw = t("VALIDATE_BALANCE_DIGIT");
    }

    if (!deposit){
      formErrors.deposit = t("VALIDATE_DEPOSIT");
    }else if (!Pattern.test(deposit)) {
      formErrors.deposit = t("VALIDATE_BALANCE_DIGIT");
    }

    if (!transactionDate) formErrors.transactionDate = t("VALIDATE_DATE");

    if (!accountStatus) formErrors.accountStatus = t("VALIDATE_ACC_STATUS");

return formErrors;
}

const validateTransactionData = (transactionData) => {
  const errors = {};

  if (!transactionData.customerName) {
    errors.customerName = t("VALIDATE_NAME");
  }

  const accountNumberPattern = /^\d{12}$/;
  if (!transactionData.accountNum) {
    errors.accountNum = t("VALIDATE_ACCOUNT_NO");
  } else if (!accountNumberPattern.test(transactionData.accountNum)) {
    errors.accountNum = t("VALIDATE_ACC_DIGIT");
  }

  const numberPattern = /^\d+$/;
  if (!transactionData.balance) {
    errors.balance = t("VALIDATE_BALANCE");
  } else if (!numberPattern.test(transactionData.balance)) {
    errors.balance = t("VALIDATE_BALANCE_DIGIT");
  }

  if (!transactionData.withdraw) {
    errors.withdraw = t("VALIDATE_WITHDRAW");
  } else if (!numberPattern.test(transactionData.withdraw)) {
    errors.withdraw = t("VALIDATE_BALANCE_DIGIT");
  }

  if (!transactionData.transactionDate) errors.transactionDate = t("VALIDATE_DATE");

  if (!transactionData.deposit) {
    errors.deposit = t("VALIDATE_DEPOSIT");
  } else if (!numberPattern.test(transactionData.deposit)) {
    errors.deposit = t("VALIDATE_BALANCE_DIGIT");
  }

  if (!transactionData.accountStatus) errors.accountStatus = t("VALIDATE_ACC_STATUS");

  return errors;
};

  return { validateProfile,
           validateChangePassword,
           validateUser,
           validateAddCustomer,
           validateCustomerData, 
           validateStaff,
           validateStaffData,
           validateTransaction,
           validateTransactionData,
           validateLogin,
           validateForgotPassword,
           validateResetPassword,

          };
};
