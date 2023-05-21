import { Response, Request } from "express";
import { CheckService } from "../services/check.service";
import { ICheck } from "../models/check";

export const createCheck = async (req: Request, response: Response) => {
  try {
    // find if the check is already made by user
    console.log("test");

    const checkData: ICheck = req.body;
    const user = req.currentUser!.id;
    let check = await CheckService.findOne(checkData.url, user);
    if (check) throw new Error("check already exists");
    //create a new check
    check = await CheckService.createCheck(checkData, user);

    if (!check) throw new Error("Error creating check");
    response.status(201).json(check);
  } catch (error: any) {
    response
      .status(500)
      .json({ error: error.message || "Erorr creating check" });
  }
};
