import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema()
export class User {

    @AutoMap()
    @Prop({ auto: true, default: () => new Types.ObjectId() })
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({ unique: true, isRequired: true })
    username: string;

    @AutoMap()
    @Prop({ unique: true, isRequired: true })
    email: string;

    @AutoMap()
    @Prop({ isRequired: true })
    password: string;

    @AutoMap()
    @Prop({ isRequired: true })
    isAdmin: boolean;

    @AutoMap()
    @Prop()
    createdOn: Date;

    @AutoMap()
    @Prop()
    updatedOn: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);