import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: '5d' },
      secret: process.env.JWT_SECRET,
    }),
    forwardRef(() => UsuarioModule),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],

  exports: [JwtStrategy, PassportModule, AuthService, JwtAuthGuard],

  controllers: [AuthController],
})
export class AuthModule {}
