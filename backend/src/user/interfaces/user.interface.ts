import { Document, Types } from "mongoose";

export interface IUser extends Document {
    readonly _id: Types.ObjectId;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly isAdmin: boolean;
    readonly createdOn: Date;
    readonly updatedOn: Date;
}