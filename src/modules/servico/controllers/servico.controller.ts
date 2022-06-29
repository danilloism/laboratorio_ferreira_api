import { Controller } from '@nestjs/common';
import { ServicoService } from '../services/servico.service';

@Controller('servicos')
export class ServicoController {
	constructor(private readonly servicoService: ServicoService) {
	}

	// @Get()
	// async find() {
	//   return await this.servicoService.find();
	// }
	//
	// @Get(':id')
	// async findById(@Param('id', ParseUUIDPipe) id: string) {
	//   return await this.servicoService.findById(id);
	// }
	//
	// @Get('by-paciente/:pacienteId')
	// async findByPaciente(@Param('pacienteId', ParseUUIDPipe) pacienteId: string) {
	//   return await this.servicoService.findByPaciente(pacienteId);
	// }
}
