import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import authenticationApi from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";

const NavBar = () => {
  const authDispatch = useAuthDispatch();

  const _handleLogout = async () => {
    const response = await authenticationApi.logout();
    if (response.status == 200) {
      authDispatch({
        type: "LOGOUT",
      });
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <div className="inline-flex items-center px-1 pt-1 mr-3 font-semibold text-3xl leading-5 text-purple-500 hover:text-indigo-500">
                Quizzy
              </div>
            </div>
          </div>
          <div className="flex justify-end h-16 pt-8">
            <NavItem path="#" name="Reports" />
            <NavItem path="/dashboard" name="Todo :name" />
            <NavItem path="/logout" name="Logout" onClick={_handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
