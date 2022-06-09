import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { PasswordHelper } from '../../../common/helpers/password.helper';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Contato } from '../entities/contato.entity';
import { CategoriaEnum } from '../enums/categoria.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContatoService {
  constructor(
    @InjectRepository(Contato)
    private readonly contatoRepository: Repository<Contato>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findById(id: string): Promise<Contato> {
    return await this.contatoRepository.findOne({
      where: { id },
      relations: ['account'],
    });
  }

  async findByTelefone(telefone: string): Promise<Contato> {
    return await this.contatoRepository.findOne({
      where: { telefone },
      relations: ['account'],
    });
  }

  async find(): Promise<Contato[]> {
    return await this.contatoRepository.find({ relations: ['account'] });
  }

  async create({
    nome,
    telefone,
    account,
    categorias,
  }: CreateContatoDto): Promise<Contato> {
    const accountEntity = this.accountRepository.create(account);

    if (account) {
      const { email, username } = account;

      const emailExiste = await this.accountRepository.findOne({
        where: { email },
      });
      if (emailExiste) {
        throw new ConflictException('Email informado já existe.');
      }

      const usernameExiste = await this.accountRepository.findOne({
        where: { username },
      });
      if (usernameExiste) {
        throw new ConflictException('Username informado já existe.');
      }

      const senha = await new PasswordHelper(account.senha).encrypt();
      Object.assign(accountEntity, { ...account, senha: senha });
    }

    const telefoneExiste = await this.findByTelefone(telefone);
    if (telefoneExiste) {
      throw new ConflictException('Telefone informado já existe.');
    }

    const contato = this.contatoRepository.create({
      nome,
      telefone,
      categorias,
    });

    contato.account = account ? accountEntity : undefined;

    return await this.contatoRepository.save(contato);
  }

  async update(
    id: string,
    atualizarContatoDto: UpdateContatoDto,
  ): Promise<Contato> {
    const contato = await this.findById(id);
    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    Object.assign(contato, atualizarContatoDto);

    return await this.contatoRepository.save(contato);
  }

  async findAccountByContatoId(id: string): Promise<Account> {
    const contato = await this.findById(id);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return await this.accountRepository.findOne({
      where: { contato: { id } },
    });
  }

  async findAccountByEmail(email: string): Promise<Account> {
    return await this.accountRepository.findOne({
      where: { email },
      relations: ['contato'],
    });
  }

  async findAccountByUsername(username: string): Promise<Account> {
    return await this.accountRepository.findOne({
      where: { username },
      relations: ['contato'],
    });
  }

  async updateAccount(contatoId: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.findAccountByContatoId(contatoId);

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    Object.assign(account, updateAccountDto);

    return await this.accountRepository.save(account);
  }

  async createAccount(contatoId: string, createAccountDto: CreateAccountDto) {
    const accountExiste = await this.findAccountByContatoId(contatoId);

    if (accountExiste) {
      throw new ConflictException(
        'Conta de usuário já existe para contato informado.',
      );
    }

    const senha = await new PasswordHelper(createAccountDto.senha).encrypt();
    createAccountDto = { ...createAccountDto, senha };

    return await this.accountRepository.save(createAccountDto);
  }

  async deleteAccount(contatoId: string): Promise<void> {
    const account = await this.findAccountByContatoId(contatoId);

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    if (!account.ativo) {
      throw new ConflictException('Conta de usuário já foi deletada.');
    }

    await this.accountRepository.update(account.id, { ativo: false });
  }

  async restoreAccount(contatoId: string): Promise<Account> {
    const account = await this.findAccountByContatoId(contatoId);

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    if (account.ativo) {
      throw new ConflictException('Conta de usuário não está deletada.');
    }

    account.ativo = false;

    return await this.accountRepository.save(account);
  }

  async getRoles(id: string): Promise<CategoriaEnum[]> {
    const contato = await this.findById(id);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return contato.categorias;
  }
}
