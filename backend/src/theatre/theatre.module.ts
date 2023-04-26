import { Module } from '@nestjs/common';
import { TheatreService } from './theatre.service';
import { TheatreController } from './theatre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Theatre, TheatreSchema } from './schemas/theatre.schema';
import { TheatreProfile } from './profiles/theatre.profile';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Theatre.name, schema: TheatreSchema }])
  ],
  providers: [TheatreService, TheatreProfile],
  controllers: [TheatreController]
})
export class TheatreModule { }
