import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { ContatoModule } from '../../agenda/contato/contato.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '7d' },
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    ContatoModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
