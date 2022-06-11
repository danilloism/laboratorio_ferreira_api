import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtapaFabricacao } from './entities/etapa-fabricacao.entity';
import { ItemServico } from './entities/item-servico.entity';
import { Servico } from './entities/servico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servico, ItemServico, EtapaFabricacao])],
})
export class ServicoModule {}
