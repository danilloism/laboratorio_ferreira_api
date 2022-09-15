import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import encryptionConfig from '../../../config/encryption.config';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(encryptionConfig.KEY)
    private encryptConfig: ConfigType<typeof encryptionConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: encryptConfig.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const usuario = await this.authService.validateUsuario(payload);

    if (!usuario) {
      throw new UnauthorizedException('Acesso não autenticado.');
    }

    return usuario;
  }
}
