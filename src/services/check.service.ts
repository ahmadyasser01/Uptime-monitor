import { Check, ICheck } from "../models/check";

export class CheckService {
  static async findOne(url: string, user: string) {
    const check = await Check.findOne({ url, user });
    return check;
  }

  static async createCheck(checkData: ICheck, user: string) {
    const check = new Check({
      ...checkData,
      user,
    });

    await check.save();

    return check;
  }
}
