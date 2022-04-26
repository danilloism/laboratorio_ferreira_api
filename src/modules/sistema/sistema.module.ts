import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth';

@Module({
  imports: [PrismaModule, AuthModule, UsuarioModule],
  providers: [],
})
export class SistemaModule {}
