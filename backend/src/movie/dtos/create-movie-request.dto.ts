import { AutoMap } from "@automapper/classes";
import { IsDateString, IsMimeType, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateMovieRequestDto {
    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    name: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @Length(10, 200)
    description: string;

    @AutoMap()
    @IsNotEmpty()
    duration: string;

    @AutoMap()
    @IsDateString()
    @IsNotEmpty()
    releaseDate: Date;

    @AutoMap()
    @IsOptional()
    @IsMimeType()
    image: Buffer;

    @AutoMap()
    @IsOptional()
    @IsString({ each: true })
    theatre: string;
}