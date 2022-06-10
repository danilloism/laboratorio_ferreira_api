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
    return await this.produtoRepository.findOne({ where: { id } });
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
      return produto.historicoValores;
    }

    if (espOdont) {
      return produto.historicoValores.filter(valor => valor.espOdont);
    }

    return produto.historicoValores.filter(valor => !valor.espOdont);
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.findById(id);
    const { valorCliente, valorEspOdont, marca, tipo, ...dados } =
      updateProdutoDto;

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const existeTipo = await this.tipoProdutoRepository.findOne({
      where: { nome: tipo },
    });
    const existeMarca = await this.marcaProdutoRepository.findOne({
      where: { nome: marca },
    });

    const marcaProduto = this.marcaProdutoRepository.create(
      existeMarca ?? { nome: marca },
    );
    const tipoProduto = this.tipoProdutoRepository.create(
      existeTipo ?? { nome: tipo },
    );

    const jaExisteProduto = await this.produtoRepository.findOne({
      where: {
        id: Not(id),
        marcaProduto,
        tipoProduto,
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
      return await this.dataSource.transaction(async manager => {
        await manager.update(
          ValorProduto,
          { dtFim: null },
          { dtFim: new Date() },
        );
        produto.historicoValores.push(valorClienteEntity);
        produto.historicoValores.push(valorEspOdontEntity);
        return await manager.save(produto);
      });
    }

    if (!valorCliente && !valorEspOdont) {
      return await this.produtoRepository.save(produto);
    }

    if (valorCliente) {
      return await this.dataSource.transaction(async manager => {
        await manager.update(
          ValorProduto,
          { dtFim: null, espOdont: false },
          { dtFim: new Date() },
        );
        produto.historicoValores.push(valorClienteEntity);
        return await manager.save(produto);
      });
    }

    return await this.dataSource.transaction(async manager => {
      await manager.update(
        ValorProduto,
        { dtFim: null, espOdont: true },
        { dtFim: new Date() },
      );
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

  async getTiposProduto() {
    return (await this.tipoProdutoRepository.find()).map(tipo => tipo.nome);
  }

  async getMarcasProduto() {
    return (await this.marcaProdutoRepository.find()).map(marca => marca.nome);
  }
}
