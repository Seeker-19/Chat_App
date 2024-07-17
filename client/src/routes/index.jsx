import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register";

import MessagePage from "../components/MessagePage.jsx";
import Layout from "../layout/Layout.jsx";
import Login from "../pages/Login.jsx";
import {Toaster} from "react-hot-toast";
import ForgotPassword from "../pages/ForgotPassword.jsx";

const Index = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          />
          
          <Route path="/" element={<Home />}>
            <Route path=":userId" element={<MessagePage />} />
          </Route>
          
        </Routes>
        <Toaster/>
      </Router>
    </>
  );
};

export default Index;
