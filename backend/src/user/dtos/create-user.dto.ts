import { AutoMap } from "@automapper/classes";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @AutoMap()
    @IsOptional()
    id: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    username: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    password: string;

    @AutoMap()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @AutoMap()
    @IsBoolean()
    @IsNotEmpty()
    isAdmin: boolean;

    @AutoMap()
    @IsOptional()
    @IsDate()
    createdOn: Date;

    @AutoMap()
    @IsOptional()
    @IsDate()
    updatedOn: Date;
}