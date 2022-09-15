import { Module } from '@nestjs/common';
import { PasswordService } from '../common/services/password.service';
import { DataModule } from '../data/data.module';
import { ContatoController } from './controllers/contato.controller';
import { ContatoService } from './services/contato.service';

@Module({
  imports: [DataModule],
  controllers: [ContatoController],
  providers: [ContatoService, PasswordService],
  exports: [ContatoService],
})
export class AgendaModule {}
