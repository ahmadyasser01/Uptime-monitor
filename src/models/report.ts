import mongoose, { Schema, model } from "mongoose";

export interface IReport {
  status: string;
  availability: number;
  outages: number;
  downtime: number;
  uptime: number;
  responseTime: number;
  history: string[];
  check: mongoose.Types.ObjectId;
}

const reportSchema = new Schema<IReport>({
  check: {
    type: Schema.Types.ObjectId,
    ref: "Check",
    required: true,
  },
  status: { type: String, required: true },
  availability: { type: Number, default: 0 },
  outages: {
    type: Number,
    default: 0,
  },
  downtime: { type: Number, default: 0 },
  uptime: { type: Number },
  responseTime: { type: Number, default: 0 },
  history: { type: [String], required: true, default: [] },
});

const Report = model<IReport>("Check", reportSchema);

export { Report };
