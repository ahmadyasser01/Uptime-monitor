import { Check, ICheck } from "../models/check";

export class CheckService {
  static async findOne(url: string, user: string) {
    const check = await Check.findOne({ url, user });
    return check;
  }
  static async findById(id: string, userId: string) {
    const check = await Check.findById(id);
    if (check && check.user.toString() === userId) return check;
    return null;
  }

  static async findAll(userId: string) {
    const checks = await Check.find({ user: userId }).select("name url ");
    return checks;
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
