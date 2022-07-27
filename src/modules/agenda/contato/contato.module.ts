import { Module } from '@nestjs/common';
import { DataModule } from 'src/modules/data/data.module';
import { ContatoController } from './controller/contato.controller';
import { ContatoService } from './services/contato.service';

@Module({
  imports: [DataModule],
  controllers: [ContatoController],
  providers: [ContatoService],
  exports: [ContatoService],
})
export class ContatoModule {}
