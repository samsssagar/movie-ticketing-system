import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ValidationExceptionFilter } from 'src/common/filters/validation-exception.filter';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseFilters(ValidationExceptionFilter)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    // @Get(":id")
    // @HttpCode(HttpStatus.OK)
    // async getUser(@Param("id") id: string) {
    //     return await this.userService.getUserDetails(id);
    // }

    @Get(":email")
    @HttpCode(HttpStatus.OK)
    async getUserByEmail(@Param("email") email: string) {
        return await this.userService.getUserDetailsByEmail(email);
    }
}
