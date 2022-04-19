import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Strategy } from 'passport-local';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secretKey',
      },
      function (jwtPayload, done) {
        try {
          const usuario = this.validar(jwtPayload.sub);
          return done(null, usuario);
        } catch (err) {
          return done(err, false);
        }
      },
    );
  }

  async validar(payload: JwtPayload) {
    const usuario = await this.authService.validarUsuario(payload);

    if (!usuario) {
      throw new UnauthorizedException();
    }

    return usuario;
  }
}
