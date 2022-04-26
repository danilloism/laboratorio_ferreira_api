import { forwardRef, Module } from '@nestjs/common';
import { AuthModule, JwtAuthGuard } from '../auth';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService, JwtAuthGuard],
  exports: [UsuarioService],
})
export class UsuarioModule {}
