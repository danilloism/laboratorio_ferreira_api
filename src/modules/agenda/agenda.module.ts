import { Module } from '@nestjs/common';
import { ContatoService } from './services/contato/contato.service';
import { ContatoController } from './controllers/contato/contato.controller';
import { TelefoneController } from './controllers/telefone/telefone.controller';
import { TelefoneService } from './services/telefone/telefone.service';

@Module({
  controllers: [ContatoController, TelefoneController],
  providers: [ContatoService, TelefoneService],
})
export class AgendaModule {}
