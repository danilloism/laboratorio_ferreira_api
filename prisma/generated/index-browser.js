
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues
} = require('./runtime/index-browser')


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

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
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

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
