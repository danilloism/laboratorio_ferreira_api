import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: '5d' },
      secret: process.env.JWT_SECRET,
    }),
    UsuarioModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
