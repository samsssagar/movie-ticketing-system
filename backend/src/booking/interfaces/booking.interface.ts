import { Document, Types } from "mongoose";
import { Movie } from "src/movie/schemas/movie.schema";
import { Theatre } from "src/theatre/schemas/theatre.schema";
import { User } from "src/user/schemas/user.schema";

export interface IBooking extends Document {
    _id: Types.ObjectId;
    user: User;
    movie: Movie;
    theatre: Theatre;
    createdAt: Date;
    updatedAt: Date;
    seatsBooked: number;
}