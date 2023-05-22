import { Report } from "../models/report";

export class ReportService {
  static async getReport(checkId: string) {
    const report = await Report.findOne({ check: checkId });

    return report;
  }
}
