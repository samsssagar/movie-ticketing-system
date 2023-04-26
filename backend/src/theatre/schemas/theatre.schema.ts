import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Theatre {
    @AutoMap()
    @Prop({ auto: true, default: () => new Types.ObjectId() })
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({ required: true })
    name: string;

    @AutoMap()
    @Prop({ required: true })
    location: string;

    @AutoMap()
    @Prop({ default: 60 })
    availableSeats: number;
}

export const TheatreSchema = SchemaFactory.createForClass(Theatre);