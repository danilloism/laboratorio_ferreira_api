import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: 3600 },
      secret: process.env.JWT_SECRET,
    }),
    forwardRef(() => AccountModule),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard /*, AccountService*/],

  exports: [JwtStrategy, PassportModule, AuthService, JwtAuthGuard],
})
export class AuthModule {}
