import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "../Fragments/Pagination";
import { GetJobs } from "../../scripts/apis";
import apiContext from "../../scripts/context";
import ResultNotFound from "./ResultNotFound";

const DashboardLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [jobs, setJobs] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const { filter, isRefresh, handleRefresh } = useContext(apiContext);

  const paginateFront = () => {
    setCurrentPage(currentPage + 1);
    handleRefresh();
  };
  const paginateBack = () => {
    setCurrentPage(currentPage - 1);
    handleRefresh();
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    handleRefresh();
  };
  const startIndex = currentPage * jobsPerPage - jobsPerPage + 1;
  const endIndex = Math.min(currentPage * jobsPerPage, totalData);

  useEffect(() => {
    if (isRefresh) {
      getJobs(
        currentPage,
        jobsPerPage,
        filter.keyword,
        filter.type,
        filter.location,
        filter.tag
      );

      handleRefresh();
    }
  }, [isRefresh]);

  const getJobs = async (page, dataSize, keyword, type, location, tag) => {
    try {
      const data = await GetJobs(page, dataSize, keyword, type, location, tag);
      setJobs(data.data);
      setTotalData(data.total_data);
    } catch (error) {
      return error;
    }
  };

  const handlePage = (page) => {
    setJobsPerPage(page);
    handleRefresh();
  };

  const CardList = () => {
    return (
      <div className="p-8 gap-8 flex flex-col flex-1">
        <div>
          <p className="text-slate-900">
            Showing <span className="font-medium">{startIndex}</span> to{" "}
            <span className="font-medium">{endIndex}</span> of{" "}
            <span className="font-medium">{totalData}</span> results
          </p>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-4">
            {jobs?.map((dt) => {
              return <Card key={dt.job_id} data={dt} />;
            })}
          </div>
        </div>
        <Pagination
          jobsPerPage={jobsPerPage}
          handlePage={handlePage}
          totalData={totalData}
          paginateFront={paginateFront}
          paginateBack={paginateBack}
          currentPage={currentPage}
          paginate={paginate}
          endIndex={endIndex}
        />
      </div>
    );
  };

  return <>{totalData > 0 ? <CardList /> : <ResultNotFound />}</>;
};

export default DashboardLayout;
