import { AutoMap } from "@automapper/classes";

export class CreateMovieDto {
    @AutoMap()
    id: string;
    @AutoMap()
    name: string;
    @AutoMap()
    description: string;
    @AutoMap()
    duration: number;
    @AutoMap()
    releaseDate: Date;
    @AutoMap()
    createdAt: Date;
    @AutoMap()
    updatedAt: Date;
    @AutoMap()
    image: Buffer;
    @AutoMap()
    theatre: string[];
}