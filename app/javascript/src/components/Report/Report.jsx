import React, { useEffect, useState } from "react";
import ReportTable from "./ReportTable";
import PageLoader from "components/PageLoader";
import reportApi from "apis/report";

const Reports = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const {
        data: { reports },
      } = await reportApi.index();
      setReport(reports);
      logger.info("X");
    } catch (e) {
      logger.error(e);
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full p-8">
        <ReportTable report={report} />
      </div>
    </div>
  );
};

export default Reports;
