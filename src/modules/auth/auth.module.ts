import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AgendaModule } from '../agenda/agenda.module';
import { PasswordService } from '../common/services/password.service';
import { DataModule } from '../data/data.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          signOptions: { expiresIn: '5d' },
          secret: config.get('encryption.jwtSecret'),
        };
      },
    }),
    AgendaModule,
    DataModule,
  ],
  providers: [AuthService, JwtStrategy, PasswordService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
