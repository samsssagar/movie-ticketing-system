import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { CreateMovieDto } from "../dtos/create-movie.dto";
import { Movie } from "../schemas/movie.schema";
import { ReadMovieDto } from "../dtos/read-movie.dto";
import { CreateMovieRequestDto } from "../dtos/create-movie-request.dto";
import { Types } from "mongoose";

@Injectable()
export class MovieProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CreateMovieDto, Movie);
            createMap(
                mapper,
                Movie,
                ReadMovieDto,
                forMember(s => s.id, mapFrom(opts => opts._id.toString())),
                forMember(s => s.image, mapFrom(opts => opts.image.toString('base64')))
            );
            createMap(
                mapper,
                CreateMovieRequestDto,
                CreateMovieDto,
                forMember(s => s.duration, mapFrom(opts => Number(opts.duration))),
                forMember(s => s.releaseDate, mapFrom(opts => new Date(opts.releaseDate))),
                forMember(s => s.theatre, mapFrom(opts => JSON.parse(opts.theatre)))
            )
        };
    }
}