import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Logout from "./Logout";

const Header: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <header className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold">Banking Application</h1>
      {isAuthenticated && <Logout />}
    </header>
  );
};

export default Header;
