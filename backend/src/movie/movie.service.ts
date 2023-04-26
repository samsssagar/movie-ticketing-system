import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model, Types } from 'mongoose';
import { IMovie } from './interfaces/movie.interface';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ReadMovieDto } from './dtos/read-movie.dto';
import { FilterMovieDto } from './dtos/filter-movie.dto';
import { CreateMovieRequestDto } from './dtos/create-movie-request.dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectModel(Movie.name) private readonly movieModel: Model<IMovie>,
        @InjectMapper() private readonly classMapper: Mapper,
    ) { }

    async createMovie(createMovieRequestDto: CreateMovieRequestDto, image: Buffer): Promise<ReadMovieDto> {
        const movieEntity = this.classMapper.map(createMovieRequestDto, CreateMovieRequestDto, CreateMovieDto);
        movieEntity.createdAt = new Date(new Date().toUTCString());
        movieEntity.updatedAt = new Date(new Date().toUTCString());
        movieEntity.image = image;
        const entity = this.classMapper.map(movieEntity, CreateMovieDto, Movie);
        return this.classMapper.mapAsync(await new this.movieModel(entity).save(), Movie, ReadMovieDto);
    }

    async fetchAll(page: number, limit: number): Promise<ReadMovieDto[]> {
        const skip = (page - 1) * limit;
        return this.classMapper.mapArrayAsync(await this.movieModel.find().skip(skip).limit(limit).exec(), Movie, ReadMovieDto);
    }

    async filterMovies(filterMovieDto: FilterMovieDto): Promise<ReadMovieDto[]> {
        const { name, startDate, endDate, theatre } = filterMovieDto;
        const query: { name?: any, releseDate?: any, theatre?: any } = {};

        if (filterMovieDto.name) query.name = { '$regex': new RegExp('^' + `${name}` + '$', "i") };

        if (filterMovieDto.startDate && filterMovieDto.endDate) {
            query.releseDate = { $gte: startDate, $lte: endDate };
        } else if (startDate) {
            query.releseDate = { $gte: startDate };
        } else if (endDate) {
            query.releseDate = { $lte: endDate };
        }

        if (filterMovieDto.theatre) query.theatre = { $in: theatre };

        const posts = await this.movieModel.find(query).exec();

        if (!posts.length) throw new NotFoundException("No movies found");

        return this.classMapper.mapArray(posts, Movie, ReadMovieDto);
    }

    async fetchById(id: string): Promise<ReadMovieDto> {
        const res = await this.movieModel.findById(new Types.ObjectId(id)).exec();
        if (!res) throw new NotFoundException(`Movie with ${id} was not found`)
        return this.classMapper.map(res, Movie, ReadMovieDto);
    }

}
