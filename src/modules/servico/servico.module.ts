import { Module } from '@nestjs/common';
import { ContatoService } from '../agenda/services/contato.service';
import { PrismaService } from '../data/services/prisma.service';
import { ServicoController } from './controllers/servico.controller';
import { ServicoService } from './services/servico.service';

@Module({
  imports: [],
  providers: [ServicoService, ContatoService, PrismaService],
  controllers: [ServicoController],
})
export class ServicoModule {}
