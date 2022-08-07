import { Module } from '@nestjs/common';
import { PrismaService } from '../data/services/prisma.service';
import { ContatoController } from './controllers/contato.controller';
import { ContatoService } from './services/contato.service';

@Module({
  imports: [],
  controllers: [ContatoController],
  providers: [PrismaService, ContatoService],
  exports: [ContatoService],
})
export class AgendaModule {}
