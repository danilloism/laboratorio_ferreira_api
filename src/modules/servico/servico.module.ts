import { Module } from '@nestjs/common';
import { AgendaModule } from '../agenda/agenda.module';
import { DataModule } from '../data/data.module';
import { ServicoController } from './controllers/servico.controller';
import { ServicoService } from './services/servico.service';

@Module({
  imports: [AgendaModule, DataModule],
  providers: [ServicoService],
  controllers: [ServicoController],
})
export class ServicoModule {}
