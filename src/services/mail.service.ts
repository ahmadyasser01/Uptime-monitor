import nodemailer, { TransportOptions } from "nodemailer";
import env from "../env.config";

export class MailService {
  private static mailService: MailService;
  private transporter: nodemailer.Transporter;

  private constructor() {
    // Private constructor to prevent direct instantiation
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  private static getInstance(): MailService {
    if (!MailService.mailService) {
      MailService.mailService = new MailService();
    }
    return MailService.mailService;
  }

  public static async sendMail(options: any) {
    await MailService.getInstance().transporter.sendMail({
      from: "uptime <uptime@test.com>",
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
  }
}
