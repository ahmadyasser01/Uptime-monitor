import { Response, Request, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { IUser } from "../models/user-schema";
import { PasswordService } from "../services/password.service";
import { JwtService } from "../services/jwt.service";

export const signup = async (
  req: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userDetails: IUser = req.body;
    let user = await UserService.checkExists(userDetails.email);

    if (user) {
      throw new Error(`User already Exists`);
    }
    // hash password
    userDetails.password = await PasswordService.hashPassword(
      userDetails.password
    );
    user = await UserService.signup(userDetails);

    //TODO: send verification email

    response.status(201).json({
      message:
        "User created successfully, check Your email to Verify your account",
    });
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};

export const login = async (
  req: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userDetails: IUser = req.body;
    const user = await UserService.checkExists(userDetails.email);

    if (!user) {
      throw new Error(`User Not found`);
    }

    if (!user.verified) {
      throw new Error("User is not verified");
    }
    const validPassword = await PasswordService.comparePassword(
      userDetails.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Email or password is incorrect");
    }

    const accessToken = JwtService.generateAccessToken(user.id, user.email);

    response.status(201).json({
      ...user,
      accessToken,
    });
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};

export const verify = async (
  req: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, verificationToken } = req.body;

    await UserService.verify(email, verificationToken);

    response.status(201).json({
      message: "User verified successfully",
    });
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};