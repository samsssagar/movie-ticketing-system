import { AutoMap } from "@automapper/classes";

export class ReadBookingDto {
    @AutoMap()
    userId: string;

    @AutoMap()
    movieId: string;

    @AutoMap()
    theatreId: string;

    @AutoMap()
    seatsBooked: number;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    updatedAt: Date;
}