import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.all("*", async (req: Request, res: Response) => {
  return res.status(404).send("Not found");
});

export { app };
