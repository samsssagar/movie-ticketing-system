import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './schemas/booking.schema';
import { Model } from 'mongoose';
import { IBooking } from './interfaces/booking.interface';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ReadBookingDto } from './dtos/read-booking.dto';
import { TheatreService } from 'src/theatre/theatre.service';
import { FetchBookingsDto } from './dtos/fetch-bookings.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private readonly bookingModel: Model<IBooking>,
        @InjectMapper() private readonly classMapper: Mapper,
        private readonly theatreService: TheatreService,
    ) { }

    async createBooking(createBookingDto: CreateBookingDto): Promise<ReadBookingDto> {
        createBookingDto.createdAt = new Date(new Date().toUTCString());
        createBookingDto.updatedAt = new Date(new Date().toUTCString());
        const entity = this.classMapper.map(createBookingDto, CreateBookingDto, Booking);
        const result = await this.classMapper.mapAsync(await new this.bookingModel(entity).save(), Booking, ReadBookingDto);
        await this.theatreService.updateTheatreSeats(createBookingDto.theatreId, -createBookingDto.seatsBooked);
        return result;
    }

    async fetchAllBooking(): Promise<IBooking[]> {
        const bookings = await this.bookingModel.find()
            .populate('user', '_id username')
            .populate('movie', '_id name')
            .populate('theatre', '_id name')
            .exec();
        if (!bookings.length) throw new NotFoundException(`No Bookings Found`);
        return bookings;
    }
}
