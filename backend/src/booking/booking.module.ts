import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingProfile } from './profiles/booking.profile';
import { TheatreService } from 'src/theatre/theatre.service';
import { Theatre, TheatreSchema } from 'src/theatre/schemas/theatre.schema';
import { TheatreProfile } from 'src/theatre/profiles/theatre.profile';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: Theatre.name, schema: TheatreSchema }])
  ],
  providers: [BookingService, BookingProfile, TheatreService, TheatreProfile],
  controllers: [BookingController]
})
export class BookingModule { }
