import { IUserSignup, User } from "../models/user-schema";
import { PasswordService } from "./password.service";

export class UserService {
  public constructor() {}

  static async checkExists(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  static async signup(userDetails: IUserSignup) {
    // create new User
    const user = new User({
      ...userDetails,
    });

    await user.save();
    return user;
  }

  static async compareVerificationToken(
    inputVerification: string,
    userVerificationToken: string
  ): Promise<boolean> {
    //TODO: compare Token

    return true;
  }
}
