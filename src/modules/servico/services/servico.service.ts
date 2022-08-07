import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';
import { ContatoService } from '../../agenda/services/contato.service';
import { ContatoType } from '../../agenda/types/contato.type';
import { Uuid } from '../../common/types/uid';
import { PrismaService } from '../../data/services/prisma.service';
import { CreateServicoDto } from '../dtos/create-servico.dto';

@Injectable()
export class ServicoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contatoService: ContatoService,
  ) {}

  async find() {
    return await this.prisma.servico.findMany();
  }

  async findById(uid: Uuid) {
    return await this.prisma.servico.findUnique({ where: { uid } });
  }

  async findByDentista(dentistaUid: Uuid) {
    const dentista = (await this.contatoService.findByRole(
      { uid: dentistaUid, include: { servicosComoDentista: true } },
      RoleEnum.DENTISTA,
    )) as ContatoType;

    if (!dentista) {
      throw new NotFoundException('Dentista não encontrado.');
    }

    return dentista.servicosComoDentista;
  }

  async findByPaciente(pacienteUid: Uuid) {
    const paciente = (await this.contatoService.findByRole(
      { uid: pacienteUid, include: { servicosComoPaciente: true } },
      RoleEnum.PACIENTE,
    )) as ContatoType;

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado.');
    }

    return paciente.servicosComoPaciente;
  }

  async create({
    espOdont,
    dentistaUid,
    uidPacientes,
    itens,
    observacoes,
    descricao,
  }: CreateServicoDto) {
    const dentista = (await this.contatoService.findByRole(
      { uid: dentistaUid },
      RoleEnum.DENTISTA,
    )) as ContatoType;

    if (!dentista) {
      throw new NotFoundException('Dentista não encontrado.');
    }

    for (const itemServico of itens) {
      const produto = await this.prisma.produto.findUnique({
        where: { uid: itemServico.produtoUid },
      });

      if (!produto) throw new NotFoundException('Produto não encontrado.');
    }

    if (uidPacientes) {
      for (const pacienteUid of uidPacientes) {
        const paciente = (await this.contatoService.findByRole(
          { uid: pacienteUid },
          RoleEnum.PACIENTE,
        )) as ContatoType;

        if (!paciente)
          throw new NotFoundException(
            `Paciente (uid: ${pacienteUid}) não encontrado.`,
          );
      }
    }

    await this.prisma.etapaFabricacao.upsert({
      where: { nome: 'recebido' },
      create: { nome: 'recebido' },
      update: {},
    });

    return this.prisma.servico.create({
      data: {
        espOdont,
        dentista: { connect: { uid: dentista.uid } },
        pacientes: {
          connect: uidPacientes?.map(uid => ({ uid })),
        },
        itens: {
          createMany: {
            data: itens.map(produto => {
              const { produtoUid, desconto, quantidade } = produto;
              return {
                descontoEmCents: desconto?.intValue,
                produtoUid,
                quantidade,
                etapa: 'recebido',
              };
            }),
          },
        },
        descricao,
        observacoes,
      },
      include: { itens: true, pacientes: true },
    });
  }
}
