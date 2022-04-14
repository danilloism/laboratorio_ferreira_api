import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contato } from './contato.entity';

@Injectable()
export class ContatoService {
  constructor(
    @InjectRepository(Contato)
    private contatoRepository: Repository<Contato>,
  ) {}

  //   async getByCodigo(id: string): Promise<Contato> {
  // return this.contatoRepository.findOne({ codigo: id });
  //   }

  async get(): Promise<Contato[]> {
    return await this.contatoRepository.find();
  }

  async post(contato: Contato) {
    await this.contatoRepository.save(contato);
  }

  async put(id: number, contato: Contato) {
    await this.contatoRepository.update(id, contato);
  }

  async delete(id: number) {
    await this.contatoRepository.delete(id);
  }
}
