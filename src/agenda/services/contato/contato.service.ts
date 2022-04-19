import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CriarContatoDto } from '../../dtos/contato/criar-contato.dto';
import { Repository, TypeORMError } from 'typeorm';
import { Contato } from '../../entities/contato.entity';
import { AtualizarContatoDto } from '../../dtos/contato/atualizar-contato.dto';
import { InfoContatoDto } from '../../dtos/contato/info-contato.dto';

@Injectable()
export class ContatoService {
  constructor(
    @InjectRepository(Contato)
    private contatoRepository: Repository<Contato>,
  ) {}
  async getById(id: string): Promise<Contato> {
    return await this.contatoRepository.findOne({
      where: { id },
    });
  }
  async get(): Promise<Contato[]> {
    return await this.contatoRepository.find();
  }
  async post(contato: CriarContatoDto) {
    try {
      const result = await this.contatoRepository.save(contato);

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async put(id: string, contato: AtualizarContatoDto) {
    const result = await this.contatoRepository.update(id, contato);
    return result.generatedMaps;
  }
  async delete(id: string) {
    await this.contatoRepository.delete(id);
  }
}
