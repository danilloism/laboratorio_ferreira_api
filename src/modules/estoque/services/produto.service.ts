import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, Repository } from 'typeorm';
import { CreateProdutoDto } from '../dtos/create-produto.dto';
import { UpdateProdutoDto } from '../dtos/update-produto.dto';
import { MarcaProduto } from '../entities/marca-produto.entity';
import { Produto } from '../entities/produto.entity';
import { TipoProduto } from '../entities/tipo-produto.entity';
import { ValorProduto } from '../entities/valor-produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(TipoProduto)
    private readonly tipoProdutoRepository: Repository<TipoProduto>,
    @InjectRepository(MarcaProduto)
    private readonly marcaProdutoRepository: Repository<MarcaProduto>,
    @InjectRepository(ValorProduto)
    private readonly valorProdutoRepository: Repository<ValorProduto>,
    private readonly dataSource: DataSource,
  ) {}

  async findById(id: string) {
    return await this.produtoRepository.findOne({
      where: { id },
      relationLoadStrategy: 'query',
    });
  }

  async create(createProdutoDto: CreateProdutoDto) {
    const produtoEntity = new Produto();

    const { valorCliente, valorEspOdont, marca, tipo, ...produto } =
      createProdutoDto;

    const valorEspOdontEntity = this.valorProdutoRepository.create({
      valor: valorEspOdont,
      espOdont: true,
    });
    const valorClienteEntity = this.valorProdutoRepository.create({
      valor: valorCliente,
      espOdont: false,
    });

    produtoEntity.historicoValores = [valorEspOdontEntity, valorClienteEntity];

    const existeTipo = await this.tipoProdutoRepository.findOne({
      where: { nome: tipo },
    });
    let existeMarca: MarcaProduto;
    let marcaProduto: MarcaProduto;

    if (marca) {
      existeMarca = await this.marcaProdutoRepository.findOne({
        where: { nome: marca },
      });

      marcaProduto = this.marcaProdutoRepository.create(
        existeMarca ?? { nome: marca },
      );
    }

    const tipoProduto = this.tipoProdutoRepository.create(
      existeTipo ?? { nome: tipo },
    );

    Object.assign(produtoEntity, { tipoProduto, marcaProduto, ...produto });

    const existeProduto = await this.produtoRepository.findOne({
      where: {
        nome: produto.nome,
        marcaProduto: marcaProduto ? { id: marcaProduto.id } : null,
        tipoProduto: { id: tipoProduto.id },
      },
    });

    if (existeProduto) {
      throw new ConflictException('Produto já existe.');
    }

    return await this.produtoRepository.save(produtoEntity);
  }

  async findAll() {
    return await this.produtoRepository.find();
  }

  async getHistoricoValores(id: string, espOdont?: boolean, cliente?: boolean) {
    const produto = await this.findById(id);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    if ((espOdont && cliente) || (!espOdont && !cliente)) {
      return await this.valorProdutoRepository.find({
        order: { dtFim: 'DESC' },
        where: { produto: { id } },
      });
    }

    if (espOdont) {
      return await this.valorProdutoRepository.find({
        order: { dtFim: 'DESC' },
        where: { produto: { id }, espOdont: true },
      });
    }

    return await this.valorProdutoRepository.find({
      order: { dtFim: 'DESC' },
      where: { produto: { id }, espOdont: false },
    });
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.findById(id);
    const { valorCliente, valorEspOdont, marca, tipo, ...dados } =
      updateProdutoDto;

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    let marcaProduto: MarcaProduto;

    if (marca) {
      marcaProduto = await this.marcaProdutoRepository.findOne({
        where: { nome: marca },
      });

      if (!marcaProduto) {
        throw new NotFoundException('Marca de produto não encontrada.');
      }
    }

    const tipoProduto = tipo
      ? await this.tipoProdutoRepository.findOne({
          where: { nome: tipo },
        })
      : produto.tipoProduto;

    if (!tipoProduto) {
      throw new NotFoundException('Tipo de produto não encontrado.');
    }

    const jaExisteProduto = await this.produtoRepository.findOne({
      where: {
        id: Not(id),
        marcaProduto: marca ? { id: marcaProduto.id } : null,
        tipoProduto: { id: tipoProduto.id },
        nome: dados.nome,
      },
    });

    if (jaExisteProduto) {
      throw new ConflictException(
        'Produto com nome, marca e tipo informados já existe.',
      );
    }

    Object.assign(produto, { tipoProduto, marcaProduto, ...dados });

    let valorClienteEntity: ValorProduto;
    let valorEspOdontEntity: ValorProduto;

    if (valorCliente) {
      valorClienteEntity = this.valorProdutoRepository.create({
        espOdont: false,
        valor: valorCliente,
      });
    }

    if (valorEspOdont) {
      valorEspOdontEntity = this.valorProdutoRepository.create({
        espOdont: true,
        valor: valorEspOdont,
      });
    }

    if (valorCliente && valorEspOdont) {
      return await this.dataSource.manager.transaction(async manager => {
        const valoresAtuais = await manager.find(ValorProduto, {
          where: { dtFim: null },
        });

        for (const valor of valoresAtuais) {
          valor.ativo = false;
          valor.dtFim = new Date();
        }

        await manager.save(valoresAtuais);

        produto.historicoValores.push(valorClienteEntity, valorEspOdontEntity);
        return await manager.save(produto);
      });
    }

    if (!valorCliente && !valorEspOdont) {
      return await this.produtoRepository.save(produto);
    }

    if (valorCliente) {
      return await this.dataSource.manager.transaction(async manager => {
        const valorAtual = await manager.findOne(ValorProduto, {
          where: { ativo: true, espOdont: false, produto: { id } },
        });
        valorAtual.dtFim = new Date();
        valorAtual.ativo = false;
        await manager.save(valorAtual);

        produto.historicoValores.push(valorClienteEntity);
        return await manager.save(produto);
      });
    }

    return await this.dataSource.manager.transaction(async manager => {
      const valorAtual = await manager.findOne(ValorProduto, {
        where: { ativo: true, espOdont: true, produto: { id } },
      });
      valorAtual.dtFim = new Date();
      valorAtual.ativo = false;
      await manager.save(valorAtual);

      produto.historicoValores.push(valorEspOdontEntity);
      return await manager.save(produto);
    });
  }

  async remove(id: string) {
    const produto = await this.findById(id);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    produto.ativo = false;
    await this.produtoRepository.save(produto);

    return true;
  }
}
