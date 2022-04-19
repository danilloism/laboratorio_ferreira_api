import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contato, Usuario } from './entities/contato.entity';
import { ContatoService } from './services/contato/contato.service';
import { ContatoController } from './controllers/contato/contato.controller';
import { Telefone } from './entities/telefone.entity';
import { TelefoneController } from './controllers/telefone/telefone.controller';
import { TelefoneService } from './services/telefone/telefone.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contato, Telefone, Usuario])],
  controllers: [ContatoController, TelefoneController],
  providers: [ContatoService, TelefoneService],
})
export class AgendaModule {}
