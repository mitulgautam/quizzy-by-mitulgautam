import React, { useEffect, useState } from "react";
import ReportTable from "./ReportTable";
import PageLoader from "components/PageLoader";
import reportApi from "apis/report";
import Button from "components/Button";
import { saveAs } from "file-saver";

const Reports = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReportDownloading, setIsReportDownloading] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [blob, setBlob] = useState();

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

  const handleDownloadReport = async () => {
    try {
      setIsReportDownloading(true);
      setIsPreparing(true);
      const response = await reportApi.download();
      setBlob(response.data);
    } catch (e) {
      Logger.error(e);
    } finally {
      setIsPreparing(false);
    }
  };

  const handleDownload = () => {
    const data = URL.createObjectURL(new Blob([blob]));
    saveAs(data, "report.xlsx");
  };

  if (isReportDownloading) {
    return (
      <div className="h-screen mt-64">
        {isPreparing ? (
          <center>
            <div>Your report is being prepared for downloading.</div>
          </center>
        ) : (
          <center>
            <div>Your report is ready to downloading.</div>

            <div className="w-32">
              <Button
                buttonText="Download"
                loading={false}
                onClick={handleDownload}
              />
            </div>
          </center>
        )}
      </div>
    );
  }

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
        <div className="w-48 ml-auto mr-8">
          <Button
            type="button"
            buttonText="Download Report"
            onClick={handleDownloadReport}
            loading={false}
          />
        </div>
        <ReportTable report={report} />
      </div>
    </div>
  );
};

export default Reports;
