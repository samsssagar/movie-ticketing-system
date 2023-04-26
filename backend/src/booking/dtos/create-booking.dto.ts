import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
    @AutoMap()
    @IsString()
    @IsOptional()
    userId: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    movieId: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    theatreId: string;

    @AutoMap()
    @IsNumber()
    @IsNotEmpty()
    seatsBooked: number;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    updatedAt: Date;
}