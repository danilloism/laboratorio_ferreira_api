import { Module } from '@nestjs/common';
import { ContatoService } from './services/contato.service';
import { ContatoController } from './controller/contato.controller';
import { TelefoneController } from './controller/telefone.controller';
import { TelefoneService } from './services/telefone.service';

@Module({
  controllers: [ContatoController, TelefoneController],
  providers: [ContatoService, TelefoneService],
})
export class ContatoModule {}
