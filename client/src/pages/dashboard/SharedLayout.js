import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Link, Outlet } from "react-router-dom";
import { AddJob, AllJobs } from "../dashboard";
function SharedLayout() {
  return (
    <Wrapper>
      <nav>
        <Link to="all-jobs">AddJob</Link>
        <Link to="add-job">All Jobs</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
}

export default SharedLayout;
