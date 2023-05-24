import { app } from "./app";
import connectDB from "./database/connect";
import env from "./env.config";
import cron from "node-cron";
import { CheckService } from "./services/check.service";
import { ReportService } from "./services/report.service";
const start = async () => {
  try {
    await connectDB(env.DATABASE_URI);
    app.listen(process.env.PORT, () => {
      console.log(`App is running on port ${process.env.PORT}`);

      // cron.schedule("*/10 * * * * *", async () => {
      //   let promises: any[] = [];

      //   console.log("Testing");

      //   const currentTime = new Date();

      //   // TODO: GET REPORTS FROM DATABASE THAT EXCCEDED THE PERIOD;
      //   // const checks = await CheckService.findChecksToGenerateReport(
      //   //   currentTime
      //   // );
      //   // checks.forEach(async (check) => {
      //   //   const res = await ReportService.generateReport(check);
      //   //   promises.push(res);
      //   // });
      //   // await Promise.all(promises);
      //   console.log((Date.now() - currentTime.getTime()) / 1000);
      // });
    });
  } catch (error) {
    process.exit(1);
  }
};

start();
