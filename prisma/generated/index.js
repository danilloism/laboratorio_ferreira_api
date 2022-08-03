
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  objectEnumValues
} = require('./runtime/index')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.1.1
 * Query Engine version: 8d8414deb360336e4698a65aa45a1fbaf1ce13d8
 */
Prisma.prismaVersion = {
  client: "4.1.1",
  engine: "8d8414deb360336e4698a65aa45a1fbaf1ce13d8"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

const { findSync } = require('./runtime')
const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "prisma/generated",
    "generated",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.ContatoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  nome: 'nome',
  categorias: 'categorias',
  telefones: 'telefones'
});

exports.Prisma.UsuarioScalarFieldEnum = makeEnum({
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  contatoUid: 'contatoUid',
  email: 'email',
  username: 'username',
  senha: 'senha'
});

exports.Prisma.ProdutoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  nome: 'nome',
  descricao: 'descricao',
  tipo: 'tipo',
  marca: 'marca'
});

exports.Prisma.TipoProdutoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  nome: 'nome',
  descricao: 'descricao'
});

exports.Prisma.MarcaProdutoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  nome: 'nome',
  descricao: 'descricao'
});

exports.Prisma.ValorProdutoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  espOdont: 'espOdont',
  valorEmCents: 'valorEmCents',
  dtFim: 'dtFim',
  produtoUid: 'produtoUid'
});

exports.Prisma.ServicoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  dentistaUid: 'dentistaUid',
  descricao: 'descricao',
  observacoes: 'observacoes',
  espOdont: 'espOdont'
});

exports.Prisma.ProdutoServicoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  produtoUid: 'produtoUid',
  servicoUid: 'servicoUid',
  quantidade: 'quantidade',
  descontoEmCents: 'descontoEmCents',
  descricao: 'descricao',
  observacoes: 'observacoes',
  etapa: 'etapa'
});

exports.Prisma.EtapaFabricacaoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  nome: 'nome',
  descricao: 'descricao'
});

exports.Prisma.LancamentoFinanceiroScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  ativo: 'ativo',
  qtdParcelas: 'qtdParcelas',
  dtLancamento: 'dtLancamento',
  dtPrimeiroVencimento: 'dtPrimeiroVencimento',
  intervaloDiasEntreParcelas: 'intervaloDiasEntreParcelas',
  valorEntradaEmCents: 'valorEntradaEmCents',
  descricao: 'descricao',
  observacoes: 'observacoes',
  servicoUid: 'servicoUid',
  formaDePagamento: 'formaDePagamento'
});

exports.Prisma.LancamentoSaidaScalarFieldEnum = makeEnum({
  uid: 'uid',
  paraQuemUid: 'paraQuemUid',
  finalidade: 'finalidade'
});

exports.Prisma.ParcelaScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  valorEmCents: 'valorEmCents',
  numParcela: 'numParcela',
  status: 'status',
  lancamentoFinanceiroUid: 'lancamentoFinanceiroUid'
});

exports.Prisma.PagamentoScalarFieldEnum = makeEnum({
  uid: 'uid',
  criadoEm: 'criadoEm',
  atualizadoEm: 'atualizadoEm',
  dt: 'dt',
  valorEmCents: 'valorEmCents',
  parcelaUid: 'parcelaUid'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.RoleEnum = makeEnum({
  ADMIN: 'ADMIN',
  GERENTE: 'GERENTE',
  COLABORADOR: 'COLABORADOR',
  DENTISTA: 'DENTISTA',
  CLIENTE: 'CLIENTE',
  FORNECEDOR: 'FORNECEDOR',
  ENTREGADOR: 'ENTREGADOR'
});

exports.FormaPagamentoEnum = makeEnum({
  DINHEIRO: 'DINHEIRO',
  CHEQUE: 'CHEQUE',
  CARTAO: 'CARTAO'
});

exports.FinalidadeSaidaEnum = makeEnum({
  AGUA: 'AGUA',
  ENERGIA: 'ENERGIA',
  GAS: 'GAS',
  SALARIO: 'SALARIO',
  REPASSE_DENT_ESP_ODONT: 'REPASSE_DENT_ESP_ODONT',
  PGMNT_FONECEDOR: 'PGMNT_FONECEDOR',
  OUTRO: 'OUTRO'
});

exports.StatusPagamentoEnum = makeEnum({
  ABERTO: 'ABERTO',
  QUITADO: 'QUITADO',
  VENCIDO: 'VENCIDO',
  RENEGOCIADO: 'RENEGOCIADO'
});

exports.Prisma.ModelName = makeEnum({
  Contato: 'Contato',
  Usuario: 'Usuario',
  Produto: 'Produto',
  TipoProduto: 'TipoProduto',
  MarcaProduto: 'MarcaProduto',
  ValorProduto: 'ValorProduto',
  Servico: 'Servico',
  ProdutoServico: 'ProdutoServico',
  EtapaFabricacao: 'EtapaFabricacao',
  LancamentoFinanceiro: 'LancamentoFinanceiro',
  LancamentoSaida: 'LancamentoSaida',
  Parcela: 'Parcela',
  Pagamento: 'Pagamento'
});

const dmmfString = "{\"datamodel\":{\"enums\":[{\"name\":\"RoleEnum\",\"values\":[{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"GERENTE\",\"dbName\":null},{\"name\":\"COLABORADOR\",\"dbName\":null},{\"name\":\"DENTISTA\",\"dbName\":null},{\"name\":\"CLIENTE\",\"dbName\":null},{\"name\":\"FORNECEDOR\",\"dbName\":null},{\"name\":\"ENTREGADOR\",\"dbName\":null}],\"dbName\":\"role_enum\"},{\"name\":\"FinalidadeSaidaEnum\",\"values\":[{\"name\":\"AGUA\",\"dbName\":null},{\"name\":\"ENERGIA\",\"dbName\":null},{\"name\":\"GAS\",\"dbName\":null},{\"name\":\"SALARIO\",\"dbName\":null},{\"name\":\"REPASSE_DENT_ESP_ODONT\",\"dbName\":null},{\"name\":\"PGMNT_FONECEDOR\",\"dbName\":null},{\"name\":\"OUTRO\",\"dbName\":null}],\"dbName\":\"finalidade_saida_enum\"},{\"name\":\"StatusPagamentoEnum\",\"values\":[{\"name\":\"ABERTO\",\"dbName\":null},{\"name\":\"QUITADO\",\"dbName\":null},{\"name\":\"VENCIDO\",\"dbName\":null},{\"name\":\"RENEGOCIADO\",\"dbName\":null}],\"dbName\":\"status_pagamento_enum\"},{\"name\":\"FormaPagamentoEnum\",\"values\":[{\"name\":\"DINHEIRO\",\"dbName\":null},{\"name\":\"CHEQUE\",\"dbName\":null},{\"name\":\"CARTAO\",\"dbName\":null}],\"dbName\":\"forma_pagamento_enum\"}],\"models\":[{\"name\":\"Contato\",\"dbName\":\"contato\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nome\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"servicosComoDentista\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Servico\",\"relationName\":\"ContatoToServico\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"servicosComoPaciente\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Servico\",\"relationName\":\"servico_paciente\",\"relationFromFields\":[],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuario\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Usuario\",\"relationName\":\"ContatoToUsuario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lancamentosRecebidos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LancamentoSaida\",\"relationName\":\"ContatoToLancamentoSaida\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categorias\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RoleEnum\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"telefones\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Usuario\",\"dbName\":\"usuario\",\"fields\":[{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"contatoUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"senha\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contato\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Contato\",\"relationName\":\"ContatoToUsuario\",\"relationFromFields\":[\"contatoUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Produto\",\"dbName\":\"produto\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nome\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descricao\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"marca\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valores\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ValorProduto\",\"relationName\":\"ProdutoToValorProduto\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"servicos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProdutoServico\",\"relationName\":\"ProdutoToProdutoServico\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipoProduto\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TipoProduto\",\"relationName\":\"ProdutoToTipoProduto\",\"relationFromFields\":[\"tipo\"],\"relationToFields\":[\"nome\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"marcaProduto\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MarcaProduto\",\"relationName\":\"MarcaProdutoToProduto\",\"relationFromFields\":[\"marca\"],\"relationToFields\":[\"nome\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"nome\",\"tipo\",\"marca\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"nome\",\"tipo\",\"marca\"]}],\"isGenerated\":false},{\"name\":\"TipoProduto\",\"dbName\":\"tipo_produto\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nome\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descricao\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"produtos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Produto\",\"relationName\":\"ProdutoToTipoProduto\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"MarcaProduto\",\"dbName\":\"marca_produto\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nome\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descricao\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"produtos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Produto\",\"relationName\":\"MarcaProdutoToProduto\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"ValorProduto\",\"dbName\":\"valor_produto\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"espOdont\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valorEmCents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dtFim\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"produtoUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"produto\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Produto\",\"relationName\":\"ProdutoToValorProduto\",\"relationFromFields\":[\"produtoUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Servico\",\"dbName\":\"servico\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dentistaUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descricao\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"observacoes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"espOdont\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"itens\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProdutoServico\",\"relationName\":\"ProdutoServicoToServico\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lancamentos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LancamentoFinanceiro\",\"relationName\":\"LancamentoFinanceiroToServico\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pacientes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Contato\",\"relationName\":\"servico_paciente\",\"relationFromFields\":[],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dentista\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Contato\",\"relationName\":\"ContatoToServico\",\"relationFromFields\":[\"dentistaUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"ProdutoServico\",\"dbName\":\"produto_servico\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"produtoUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"servicoUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantidade\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descontoEmCents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descricao\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"observacoes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"etapa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"produto\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Produto\",\"relationName\":\"ProdutoToProdutoServico\",\"relationFromFields\":[\"produtoUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"servico\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Servico\",\"relationName\":\"ProdutoServicoToServico\",\"relationFromFields\":[\"servicoUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"etapaFabricacao\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EtapaFabricacao\",\"relationName\":\"EtapaFabricacaoToProdutoServico\",\"relationFromFields\":[\"etapa\"],\"relationToFields\":[\"nome\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"produtoUid\",\"servicoUid\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"EtapaFabricacao\",\"dbName\":\"etapa_fabricacao\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nome\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descricao\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"produtos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProdutoServico\",\"relationName\":\"EtapaFabricacaoToProdutoServico\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"LancamentoFinanceiro\",\"dbName\":\"lancamento_financeiro\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ativo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"qtdParcelas\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dtLancamento\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dtPrimeiroVencimento\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"intervaloDiasEntreParcelas\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valorEntradaEmCents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descricao\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"observacoes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"saida\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LancamentoSaida\",\"relationName\":\"LancamentoFinanceiroToLancamentoSaida\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"servicoUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parcelas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Parcela\",\"relationName\":\"LancamentoFinanceiroToParcela\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"formaDePagamento\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"FormaPagamentoEnum\",\"default\":\"DINHEIRO\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"servico\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Servico\",\"relationName\":\"LancamentoFinanceiroToServico\",\"relationFromFields\":[\"servicoUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"LancamentoSaida\",\"dbName\":\"lancamento_saida\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paraQuemUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"finalidade\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FinalidadeSaidaEnum\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paraQuem\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Contato\",\"relationName\":\"ContatoToLancamentoSaida\",\"relationFromFields\":[\"paraQuemUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lancamentoFinanceiro\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LancamentoFinanceiro\",\"relationName\":\"LancamentoFinanceiroToLancamentoSaida\",\"relationFromFields\":[\"uid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Parcela\",\"dbName\":\"parcela\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"valorEmCents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numParcela\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StatusPagamentoEnum\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pagamentos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Pagamento\",\"relationName\":\"PagamentoToParcela\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lancamentoFinanceiroUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lancamento\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LancamentoFinanceiro\",\"relationName\":\"LancamentoFinanceiroToParcela\",\"relationFromFields\":[\"lancamentoFinanceiroUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Pagamento\",\"dbName\":\"pagamento\",\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"criadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atualizadoEm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"dt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valorEmCents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parcelaUid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parcela\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Parcela\",\"relationName\":\"PagamentoToParcela\",\"relationFromFields\":[\"parcelaUid\"],\"relationToFields\":[\"uid\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"Contato\",\"plural\":\"contatoes\",\"findUnique\":\"findUniqueContato\",\"findFirst\":\"findFirstContato\",\"findMany\":\"findManyContato\",\"create\":\"createOneContato\",\"createMany\":\"createManyContato\",\"delete\":\"deleteOneContato\",\"update\":\"updateOneContato\",\"deleteMany\":\"deleteManyContato\",\"updateMany\":\"updateManyContato\",\"upsert\":\"upsertOneContato\",\"aggregate\":\"aggregateContato\",\"groupBy\":\"groupByContato\"},{\"model\":\"Usuario\",\"plural\":\"usuarios\",\"findUnique\":\"findUniqueUsuario\",\"findFirst\":\"findFirstUsuario\",\"findMany\":\"findManyUsuario\",\"create\":\"createOneUsuario\",\"createMany\":\"createManyUsuario\",\"delete\":\"deleteOneUsuario\",\"update\":\"updateOneUsuario\",\"deleteMany\":\"deleteManyUsuario\",\"updateMany\":\"updateManyUsuario\",\"upsert\":\"upsertOneUsuario\",\"aggregate\":\"aggregateUsuario\",\"groupBy\":\"groupByUsuario\"},{\"model\":\"Produto\",\"plural\":\"produtos\",\"findUnique\":\"findUniqueProduto\",\"findFirst\":\"findFirstProduto\",\"findMany\":\"findManyProduto\",\"create\":\"createOneProduto\",\"createMany\":\"createManyProduto\",\"delete\":\"deleteOneProduto\",\"update\":\"updateOneProduto\",\"deleteMany\":\"deleteManyProduto\",\"updateMany\":\"updateManyProduto\",\"upsert\":\"upsertOneProduto\",\"aggregate\":\"aggregateProduto\",\"groupBy\":\"groupByProduto\"},{\"model\":\"TipoProduto\",\"plural\":\"tipoProdutos\",\"findUnique\":\"findUniqueTipoProduto\",\"findFirst\":\"findFirstTipoProduto\",\"findMany\":\"findManyTipoProduto\",\"create\":\"createOneTipoProduto\",\"createMany\":\"createManyTipoProduto\",\"delete\":\"deleteOneTipoProduto\",\"update\":\"updateOneTipoProduto\",\"deleteMany\":\"deleteManyTipoProduto\",\"updateMany\":\"updateManyTipoProduto\",\"upsert\":\"upsertOneTipoProduto\",\"aggregate\":\"aggregateTipoProduto\",\"groupBy\":\"groupByTipoProduto\"},{\"model\":\"MarcaProduto\",\"plural\":\"marcaProdutos\",\"findUnique\":\"findUniqueMarcaProduto\",\"findFirst\":\"findFirstMarcaProduto\",\"findMany\":\"findManyMarcaProduto\",\"create\":\"createOneMarcaProduto\",\"createMany\":\"createManyMarcaProduto\",\"delete\":\"deleteOneMarcaProduto\",\"update\":\"updateOneMarcaProduto\",\"deleteMany\":\"deleteManyMarcaProduto\",\"updateMany\":\"updateManyMarcaProduto\",\"upsert\":\"upsertOneMarcaProduto\",\"aggregate\":\"aggregateMarcaProduto\",\"groupBy\":\"groupByMarcaProduto\"},{\"model\":\"ValorProduto\",\"plural\":\"valorProdutos\",\"findUnique\":\"findUniqueValorProduto\",\"findFirst\":\"findFirstValorProduto\",\"findMany\":\"findManyValorProduto\",\"create\":\"createOneValorProduto\",\"createMany\":\"createManyValorProduto\",\"delete\":\"deleteOneValorProduto\",\"update\":\"updateOneValorProduto\",\"deleteMany\":\"deleteManyValorProduto\",\"updateMany\":\"updateManyValorProduto\",\"upsert\":\"upsertOneValorProduto\",\"aggregate\":\"aggregateValorProduto\",\"groupBy\":\"groupByValorProduto\"},{\"model\":\"Servico\",\"plural\":\"servicos\",\"findUnique\":\"findUniqueServico\",\"findFirst\":\"findFirstServico\",\"findMany\":\"findManyServico\",\"create\":\"createOneServico\",\"createMany\":\"createManyServico\",\"delete\":\"deleteOneServico\",\"update\":\"updateOneServico\",\"deleteMany\":\"deleteManyServico\",\"updateMany\":\"updateManyServico\",\"upsert\":\"upsertOneServico\",\"aggregate\":\"aggregateServico\",\"groupBy\":\"groupByServico\"},{\"model\":\"ProdutoServico\",\"plural\":\"produtoServicos\",\"findUnique\":\"findUniqueProdutoServico\",\"findFirst\":\"findFirstProdutoServico\",\"findMany\":\"findManyProdutoServico\",\"create\":\"createOneProdutoServico\",\"createMany\":\"createManyProdutoServico\",\"delete\":\"deleteOneProdutoServico\",\"update\":\"updateOneProdutoServico\",\"deleteMany\":\"deleteManyProdutoServico\",\"updateMany\":\"updateManyProdutoServico\",\"upsert\":\"upsertOneProdutoServico\",\"aggregate\":\"aggregateProdutoServico\",\"groupBy\":\"groupByProdutoServico\"},{\"model\":\"EtapaFabricacao\",\"plural\":\"etapaFabricacaos\",\"findUnique\":\"findUniqueEtapaFabricacao\",\"findFirst\":\"findFirstEtapaFabricacao\",\"findMany\":\"findManyEtapaFabricacao\",\"create\":\"createOneEtapaFabricacao\",\"createMany\":\"createManyEtapaFabricacao\",\"delete\":\"deleteOneEtapaFabricacao\",\"update\":\"updateOneEtapaFabricacao\",\"deleteMany\":\"deleteManyEtapaFabricacao\",\"updateMany\":\"updateManyEtapaFabricacao\",\"upsert\":\"upsertOneEtapaFabricacao\",\"aggregate\":\"aggregateEtapaFabricacao\",\"groupBy\":\"groupByEtapaFabricacao\"},{\"model\":\"LancamentoFinanceiro\",\"plural\":\"lancamentoFinanceiros\",\"findUnique\":\"findUniqueLancamentoFinanceiro\",\"findFirst\":\"findFirstLancamentoFinanceiro\",\"findMany\":\"findManyLancamentoFinanceiro\",\"create\":\"createOneLancamentoFinanceiro\",\"createMany\":\"createManyLancamentoFinanceiro\",\"delete\":\"deleteOneLancamentoFinanceiro\",\"update\":\"updateOneLancamentoFinanceiro\",\"deleteMany\":\"deleteManyLancamentoFinanceiro\",\"updateMany\":\"updateManyLancamentoFinanceiro\",\"upsert\":\"upsertOneLancamentoFinanceiro\",\"aggregate\":\"aggregateLancamentoFinanceiro\",\"groupBy\":\"groupByLancamentoFinanceiro\"},{\"model\":\"LancamentoSaida\",\"plural\":\"lancamentoSaidas\",\"findUnique\":\"findUniqueLancamentoSaida\",\"findFirst\":\"findFirstLancamentoSaida\",\"findMany\":\"findManyLancamentoSaida\",\"create\":\"createOneLancamentoSaida\",\"createMany\":\"createManyLancamentoSaida\",\"delete\":\"deleteOneLancamentoSaida\",\"update\":\"updateOneLancamentoSaida\",\"deleteMany\":\"deleteManyLancamentoSaida\",\"updateMany\":\"updateManyLancamentoSaida\",\"upsert\":\"upsertOneLancamentoSaida\",\"aggregate\":\"aggregateLancamentoSaida\",\"groupBy\":\"groupByLancamentoSaida\"},{\"model\":\"Parcela\",\"plural\":\"parcelas\",\"findUnique\":\"findUniqueParcela\",\"findFirst\":\"findFirstParcela\",\"findMany\":\"findManyParcela\",\"create\":\"createOneParcela\",\"createMany\":\"createManyParcela\",\"delete\":\"deleteOneParcela\",\"update\":\"updateOneParcela\",\"deleteMany\":\"deleteManyParcela\",\"updateMany\":\"updateManyParcela\",\"upsert\":\"upsertOneParcela\",\"aggregate\":\"aggregateParcela\",\"groupBy\":\"groupByParcela\"},{\"model\":\"Pagamento\",\"plural\":\"pagamentos\",\"findUnique\":\"findUniquePagamento\",\"findFirst\":\"findFirstPagamento\",\"findMany\":\"findManyPagamento\",\"create\":\"createOnePagamento\",\"createMany\":\"createManyPagamento\",\"delete\":\"deleteOnePagamento\",\"update\":\"updateOnePagamento\",\"deleteMany\":\"deleteManyPagamento\",\"updateMany\":\"updateManyPagamento\",\"upsert\":\"upsertOnePagamento\",\"aggregate\":\"aggregatePagamento\",\"groupBy\":\"groupByPagamento\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/media/danilloism/data/Projetos/lab_ferreira/laboratorio_ferreira_api/prisma/generated",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl"
      }
    ],
    "previewFeatures": [
      "interactiveTransactions"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../.env",
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "..",
  "clientVersion": "4.1.1",
  "engineVersion": "8d8414deb360336e4698a65aa45a1fbaf1ce13d8",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "dataProxy": false
}
config.document = dmmf
config.dirname = dirname




const { warnEnvConflicts } = require('./runtime/index')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})
const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "prisma/generated/libquery_engine-debian-openssl-3.0.x.so.node")

path.join(__dirname, "libquery_engine-linux-musl.so.node");
path.join(process.cwd(), "prisma/generated/libquery_engine-linux-musl.so.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "prisma/generated/schema.prisma")
