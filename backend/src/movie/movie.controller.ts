import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './filters/movie-image.filter';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { ReadMovieDto } from './dtos/read-movie.dto';
import { FilterMovieDto } from './dtos/filter-movie.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ValidationExceptionFilter } from 'src/common/filters/validation-exception.filter';
import { CreateMovieRequestDto } from './dtos/create-movie-request.dto';
import { IMovie } from './interfaces/movie.interface';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @UseGuards(AdminGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: fileFilter
    }))
    @UseFilters(ValidationExceptionFilter)
    @HttpCode(HttpStatus.CREATED)
    async createMovie(@Body() createMovie: CreateMovieRequestDto, @UploadedFile() file: Express.Multer.File): Promise<ReadMovieDto> {
        return await this.movieService.createMovie(createMovie, file.buffer);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async fetchAllMovies(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<ReadMovieDto[]> {
        return await this.movieService.fetchAll(page, limit);
    }

    @Post("filter")
    @HttpCode(HttpStatus.OK)
    @UseFilters(ValidationExceptionFilter)
    async fetchMoviesByFilter(@Body() filterDto: FilterMovieDto): Promise<ReadMovieDto[]> {
        return await this.movieService.filterMovies(filterDto);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string): Promise<ReadMovieDto> {
        return await this.movieService.fetchById(id);
    }
}
