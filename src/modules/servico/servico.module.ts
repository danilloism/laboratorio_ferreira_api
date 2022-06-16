import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContatoModule } from '../agenda/contato/contato.module';
import { EstoqueModule } from '../estoque/estoque.module';
import { ServicoController } from './controllers/servico.controller';
import { EtapaFabricacao } from './entities/etapa-fabricacao.entity';
import { ItemServico } from './entities/item-servico.entity';
import { Servico } from './entities/servico.entity';
import { ServicoService } from './services/servico.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servico, ItemServico, EtapaFabricacao]),
    ContatoModule,
    EstoqueModule,
  ],
  providers: [ServicoService],
  controllers: [ServicoController],
})
export class ServicoModule {}
