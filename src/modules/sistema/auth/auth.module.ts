import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: 3600 },
      secret: process.env.JWT_SECRET,
    }),
    forwardRef(() => UsuarioModule),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],

  exports: [JwtStrategy, PassportModule, AuthService, JwtAuthGuard],
})
export class AuthModule {}
