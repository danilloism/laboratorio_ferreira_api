import { Module } from '@nestjs/common';
import { UsuarioModule } from '../sistema/usuario/usuario.module';
import { ContatoController } from './contato/controller/contato.controller';
import { ContatoService } from './contato/service/contato.service';
import { TelefoneController } from './telefone/controller/telefone.controller';
import { TelefoneService } from './telefone/service/telefone.service';

@Module({
  imports: [UsuarioModule],
  controllers: [ContatoController, TelefoneController],
  providers: [ContatoService, TelefoneService],
})
export class AgendaModule {}
