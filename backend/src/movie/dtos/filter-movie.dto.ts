import { IsDate, IsDateString, IsOptional, IsString } from "class-validator";

export class FilterMovieDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsDateString({ strict: true })
    startDate: Date;

    @IsOptional()
    @IsDateString({ strict: true })
    endDate: Date;

    @IsOptional()
    theatre: string;
}