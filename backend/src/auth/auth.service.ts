import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<IUser> {
        const user = await this.userService.getUser(username);
        if (!user) throw new NotAcceptableException('User was not found');
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) throw new NotAcceptableException('Password did not match');
        if (user && passwordValid) return user;
    }

    async login(userDetails: any): Promise<{ access_token: string, id: string, username: string, email: string, isAdmin: boolean }> {
        const payload = { username: userDetails.username, sub: userDetails._id, email: userDetails.email };
        return {
            access_token: this.jwtService.sign(payload, { secret: `${process.env.TOKEN_SECRET}`, expiresIn: '1h' }),
            id: userDetails._id,
            username: userDetails.username,
            email: userDetails.email,
            isAdmin: userDetails.isAdmin
        };
    }
}
