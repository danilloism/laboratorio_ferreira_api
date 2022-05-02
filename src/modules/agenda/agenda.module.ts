import { Module } from '@nestjs/common';
import { ContatoModule } from './contato/contato.module';

@Module({
  imports: [ContatoModule],
  controllers: [],
  providers: [],
})
export class AgendaModule {}
