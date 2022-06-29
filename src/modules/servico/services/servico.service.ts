import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicoService {
	constructor() {
	}

	//
	// async find() {
	// 	return await this.servicoRepository.find();
	// }
	//
	// async findById(id: string) {
	// 	return await this.servicoRepository.findOne({ where: { id } });
	// }
	//
	// async findByDentista(dentistaId: string) {
	// 	const dentista = await this.contatoService.findByUid(dentistaId);
	//
	// 	if (!dentista) {
	// 		throw new NotFoundException('Dentista não encontrado.');
	// 	}
	//
	// 	return await this.servicoRepository.find({
	// 		where: { dentista: { id: dentistaId } },
	// 	});
	// }
	//
	// async findByPaciente(pacienteId: string) {
	// 	const paciente = await this.contatoService.findByUid(pacienteId);
	//
	// 	if (!paciente) {
	// 		throw new NotFoundException('Paciente não encontrado.');
	// 	}
	//
	// 	return await this.servicoRepository.find({
	// 		where: { paciente: { id: pacienteId } },
	// 	});
	// }
	//
	// async create(createServicoDto: CreateServicoDto) {
	// 	const servico = this.servicoRepository.create();
	//
	// 	const dentista = await this.contatoService.findByUid(
	// 		createServicoDto.dentistaId,
	// 	);
	// 	if (!dentista) {
	// 		throw new NotFoundException('Dentista não encontrado.');
	// 	}
	//
	// 	if (
	// 		!CategoriaHelper.isDentistaEspOdont(dentista) &&
	// 		createServicoDto.espOdont
	// 	) {
	// 		throw new ConflictException(
	// 			'Dentista informado não é colaborador do Espaço Odontológico.',
	// 		);
	// 	}
	//
	// 	servico.dentista = dentista;
	//
	// 	if (createServicoDto.pacienteId) {
	// 		const paciente = await this.contatoService.findByUid(
	// 			createServicoDto.pacienteId,
	// 		);
	// 		if (!paciente) {
	// 			throw new NotFoundException('Paciente não encontrado.');
	// 		}
	// 		servico.paciente = paciente;
	// 	}
	//
	// 	const valorTotal = CurrencyHelper.createCurrencyInstance(0);
	//
	// 	const itensServico = await Promise.all(
	// 		createServicoDto.produtos.map(async itemServico => {
	// 			const produto = await this.produtoService.findById(
	// 				itemServico.produtoId,
	// 			);
	// 			if (!produto) {
	// 				throw new NotFoundException('Produto não encontrado.');
	// 			}
	//
	// 			const item = this.itemServicoRepository.create({
	// 				produto,
	// 				servico,
	// 				quantidade: itemServico.quantidade,
	// 				desconto: itemServico.desconto,
	// 			});
	//
	// 			const valor = CurrencyHelper.createCurrencyInstance(0);
	//
	// 			if (createServicoDto.espOdont) {
	// 				valor.add(produto.valor.espOdont);
	// 			} else {
	// 				valor.add(produto.valor.cliente);
	// 			}
	//
	// 			valor.multiply(item.quantidade);
	// 			valor.subtract(item.desconto ?? 0);
	// 			valorTotal.add(valor);
	//
	// 			const etapa = await this.etapaFabricacaoRepository.findOne({
	// 				where: { nome: 'recebido' },
	// 			});
	//
	// 			item.etapaFabricacao =
	// 				etapa ||
	// 				(await this.etapaFabricacaoRepository.save({
	// 					nome: 'recebido',
	// 				}));
	//
	// 			return item;
	// 		}),
	// 	);
	//
	// 	servico.itensServico = itensServico;
	// 	Object.assign(servico, {
	// 		descricao: createServicoDto.descricao,
	// 		observacoes: createServicoDto.observacoes,
	// 		espOdont: createServicoDto.espOdont,
	// 	});
	//
	// 	return await this.servicoRepository.save(servico);
	// }
}
