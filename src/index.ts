import { app } from "./app";
import connectDB from "./database/connect";
import env from "./env.config";
const start = async () => {
  try {
    await connectDB(env.DATABASE_URI);
    app.listen(process.env.PORT, () => {
      console.log(`App is running on port ${process.env.PORT}`);
    });
  } catch (error) {}
};

start();
