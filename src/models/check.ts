import mongoose, { Schema, model } from "mongoose";

export enum PROTOCOL {
  HTTP = "HTTP",
  HTTPS = "HTTPS",
  TCP = "TCP",
}

export interface ICheck {
  user: mongoose.Types.ObjectId;
  name: string;
  url: string;
  protocol: PROTOCOL;
  path?: string;
  port?: number;
  webhook?: string;
  timeout?: number;
  interval?: number;
  threshold?: number;
  authentication?: {
    username: string;
    password: string;
  };
  httpHeaders?: any;
  assert?: {
    statusCode: number;
  };
  tags: string[];
  ignoreSSL?: boolean;
}

const checkSchema = new Schema<ICheck>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  url: { type: String, required: true },
  protocol: {
    type: String,
    required: true,
    enum: PROTOCOL,
  },
  path: { type: String, required: false },
  port: { type: Number, required: false },
  webhook: { type: String, required: false },
  timeout: { type: Number, required: false },
  interval: { type: Number, required: false },
  threshold: { type: Number, required: false },
  authentication: {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    required: false,
  },
  httpHeaders: {
    type: Object,
    required: false,
  },
  assert: {
    statusCode: {
      type: Number,
      required: true,
    },
    required: false,
  },
  tags: {
    type: [String],
    default: [],
  },
  ignoreSSL: {
    type: Boolean,
    default: false,
  },
});

const Check = model<ICheck>("Check", checkSchema);

export { Check };
