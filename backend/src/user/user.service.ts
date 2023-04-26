import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import * as bcrypt from 'bcrypt';
import { ReadUserDto } from './dtos/read-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<IUser>,
        @InjectMapper() private readonly classMapper: Mapper,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<ReadUserDto> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
        createUserDto.password = hashedPassword;
        createUserDto.createdOn = new Date(new Date().toUTCString());
        createUserDto.updatedOn = new Date(new Date().toUTCString());
        const entity = this.classMapper.map(createUserDto, CreateUserDto, User);
        return this.classMapper.mapAsync(await new this.userModel(entity).save(), User, ReadUserDto);
    }

    async getUser(username: string): Promise<IUser> {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
            throw new NotFoundException(`User with username "${username}" not found`);
        }
        return user;
    }

    async getUserDetails(id: string): Promise<ReadUserDto> {
        return this.classMapper.mapAsync(await this.userModel.findById(id), User, ReadUserDto);
    }

    async getUserDetailsByEmail(email: string): Promise<ReadUserDto> {
        return this.classMapper.mapAsync(await this.userModel.findOne({ email: email }), User, ReadUserDto);
    }
}
