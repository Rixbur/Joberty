import React, { useCallback } from "react";
import { useAppContext } from "../context/appContext";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

function JobContainer() {
  const { getJobs, jobs, isLoading, numOfPages, totalJobs } = useAppContext();

  useEffect(() => {
    return () => {
      getJobs();
    };
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>Jobs to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages}
    </Wrapper>
  );
}

export default JobContainer;
