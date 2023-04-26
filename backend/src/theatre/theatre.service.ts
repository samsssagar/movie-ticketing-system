import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theatre } from './schemas/theatre.schema';
import { ITheatre } from './interfaces/theatre.interface';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Model, Types } from 'mongoose';
import { CreateTheatreDto } from './dtos/create-theatre.dto';
import { ReadTheatreDto } from './dtos/read-theatre.dto';

@Injectable()
export class TheatreService {
    constructor(
        @InjectModel(Theatre.name) private readonly theatreModel: Model<ITheatre>,
        @InjectMapper() private readonly classMapper: Mapper,
    ) { }

    async createTheatre(createTheatreDto: CreateTheatreDto): Promise<ReadTheatreDto> {
        const entity = this.classMapper.map(createTheatreDto, CreateTheatreDto, Theatre);
        return this.classMapper.mapAsync(await new this.theatreModel(entity).save(), Theatre, ReadTheatreDto);
    }

    async getTheatreByIds(ids: string[]): Promise<ITheatre[]> {
        const newIds = ids.map(id => new Types.ObjectId(id));
        const theatres = await this.theatreModel.find({ _id: { $in: newIds } }).exec();
        if (!theatres) throw new NotFoundException(`Theatres with given ids were not found`);
        return theatres;
    }

    async getTheatreById(id: string): Promise<ITheatre> {
        const theatres = await this.theatreModel.findOne(new Types.ObjectId(id)).exec();
        if (!theatres) throw new NotFoundException(`Theatre with given id was not found`);
        return theatres;
    }

    async updateTheatreSeats(id: string, seats: number) {
        const res = await this.theatreModel.findById(new Types.ObjectId(id)).exec();
        await this.theatreModel.updateOne({ _id: res._id }, { $inc: { availableSeats: seats } });
    }
}
