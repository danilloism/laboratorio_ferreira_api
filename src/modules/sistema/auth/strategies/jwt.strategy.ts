import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (jwtPayload, done) {
        try {
          const usuario = this.validar(jwtPayload);
          return done(null, usuario);
        } catch (err) {
          return done(err, false);
        }
      },
    );
  }

  async validate(payload: JwtPayload) {
    const usuario = await this.authService.validateUsuario(payload);

    if (!usuario) {
      throw new UnauthorizedException();
    }

    return usuario;
  }
}
