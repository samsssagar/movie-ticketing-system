import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { ValidationExceptionFilter } from 'src/common/filters/validation-exception.filter';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { IBooking } from './interfaces/booking.interface';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseFilters(ValidationExceptionFilter)
    async createBooking(@Request() req, @Body() createBookingDto: CreateBookingDto) {
        createBookingDto.userId = req.user._id;
        return this.bookingService.createBooking(createBookingDto);
    }

    @Get()
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.OK)
    async fetchAllBookings(): Promise<IBooking[]> {
        return await this.bookingService.fetchAllBooking();
    }
}
