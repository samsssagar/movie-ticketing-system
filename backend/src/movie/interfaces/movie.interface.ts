import { Document, Types } from "mongoose";

export interface IMovie extends Document {
    readonly _id: Types.ObjectId;
    readonly name: string;
    readonly description: string;
    readonly image: Buffer;
    readonly duration: number;
    readonly releaseDate: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly theatre: string[];
}