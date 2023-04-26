import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { CreateTheatreDto } from "../dtos/create-theatre.dto";
import { Theatre } from "../schemas/theatre.schema";
import { ReadTheatreDto } from "../dtos/read-theatre.dto";

@Injectable()
export class TheatreProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CreateTheatreDto, Theatre);
            createMap(mapper, Theatre, ReadTheatreDto, forMember(s => s.id, mapFrom(opts => opts._id.toString())));
        };
    }
}