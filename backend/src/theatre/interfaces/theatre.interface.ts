import { Document, Types } from "mongoose";

export interface ITheatre extends Document {
    _id: Types.ObjectId;
    name: string;
    location: string;
    availableSeats: number;
}