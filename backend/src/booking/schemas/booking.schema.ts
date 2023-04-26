import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Movie } from 'src/movie/schemas/movie.schema';
import { Theatre } from 'src/theatre/schemas/theatre.schema';
import { User } from 'src/user/schemas/user.schema';


@Schema()
export class Booking {

    @AutoMap()
    @Prop({ auto: true, default: () => new Types.ObjectId() })
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User;

    @AutoMap()
    @Prop({ type: Types.ObjectId, ref: 'Movie' })
    movie: Movie;

    @AutoMap()
    @Prop({ type: Types.ObjectId, ref: 'Theatre' })
    theatre: Theatre;

    @AutoMap()
    @Prop()
    createdAt: Date;

    @AutoMap()
    @Prop()
    updatedAt: Date;

    @AutoMap()
    @Prop()
    seatsBooked: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);