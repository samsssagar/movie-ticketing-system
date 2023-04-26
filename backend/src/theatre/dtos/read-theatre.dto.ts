import { AutoMap } from "@automapper/classes";

export class ReadTheatreDto {
    @AutoMap()
    id: string;
    @AutoMap()
    name: string;
    @AutoMap()
    location: string;
    @AutoMap()
    availableSeats: number;
}