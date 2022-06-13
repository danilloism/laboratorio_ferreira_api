import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtapaFabricacao } from './entities/etapa-fabricacao.entity';
import { ItemServico } from './entities/item-servico.entity';
import { Servico } from './entities/servico.entity';
import { ServicoService } from './services/servico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Servico, ItemServico, EtapaFabricacao])],
  providers: [ServicoService],
})
export class ServicoModule {}
