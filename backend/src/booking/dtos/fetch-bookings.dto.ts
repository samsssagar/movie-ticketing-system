import { AutoMap } from "@automapper/classes";

export class FetchedUser {
    @AutoMap()
    id: string;
    @AutoMap()
    name: string;
    @AutoMap()
    email: string;
}

export class FetchedMovie {
    @AutoMap()
    id: string;
    @AutoMap()
    name: string;
}

export class FetchedTheatre {
    @AutoMap()
    id: string;
    @AutoMap()
    name: string;
}

export class FetchBookingsDto {
    @AutoMap()
    _id: string;
    @AutoMap()
    user: FetchedUser;
    @AutoMap()
    movie: FetchedMovie;
    @AutoMap()
    theatre: FetchedTheatre;
    @AutoMap()
    createdAt: Date;
    @AutoMap()
    updatedAt: Date;
    @AutoMap()
    seatsBooked: number;
}