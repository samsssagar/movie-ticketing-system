import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { TheatreService } from './theatre.service';
import { CreateTheatreDto } from './dtos/create-theatre.dto';
import { ReadTheatreDto } from './dtos/read-theatre.dto';
import { ITheatre } from './interfaces/theatre.interface';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ValidationExceptionFilter } from 'src/common/filters/validation-exception.filter';

@Controller('theatre')
export class TheatreController {
    constructor(private readonly theatreService: TheatreService) { }

    @UseGuards(AdminGuard)
    @UseFilters(ValidationExceptionFilter)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createTheatre(@Body() createMovieDto: CreateTheatreDto): Promise<ReadTheatreDto> {
        return await this.theatreService.createTheatre(createMovieDto);
    }

    @Post('ids')
    @HttpCode(HttpStatus.OK)
    async getTheatreByIds(@Body() ids: string[]): Promise<ITheatre[]> {
        return await this.theatreService.getTheatreByIds(ids);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getTheatreById(@Param() id: string): Promise<ITheatre> {
        return await this.theatreService.getTheatreById(id);
    }
}
