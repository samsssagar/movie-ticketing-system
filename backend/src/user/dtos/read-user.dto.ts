import { AutoMap } from "@automapper/classes";

export class ReadUserDto {

    @AutoMap()
    id: string;

    @AutoMap()
    username: string;

    @AutoMap()
    email: string;

    @AutoMap()
    isAdmin: boolean;

    @AutoMap()
    createdOn: Date;

    @AutoMap()
    updatedOn: Date;
}