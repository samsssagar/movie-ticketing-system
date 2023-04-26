import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Movie {
    @AutoMap()
    @Prop({ auto: true, default: () => new Types.ObjectId() })
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({ required: true, unique: true })
    name: string;

    @AutoMap()
    @Prop()
    description: string;

    @AutoMap()
    @Prop()
    image: Buffer;

    @AutoMap()
    @Prop()
    duration: number;

    @AutoMap()
    @Prop()
    releaseDate: Date;

    @AutoMap()
    @Prop()
    createdAt: Date;

    @AutoMap()
    @Prop()
    updatedAt: Date;

    @AutoMap()
    @Prop()
    theatre: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);