import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get<string>('TOKEN_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any): Promise<any> {
        let username: string = payload.username;
        const user = await this.userService.getUser(username);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
