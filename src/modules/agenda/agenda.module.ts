import { Module } from '@nestjs/common';
import { ContatoController } from './contato/controller/contato.controller';
import { ContatoService } from './contato/service/contato.service';

@Module({
  controllers: [ContatoController],
  providers: [ContatoService],
})
export class AgendaModule {}
