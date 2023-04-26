import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "../dtos/create-booking.dto";
import { Booking } from "../schemas/booking.schema";
import { Types } from "mongoose";
import { ReadBookingDto } from "../dtos/read-booking.dto";
import { FetchBookingsDto } from "../dtos/fetch-bookings.dto";

@Injectable()
export class BookingProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CreateBookingDto, Booking,
                forMember(s => s.user._id, mapFrom(opts => new Types.ObjectId(opts.userId))),
                forMember(s => s.movie._id, mapFrom(opts => new Types.ObjectId(opts.movieId))),
                forMember(s => s.theatre._id, mapFrom(opts => new Types.ObjectId(opts.theatreId)))
            );
            createMap(mapper, Booking, ReadBookingDto,
                forMember(s => s.userId, mapFrom(opts => opts.user._id.toString())),
                forMember(s => s.movieId, mapFrom(opts => opts.movie._id.toString())),
                forMember(s => s.theatreId, mapFrom(opts => opts.theatre._id.toString()))
            );
            createMap(mapper, Booking, FetchBookingsDto,
                forMember(s => s.user.id, mapFrom(opts => opts.user._id.toString())),
                forMember(s => s.user.email, mapFrom(opts => opts.user.email)),
                forMember(s => s.user.name, mapFrom(opts => opts.user.username)),
                forMember(s => s.movie.id, mapFrom(opts => opts.movie._id.toString())),
                forMember(s => s.movie.name, mapFrom(opts => opts.movie.name)),
                forMember(s => s.theatre.id, mapFrom(opts => opts.theatre._id.toString())),
                forMember(s => s.theatre.name, mapFrom(opts => opts.theatre.name))
            )
        };
    }
}