import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: 3600 },
      secret: 'secretKey',
    }),
    PrismaModule,
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class SharedModule {}
