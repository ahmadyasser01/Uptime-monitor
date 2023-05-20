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

  static async verify(
    email: string,
    verificationToken: string
  ): Promise<void | Error> {
    const user = await UserService.checkExists(email);
    if (!user) {
      throw new Error(`User Not found`);
    }

    if (!user.verified) {
      throw new Error("User is not verified");
    }
    const validToken = await UserService.compareVerificationToken(
      verificationToken,
      user.verificationToken
    );
    if (!validToken) {
      throw new Error("invalid verification token");
    }

    user.verified = true;
    await user.save();
  }

  static async compareVerificationToken(
    inputVerification: string,
    userVerificationToken: string
  ): Promise<boolean> {
    //TODO: compare Token

    return true;
  }
}
