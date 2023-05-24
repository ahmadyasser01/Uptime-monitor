import { Document } from "mongoose";
import { IReport, Report, URL_STATUS } from "../models/report";
import { ICheck } from "../models/check";
import { Types } from "mongoose";
import axios, { AxiosRequestConfig } from "axios";

export class ReportService {
  static async getReport(checkId: string) {
    let report = await Report.findOne({ check: checkId });
    if (!report) {
      report = new Report({
        check: checkId,
      });
      await report.save();
    }

    return report;
  }

  static async generateReport(
    check: Document<unknown, {}, ICheck> &
      Omit<
        ICheck & {
          _id: Types.ObjectId;
        },
        never
      >
  ) {
    let checkReport = await ReportService.getReport(check._id.toString());
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${check.protocol}://${check.url}${
        check.port ? ":" + check.port : ""
      }/${check.path ? check.path : ""}`,
      timeout: check.timeout,
      headers: check.httpHeaders,
      auth: check.authentication,
    };
    // axiosRetry
    const startTime = Date.now();

    const response = await axios(config);
    console.log("===========================");
    // console.log(response, "response");
    console.log("===========================");

    const endTime = Date.now();
    const duration = endTime - startTime;

    try {
      if (
        check.assert?.statusCode &&
        check.assert.statusCode !== response.status
      ) {
        checkReport = ReportService.handleReportData(
          checkReport,
          URL_STATUS.DOWN,
          check.interval!
        );
      } else {
        checkReport = ReportService.handleReportData(
          checkReport,
          URL_STATUS.UP,
          check.interval!
        );
      }
    } catch (error) {
      checkReport = ReportService.handleReportData(
        checkReport,
        URL_STATUS.DOWN,
        check.interval!
      );
      checkReport.outages++;
      if (checkReport.outages >= check.threshold!) {
        // emit event to send notification
      }
    } finally {
      check.lastCreatedTime = new Date();
      const dbStart = Date.now();
      return [checkReport.save(), check.save()];
      console.log((Date.now() - dbStart) / 1000);
    }
  }

  static handleReportData(
    checkReport: Document<unknown, {}, IReport> &
      Omit<
        IReport & {
          _id: Types.ObjectId;
        },
        never
      >,
    status: URL_STATUS,
    interval: number
  ) {
    switch (status) {
      case URL_STATUS.UP: {
        checkReport.status = "up";
        checkReport.uptime = checkReport!.uptime + interval / 1000;
        break;
      }
      case URL_STATUS.DOWN: {
        checkReport.status = "down";
        checkReport!.downtime = checkReport!.downtime + interval! / 1000;
        break;
      }
    }

    checkReport.history.push({
      timestamp: new Date().toISOString(),
      status: checkReport.status,
    });
    checkReport.availability =
      (checkReport.uptime / (checkReport.uptime + checkReport.downtime)) * 100;
    return checkReport;
  }

  static async deleteReport(checkId: string) {
    const deletedReport = await Report.deleteOne({
      check: checkId,
    });
    return deletedReport;
  }
}
