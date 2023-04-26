import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../schemas/user.schema";
import { ReadUserDto } from "../dtos/read-user.dto";

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CreateUserDto, User);
            createMap(mapper, User, ReadUserDto, forMember(s => s.id, mapFrom(opts => opts._id.toString())));
        };
    }
}