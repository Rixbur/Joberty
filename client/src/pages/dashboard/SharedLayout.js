import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Link, Outlet } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";
function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        {/* only one of bars will be displayed, logic is inside css */}
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar></Navbar>
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}

export default SharedLayout;
