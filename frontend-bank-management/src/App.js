import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  ResetPassword,
  ForgotPassword,
  Signup,
  Login,
  Dashboard,
  Profile,
  Change_password,
  Add_Customer,
  Edit_Customer,
  View_Customer,
  Customer,
  Staff,
  AddStaff,
  EditStaff,
  ViewStaff,
  Transaction,
  AddTransaction,
  EditTransaction,
  ViewTransaction,
  VerifyOtp,
} from "./Components";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  const [iscollapsed, setIsCollapsed] = useState(false);

  const [isLoggin, setIsLoggin] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      setIsLoggin(true);
    } else {
      setIsLoggin(false);
    }
  }, []);

  // const login = JSON.parse(window.localStorage.getItem("isLoggin"));
  // console.log(login);

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggin ? (
                <Navigate to="/dashboard" />
              ) : (
                <Signup/>
              )
            }
          />
          <Route path="/verifyotp" element={<VerifyOtp/>}/>
          <Route path="/login" element={<Login/>} />

          <Route path="/forgotpassword" element={<ForgotPassword/>}
          />

          <Route path="/resetpassword/:token" element={<ResetPassword/>}
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/changepassword"
            element={
              <Change_password
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />

          <Route
            path="/customer"
            element={
              <Customer
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/addcustomer"
            element={
              <Add_Customer
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/editcustomer"
            element={
              <Edit_Customer
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/viewcustomer"
            element={
              <View_Customer
                toggleEvent={{ iscollapsed, setIsCollapsed }}
              />
            }
          />

          <Route
            path="/staff"
            element={
              <Staff
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/addstaff"
            element={
              <AddStaff
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/editstaff"
            element={
              <EditStaff
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/viewstaff"
            element={
              <ViewStaff
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />

          <Route
            path="/transaction"
            element={
              <Transaction
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/addtransaction"
            element={
              <AddTransaction
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/edittransaction"
            element={
              <EditTransaction
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
          <Route
            path="/viewtransaction"
            element={
              <ViewTransaction
                iscollapsed={iscollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
