import React, { Children } from "react";
import logo from "../assets/logo.png";

const Layout = ({children}) => {
  return (
    <>
      <header className="flex justify-center items-center py-3 h-30 shadow-md bg-white">

        <img src={logo} width={200} height={60} />
      </header>
      {children}
      
    </>
  );
};

export default Layout;
