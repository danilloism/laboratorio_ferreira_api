import { Module } from '@nestjs/common';
import { ContatoModule } from '../agenda/contato/contato.module';
import { EstoqueModule } from '../estoque/estoque.module';
import { ServicoController } from './controllers/servico.controller';
import { ServicoService } from './services/servico.service';

@Module({
	imports: [

		ContatoModule,
		EstoqueModule,
	],
	providers: [ ServicoService ],
	controllers: [ ServicoController ],
})
export class ServicoModule {}
