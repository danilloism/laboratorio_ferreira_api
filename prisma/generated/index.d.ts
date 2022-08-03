
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Contato
 * 
 */
export type Contato = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  nome: string
  categorias: RoleEnum[]
  telefones: string[]
}

/**
 * Model Usuario
 * 
 */
export type Usuario = {
  criadoEm: Date
  atualizadoEm: Date
  contatoUid: string
  email: string
  username: string | null
  senha: string
}

/**
 * Model Produto
 * 
 */
export type Produto = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  nome: string
  descricao: string | null
  tipo: string
  marca: string | null
}

/**
 * Model TipoProduto
 * 
 */
export type TipoProduto = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  nome: string
  descricao: string | null
}

/**
 * Model MarcaProduto
 * 
 */
export type MarcaProduto = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  nome: string
  descricao: string | null
}

/**
 * Model ValorProduto
 * 
 */
export type ValorProduto = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  espOdont: boolean
  valorEmCents: number
  dtFim: Date | null
  produtoUid: string
}

/**
 * Model Servico
 * 
 */
export type Servico = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  dentistaUid: string
  descricao: string | null
  observacoes: string | null
  espOdont: boolean
}

/**
 * Model ProdutoServico
 * 
 */
export type ProdutoServico = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  produtoUid: string
  servicoUid: string
  quantidade: number
  descontoEmCents: number | null
  descricao: string | null
  observacoes: string | null
  etapa: string
}

/**
 * Model EtapaFabricacao
 * 
 */
export type EtapaFabricacao = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  nome: string
  descricao: string | null
}

/**
 * Model LancamentoFinanceiro
 * 
 */
export type LancamentoFinanceiro = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  ativo: boolean
  qtdParcelas: number
  dtLancamento: Date
  dtPrimeiroVencimento: Date | null
  intervaloDiasEntreParcelas: number | null
  valorEntradaEmCents: number | null
  descricao: string | null
  observacoes: string | null
  servicoUid: string | null
  formaDePagamento: FormaPagamentoEnum
}

/**
 * Model LancamentoSaida
 * 
 */
export type LancamentoSaida = {
  uid: string
  paraQuemUid: string
  finalidade: FinalidadeSaidaEnum
}

/**
 * Model Parcela
 * 
 */
export type Parcela = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  valorEmCents: number
  numParcela: number
  status: StatusPagamentoEnum
  lancamentoFinanceiroUid: string
}

/**
 * Model Pagamento
 * 
 */
export type Pagamento = {
  uid: string
  criadoEm: Date
  atualizadoEm: Date
  dt: Date
  valorEmCents: number
  parcelaUid: string
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const RoleEnum: {
  ADMIN: 'ADMIN',
  GERENTE: 'GERENTE',
  COLABORADOR: 'COLABORADOR',
  DENTISTA: 'DENTISTA',
  CLIENTE: 'CLIENTE',
  FORNECEDOR: 'FORNECEDOR',
  ENTREGADOR: 'ENTREGADOR'
};

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum]


export const FormaPagamentoEnum: {
  DINHEIRO: 'DINHEIRO',
  CHEQUE: 'CHEQUE',
  CARTAO: 'CARTAO'
};

export type FormaPagamentoEnum = (typeof FormaPagamentoEnum)[keyof typeof FormaPagamentoEnum]


export const FinalidadeSaidaEnum: {
  AGUA: 'AGUA',
  ENERGIA: 'ENERGIA',
  GAS: 'GAS',
  SALARIO: 'SALARIO',
  REPASSE_DENT_ESP_ODONT: 'REPASSE_DENT_ESP_ODONT',
  PGMNT_FONECEDOR: 'PGMNT_FONECEDOR',
  OUTRO: 'OUTRO'
};

export type FinalidadeSaidaEnum = (typeof FinalidadeSaidaEnum)[keyof typeof FinalidadeSaidaEnum]


export const StatusPagamentoEnum: {
  ABERTO: 'ABERTO',
  QUITADO: 'QUITADO',
  VENCIDO: 'VENCIDO',
  RENEGOCIADO: 'RENEGOCIADO'
};

export type StatusPagamentoEnum = (typeof StatusPagamentoEnum)[keyof typeof StatusPagamentoEnum]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Contatoes
 * const contatoes = await prisma.contato.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Contatoes
   * const contatoes = await prisma.contato.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: { maxWait?: number, timeout?: number }): Promise<R>;

      /**
   * `prisma.contato`: Exposes CRUD operations for the **Contato** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contatoes
    * const contatoes = await prisma.contato.findMany()
    * ```
    */
  get contato(): Prisma.ContatoDelegate<GlobalReject>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<GlobalReject>;

  /**
   * `prisma.produto`: Exposes CRUD operations for the **Produto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produto.findMany()
    * ```
    */
  get produto(): Prisma.ProdutoDelegate<GlobalReject>;

  /**
   * `prisma.tipoProduto`: Exposes CRUD operations for the **TipoProduto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TipoProdutos
    * const tipoProdutos = await prisma.tipoProduto.findMany()
    * ```
    */
  get tipoProduto(): Prisma.TipoProdutoDelegate<GlobalReject>;

  /**
   * `prisma.marcaProduto`: Exposes CRUD operations for the **MarcaProduto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MarcaProdutos
    * const marcaProdutos = await prisma.marcaProduto.findMany()
    * ```
    */
  get marcaProduto(): Prisma.MarcaProdutoDelegate<GlobalReject>;

  /**
   * `prisma.valorProduto`: Exposes CRUD operations for the **ValorProduto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ValorProdutos
    * const valorProdutos = await prisma.valorProduto.findMany()
    * ```
    */
  get valorProduto(): Prisma.ValorProdutoDelegate<GlobalReject>;

  /**
   * `prisma.servico`: Exposes CRUD operations for the **Servico** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servicos
    * const servicos = await prisma.servico.findMany()
    * ```
    */
  get servico(): Prisma.ServicoDelegate<GlobalReject>;

  /**
   * `prisma.produtoServico`: Exposes CRUD operations for the **ProdutoServico** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProdutoServicos
    * const produtoServicos = await prisma.produtoServico.findMany()
    * ```
    */
  get produtoServico(): Prisma.ProdutoServicoDelegate<GlobalReject>;

  /**
   * `prisma.etapaFabricacao`: Exposes CRUD operations for the **EtapaFabricacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EtapaFabricacaos
    * const etapaFabricacaos = await prisma.etapaFabricacao.findMany()
    * ```
    */
  get etapaFabricacao(): Prisma.EtapaFabricacaoDelegate<GlobalReject>;

  /**
   * `prisma.lancamentoFinanceiro`: Exposes CRUD operations for the **LancamentoFinanceiro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LancamentoFinanceiros
    * const lancamentoFinanceiros = await prisma.lancamentoFinanceiro.findMany()
    * ```
    */
  get lancamentoFinanceiro(): Prisma.LancamentoFinanceiroDelegate<GlobalReject>;

  /**
   * `prisma.lancamentoSaida`: Exposes CRUD operations for the **LancamentoSaida** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LancamentoSaidas
    * const lancamentoSaidas = await prisma.lancamentoSaida.findMany()
    * ```
    */
  get lancamentoSaida(): Prisma.LancamentoSaidaDelegate<GlobalReject>;

  /**
   * `prisma.parcela`: Exposes CRUD operations for the **Parcela** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parcelas
    * const parcelas = await prisma.parcela.findMany()
    * ```
    */
  get parcela(): Prisma.ParcelaDelegate<GlobalReject>;

  /**
   * `prisma.pagamento`: Exposes CRUD operations for the **Pagamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagamentos
    * const pagamentos = await prisma.pagamento.findMany()
    * ```
    */
  get pagamento(): Prisma.PagamentoDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.1.1
   * Query Engine version: 8d8414deb360336e4698a65aa45a1fbaf1ce13d8
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;


  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ContatoCountOutputType
   */


  export type ContatoCountOutputType = {
    servicosComoDentista: number
    servicosComoPaciente: number
    lancamentosRecebidos: number
  }

  export type ContatoCountOutputTypeSelect = {
    servicosComoDentista?: boolean
    servicosComoPaciente?: boolean
    lancamentosRecebidos?: boolean
  }

  export type ContatoCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ContatoCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ContatoCountOutputType
    : S extends undefined
    ? never
    : S extends ContatoCountOutputTypeArgs
    ?'include' extends U
    ? ContatoCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ContatoCountOutputType ? ContatoCountOutputType[P] : never
  } 
    : ContatoCountOutputType
  : ContatoCountOutputType




  // Custom InputTypes

  /**
   * ContatoCountOutputType without action
   */
  export type ContatoCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ContatoCountOutputType
     * 
    **/
    select?: ContatoCountOutputTypeSelect | null
  }



  /**
   * Count Type ProdutoCountOutputType
   */


  export type ProdutoCountOutputType = {
    valores: number
    servicos: number
  }

  export type ProdutoCountOutputTypeSelect = {
    valores?: boolean
    servicos?: boolean
  }

  export type ProdutoCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ProdutoCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ProdutoCountOutputType
    : S extends undefined
    ? never
    : S extends ProdutoCountOutputTypeArgs
    ?'include' extends U
    ? ProdutoCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ProdutoCountOutputType ? ProdutoCountOutputType[P] : never
  } 
    : ProdutoCountOutputType
  : ProdutoCountOutputType




  // Custom InputTypes

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProdutoCountOutputType
     * 
    **/
    select?: ProdutoCountOutputTypeSelect | null
  }



  /**
   * Count Type TipoProdutoCountOutputType
   */


  export type TipoProdutoCountOutputType = {
    produtos: number
  }

  export type TipoProdutoCountOutputTypeSelect = {
    produtos?: boolean
  }

  export type TipoProdutoCountOutputTypeGetPayload<
    S extends boolean | null | undefined | TipoProdutoCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? TipoProdutoCountOutputType
    : S extends undefined
    ? never
    : S extends TipoProdutoCountOutputTypeArgs
    ?'include' extends U
    ? TipoProdutoCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof TipoProdutoCountOutputType ? TipoProdutoCountOutputType[P] : never
  } 
    : TipoProdutoCountOutputType
  : TipoProdutoCountOutputType




  // Custom InputTypes

  /**
   * TipoProdutoCountOutputType without action
   */
  export type TipoProdutoCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TipoProdutoCountOutputType
     * 
    **/
    select?: TipoProdutoCountOutputTypeSelect | null
  }



  /**
   * Count Type MarcaProdutoCountOutputType
   */


  export type MarcaProdutoCountOutputType = {
    produtos: number
  }

  export type MarcaProdutoCountOutputTypeSelect = {
    produtos?: boolean
  }

  export type MarcaProdutoCountOutputTypeGetPayload<
    S extends boolean | null | undefined | MarcaProdutoCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? MarcaProdutoCountOutputType
    : S extends undefined
    ? never
    : S extends MarcaProdutoCountOutputTypeArgs
    ?'include' extends U
    ? MarcaProdutoCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof MarcaProdutoCountOutputType ? MarcaProdutoCountOutputType[P] : never
  } 
    : MarcaProdutoCountOutputType
  : MarcaProdutoCountOutputType




  // Custom InputTypes

  /**
   * MarcaProdutoCountOutputType without action
   */
  export type MarcaProdutoCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the MarcaProdutoCountOutputType
     * 
    **/
    select?: MarcaProdutoCountOutputTypeSelect | null
  }



  /**
   * Count Type ServicoCountOutputType
   */


  export type ServicoCountOutputType = {
    itens: number
    lancamentos: number
    pacientes: number
  }

  export type ServicoCountOutputTypeSelect = {
    itens?: boolean
    lancamentos?: boolean
    pacientes?: boolean
  }

  export type ServicoCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ServicoCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ServicoCountOutputType
    : S extends undefined
    ? never
    : S extends ServicoCountOutputTypeArgs
    ?'include' extends U
    ? ServicoCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ServicoCountOutputType ? ServicoCountOutputType[P] : never
  } 
    : ServicoCountOutputType
  : ServicoCountOutputType




  // Custom InputTypes

  /**
   * ServicoCountOutputType without action
   */
  export type ServicoCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ServicoCountOutputType
     * 
    **/
    select?: ServicoCountOutputTypeSelect | null
  }



  /**
   * Count Type EtapaFabricacaoCountOutputType
   */


  export type EtapaFabricacaoCountOutputType = {
    produtos: number
  }

  export type EtapaFabricacaoCountOutputTypeSelect = {
    produtos?: boolean
  }

  export type EtapaFabricacaoCountOutputTypeGetPayload<
    S extends boolean | null | undefined | EtapaFabricacaoCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? EtapaFabricacaoCountOutputType
    : S extends undefined
    ? never
    : S extends EtapaFabricacaoCountOutputTypeArgs
    ?'include' extends U
    ? EtapaFabricacaoCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof EtapaFabricacaoCountOutputType ? EtapaFabricacaoCountOutputType[P] : never
  } 
    : EtapaFabricacaoCountOutputType
  : EtapaFabricacaoCountOutputType




  // Custom InputTypes

  /**
   * EtapaFabricacaoCountOutputType without action
   */
  export type EtapaFabricacaoCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the EtapaFabricacaoCountOutputType
     * 
    **/
    select?: EtapaFabricacaoCountOutputTypeSelect | null
  }



  /**
   * Count Type LancamentoFinanceiroCountOutputType
   */


  export type LancamentoFinanceiroCountOutputType = {
    parcelas: number
  }

  export type LancamentoFinanceiroCountOutputTypeSelect = {
    parcelas?: boolean
  }

  export type LancamentoFinanceiroCountOutputTypeGetPayload<
    S extends boolean | null | undefined | LancamentoFinanceiroCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? LancamentoFinanceiroCountOutputType
    : S extends undefined
    ? never
    : S extends LancamentoFinanceiroCountOutputTypeArgs
    ?'include' extends U
    ? LancamentoFinanceiroCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof LancamentoFinanceiroCountOutputType ? LancamentoFinanceiroCountOutputType[P] : never
  } 
    : LancamentoFinanceiroCountOutputType
  : LancamentoFinanceiroCountOutputType




  // Custom InputTypes

  /**
   * LancamentoFinanceiroCountOutputType without action
   */
  export type LancamentoFinanceiroCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiroCountOutputType
     * 
    **/
    select?: LancamentoFinanceiroCountOutputTypeSelect | null
  }



  /**
   * Count Type ParcelaCountOutputType
   */


  export type ParcelaCountOutputType = {
    pagamentos: number
  }

  export type ParcelaCountOutputTypeSelect = {
    pagamentos?: boolean
  }

  export type ParcelaCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ParcelaCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ParcelaCountOutputType
    : S extends undefined
    ? never
    : S extends ParcelaCountOutputTypeArgs
    ?'include' extends U
    ? ParcelaCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ParcelaCountOutputType ? ParcelaCountOutputType[P] : never
  } 
    : ParcelaCountOutputType
  : ParcelaCountOutputType




  // Custom InputTypes

  /**
   * ParcelaCountOutputType without action
   */
  export type ParcelaCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ParcelaCountOutputType
     * 
    **/
    select?: ParcelaCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Contato
   */


  export type AggregateContato = {
    _count: ContatoCountAggregateOutputType | null
    _min: ContatoMinAggregateOutputType | null
    _max: ContatoMaxAggregateOutputType | null
  }

  export type ContatoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
  }

  export type ContatoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
  }

  export type ContatoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    nome: number
    categorias: number
    telefones: number
    _all: number
  }


  export type ContatoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
  }

  export type ContatoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
  }

  export type ContatoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    categorias?: true
    telefones?: true
    _all?: true
  }

  export type ContatoAggregateArgs = {
    /**
     * Filter which Contato to aggregate.
     * 
    **/
    where?: ContatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contatoes to fetch.
     * 
    **/
    orderBy?: Enumerable<ContatoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ContatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contatoes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contatoes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contatoes
    **/
    _count?: true | ContatoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContatoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContatoMaxAggregateInputType
  }

  export type GetContatoAggregateType<T extends ContatoAggregateArgs> = {
        [P in keyof T & keyof AggregateContato]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContato[P]>
      : GetScalarType<T[P], AggregateContato[P]>
  }




  export type ContatoGroupByArgs = {
    where?: ContatoWhereInput
    orderBy?: Enumerable<ContatoOrderByWithAggregationInput>
    by: Array<ContatoScalarFieldEnum>
    having?: ContatoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContatoCountAggregateInputType | true
    _min?: ContatoMinAggregateInputType
    _max?: ContatoMaxAggregateInputType
  }


  export type ContatoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    nome: string
    categorias: RoleEnum[]
    telefones: string[]
    _count: ContatoCountAggregateOutputType | null
    _min: ContatoMinAggregateOutputType | null
    _max: ContatoMaxAggregateOutputType | null
  }

  type GetContatoGroupByPayload<T extends ContatoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ContatoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContatoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContatoGroupByOutputType[P]>
            : GetScalarType<T[P], ContatoGroupByOutputType[P]>
        }
      >
    >


  export type ContatoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    nome?: boolean
    servicosComoDentista?: boolean | ServicoFindManyArgs
    servicosComoPaciente?: boolean | ServicoFindManyArgs
    usuario?: boolean | UsuarioArgs
    lancamentosRecebidos?: boolean | LancamentoSaidaFindManyArgs
    categorias?: boolean
    telefones?: boolean
    _count?: boolean | ContatoCountOutputTypeArgs
  }

  export type ContatoInclude = {
    servicosComoDentista?: boolean | ServicoFindManyArgs
    servicosComoPaciente?: boolean | ServicoFindManyArgs
    usuario?: boolean | UsuarioArgs
    lancamentosRecebidos?: boolean | LancamentoSaidaFindManyArgs
    _count?: boolean | ContatoCountOutputTypeArgs
  }

  export type ContatoGetPayload<
    S extends boolean | null | undefined | ContatoArgs,
    U = keyof S
      > = S extends true
        ? Contato
    : S extends undefined
    ? never
    : S extends ContatoArgs | ContatoFindManyArgs
    ?'include' extends U
    ? Contato  & {
    [P in TrueKeys<S['include']>]:
        P extends 'servicosComoDentista' ? Array < ServicoGetPayload<S['include'][P]>>  :
        P extends 'servicosComoPaciente' ? Array < ServicoGetPayload<S['include'][P]>>  :
        P extends 'usuario' ? UsuarioGetPayload<S['include'][P]> | null :
        P extends 'lancamentosRecebidos' ? Array < LancamentoSaidaGetPayload<S['include'][P]>>  :
        P extends '_count' ? ContatoCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'servicosComoDentista' ? Array < ServicoGetPayload<S['select'][P]>>  :
        P extends 'servicosComoPaciente' ? Array < ServicoGetPayload<S['select'][P]>>  :
        P extends 'usuario' ? UsuarioGetPayload<S['select'][P]> | null :
        P extends 'lancamentosRecebidos' ? Array < LancamentoSaidaGetPayload<S['select'][P]>>  :
        P extends '_count' ? ContatoCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Contato ? Contato[P] : never
  } 
    : Contato
  : Contato


  type ContatoCountArgs = Merge<
    Omit<ContatoFindManyArgs, 'select' | 'include'> & {
      select?: ContatoCountAggregateInputType | true
    }
  >

  export interface ContatoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Contato that matches the filter.
     * @param {ContatoFindUniqueArgs} args - Arguments to find a Contato
     * @example
     * // Get one Contato
     * const contato = await prisma.contato.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ContatoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ContatoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Contato'> extends True ? CheckSelect<T, Prisma__ContatoClient<Contato>, Prisma__ContatoClient<ContatoGetPayload<T>>> : CheckSelect<T, Prisma__ContatoClient<Contato | null >, Prisma__ContatoClient<ContatoGetPayload<T> | null >>

    /**
     * Find the first Contato that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoFindFirstArgs} args - Arguments to find a Contato
     * @example
     * // Get one Contato
     * const contato = await prisma.contato.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ContatoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ContatoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Contato'> extends True ? CheckSelect<T, Prisma__ContatoClient<Contato>, Prisma__ContatoClient<ContatoGetPayload<T>>> : CheckSelect<T, Prisma__ContatoClient<Contato | null >, Prisma__ContatoClient<ContatoGetPayload<T> | null >>

    /**
     * Find zero or more Contatoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contatoes
     * const contatoes = await prisma.contato.findMany()
     * 
     * // Get first 10 Contatoes
     * const contatoes = await prisma.contato.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const contatoWithUidOnly = await prisma.contato.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends ContatoFindManyArgs>(
      args?: SelectSubset<T, ContatoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Contato>>, PrismaPromise<Array<ContatoGetPayload<T>>>>

    /**
     * Create a Contato.
     * @param {ContatoCreateArgs} args - Arguments to create a Contato.
     * @example
     * // Create one Contato
     * const Contato = await prisma.contato.create({
     *   data: {
     *     // ... data to create a Contato
     *   }
     * })
     * 
    **/
    create<T extends ContatoCreateArgs>(
      args: SelectSubset<T, ContatoCreateArgs>
    ): CheckSelect<T, Prisma__ContatoClient<Contato>, Prisma__ContatoClient<ContatoGetPayload<T>>>

    /**
     * Create many Contatoes.
     *     @param {ContatoCreateManyArgs} args - Arguments to create many Contatoes.
     *     @example
     *     // Create many Contatoes
     *     const contato = await prisma.contato.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ContatoCreateManyArgs>(
      args?: SelectSubset<T, ContatoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Contato.
     * @param {ContatoDeleteArgs} args - Arguments to delete one Contato.
     * @example
     * // Delete one Contato
     * const Contato = await prisma.contato.delete({
     *   where: {
     *     // ... filter to delete one Contato
     *   }
     * })
     * 
    **/
    delete<T extends ContatoDeleteArgs>(
      args: SelectSubset<T, ContatoDeleteArgs>
    ): CheckSelect<T, Prisma__ContatoClient<Contato>, Prisma__ContatoClient<ContatoGetPayload<T>>>

    /**
     * Update one Contato.
     * @param {ContatoUpdateArgs} args - Arguments to update one Contato.
     * @example
     * // Update one Contato
     * const contato = await prisma.contato.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ContatoUpdateArgs>(
      args: SelectSubset<T, ContatoUpdateArgs>
    ): CheckSelect<T, Prisma__ContatoClient<Contato>, Prisma__ContatoClient<ContatoGetPayload<T>>>

    /**
     * Delete zero or more Contatoes.
     * @param {ContatoDeleteManyArgs} args - Arguments to filter Contatoes to delete.
     * @example
     * // Delete a few Contatoes
     * const { count } = await prisma.contato.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ContatoDeleteManyArgs>(
      args?: SelectSubset<T, ContatoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contatoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contatoes
     * const contato = await prisma.contato.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ContatoUpdateManyArgs>(
      args: SelectSubset<T, ContatoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Contato.
     * @param {ContatoUpsertArgs} args - Arguments to update or create a Contato.
     * @example
     * // Update or create a Contato
     * const contato = await prisma.contato.upsert({
     *   create: {
     *     // ... data to create a Contato
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contato we want to update
     *   }
     * })
    **/
    upsert<T extends ContatoUpsertArgs>(
      args: SelectSubset<T, ContatoUpsertArgs>
    ): CheckSelect<T, Prisma__ContatoClient<Contato>, Prisma__ContatoClient<ContatoGetPayload<T>>>

    /**
     * Find one Contato that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ContatoFindUniqueOrThrowArgs} args - Arguments to find a Contato
     * @example
     * // Get one Contato
     * const contato = await prisma.contato.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ContatoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ContatoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ContatoClient<Contato>, Prisma__ContatoClient<ContatoGetPayload<T>>>

    /**
     * Find the first Contato that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoFindFirstOrThrowArgs} args - Arguments to find a Contato
     * @example
     * // Get one Contato
     * const contato = await prisma.contato.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ContatoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ContatoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ContatoClient<Contato>, Prisma__ContatoClient<ContatoGetPayload<T>>>

    /**
     * Count the number of Contatoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoCountArgs} args - Arguments to filter Contatoes to count.
     * @example
     * // Count the number of Contatoes
     * const count = await prisma.contato.count({
     *   where: {
     *     // ... the filter for the Contatoes we want to count
     *   }
     * })
    **/
    count<T extends ContatoCountArgs>(
      args?: Subset<T, ContatoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContatoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contato.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContatoAggregateArgs>(args: Subset<T, ContatoAggregateArgs>): PrismaPromise<GetContatoAggregateType<T>>

    /**
     * Group by Contato.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContatoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContatoGroupByArgs['orderBy'] }
        : { orderBy?: ContatoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContatoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContatoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contato.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ContatoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    servicosComoDentista<T extends ServicoFindManyArgs = {}>(args?: Subset<T, ServicoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Servico>>, PrismaPromise<Array<ServicoGetPayload<T>>>>;

    servicosComoPaciente<T extends ServicoFindManyArgs = {}>(args?: Subset<T, ServicoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Servico>>, PrismaPromise<Array<ServicoGetPayload<T>>>>;

    usuario<T extends UsuarioArgs = {}>(args?: Subset<T, UsuarioArgs>): CheckSelect<T, Prisma__UsuarioClient<Usuario | null >, Prisma__UsuarioClient<UsuarioGetPayload<T> | null >>;

    lancamentosRecebidos<T extends LancamentoSaidaFindManyArgs = {}>(args?: Subset<T, LancamentoSaidaFindManyArgs>): CheckSelect<T, PrismaPromise<Array<LancamentoSaida>>, PrismaPromise<Array<LancamentoSaidaGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Contato base type for findUnique actions
   */
  export type ContatoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Contato
     * 
    **/
    select?: ContatoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContatoInclude | null
    /**
     * Filter, which Contato to fetch.
     * 
    **/
    where: ContatoWhereUniqueInput
  }

  /**
   * Contato: findUnique
   */
  export interface ContatoFindUniqueArgs extends ContatoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contato base type for findFirst actions
   */
  export type ContatoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Contato
     * 
    **/
    select?: ContatoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContatoInclude | null
    /**
     * Filter, which Contato to fetch.
     * 
    **/
    where?: ContatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contatoes to fetch.
     * 
    **/
    orderBy?: Enumerable<ContatoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contatoes.
     * 
    **/
    cursor?: ContatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contatoes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contatoes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contatoes.
     * 
    **/
    distinct?: Enumerable<ContatoScalarFieldEnum>
  }

  /**
   * Contato: findFirst
   */
  export interface ContatoFindFirstArgs extends ContatoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contato findMany
   */
  export type ContatoFindManyArgs = {
    /**
     * Select specific fields to fetch from the Contato
     * 
    **/
    select?: ContatoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContatoInclude | null
    /**
     * Filter, which Contatoes to fetch.
     * 
    **/
    where?: ContatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contatoes to fetch.
     * 
    **/
    orderBy?: Enumerable<ContatoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contatoes.
     * 
    **/
    cursor?: ContatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contatoes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contatoes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ContatoScalarFieldEnum>
  }


  /**
   * Contato create
   */
  export type ContatoCreateArgs = {
    /**
     * Select specific fields to fetch from the Contato
     * 
    **/
    select?: ContatoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContatoInclude | null
    /**
     * The data needed to create a Contato.
     * 
    **/
    data: XOR<ContatoCreateInput, ContatoUncheckedCreateInput>
  }


  /**
   * Contato createMany
   */
  export type ContatoCreateManyArgs = {
    /**
     * The data used to create many Contatoes.
     * 
    **/
    data: Enumerable<ContatoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Contato update
   */
  export type ContatoUpdateArgs = {
    /**
     * Select specific fields to fetch from the Contato
     * 
    **/
    select?: ContatoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContatoInclude | null
    /**
     * The data needed to update a Contato.
     * 
    **/
    data: XOR<ContatoUpdateInput, ContatoUncheckedUpdateInput>
    /**
     * Choose, which Contato to update.
     * 
    **/
    where: ContatoWhereUniqueInput
  }


  /**
   * Contato updateMany
   */
  export type ContatoUpdateManyArgs = {
    /**
     * The data used to update Contatoes.
     * 
    **/
    data: XOR<ContatoUpdateManyMutationInput, ContatoUncheckedUpdateManyInput>
    /**
     * Filter which Contatoes to update
     * 
    **/
    where?: ContatoWhereInput
  }


  /**
   * Contato upsert
   */
  export type ContatoUpsertArgs = {
    /**
     * Select specific fields to fetch from the Contato
     * 
    **/
    select?: ContatoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContatoInclude | null
    /**
     * The filter to search for the Contato to update in case it exists.
     * 
    **/
    where: ContatoWhereUniqueInput
    /**
     * In case the Contato found by the `where` argument doesn't exist, create a new Contato with this data.
     * 
    **/
    create: XOR<ContatoCreateInput, ContatoUncheckedCreateInput>
    /**
     * In case the Contato was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ContatoUpdateInput, ContatoUncheckedUpdateInput>
  }


  /**
   * Contato delete
   */
  export type ContatoDeleteArgs = {
    /**
     * Select specific fields to fetch from the Contato
     * 
    **/
    select?: ContatoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContatoInclude | null
    /**
     * Filter which Contato to delete.
     * 
    **/
    where: ContatoWhereUniqueInput
  }


  /**
   * Contato deleteMany
   */
  export type ContatoDeleteManyArgs = {
    /**
     * Filter which Contatoes to delete
     * 
    **/
    where?: ContatoWhereInput
  }


  /**
   * Contato: findUniqueOrThrow
   */
  export type ContatoFindUniqueOrThrowArgs = ContatoFindUniqueArgsBase
      

  /**
   * Contato: findFirstOrThrow
   */
  export type ContatoFindFirstOrThrowArgs = ContatoFindFirstArgsBase
      

  /**
   * Contato without action
   */
  export type ContatoArgs = {
    /**
     * Select specific fields to fetch from the Contato
     * 
    **/
    select?: ContatoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContatoInclude | null
  }



  /**
   * Model Usuario
   */


  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    criadoEm: Date | null
    atualizadoEm: Date | null
    contatoUid: string | null
    email: string | null
    username: string | null
    senha: string | null
  }

  export type UsuarioMaxAggregateOutputType = {
    criadoEm: Date | null
    atualizadoEm: Date | null
    contatoUid: string | null
    email: string | null
    username: string | null
    senha: string | null
  }

  export type UsuarioCountAggregateOutputType = {
    criadoEm: number
    atualizadoEm: number
    contatoUid: number
    email: number
    username: number
    senha: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    criadoEm?: true
    atualizadoEm?: true
    contatoUid?: true
    email?: true
    username?: true
    senha?: true
  }

  export type UsuarioMaxAggregateInputType = {
    criadoEm?: true
    atualizadoEm?: true
    contatoUid?: true
    email?: true
    username?: true
    senha?: true
  }

  export type UsuarioCountAggregateInputType = {
    criadoEm?: true
    atualizadoEm?: true
    contatoUid?: true
    email?: true
    username?: true
    senha?: true
    _all?: true
  }

  export type UsuarioAggregateArgs = {
    /**
     * Filter which Usuario to aggregate.
     * 
    **/
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<UsuarioOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs = {
    where?: UsuarioWhereInput
    orderBy?: Enumerable<UsuarioOrderByWithAggregationInput>
    by: Array<UsuarioScalarFieldEnum>
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }


  export type UsuarioGroupByOutputType = {
    criadoEm: Date
    atualizadoEm: Date
    contatoUid: string
    email: string
    username: string | null
    senha: string
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect = {
    criadoEm?: boolean
    atualizadoEm?: boolean
    contatoUid?: boolean
    email?: boolean
    username?: boolean
    senha?: boolean
    contato?: boolean | ContatoArgs
  }

  export type UsuarioInclude = {
    contato?: boolean | ContatoArgs
  }

  export type UsuarioGetPayload<
    S extends boolean | null | undefined | UsuarioArgs,
    U = keyof S
      > = S extends true
        ? Usuario
    : S extends undefined
    ? never
    : S extends UsuarioArgs | UsuarioFindManyArgs
    ?'include' extends U
    ? Usuario  & {
    [P in TrueKeys<S['include']>]:
        P extends 'contato' ? ContatoGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'contato' ? ContatoGetPayload<S['select'][P]> :  P extends keyof Usuario ? Usuario[P] : never
  } 
    : Usuario
  : Usuario


  type UsuarioCountArgs = Merge<
    Omit<UsuarioFindManyArgs, 'select' | 'include'> & {
      select?: UsuarioCountAggregateInputType | true
    }
  >

  export interface UsuarioDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UsuarioFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UsuarioFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Usuario'> extends True ? CheckSelect<T, Prisma__UsuarioClient<Usuario>, Prisma__UsuarioClient<UsuarioGetPayload<T>>> : CheckSelect<T, Prisma__UsuarioClient<Usuario | null >, Prisma__UsuarioClient<UsuarioGetPayload<T> | null >>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UsuarioFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UsuarioFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Usuario'> extends True ? CheckSelect<T, Prisma__UsuarioClient<Usuario>, Prisma__UsuarioClient<UsuarioGetPayload<T>>> : CheckSelect<T, Prisma__UsuarioClient<Usuario | null >, Prisma__UsuarioClient<UsuarioGetPayload<T> | null >>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `criadoEm`
     * const usuarioWithCriadoEmOnly = await prisma.usuario.findMany({ select: { criadoEm: true } })
     * 
    **/
    findMany<T extends UsuarioFindManyArgs>(
      args?: SelectSubset<T, UsuarioFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Usuario>>, PrismaPromise<Array<UsuarioGetPayload<T>>>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
    **/
    create<T extends UsuarioCreateArgs>(
      args: SelectSubset<T, UsuarioCreateArgs>
    ): CheckSelect<T, Prisma__UsuarioClient<Usuario>, Prisma__UsuarioClient<UsuarioGetPayload<T>>>

    /**
     * Create many Usuarios.
     *     @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     *     @example
     *     // Create many Usuarios
     *     const usuario = await prisma.usuario.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UsuarioCreateManyArgs>(
      args?: SelectSubset<T, UsuarioCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
    **/
    delete<T extends UsuarioDeleteArgs>(
      args: SelectSubset<T, UsuarioDeleteArgs>
    ): CheckSelect<T, Prisma__UsuarioClient<Usuario>, Prisma__UsuarioClient<UsuarioGetPayload<T>>>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UsuarioUpdateArgs>(
      args: SelectSubset<T, UsuarioUpdateArgs>
    ): CheckSelect<T, Prisma__UsuarioClient<Usuario>, Prisma__UsuarioClient<UsuarioGetPayload<T>>>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UsuarioDeleteManyArgs>(
      args?: SelectSubset<T, UsuarioDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UsuarioUpdateManyArgs>(
      args: SelectSubset<T, UsuarioUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
    **/
    upsert<T extends UsuarioUpsertArgs>(
      args: SelectSubset<T, UsuarioUpsertArgs>
    ): CheckSelect<T, Prisma__UsuarioClient<Usuario>, Prisma__UsuarioClient<UsuarioGetPayload<T>>>

    /**
     * Find one Usuario that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UsuarioFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UsuarioClient<Usuario>, Prisma__UsuarioClient<UsuarioGetPayload<T>>>

    /**
     * Find the first Usuario that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UsuarioClient<Usuario>, Prisma__UsuarioClient<UsuarioGetPayload<T>>>

    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UsuarioClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    contato<T extends ContatoArgs = {}>(args?: Subset<T, ContatoArgs>): CheckSelect<T, Prisma__ContatoClient<Contato | null >, Prisma__ContatoClient<ContatoGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Usuario base type for findUnique actions
   */
  export type UsuarioFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Usuario
     * 
    **/
    select?: UsuarioSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuarioInclude | null
    /**
     * Filter, which Usuario to fetch.
     * 
    **/
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario: findUnique
   */
  export interface UsuarioFindUniqueArgs extends UsuarioFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Usuario base type for findFirst actions
   */
  export type UsuarioFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Usuario
     * 
    **/
    select?: UsuarioSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuarioInclude | null
    /**
     * Filter, which Usuario to fetch.
     * 
    **/
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<UsuarioOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     * 
    **/
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     * 
    **/
    distinct?: Enumerable<UsuarioScalarFieldEnum>
  }

  /**
   * Usuario: findFirst
   */
  export interface UsuarioFindFirstArgs extends UsuarioFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs = {
    /**
     * Select specific fields to fetch from the Usuario
     * 
    **/
    select?: UsuarioSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuarioInclude | null
    /**
     * Filter, which Usuarios to fetch.
     * 
    **/
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<UsuarioOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     * 
    **/
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UsuarioScalarFieldEnum>
  }


  /**
   * Usuario create
   */
  export type UsuarioCreateArgs = {
    /**
     * Select specific fields to fetch from the Usuario
     * 
    **/
    select?: UsuarioSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuarioInclude | null
    /**
     * The data needed to create a Usuario.
     * 
    **/
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }


  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs = {
    /**
     * The data used to create many Usuarios.
     * 
    **/
    data: Enumerable<UsuarioCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs = {
    /**
     * Select specific fields to fetch from the Usuario
     * 
    **/
    select?: UsuarioSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuarioInclude | null
    /**
     * The data needed to update a Usuario.
     * 
    **/
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     * 
    **/
    where: UsuarioWhereUniqueInput
  }


  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs = {
    /**
     * The data used to update Usuarios.
     * 
    **/
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     * 
    **/
    where?: UsuarioWhereInput
  }


  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs = {
    /**
     * Select specific fields to fetch from the Usuario
     * 
    **/
    select?: UsuarioSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuarioInclude | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     * 
    **/
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     * 
    **/
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }


  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs = {
    /**
     * Select specific fields to fetch from the Usuario
     * 
    **/
    select?: UsuarioSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuarioInclude | null
    /**
     * Filter which Usuario to delete.
     * 
    **/
    where: UsuarioWhereUniqueInput
  }


  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs = {
    /**
     * Filter which Usuarios to delete
     * 
    **/
    where?: UsuarioWhereInput
  }


  /**
   * Usuario: findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs = UsuarioFindUniqueArgsBase
      

  /**
   * Usuario: findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs = UsuarioFindFirstArgsBase
      

  /**
   * Usuario without action
   */
  export type UsuarioArgs = {
    /**
     * Select specific fields to fetch from the Usuario
     * 
    **/
    select?: UsuarioSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuarioInclude | null
  }



  /**
   * Model Produto
   */


  export type AggregateProduto = {
    _count: ProdutoCountAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  export type ProdutoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
    descricao: string | null
    tipo: string | null
    marca: string | null
  }

  export type ProdutoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
    descricao: string | null
    tipo: string | null
    marca: string | null
  }

  export type ProdutoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    nome: number
    descricao: number
    tipo: number
    marca: number
    _all: number
  }


  export type ProdutoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
    tipo?: true
    marca?: true
  }

  export type ProdutoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
    tipo?: true
    marca?: true
  }

  export type ProdutoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
    tipo?: true
    marca?: true
    _all?: true
  }

  export type ProdutoAggregateArgs = {
    /**
     * Filter which Produto to aggregate.
     * 
    **/
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     * 
    **/
    orderBy?: Enumerable<ProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Produtos
    **/
    _count?: true | ProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutoMaxAggregateInputType
  }

  export type GetProdutoAggregateType<T extends ProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduto[P]>
      : GetScalarType<T[P], AggregateProduto[P]>
  }




  export type ProdutoGroupByArgs = {
    where?: ProdutoWhereInput
    orderBy?: Enumerable<ProdutoOrderByWithAggregationInput>
    by: Array<ProdutoScalarFieldEnum>
    having?: ProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutoCountAggregateInputType | true
    _min?: ProdutoMinAggregateInputType
    _max?: ProdutoMaxAggregateInputType
  }


  export type ProdutoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    nome: string
    descricao: string | null
    tipo: string
    marca: string | null
    _count: ProdutoCountAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  type GetProdutoGroupByPayload<T extends ProdutoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
        }
      >
    >


  export type ProdutoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    nome?: boolean
    descricao?: boolean
    tipo?: boolean
    marca?: boolean
    valores?: boolean | ValorProdutoFindManyArgs
    servicos?: boolean | ProdutoServicoFindManyArgs
    tipoProduto?: boolean | TipoProdutoArgs
    marcaProduto?: boolean | MarcaProdutoArgs
    _count?: boolean | ProdutoCountOutputTypeArgs
  }

  export type ProdutoInclude = {
    valores?: boolean | ValorProdutoFindManyArgs
    servicos?: boolean | ProdutoServicoFindManyArgs
    tipoProduto?: boolean | TipoProdutoArgs
    marcaProduto?: boolean | MarcaProdutoArgs
    _count?: boolean | ProdutoCountOutputTypeArgs
  }

  export type ProdutoGetPayload<
    S extends boolean | null | undefined | ProdutoArgs,
    U = keyof S
      > = S extends true
        ? Produto
    : S extends undefined
    ? never
    : S extends ProdutoArgs | ProdutoFindManyArgs
    ?'include' extends U
    ? Produto  & {
    [P in TrueKeys<S['include']>]:
        P extends 'valores' ? Array < ValorProdutoGetPayload<S['include'][P]>>  :
        P extends 'servicos' ? Array < ProdutoServicoGetPayload<S['include'][P]>>  :
        P extends 'tipoProduto' ? TipoProdutoGetPayload<S['include'][P]> :
        P extends 'marcaProduto' ? MarcaProdutoGetPayload<S['include'][P]> | null :
        P extends '_count' ? ProdutoCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'valores' ? Array < ValorProdutoGetPayload<S['select'][P]>>  :
        P extends 'servicos' ? Array < ProdutoServicoGetPayload<S['select'][P]>>  :
        P extends 'tipoProduto' ? TipoProdutoGetPayload<S['select'][P]> :
        P extends 'marcaProduto' ? MarcaProdutoGetPayload<S['select'][P]> | null :
        P extends '_count' ? ProdutoCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Produto ? Produto[P] : never
  } 
    : Produto
  : Produto


  type ProdutoCountArgs = Merge<
    Omit<ProdutoFindManyArgs, 'select' | 'include'> & {
      select?: ProdutoCountAggregateInputType | true
    }
  >

  export interface ProdutoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Produto that matches the filter.
     * @param {ProdutoFindUniqueArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProdutoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProdutoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Produto'> extends True ? CheckSelect<T, Prisma__ProdutoClient<Produto>, Prisma__ProdutoClient<ProdutoGetPayload<T>>> : CheckSelect<T, Prisma__ProdutoClient<Produto | null >, Prisma__ProdutoClient<ProdutoGetPayload<T> | null >>

    /**
     * Find the first Produto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProdutoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProdutoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Produto'> extends True ? CheckSelect<T, Prisma__ProdutoClient<Produto>, Prisma__ProdutoClient<ProdutoGetPayload<T>>> : CheckSelect<T, Prisma__ProdutoClient<Produto | null >, Prisma__ProdutoClient<ProdutoGetPayload<T> | null >>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produto.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produto.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const produtoWithUidOnly = await prisma.produto.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends ProdutoFindManyArgs>(
      args?: SelectSubset<T, ProdutoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Produto>>, PrismaPromise<Array<ProdutoGetPayload<T>>>>

    /**
     * Create a Produto.
     * @param {ProdutoCreateArgs} args - Arguments to create a Produto.
     * @example
     * // Create one Produto
     * const Produto = await prisma.produto.create({
     *   data: {
     *     // ... data to create a Produto
     *   }
     * })
     * 
    **/
    create<T extends ProdutoCreateArgs>(
      args: SelectSubset<T, ProdutoCreateArgs>
    ): CheckSelect<T, Prisma__ProdutoClient<Produto>, Prisma__ProdutoClient<ProdutoGetPayload<T>>>

    /**
     * Create many Produtos.
     *     @param {ProdutoCreateManyArgs} args - Arguments to create many Produtos.
     *     @example
     *     // Create many Produtos
     *     const produto = await prisma.produto.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProdutoCreateManyArgs>(
      args?: SelectSubset<T, ProdutoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Produto.
     * @param {ProdutoDeleteArgs} args - Arguments to delete one Produto.
     * @example
     * // Delete one Produto
     * const Produto = await prisma.produto.delete({
     *   where: {
     *     // ... filter to delete one Produto
     *   }
     * })
     * 
    **/
    delete<T extends ProdutoDeleteArgs>(
      args: SelectSubset<T, ProdutoDeleteArgs>
    ): CheckSelect<T, Prisma__ProdutoClient<Produto>, Prisma__ProdutoClient<ProdutoGetPayload<T>>>

    /**
     * Update one Produto.
     * @param {ProdutoUpdateArgs} args - Arguments to update one Produto.
     * @example
     * // Update one Produto
     * const produto = await prisma.produto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProdutoUpdateArgs>(
      args: SelectSubset<T, ProdutoUpdateArgs>
    ): CheckSelect<T, Prisma__ProdutoClient<Produto>, Prisma__ProdutoClient<ProdutoGetPayload<T>>>

    /**
     * Delete zero or more Produtos.
     * @param {ProdutoDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProdutoDeleteManyArgs>(
      args?: SelectSubset<T, ProdutoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProdutoUpdateManyArgs>(
      args: SelectSubset<T, ProdutoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Produto.
     * @param {ProdutoUpsertArgs} args - Arguments to update or create a Produto.
     * @example
     * // Update or create a Produto
     * const produto = await prisma.produto.upsert({
     *   create: {
     *     // ... data to create a Produto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produto we want to update
     *   }
     * })
    **/
    upsert<T extends ProdutoUpsertArgs>(
      args: SelectSubset<T, ProdutoUpsertArgs>
    ): CheckSelect<T, Prisma__ProdutoClient<Produto>, Prisma__ProdutoClient<ProdutoGetPayload<T>>>

    /**
     * Find one Produto that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ProdutoFindUniqueOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProdutoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProdutoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ProdutoClient<Produto>, Prisma__ProdutoClient<ProdutoGetPayload<T>>>

    /**
     * Find the first Produto that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProdutoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProdutoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ProdutoClient<Produto>, Prisma__ProdutoClient<ProdutoGetPayload<T>>>

    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produto.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends ProdutoCountArgs>(
      args?: Subset<T, ProdutoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutoAggregateArgs>(args: Subset<T, ProdutoAggregateArgs>): PrismaPromise<GetProdutoAggregateType<T>>

    /**
     * Group by Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutoGroupByArgs['orderBy'] }
        : { orderBy?: ProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProdutoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    valores<T extends ValorProdutoFindManyArgs = {}>(args?: Subset<T, ValorProdutoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ValorProduto>>, PrismaPromise<Array<ValorProdutoGetPayload<T>>>>;

    servicos<T extends ProdutoServicoFindManyArgs = {}>(args?: Subset<T, ProdutoServicoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProdutoServico>>, PrismaPromise<Array<ProdutoServicoGetPayload<T>>>>;

    tipoProduto<T extends TipoProdutoArgs = {}>(args?: Subset<T, TipoProdutoArgs>): CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto | null >, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T> | null >>;

    marcaProduto<T extends MarcaProdutoArgs = {}>(args?: Subset<T, MarcaProdutoArgs>): CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto | null >, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Produto base type for findUnique actions
   */
  export type ProdutoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Produto
     * 
    **/
    select?: ProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoInclude | null
    /**
     * Filter, which Produto to fetch.
     * 
    **/
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto: findUnique
   */
  export interface ProdutoFindUniqueArgs extends ProdutoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Produto base type for findFirst actions
   */
  export type ProdutoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Produto
     * 
    **/
    select?: ProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoInclude | null
    /**
     * Filter, which Produto to fetch.
     * 
    **/
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     * 
    **/
    orderBy?: Enumerable<ProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     * 
    **/
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     * 
    **/
    distinct?: Enumerable<ProdutoScalarFieldEnum>
  }

  /**
   * Produto: findFirst
   */
  export interface ProdutoFindFirstArgs extends ProdutoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Produto findMany
   */
  export type ProdutoFindManyArgs = {
    /**
     * Select specific fields to fetch from the Produto
     * 
    **/
    select?: ProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoInclude | null
    /**
     * Filter, which Produtos to fetch.
     * 
    **/
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     * 
    **/
    orderBy?: Enumerable<ProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Produtos.
     * 
    **/
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProdutoScalarFieldEnum>
  }


  /**
   * Produto create
   */
  export type ProdutoCreateArgs = {
    /**
     * Select specific fields to fetch from the Produto
     * 
    **/
    select?: ProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoInclude | null
    /**
     * The data needed to create a Produto.
     * 
    **/
    data: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
  }


  /**
   * Produto createMany
   */
  export type ProdutoCreateManyArgs = {
    /**
     * The data used to create many Produtos.
     * 
    **/
    data: Enumerable<ProdutoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Produto update
   */
  export type ProdutoUpdateArgs = {
    /**
     * Select specific fields to fetch from the Produto
     * 
    **/
    select?: ProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoInclude | null
    /**
     * The data needed to update a Produto.
     * 
    **/
    data: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
    /**
     * Choose, which Produto to update.
     * 
    **/
    where: ProdutoWhereUniqueInput
  }


  /**
   * Produto updateMany
   */
  export type ProdutoUpdateManyArgs = {
    /**
     * The data used to update Produtos.
     * 
    **/
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     * 
    **/
    where?: ProdutoWhereInput
  }


  /**
   * Produto upsert
   */
  export type ProdutoUpsertArgs = {
    /**
     * Select specific fields to fetch from the Produto
     * 
    **/
    select?: ProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoInclude | null
    /**
     * The filter to search for the Produto to update in case it exists.
     * 
    **/
    where: ProdutoWhereUniqueInput
    /**
     * In case the Produto found by the `where` argument doesn't exist, create a new Produto with this data.
     * 
    **/
    create: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
    /**
     * In case the Produto was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
  }


  /**
   * Produto delete
   */
  export type ProdutoDeleteArgs = {
    /**
     * Select specific fields to fetch from the Produto
     * 
    **/
    select?: ProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoInclude | null
    /**
     * Filter which Produto to delete.
     * 
    **/
    where: ProdutoWhereUniqueInput
  }


  /**
   * Produto deleteMany
   */
  export type ProdutoDeleteManyArgs = {
    /**
     * Filter which Produtos to delete
     * 
    **/
    where?: ProdutoWhereInput
  }


  /**
   * Produto: findUniqueOrThrow
   */
  export type ProdutoFindUniqueOrThrowArgs = ProdutoFindUniqueArgsBase
      

  /**
   * Produto: findFirstOrThrow
   */
  export type ProdutoFindFirstOrThrowArgs = ProdutoFindFirstArgsBase
      

  /**
   * Produto without action
   */
  export type ProdutoArgs = {
    /**
     * Select specific fields to fetch from the Produto
     * 
    **/
    select?: ProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoInclude | null
  }



  /**
   * Model TipoProduto
   */


  export type AggregateTipoProduto = {
    _count: TipoProdutoCountAggregateOutputType | null
    _min: TipoProdutoMinAggregateOutputType | null
    _max: TipoProdutoMaxAggregateOutputType | null
  }

  export type TipoProdutoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
    descricao: string | null
  }

  export type TipoProdutoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
    descricao: string | null
  }

  export type TipoProdutoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    nome: number
    descricao: number
    _all: number
  }


  export type TipoProdutoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
  }

  export type TipoProdutoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
  }

  export type TipoProdutoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
    _all?: true
  }

  export type TipoProdutoAggregateArgs = {
    /**
     * Filter which TipoProduto to aggregate.
     * 
    **/
    where?: TipoProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<TipoProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TipoProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoProdutos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TipoProdutos
    **/
    _count?: true | TipoProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipoProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipoProdutoMaxAggregateInputType
  }

  export type GetTipoProdutoAggregateType<T extends TipoProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateTipoProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipoProduto[P]>
      : GetScalarType<T[P], AggregateTipoProduto[P]>
  }




  export type TipoProdutoGroupByArgs = {
    where?: TipoProdutoWhereInput
    orderBy?: Enumerable<TipoProdutoOrderByWithAggregationInput>
    by: Array<TipoProdutoScalarFieldEnum>
    having?: TipoProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipoProdutoCountAggregateInputType | true
    _min?: TipoProdutoMinAggregateInputType
    _max?: TipoProdutoMaxAggregateInputType
  }


  export type TipoProdutoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    nome: string
    descricao: string | null
    _count: TipoProdutoCountAggregateOutputType | null
    _min: TipoProdutoMinAggregateOutputType | null
    _max: TipoProdutoMaxAggregateOutputType | null
  }

  type GetTipoProdutoGroupByPayload<T extends TipoProdutoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TipoProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipoProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipoProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], TipoProdutoGroupByOutputType[P]>
        }
      >
    >


  export type TipoProdutoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    nome?: boolean
    descricao?: boolean
    produtos?: boolean | ProdutoFindManyArgs
    _count?: boolean | TipoProdutoCountOutputTypeArgs
  }

  export type TipoProdutoInclude = {
    produtos?: boolean | ProdutoFindManyArgs
    _count?: boolean | TipoProdutoCountOutputTypeArgs
  }

  export type TipoProdutoGetPayload<
    S extends boolean | null | undefined | TipoProdutoArgs,
    U = keyof S
      > = S extends true
        ? TipoProduto
    : S extends undefined
    ? never
    : S extends TipoProdutoArgs | TipoProdutoFindManyArgs
    ?'include' extends U
    ? TipoProduto  & {
    [P in TrueKeys<S['include']>]:
        P extends 'produtos' ? Array < ProdutoGetPayload<S['include'][P]>>  :
        P extends '_count' ? TipoProdutoCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'produtos' ? Array < ProdutoGetPayload<S['select'][P]>>  :
        P extends '_count' ? TipoProdutoCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof TipoProduto ? TipoProduto[P] : never
  } 
    : TipoProduto
  : TipoProduto


  type TipoProdutoCountArgs = Merge<
    Omit<TipoProdutoFindManyArgs, 'select' | 'include'> & {
      select?: TipoProdutoCountAggregateInputType | true
    }
  >

  export interface TipoProdutoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one TipoProduto that matches the filter.
     * @param {TipoProdutoFindUniqueArgs} args - Arguments to find a TipoProduto
     * @example
     * // Get one TipoProduto
     * const tipoProduto = await prisma.tipoProduto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TipoProdutoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TipoProdutoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TipoProduto'> extends True ? CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto>, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T>>> : CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto | null >, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T> | null >>

    /**
     * Find the first TipoProduto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoProdutoFindFirstArgs} args - Arguments to find a TipoProduto
     * @example
     * // Get one TipoProduto
     * const tipoProduto = await prisma.tipoProduto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TipoProdutoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TipoProdutoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TipoProduto'> extends True ? CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto>, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T>>> : CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto | null >, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T> | null >>

    /**
     * Find zero or more TipoProdutos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoProdutoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TipoProdutos
     * const tipoProdutos = await prisma.tipoProduto.findMany()
     * 
     * // Get first 10 TipoProdutos
     * const tipoProdutos = await prisma.tipoProduto.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const tipoProdutoWithUidOnly = await prisma.tipoProduto.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends TipoProdutoFindManyArgs>(
      args?: SelectSubset<T, TipoProdutoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<TipoProduto>>, PrismaPromise<Array<TipoProdutoGetPayload<T>>>>

    /**
     * Create a TipoProduto.
     * @param {TipoProdutoCreateArgs} args - Arguments to create a TipoProduto.
     * @example
     * // Create one TipoProduto
     * const TipoProduto = await prisma.tipoProduto.create({
     *   data: {
     *     // ... data to create a TipoProduto
     *   }
     * })
     * 
    **/
    create<T extends TipoProdutoCreateArgs>(
      args: SelectSubset<T, TipoProdutoCreateArgs>
    ): CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto>, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T>>>

    /**
     * Create many TipoProdutos.
     *     @param {TipoProdutoCreateManyArgs} args - Arguments to create many TipoProdutos.
     *     @example
     *     // Create many TipoProdutos
     *     const tipoProduto = await prisma.tipoProduto.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TipoProdutoCreateManyArgs>(
      args?: SelectSubset<T, TipoProdutoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TipoProduto.
     * @param {TipoProdutoDeleteArgs} args - Arguments to delete one TipoProduto.
     * @example
     * // Delete one TipoProduto
     * const TipoProduto = await prisma.tipoProduto.delete({
     *   where: {
     *     // ... filter to delete one TipoProduto
     *   }
     * })
     * 
    **/
    delete<T extends TipoProdutoDeleteArgs>(
      args: SelectSubset<T, TipoProdutoDeleteArgs>
    ): CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto>, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T>>>

    /**
     * Update one TipoProduto.
     * @param {TipoProdutoUpdateArgs} args - Arguments to update one TipoProduto.
     * @example
     * // Update one TipoProduto
     * const tipoProduto = await prisma.tipoProduto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TipoProdutoUpdateArgs>(
      args: SelectSubset<T, TipoProdutoUpdateArgs>
    ): CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto>, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T>>>

    /**
     * Delete zero or more TipoProdutos.
     * @param {TipoProdutoDeleteManyArgs} args - Arguments to filter TipoProdutos to delete.
     * @example
     * // Delete a few TipoProdutos
     * const { count } = await prisma.tipoProduto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TipoProdutoDeleteManyArgs>(
      args?: SelectSubset<T, TipoProdutoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TipoProdutos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TipoProdutos
     * const tipoProduto = await prisma.tipoProduto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TipoProdutoUpdateManyArgs>(
      args: SelectSubset<T, TipoProdutoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TipoProduto.
     * @param {TipoProdutoUpsertArgs} args - Arguments to update or create a TipoProduto.
     * @example
     * // Update or create a TipoProduto
     * const tipoProduto = await prisma.tipoProduto.upsert({
     *   create: {
     *     // ... data to create a TipoProduto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TipoProduto we want to update
     *   }
     * })
    **/
    upsert<T extends TipoProdutoUpsertArgs>(
      args: SelectSubset<T, TipoProdutoUpsertArgs>
    ): CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto>, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T>>>

    /**
     * Find one TipoProduto that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TipoProdutoFindUniqueOrThrowArgs} args - Arguments to find a TipoProduto
     * @example
     * // Get one TipoProduto
     * const tipoProduto = await prisma.tipoProduto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TipoProdutoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TipoProdutoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto>, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T>>>

    /**
     * Find the first TipoProduto that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoProdutoFindFirstOrThrowArgs} args - Arguments to find a TipoProduto
     * @example
     * // Get one TipoProduto
     * const tipoProduto = await prisma.tipoProduto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TipoProdutoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TipoProdutoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__TipoProdutoClient<TipoProduto>, Prisma__TipoProdutoClient<TipoProdutoGetPayload<T>>>

    /**
     * Count the number of TipoProdutos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoProdutoCountArgs} args - Arguments to filter TipoProdutos to count.
     * @example
     * // Count the number of TipoProdutos
     * const count = await prisma.tipoProduto.count({
     *   where: {
     *     // ... the filter for the TipoProdutos we want to count
     *   }
     * })
    **/
    count<T extends TipoProdutoCountArgs>(
      args?: Subset<T, TipoProdutoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipoProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TipoProduto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipoProdutoAggregateArgs>(args: Subset<T, TipoProdutoAggregateArgs>): PrismaPromise<GetTipoProdutoAggregateType<T>>

    /**
     * Group by TipoProduto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TipoProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TipoProdutoGroupByArgs['orderBy'] }
        : { orderBy?: TipoProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TipoProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipoProdutoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for TipoProduto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TipoProdutoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    produtos<T extends ProdutoFindManyArgs = {}>(args?: Subset<T, ProdutoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Produto>>, PrismaPromise<Array<ProdutoGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * TipoProduto base type for findUnique actions
   */
  export type TipoProdutoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TipoProduto
     * 
    **/
    select?: TipoProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipoProdutoInclude | null
    /**
     * Filter, which TipoProduto to fetch.
     * 
    **/
    where: TipoProdutoWhereUniqueInput
  }

  /**
   * TipoProduto: findUnique
   */
  export interface TipoProdutoFindUniqueArgs extends TipoProdutoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TipoProduto base type for findFirst actions
   */
  export type TipoProdutoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TipoProduto
     * 
    **/
    select?: TipoProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipoProdutoInclude | null
    /**
     * Filter, which TipoProduto to fetch.
     * 
    **/
    where?: TipoProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<TipoProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipoProdutos.
     * 
    **/
    cursor?: TipoProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoProdutos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipoProdutos.
     * 
    **/
    distinct?: Enumerable<TipoProdutoScalarFieldEnum>
  }

  /**
   * TipoProduto: findFirst
   */
  export interface TipoProdutoFindFirstArgs extends TipoProdutoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TipoProduto findMany
   */
  export type TipoProdutoFindManyArgs = {
    /**
     * Select specific fields to fetch from the TipoProduto
     * 
    **/
    select?: TipoProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipoProdutoInclude | null
    /**
     * Filter, which TipoProdutos to fetch.
     * 
    **/
    where?: TipoProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<TipoProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TipoProdutos.
     * 
    **/
    cursor?: TipoProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoProdutos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TipoProdutoScalarFieldEnum>
  }


  /**
   * TipoProduto create
   */
  export type TipoProdutoCreateArgs = {
    /**
     * Select specific fields to fetch from the TipoProduto
     * 
    **/
    select?: TipoProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipoProdutoInclude | null
    /**
     * The data needed to create a TipoProduto.
     * 
    **/
    data: XOR<TipoProdutoCreateInput, TipoProdutoUncheckedCreateInput>
  }


  /**
   * TipoProduto createMany
   */
  export type TipoProdutoCreateManyArgs = {
    /**
     * The data used to create many TipoProdutos.
     * 
    **/
    data: Enumerable<TipoProdutoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TipoProduto update
   */
  export type TipoProdutoUpdateArgs = {
    /**
     * Select specific fields to fetch from the TipoProduto
     * 
    **/
    select?: TipoProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipoProdutoInclude | null
    /**
     * The data needed to update a TipoProduto.
     * 
    **/
    data: XOR<TipoProdutoUpdateInput, TipoProdutoUncheckedUpdateInput>
    /**
     * Choose, which TipoProduto to update.
     * 
    **/
    where: TipoProdutoWhereUniqueInput
  }


  /**
   * TipoProduto updateMany
   */
  export type TipoProdutoUpdateManyArgs = {
    /**
     * The data used to update TipoProdutos.
     * 
    **/
    data: XOR<TipoProdutoUpdateManyMutationInput, TipoProdutoUncheckedUpdateManyInput>
    /**
     * Filter which TipoProdutos to update
     * 
    **/
    where?: TipoProdutoWhereInput
  }


  /**
   * TipoProduto upsert
   */
  export type TipoProdutoUpsertArgs = {
    /**
     * Select specific fields to fetch from the TipoProduto
     * 
    **/
    select?: TipoProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipoProdutoInclude | null
    /**
     * The filter to search for the TipoProduto to update in case it exists.
     * 
    **/
    where: TipoProdutoWhereUniqueInput
    /**
     * In case the TipoProduto found by the `where` argument doesn't exist, create a new TipoProduto with this data.
     * 
    **/
    create: XOR<TipoProdutoCreateInput, TipoProdutoUncheckedCreateInput>
    /**
     * In case the TipoProduto was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TipoProdutoUpdateInput, TipoProdutoUncheckedUpdateInput>
  }


  /**
   * TipoProduto delete
   */
  export type TipoProdutoDeleteArgs = {
    /**
     * Select specific fields to fetch from the TipoProduto
     * 
    **/
    select?: TipoProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipoProdutoInclude | null
    /**
     * Filter which TipoProduto to delete.
     * 
    **/
    where: TipoProdutoWhereUniqueInput
  }


  /**
   * TipoProduto deleteMany
   */
  export type TipoProdutoDeleteManyArgs = {
    /**
     * Filter which TipoProdutos to delete
     * 
    **/
    where?: TipoProdutoWhereInput
  }


  /**
   * TipoProduto: findUniqueOrThrow
   */
  export type TipoProdutoFindUniqueOrThrowArgs = TipoProdutoFindUniqueArgsBase
      

  /**
   * TipoProduto: findFirstOrThrow
   */
  export type TipoProdutoFindFirstOrThrowArgs = TipoProdutoFindFirstArgsBase
      

  /**
   * TipoProduto without action
   */
  export type TipoProdutoArgs = {
    /**
     * Select specific fields to fetch from the TipoProduto
     * 
    **/
    select?: TipoProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipoProdutoInclude | null
  }



  /**
   * Model MarcaProduto
   */


  export type AggregateMarcaProduto = {
    _count: MarcaProdutoCountAggregateOutputType | null
    _min: MarcaProdutoMinAggregateOutputType | null
    _max: MarcaProdutoMaxAggregateOutputType | null
  }

  export type MarcaProdutoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
    descricao: string | null
  }

  export type MarcaProdutoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
    descricao: string | null
  }

  export type MarcaProdutoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    nome: number
    descricao: number
    _all: number
  }


  export type MarcaProdutoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
  }

  export type MarcaProdutoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
  }

  export type MarcaProdutoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
    _all?: true
  }

  export type MarcaProdutoAggregateArgs = {
    /**
     * Filter which MarcaProduto to aggregate.
     * 
    **/
    where?: MarcaProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarcaProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<MarcaProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: MarcaProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarcaProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarcaProdutos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MarcaProdutos
    **/
    _count?: true | MarcaProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarcaProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarcaProdutoMaxAggregateInputType
  }

  export type GetMarcaProdutoAggregateType<T extends MarcaProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateMarcaProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarcaProduto[P]>
      : GetScalarType<T[P], AggregateMarcaProduto[P]>
  }




  export type MarcaProdutoGroupByArgs = {
    where?: MarcaProdutoWhereInput
    orderBy?: Enumerable<MarcaProdutoOrderByWithAggregationInput>
    by: Array<MarcaProdutoScalarFieldEnum>
    having?: MarcaProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarcaProdutoCountAggregateInputType | true
    _min?: MarcaProdutoMinAggregateInputType
    _max?: MarcaProdutoMaxAggregateInputType
  }


  export type MarcaProdutoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    nome: string
    descricao: string | null
    _count: MarcaProdutoCountAggregateOutputType | null
    _min: MarcaProdutoMinAggregateOutputType | null
    _max: MarcaProdutoMaxAggregateOutputType | null
  }

  type GetMarcaProdutoGroupByPayload<T extends MarcaProdutoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<MarcaProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarcaProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarcaProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], MarcaProdutoGroupByOutputType[P]>
        }
      >
    >


  export type MarcaProdutoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    nome?: boolean
    descricao?: boolean
    produtos?: boolean | ProdutoFindManyArgs
    _count?: boolean | MarcaProdutoCountOutputTypeArgs
  }

  export type MarcaProdutoInclude = {
    produtos?: boolean | ProdutoFindManyArgs
    _count?: boolean | MarcaProdutoCountOutputTypeArgs
  }

  export type MarcaProdutoGetPayload<
    S extends boolean | null | undefined | MarcaProdutoArgs,
    U = keyof S
      > = S extends true
        ? MarcaProduto
    : S extends undefined
    ? never
    : S extends MarcaProdutoArgs | MarcaProdutoFindManyArgs
    ?'include' extends U
    ? MarcaProduto  & {
    [P in TrueKeys<S['include']>]:
        P extends 'produtos' ? Array < ProdutoGetPayload<S['include'][P]>>  :
        P extends '_count' ? MarcaProdutoCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'produtos' ? Array < ProdutoGetPayload<S['select'][P]>>  :
        P extends '_count' ? MarcaProdutoCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof MarcaProduto ? MarcaProduto[P] : never
  } 
    : MarcaProduto
  : MarcaProduto


  type MarcaProdutoCountArgs = Merge<
    Omit<MarcaProdutoFindManyArgs, 'select' | 'include'> & {
      select?: MarcaProdutoCountAggregateInputType | true
    }
  >

  export interface MarcaProdutoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one MarcaProduto that matches the filter.
     * @param {MarcaProdutoFindUniqueArgs} args - Arguments to find a MarcaProduto
     * @example
     * // Get one MarcaProduto
     * const marcaProduto = await prisma.marcaProduto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MarcaProdutoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MarcaProdutoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'MarcaProduto'> extends True ? CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto>, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T>>> : CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto | null >, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T> | null >>

    /**
     * Find the first MarcaProduto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaProdutoFindFirstArgs} args - Arguments to find a MarcaProduto
     * @example
     * // Get one MarcaProduto
     * const marcaProduto = await prisma.marcaProduto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MarcaProdutoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MarcaProdutoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'MarcaProduto'> extends True ? CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto>, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T>>> : CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto | null >, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T> | null >>

    /**
     * Find zero or more MarcaProdutos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaProdutoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarcaProdutos
     * const marcaProdutos = await prisma.marcaProduto.findMany()
     * 
     * // Get first 10 MarcaProdutos
     * const marcaProdutos = await prisma.marcaProduto.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const marcaProdutoWithUidOnly = await prisma.marcaProduto.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends MarcaProdutoFindManyArgs>(
      args?: SelectSubset<T, MarcaProdutoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<MarcaProduto>>, PrismaPromise<Array<MarcaProdutoGetPayload<T>>>>

    /**
     * Create a MarcaProduto.
     * @param {MarcaProdutoCreateArgs} args - Arguments to create a MarcaProduto.
     * @example
     * // Create one MarcaProduto
     * const MarcaProduto = await prisma.marcaProduto.create({
     *   data: {
     *     // ... data to create a MarcaProduto
     *   }
     * })
     * 
    **/
    create<T extends MarcaProdutoCreateArgs>(
      args: SelectSubset<T, MarcaProdutoCreateArgs>
    ): CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto>, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T>>>

    /**
     * Create many MarcaProdutos.
     *     @param {MarcaProdutoCreateManyArgs} args - Arguments to create many MarcaProdutos.
     *     @example
     *     // Create many MarcaProdutos
     *     const marcaProduto = await prisma.marcaProduto.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MarcaProdutoCreateManyArgs>(
      args?: SelectSubset<T, MarcaProdutoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a MarcaProduto.
     * @param {MarcaProdutoDeleteArgs} args - Arguments to delete one MarcaProduto.
     * @example
     * // Delete one MarcaProduto
     * const MarcaProduto = await prisma.marcaProduto.delete({
     *   where: {
     *     // ... filter to delete one MarcaProduto
     *   }
     * })
     * 
    **/
    delete<T extends MarcaProdutoDeleteArgs>(
      args: SelectSubset<T, MarcaProdutoDeleteArgs>
    ): CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto>, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T>>>

    /**
     * Update one MarcaProduto.
     * @param {MarcaProdutoUpdateArgs} args - Arguments to update one MarcaProduto.
     * @example
     * // Update one MarcaProduto
     * const marcaProduto = await prisma.marcaProduto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MarcaProdutoUpdateArgs>(
      args: SelectSubset<T, MarcaProdutoUpdateArgs>
    ): CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto>, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T>>>

    /**
     * Delete zero or more MarcaProdutos.
     * @param {MarcaProdutoDeleteManyArgs} args - Arguments to filter MarcaProdutos to delete.
     * @example
     * // Delete a few MarcaProdutos
     * const { count } = await prisma.marcaProduto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MarcaProdutoDeleteManyArgs>(
      args?: SelectSubset<T, MarcaProdutoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarcaProdutos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarcaProdutos
     * const marcaProduto = await prisma.marcaProduto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MarcaProdutoUpdateManyArgs>(
      args: SelectSubset<T, MarcaProdutoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one MarcaProduto.
     * @param {MarcaProdutoUpsertArgs} args - Arguments to update or create a MarcaProduto.
     * @example
     * // Update or create a MarcaProduto
     * const marcaProduto = await prisma.marcaProduto.upsert({
     *   create: {
     *     // ... data to create a MarcaProduto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarcaProduto we want to update
     *   }
     * })
    **/
    upsert<T extends MarcaProdutoUpsertArgs>(
      args: SelectSubset<T, MarcaProdutoUpsertArgs>
    ): CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto>, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T>>>

    /**
     * Find one MarcaProduto that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {MarcaProdutoFindUniqueOrThrowArgs} args - Arguments to find a MarcaProduto
     * @example
     * // Get one MarcaProduto
     * const marcaProduto = await prisma.marcaProduto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MarcaProdutoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, MarcaProdutoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto>, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T>>>

    /**
     * Find the first MarcaProduto that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaProdutoFindFirstOrThrowArgs} args - Arguments to find a MarcaProduto
     * @example
     * // Get one MarcaProduto
     * const marcaProduto = await prisma.marcaProduto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MarcaProdutoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MarcaProdutoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__MarcaProdutoClient<MarcaProduto>, Prisma__MarcaProdutoClient<MarcaProdutoGetPayload<T>>>

    /**
     * Count the number of MarcaProdutos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaProdutoCountArgs} args - Arguments to filter MarcaProdutos to count.
     * @example
     * // Count the number of MarcaProdutos
     * const count = await prisma.marcaProduto.count({
     *   where: {
     *     // ... the filter for the MarcaProdutos we want to count
     *   }
     * })
    **/
    count<T extends MarcaProdutoCountArgs>(
      args?: Subset<T, MarcaProdutoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarcaProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MarcaProduto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarcaProdutoAggregateArgs>(args: Subset<T, MarcaProdutoAggregateArgs>): PrismaPromise<GetMarcaProdutoAggregateType<T>>

    /**
     * Group by MarcaProduto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarcaProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarcaProdutoGroupByArgs['orderBy'] }
        : { orderBy?: MarcaProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarcaProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarcaProdutoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for MarcaProduto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MarcaProdutoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    produtos<T extends ProdutoFindManyArgs = {}>(args?: Subset<T, ProdutoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Produto>>, PrismaPromise<Array<ProdutoGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * MarcaProduto base type for findUnique actions
   */
  export type MarcaProdutoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the MarcaProduto
     * 
    **/
    select?: MarcaProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarcaProdutoInclude | null
    /**
     * Filter, which MarcaProduto to fetch.
     * 
    **/
    where: MarcaProdutoWhereUniqueInput
  }

  /**
   * MarcaProduto: findUnique
   */
  export interface MarcaProdutoFindUniqueArgs extends MarcaProdutoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MarcaProduto base type for findFirst actions
   */
  export type MarcaProdutoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the MarcaProduto
     * 
    **/
    select?: MarcaProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarcaProdutoInclude | null
    /**
     * Filter, which MarcaProduto to fetch.
     * 
    **/
    where?: MarcaProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarcaProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<MarcaProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarcaProdutos.
     * 
    **/
    cursor?: MarcaProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarcaProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarcaProdutos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarcaProdutos.
     * 
    **/
    distinct?: Enumerable<MarcaProdutoScalarFieldEnum>
  }

  /**
   * MarcaProduto: findFirst
   */
  export interface MarcaProdutoFindFirstArgs extends MarcaProdutoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MarcaProduto findMany
   */
  export type MarcaProdutoFindManyArgs = {
    /**
     * Select specific fields to fetch from the MarcaProduto
     * 
    **/
    select?: MarcaProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarcaProdutoInclude | null
    /**
     * Filter, which MarcaProdutos to fetch.
     * 
    **/
    where?: MarcaProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarcaProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<MarcaProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MarcaProdutos.
     * 
    **/
    cursor?: MarcaProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarcaProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarcaProdutos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MarcaProdutoScalarFieldEnum>
  }


  /**
   * MarcaProduto create
   */
  export type MarcaProdutoCreateArgs = {
    /**
     * Select specific fields to fetch from the MarcaProduto
     * 
    **/
    select?: MarcaProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarcaProdutoInclude | null
    /**
     * The data needed to create a MarcaProduto.
     * 
    **/
    data: XOR<MarcaProdutoCreateInput, MarcaProdutoUncheckedCreateInput>
  }


  /**
   * MarcaProduto createMany
   */
  export type MarcaProdutoCreateManyArgs = {
    /**
     * The data used to create many MarcaProdutos.
     * 
    **/
    data: Enumerable<MarcaProdutoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * MarcaProduto update
   */
  export type MarcaProdutoUpdateArgs = {
    /**
     * Select specific fields to fetch from the MarcaProduto
     * 
    **/
    select?: MarcaProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarcaProdutoInclude | null
    /**
     * The data needed to update a MarcaProduto.
     * 
    **/
    data: XOR<MarcaProdutoUpdateInput, MarcaProdutoUncheckedUpdateInput>
    /**
     * Choose, which MarcaProduto to update.
     * 
    **/
    where: MarcaProdutoWhereUniqueInput
  }


  /**
   * MarcaProduto updateMany
   */
  export type MarcaProdutoUpdateManyArgs = {
    /**
     * The data used to update MarcaProdutos.
     * 
    **/
    data: XOR<MarcaProdutoUpdateManyMutationInput, MarcaProdutoUncheckedUpdateManyInput>
    /**
     * Filter which MarcaProdutos to update
     * 
    **/
    where?: MarcaProdutoWhereInput
  }


  /**
   * MarcaProduto upsert
   */
  export type MarcaProdutoUpsertArgs = {
    /**
     * Select specific fields to fetch from the MarcaProduto
     * 
    **/
    select?: MarcaProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarcaProdutoInclude | null
    /**
     * The filter to search for the MarcaProduto to update in case it exists.
     * 
    **/
    where: MarcaProdutoWhereUniqueInput
    /**
     * In case the MarcaProduto found by the `where` argument doesn't exist, create a new MarcaProduto with this data.
     * 
    **/
    create: XOR<MarcaProdutoCreateInput, MarcaProdutoUncheckedCreateInput>
    /**
     * In case the MarcaProduto was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<MarcaProdutoUpdateInput, MarcaProdutoUncheckedUpdateInput>
  }


  /**
   * MarcaProduto delete
   */
  export type MarcaProdutoDeleteArgs = {
    /**
     * Select specific fields to fetch from the MarcaProduto
     * 
    **/
    select?: MarcaProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarcaProdutoInclude | null
    /**
     * Filter which MarcaProduto to delete.
     * 
    **/
    where: MarcaProdutoWhereUniqueInput
  }


  /**
   * MarcaProduto deleteMany
   */
  export type MarcaProdutoDeleteManyArgs = {
    /**
     * Filter which MarcaProdutos to delete
     * 
    **/
    where?: MarcaProdutoWhereInput
  }


  /**
   * MarcaProduto: findUniqueOrThrow
   */
  export type MarcaProdutoFindUniqueOrThrowArgs = MarcaProdutoFindUniqueArgsBase
      

  /**
   * MarcaProduto: findFirstOrThrow
   */
  export type MarcaProdutoFindFirstOrThrowArgs = MarcaProdutoFindFirstArgsBase
      

  /**
   * MarcaProduto without action
   */
  export type MarcaProdutoArgs = {
    /**
     * Select specific fields to fetch from the MarcaProduto
     * 
    **/
    select?: MarcaProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarcaProdutoInclude | null
  }



  /**
   * Model ValorProduto
   */


  export type AggregateValorProduto = {
    _count: ValorProdutoCountAggregateOutputType | null
    _avg: ValorProdutoAvgAggregateOutputType | null
    _sum: ValorProdutoSumAggregateOutputType | null
    _min: ValorProdutoMinAggregateOutputType | null
    _max: ValorProdutoMaxAggregateOutputType | null
  }

  export type ValorProdutoAvgAggregateOutputType = {
    valorEmCents: number | null
  }

  export type ValorProdutoSumAggregateOutputType = {
    valorEmCents: number | null
  }

  export type ValorProdutoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    espOdont: boolean | null
    valorEmCents: number | null
    dtFim: Date | null
    produtoUid: string | null
  }

  export type ValorProdutoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    espOdont: boolean | null
    valorEmCents: number | null
    dtFim: Date | null
    produtoUid: string | null
  }

  export type ValorProdutoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    espOdont: number
    valorEmCents: number
    dtFim: number
    produtoUid: number
    _all: number
  }


  export type ValorProdutoAvgAggregateInputType = {
    valorEmCents?: true
  }

  export type ValorProdutoSumAggregateInputType = {
    valorEmCents?: true
  }

  export type ValorProdutoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    espOdont?: true
    valorEmCents?: true
    dtFim?: true
    produtoUid?: true
  }

  export type ValorProdutoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    espOdont?: true
    valorEmCents?: true
    dtFim?: true
    produtoUid?: true
  }

  export type ValorProdutoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    espOdont?: true
    valorEmCents?: true
    dtFim?: true
    produtoUid?: true
    _all?: true
  }

  export type ValorProdutoAggregateArgs = {
    /**
     * Filter which ValorProduto to aggregate.
     * 
    **/
    where?: ValorProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValorProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<ValorProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ValorProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValorProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValorProdutos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ValorProdutos
    **/
    _count?: true | ValorProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ValorProdutoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ValorProdutoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ValorProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ValorProdutoMaxAggregateInputType
  }

  export type GetValorProdutoAggregateType<T extends ValorProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateValorProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateValorProduto[P]>
      : GetScalarType<T[P], AggregateValorProduto[P]>
  }




  export type ValorProdutoGroupByArgs = {
    where?: ValorProdutoWhereInput
    orderBy?: Enumerable<ValorProdutoOrderByWithAggregationInput>
    by: Array<ValorProdutoScalarFieldEnum>
    having?: ValorProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ValorProdutoCountAggregateInputType | true
    _avg?: ValorProdutoAvgAggregateInputType
    _sum?: ValorProdutoSumAggregateInputType
    _min?: ValorProdutoMinAggregateInputType
    _max?: ValorProdutoMaxAggregateInputType
  }


  export type ValorProdutoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    espOdont: boolean
    valorEmCents: number
    dtFim: Date | null
    produtoUid: string
    _count: ValorProdutoCountAggregateOutputType | null
    _avg: ValorProdutoAvgAggregateOutputType | null
    _sum: ValorProdutoSumAggregateOutputType | null
    _min: ValorProdutoMinAggregateOutputType | null
    _max: ValorProdutoMaxAggregateOutputType | null
  }

  type GetValorProdutoGroupByPayload<T extends ValorProdutoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ValorProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ValorProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ValorProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], ValorProdutoGroupByOutputType[P]>
        }
      >
    >


  export type ValorProdutoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    espOdont?: boolean
    valorEmCents?: boolean
    dtFim?: boolean
    produtoUid?: boolean
    produto?: boolean | ProdutoArgs
  }

  export type ValorProdutoInclude = {
    produto?: boolean | ProdutoArgs
  }

  export type ValorProdutoGetPayload<
    S extends boolean | null | undefined | ValorProdutoArgs,
    U = keyof S
      > = S extends true
        ? ValorProduto
    : S extends undefined
    ? never
    : S extends ValorProdutoArgs | ValorProdutoFindManyArgs
    ?'include' extends U
    ? ValorProduto  & {
    [P in TrueKeys<S['include']>]:
        P extends 'produto' ? ProdutoGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'produto' ? ProdutoGetPayload<S['select'][P]> :  P extends keyof ValorProduto ? ValorProduto[P] : never
  } 
    : ValorProduto
  : ValorProduto


  type ValorProdutoCountArgs = Merge<
    Omit<ValorProdutoFindManyArgs, 'select' | 'include'> & {
      select?: ValorProdutoCountAggregateInputType | true
    }
  >

  export interface ValorProdutoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ValorProduto that matches the filter.
     * @param {ValorProdutoFindUniqueArgs} args - Arguments to find a ValorProduto
     * @example
     * // Get one ValorProduto
     * const valorProduto = await prisma.valorProduto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ValorProdutoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ValorProdutoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ValorProduto'> extends True ? CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto>, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T>>> : CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto | null >, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T> | null >>

    /**
     * Find the first ValorProduto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValorProdutoFindFirstArgs} args - Arguments to find a ValorProduto
     * @example
     * // Get one ValorProduto
     * const valorProduto = await prisma.valorProduto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ValorProdutoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ValorProdutoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ValorProduto'> extends True ? CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto>, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T>>> : CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto | null >, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T> | null >>

    /**
     * Find zero or more ValorProdutos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValorProdutoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ValorProdutos
     * const valorProdutos = await prisma.valorProduto.findMany()
     * 
     * // Get first 10 ValorProdutos
     * const valorProdutos = await prisma.valorProduto.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const valorProdutoWithUidOnly = await prisma.valorProduto.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends ValorProdutoFindManyArgs>(
      args?: SelectSubset<T, ValorProdutoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ValorProduto>>, PrismaPromise<Array<ValorProdutoGetPayload<T>>>>

    /**
     * Create a ValorProduto.
     * @param {ValorProdutoCreateArgs} args - Arguments to create a ValorProduto.
     * @example
     * // Create one ValorProduto
     * const ValorProduto = await prisma.valorProduto.create({
     *   data: {
     *     // ... data to create a ValorProduto
     *   }
     * })
     * 
    **/
    create<T extends ValorProdutoCreateArgs>(
      args: SelectSubset<T, ValorProdutoCreateArgs>
    ): CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto>, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T>>>

    /**
     * Create many ValorProdutos.
     *     @param {ValorProdutoCreateManyArgs} args - Arguments to create many ValorProdutos.
     *     @example
     *     // Create many ValorProdutos
     *     const valorProduto = await prisma.valorProduto.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ValorProdutoCreateManyArgs>(
      args?: SelectSubset<T, ValorProdutoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ValorProduto.
     * @param {ValorProdutoDeleteArgs} args - Arguments to delete one ValorProduto.
     * @example
     * // Delete one ValorProduto
     * const ValorProduto = await prisma.valorProduto.delete({
     *   where: {
     *     // ... filter to delete one ValorProduto
     *   }
     * })
     * 
    **/
    delete<T extends ValorProdutoDeleteArgs>(
      args: SelectSubset<T, ValorProdutoDeleteArgs>
    ): CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto>, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T>>>

    /**
     * Update one ValorProduto.
     * @param {ValorProdutoUpdateArgs} args - Arguments to update one ValorProduto.
     * @example
     * // Update one ValorProduto
     * const valorProduto = await prisma.valorProduto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ValorProdutoUpdateArgs>(
      args: SelectSubset<T, ValorProdutoUpdateArgs>
    ): CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto>, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T>>>

    /**
     * Delete zero or more ValorProdutos.
     * @param {ValorProdutoDeleteManyArgs} args - Arguments to filter ValorProdutos to delete.
     * @example
     * // Delete a few ValorProdutos
     * const { count } = await prisma.valorProduto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ValorProdutoDeleteManyArgs>(
      args?: SelectSubset<T, ValorProdutoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ValorProdutos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValorProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ValorProdutos
     * const valorProduto = await prisma.valorProduto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ValorProdutoUpdateManyArgs>(
      args: SelectSubset<T, ValorProdutoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ValorProduto.
     * @param {ValorProdutoUpsertArgs} args - Arguments to update or create a ValorProduto.
     * @example
     * // Update or create a ValorProduto
     * const valorProduto = await prisma.valorProduto.upsert({
     *   create: {
     *     // ... data to create a ValorProduto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ValorProduto we want to update
     *   }
     * })
    **/
    upsert<T extends ValorProdutoUpsertArgs>(
      args: SelectSubset<T, ValorProdutoUpsertArgs>
    ): CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto>, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T>>>

    /**
     * Find one ValorProduto that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ValorProdutoFindUniqueOrThrowArgs} args - Arguments to find a ValorProduto
     * @example
     * // Get one ValorProduto
     * const valorProduto = await prisma.valorProduto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ValorProdutoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ValorProdutoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto>, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T>>>

    /**
     * Find the first ValorProduto that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValorProdutoFindFirstOrThrowArgs} args - Arguments to find a ValorProduto
     * @example
     * // Get one ValorProduto
     * const valorProduto = await prisma.valorProduto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ValorProdutoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ValorProdutoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ValorProdutoClient<ValorProduto>, Prisma__ValorProdutoClient<ValorProdutoGetPayload<T>>>

    /**
     * Count the number of ValorProdutos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValorProdutoCountArgs} args - Arguments to filter ValorProdutos to count.
     * @example
     * // Count the number of ValorProdutos
     * const count = await prisma.valorProduto.count({
     *   where: {
     *     // ... the filter for the ValorProdutos we want to count
     *   }
     * })
    **/
    count<T extends ValorProdutoCountArgs>(
      args?: Subset<T, ValorProdutoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ValorProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ValorProduto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValorProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ValorProdutoAggregateArgs>(args: Subset<T, ValorProdutoAggregateArgs>): PrismaPromise<GetValorProdutoAggregateType<T>>

    /**
     * Group by ValorProduto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValorProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ValorProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ValorProdutoGroupByArgs['orderBy'] }
        : { orderBy?: ValorProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ValorProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetValorProdutoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ValorProduto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ValorProdutoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    produto<T extends ProdutoArgs = {}>(args?: Subset<T, ProdutoArgs>): CheckSelect<T, Prisma__ProdutoClient<Produto | null >, Prisma__ProdutoClient<ProdutoGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ValorProduto base type for findUnique actions
   */
  export type ValorProdutoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ValorProduto
     * 
    **/
    select?: ValorProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ValorProdutoInclude | null
    /**
     * Filter, which ValorProduto to fetch.
     * 
    **/
    where: ValorProdutoWhereUniqueInput
  }

  /**
   * ValorProduto: findUnique
   */
  export interface ValorProdutoFindUniqueArgs extends ValorProdutoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ValorProduto base type for findFirst actions
   */
  export type ValorProdutoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ValorProduto
     * 
    **/
    select?: ValorProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ValorProdutoInclude | null
    /**
     * Filter, which ValorProduto to fetch.
     * 
    **/
    where?: ValorProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValorProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<ValorProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ValorProdutos.
     * 
    **/
    cursor?: ValorProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValorProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValorProdutos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ValorProdutos.
     * 
    **/
    distinct?: Enumerable<ValorProdutoScalarFieldEnum>
  }

  /**
   * ValorProduto: findFirst
   */
  export interface ValorProdutoFindFirstArgs extends ValorProdutoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ValorProduto findMany
   */
  export type ValorProdutoFindManyArgs = {
    /**
     * Select specific fields to fetch from the ValorProduto
     * 
    **/
    select?: ValorProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ValorProdutoInclude | null
    /**
     * Filter, which ValorProdutos to fetch.
     * 
    **/
    where?: ValorProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValorProdutos to fetch.
     * 
    **/
    orderBy?: Enumerable<ValorProdutoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ValorProdutos.
     * 
    **/
    cursor?: ValorProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValorProdutos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValorProdutos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ValorProdutoScalarFieldEnum>
  }


  /**
   * ValorProduto create
   */
  export type ValorProdutoCreateArgs = {
    /**
     * Select specific fields to fetch from the ValorProduto
     * 
    **/
    select?: ValorProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ValorProdutoInclude | null
    /**
     * The data needed to create a ValorProduto.
     * 
    **/
    data: XOR<ValorProdutoCreateInput, ValorProdutoUncheckedCreateInput>
  }


  /**
   * ValorProduto createMany
   */
  export type ValorProdutoCreateManyArgs = {
    /**
     * The data used to create many ValorProdutos.
     * 
    **/
    data: Enumerable<ValorProdutoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ValorProduto update
   */
  export type ValorProdutoUpdateArgs = {
    /**
     * Select specific fields to fetch from the ValorProduto
     * 
    **/
    select?: ValorProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ValorProdutoInclude | null
    /**
     * The data needed to update a ValorProduto.
     * 
    **/
    data: XOR<ValorProdutoUpdateInput, ValorProdutoUncheckedUpdateInput>
    /**
     * Choose, which ValorProduto to update.
     * 
    **/
    where: ValorProdutoWhereUniqueInput
  }


  /**
   * ValorProduto updateMany
   */
  export type ValorProdutoUpdateManyArgs = {
    /**
     * The data used to update ValorProdutos.
     * 
    **/
    data: XOR<ValorProdutoUpdateManyMutationInput, ValorProdutoUncheckedUpdateManyInput>
    /**
     * Filter which ValorProdutos to update
     * 
    **/
    where?: ValorProdutoWhereInput
  }


  /**
   * ValorProduto upsert
   */
  export type ValorProdutoUpsertArgs = {
    /**
     * Select specific fields to fetch from the ValorProduto
     * 
    **/
    select?: ValorProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ValorProdutoInclude | null
    /**
     * The filter to search for the ValorProduto to update in case it exists.
     * 
    **/
    where: ValorProdutoWhereUniqueInput
    /**
     * In case the ValorProduto found by the `where` argument doesn't exist, create a new ValorProduto with this data.
     * 
    **/
    create: XOR<ValorProdutoCreateInput, ValorProdutoUncheckedCreateInput>
    /**
     * In case the ValorProduto was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ValorProdutoUpdateInput, ValorProdutoUncheckedUpdateInput>
  }


  /**
   * ValorProduto delete
   */
  export type ValorProdutoDeleteArgs = {
    /**
     * Select specific fields to fetch from the ValorProduto
     * 
    **/
    select?: ValorProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ValorProdutoInclude | null
    /**
     * Filter which ValorProduto to delete.
     * 
    **/
    where: ValorProdutoWhereUniqueInput
  }


  /**
   * ValorProduto deleteMany
   */
  export type ValorProdutoDeleteManyArgs = {
    /**
     * Filter which ValorProdutos to delete
     * 
    **/
    where?: ValorProdutoWhereInput
  }


  /**
   * ValorProduto: findUniqueOrThrow
   */
  export type ValorProdutoFindUniqueOrThrowArgs = ValorProdutoFindUniqueArgsBase
      

  /**
   * ValorProduto: findFirstOrThrow
   */
  export type ValorProdutoFindFirstOrThrowArgs = ValorProdutoFindFirstArgsBase
      

  /**
   * ValorProduto without action
   */
  export type ValorProdutoArgs = {
    /**
     * Select specific fields to fetch from the ValorProduto
     * 
    **/
    select?: ValorProdutoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ValorProdutoInclude | null
  }



  /**
   * Model Servico
   */


  export type AggregateServico = {
    _count: ServicoCountAggregateOutputType | null
    _min: ServicoMinAggregateOutputType | null
    _max: ServicoMaxAggregateOutputType | null
  }

  export type ServicoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    dentistaUid: string | null
    descricao: string | null
    observacoes: string | null
    espOdont: boolean | null
  }

  export type ServicoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    dentistaUid: string | null
    descricao: string | null
    observacoes: string | null
    espOdont: boolean | null
  }

  export type ServicoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    dentistaUid: number
    descricao: number
    observacoes: number
    espOdont: number
    _all: number
  }


  export type ServicoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    dentistaUid?: true
    descricao?: true
    observacoes?: true
    espOdont?: true
  }

  export type ServicoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    dentistaUid?: true
    descricao?: true
    observacoes?: true
    espOdont?: true
  }

  export type ServicoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    dentistaUid?: true
    descricao?: true
    observacoes?: true
    espOdont?: true
    _all?: true
  }

  export type ServicoAggregateArgs = {
    /**
     * Filter which Servico to aggregate.
     * 
    **/
    where?: ServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicos to fetch.
     * 
    **/
    orderBy?: Enumerable<ServicoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Servicos
    **/
    _count?: true | ServicoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServicoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServicoMaxAggregateInputType
  }

  export type GetServicoAggregateType<T extends ServicoAggregateArgs> = {
        [P in keyof T & keyof AggregateServico]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServico[P]>
      : GetScalarType<T[P], AggregateServico[P]>
  }




  export type ServicoGroupByArgs = {
    where?: ServicoWhereInput
    orderBy?: Enumerable<ServicoOrderByWithAggregationInput>
    by: Array<ServicoScalarFieldEnum>
    having?: ServicoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServicoCountAggregateInputType | true
    _min?: ServicoMinAggregateInputType
    _max?: ServicoMaxAggregateInputType
  }


  export type ServicoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    dentistaUid: string
    descricao: string | null
    observacoes: string | null
    espOdont: boolean
    _count: ServicoCountAggregateOutputType | null
    _min: ServicoMinAggregateOutputType | null
    _max: ServicoMaxAggregateOutputType | null
  }

  type GetServicoGroupByPayload<T extends ServicoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ServicoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServicoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServicoGroupByOutputType[P]>
            : GetScalarType<T[P], ServicoGroupByOutputType[P]>
        }
      >
    >


  export type ServicoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    dentistaUid?: boolean
    descricao?: boolean
    observacoes?: boolean
    espOdont?: boolean
    itens?: boolean | ProdutoServicoFindManyArgs
    lancamentos?: boolean | LancamentoFinanceiroFindManyArgs
    pacientes?: boolean | ContatoFindManyArgs
    dentista?: boolean | ContatoArgs
    _count?: boolean | ServicoCountOutputTypeArgs
  }

  export type ServicoInclude = {
    itens?: boolean | ProdutoServicoFindManyArgs
    lancamentos?: boolean | LancamentoFinanceiroFindManyArgs
    pacientes?: boolean | ContatoFindManyArgs
    dentista?: boolean | ContatoArgs
    _count?: boolean | ServicoCountOutputTypeArgs
  }

  export type ServicoGetPayload<
    S extends boolean | null | undefined | ServicoArgs,
    U = keyof S
      > = S extends true
        ? Servico
    : S extends undefined
    ? never
    : S extends ServicoArgs | ServicoFindManyArgs
    ?'include' extends U
    ? Servico  & {
    [P in TrueKeys<S['include']>]:
        P extends 'itens' ? Array < ProdutoServicoGetPayload<S['include'][P]>>  :
        P extends 'lancamentos' ? Array < LancamentoFinanceiroGetPayload<S['include'][P]>>  :
        P extends 'pacientes' ? Array < ContatoGetPayload<S['include'][P]>>  :
        P extends 'dentista' ? ContatoGetPayload<S['include'][P]> :
        P extends '_count' ? ServicoCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'itens' ? Array < ProdutoServicoGetPayload<S['select'][P]>>  :
        P extends 'lancamentos' ? Array < LancamentoFinanceiroGetPayload<S['select'][P]>>  :
        P extends 'pacientes' ? Array < ContatoGetPayload<S['select'][P]>>  :
        P extends 'dentista' ? ContatoGetPayload<S['select'][P]> :
        P extends '_count' ? ServicoCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Servico ? Servico[P] : never
  } 
    : Servico
  : Servico


  type ServicoCountArgs = Merge<
    Omit<ServicoFindManyArgs, 'select' | 'include'> & {
      select?: ServicoCountAggregateInputType | true
    }
  >

  export interface ServicoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Servico that matches the filter.
     * @param {ServicoFindUniqueArgs} args - Arguments to find a Servico
     * @example
     * // Get one Servico
     * const servico = await prisma.servico.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServicoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ServicoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Servico'> extends True ? CheckSelect<T, Prisma__ServicoClient<Servico>, Prisma__ServicoClient<ServicoGetPayload<T>>> : CheckSelect<T, Prisma__ServicoClient<Servico | null >, Prisma__ServicoClient<ServicoGetPayload<T> | null >>

    /**
     * Find the first Servico that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoFindFirstArgs} args - Arguments to find a Servico
     * @example
     * // Get one Servico
     * const servico = await prisma.servico.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServicoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ServicoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Servico'> extends True ? CheckSelect<T, Prisma__ServicoClient<Servico>, Prisma__ServicoClient<ServicoGetPayload<T>>> : CheckSelect<T, Prisma__ServicoClient<Servico | null >, Prisma__ServicoClient<ServicoGetPayload<T> | null >>

    /**
     * Find zero or more Servicos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servicos
     * const servicos = await prisma.servico.findMany()
     * 
     * // Get first 10 Servicos
     * const servicos = await prisma.servico.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const servicoWithUidOnly = await prisma.servico.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends ServicoFindManyArgs>(
      args?: SelectSubset<T, ServicoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Servico>>, PrismaPromise<Array<ServicoGetPayload<T>>>>

    /**
     * Create a Servico.
     * @param {ServicoCreateArgs} args - Arguments to create a Servico.
     * @example
     * // Create one Servico
     * const Servico = await prisma.servico.create({
     *   data: {
     *     // ... data to create a Servico
     *   }
     * })
     * 
    **/
    create<T extends ServicoCreateArgs>(
      args: SelectSubset<T, ServicoCreateArgs>
    ): CheckSelect<T, Prisma__ServicoClient<Servico>, Prisma__ServicoClient<ServicoGetPayload<T>>>

    /**
     * Create many Servicos.
     *     @param {ServicoCreateManyArgs} args - Arguments to create many Servicos.
     *     @example
     *     // Create many Servicos
     *     const servico = await prisma.servico.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ServicoCreateManyArgs>(
      args?: SelectSubset<T, ServicoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Servico.
     * @param {ServicoDeleteArgs} args - Arguments to delete one Servico.
     * @example
     * // Delete one Servico
     * const Servico = await prisma.servico.delete({
     *   where: {
     *     // ... filter to delete one Servico
     *   }
     * })
     * 
    **/
    delete<T extends ServicoDeleteArgs>(
      args: SelectSubset<T, ServicoDeleteArgs>
    ): CheckSelect<T, Prisma__ServicoClient<Servico>, Prisma__ServicoClient<ServicoGetPayload<T>>>

    /**
     * Update one Servico.
     * @param {ServicoUpdateArgs} args - Arguments to update one Servico.
     * @example
     * // Update one Servico
     * const servico = await prisma.servico.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServicoUpdateArgs>(
      args: SelectSubset<T, ServicoUpdateArgs>
    ): CheckSelect<T, Prisma__ServicoClient<Servico>, Prisma__ServicoClient<ServicoGetPayload<T>>>

    /**
     * Delete zero or more Servicos.
     * @param {ServicoDeleteManyArgs} args - Arguments to filter Servicos to delete.
     * @example
     * // Delete a few Servicos
     * const { count } = await prisma.servico.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServicoDeleteManyArgs>(
      args?: SelectSubset<T, ServicoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servicos
     * const servico = await prisma.servico.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServicoUpdateManyArgs>(
      args: SelectSubset<T, ServicoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Servico.
     * @param {ServicoUpsertArgs} args - Arguments to update or create a Servico.
     * @example
     * // Update or create a Servico
     * const servico = await prisma.servico.upsert({
     *   create: {
     *     // ... data to create a Servico
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Servico we want to update
     *   }
     * })
    **/
    upsert<T extends ServicoUpsertArgs>(
      args: SelectSubset<T, ServicoUpsertArgs>
    ): CheckSelect<T, Prisma__ServicoClient<Servico>, Prisma__ServicoClient<ServicoGetPayload<T>>>

    /**
     * Find one Servico that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ServicoFindUniqueOrThrowArgs} args - Arguments to find a Servico
     * @example
     * // Get one Servico
     * const servico = await prisma.servico.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ServicoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ServicoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ServicoClient<Servico>, Prisma__ServicoClient<ServicoGetPayload<T>>>

    /**
     * Find the first Servico that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoFindFirstOrThrowArgs} args - Arguments to find a Servico
     * @example
     * // Get one Servico
     * const servico = await prisma.servico.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ServicoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ServicoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ServicoClient<Servico>, Prisma__ServicoClient<ServicoGetPayload<T>>>

    /**
     * Count the number of Servicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoCountArgs} args - Arguments to filter Servicos to count.
     * @example
     * // Count the number of Servicos
     * const count = await prisma.servico.count({
     *   where: {
     *     // ... the filter for the Servicos we want to count
     *   }
     * })
    **/
    count<T extends ServicoCountArgs>(
      args?: Subset<T, ServicoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServicoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Servico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServicoAggregateArgs>(args: Subset<T, ServicoAggregateArgs>): PrismaPromise<GetServicoAggregateType<T>>

    /**
     * Group by Servico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServicoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServicoGroupByArgs['orderBy'] }
        : { orderBy?: ServicoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServicoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServicoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Servico.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ServicoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    itens<T extends ProdutoServicoFindManyArgs = {}>(args?: Subset<T, ProdutoServicoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProdutoServico>>, PrismaPromise<Array<ProdutoServicoGetPayload<T>>>>;

    lancamentos<T extends LancamentoFinanceiroFindManyArgs = {}>(args?: Subset<T, LancamentoFinanceiroFindManyArgs>): CheckSelect<T, PrismaPromise<Array<LancamentoFinanceiro>>, PrismaPromise<Array<LancamentoFinanceiroGetPayload<T>>>>;

    pacientes<T extends ContatoFindManyArgs = {}>(args?: Subset<T, ContatoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Contato>>, PrismaPromise<Array<ContatoGetPayload<T>>>>;

    dentista<T extends ContatoArgs = {}>(args?: Subset<T, ContatoArgs>): CheckSelect<T, Prisma__ContatoClient<Contato | null >, Prisma__ContatoClient<ContatoGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Servico base type for findUnique actions
   */
  export type ServicoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Servico
     * 
    **/
    select?: ServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServicoInclude | null
    /**
     * Filter, which Servico to fetch.
     * 
    **/
    where: ServicoWhereUniqueInput
  }

  /**
   * Servico: findUnique
   */
  export interface ServicoFindUniqueArgs extends ServicoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Servico base type for findFirst actions
   */
  export type ServicoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Servico
     * 
    **/
    select?: ServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServicoInclude | null
    /**
     * Filter, which Servico to fetch.
     * 
    **/
    where?: ServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicos to fetch.
     * 
    **/
    orderBy?: Enumerable<ServicoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servicos.
     * 
    **/
    cursor?: ServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servicos.
     * 
    **/
    distinct?: Enumerable<ServicoScalarFieldEnum>
  }

  /**
   * Servico: findFirst
   */
  export interface ServicoFindFirstArgs extends ServicoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Servico findMany
   */
  export type ServicoFindManyArgs = {
    /**
     * Select specific fields to fetch from the Servico
     * 
    **/
    select?: ServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServicoInclude | null
    /**
     * Filter, which Servicos to fetch.
     * 
    **/
    where?: ServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servicos to fetch.
     * 
    **/
    orderBy?: Enumerable<ServicoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Servicos.
     * 
    **/
    cursor?: ServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servicos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servicos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ServicoScalarFieldEnum>
  }


  /**
   * Servico create
   */
  export type ServicoCreateArgs = {
    /**
     * Select specific fields to fetch from the Servico
     * 
    **/
    select?: ServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServicoInclude | null
    /**
     * The data needed to create a Servico.
     * 
    **/
    data: XOR<ServicoCreateInput, ServicoUncheckedCreateInput>
  }


  /**
   * Servico createMany
   */
  export type ServicoCreateManyArgs = {
    /**
     * The data used to create many Servicos.
     * 
    **/
    data: Enumerable<ServicoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Servico update
   */
  export type ServicoUpdateArgs = {
    /**
     * Select specific fields to fetch from the Servico
     * 
    **/
    select?: ServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServicoInclude | null
    /**
     * The data needed to update a Servico.
     * 
    **/
    data: XOR<ServicoUpdateInput, ServicoUncheckedUpdateInput>
    /**
     * Choose, which Servico to update.
     * 
    **/
    where: ServicoWhereUniqueInput
  }


  /**
   * Servico updateMany
   */
  export type ServicoUpdateManyArgs = {
    /**
     * The data used to update Servicos.
     * 
    **/
    data: XOR<ServicoUpdateManyMutationInput, ServicoUncheckedUpdateManyInput>
    /**
     * Filter which Servicos to update
     * 
    **/
    where?: ServicoWhereInput
  }


  /**
   * Servico upsert
   */
  export type ServicoUpsertArgs = {
    /**
     * Select specific fields to fetch from the Servico
     * 
    **/
    select?: ServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServicoInclude | null
    /**
     * The filter to search for the Servico to update in case it exists.
     * 
    **/
    where: ServicoWhereUniqueInput
    /**
     * In case the Servico found by the `where` argument doesn't exist, create a new Servico with this data.
     * 
    **/
    create: XOR<ServicoCreateInput, ServicoUncheckedCreateInput>
    /**
     * In case the Servico was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ServicoUpdateInput, ServicoUncheckedUpdateInput>
  }


  /**
   * Servico delete
   */
  export type ServicoDeleteArgs = {
    /**
     * Select specific fields to fetch from the Servico
     * 
    **/
    select?: ServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServicoInclude | null
    /**
     * Filter which Servico to delete.
     * 
    **/
    where: ServicoWhereUniqueInput
  }


  /**
   * Servico deleteMany
   */
  export type ServicoDeleteManyArgs = {
    /**
     * Filter which Servicos to delete
     * 
    **/
    where?: ServicoWhereInput
  }


  /**
   * Servico: findUniqueOrThrow
   */
  export type ServicoFindUniqueOrThrowArgs = ServicoFindUniqueArgsBase
      

  /**
   * Servico: findFirstOrThrow
   */
  export type ServicoFindFirstOrThrowArgs = ServicoFindFirstArgsBase
      

  /**
   * Servico without action
   */
  export type ServicoArgs = {
    /**
     * Select specific fields to fetch from the Servico
     * 
    **/
    select?: ServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServicoInclude | null
  }



  /**
   * Model ProdutoServico
   */


  export type AggregateProdutoServico = {
    _count: ProdutoServicoCountAggregateOutputType | null
    _avg: ProdutoServicoAvgAggregateOutputType | null
    _sum: ProdutoServicoSumAggregateOutputType | null
    _min: ProdutoServicoMinAggregateOutputType | null
    _max: ProdutoServicoMaxAggregateOutputType | null
  }

  export type ProdutoServicoAvgAggregateOutputType = {
    quantidade: number | null
    descontoEmCents: number | null
  }

  export type ProdutoServicoSumAggregateOutputType = {
    quantidade: number | null
    descontoEmCents: number | null
  }

  export type ProdutoServicoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    produtoUid: string | null
    servicoUid: string | null
    quantidade: number | null
    descontoEmCents: number | null
    descricao: string | null
    observacoes: string | null
    etapa: string | null
  }

  export type ProdutoServicoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    produtoUid: string | null
    servicoUid: string | null
    quantidade: number | null
    descontoEmCents: number | null
    descricao: string | null
    observacoes: string | null
    etapa: string | null
  }

  export type ProdutoServicoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    produtoUid: number
    servicoUid: number
    quantidade: number
    descontoEmCents: number
    descricao: number
    observacoes: number
    etapa: number
    _all: number
  }


  export type ProdutoServicoAvgAggregateInputType = {
    quantidade?: true
    descontoEmCents?: true
  }

  export type ProdutoServicoSumAggregateInputType = {
    quantidade?: true
    descontoEmCents?: true
  }

  export type ProdutoServicoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    produtoUid?: true
    servicoUid?: true
    quantidade?: true
    descontoEmCents?: true
    descricao?: true
    observacoes?: true
    etapa?: true
  }

  export type ProdutoServicoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    produtoUid?: true
    servicoUid?: true
    quantidade?: true
    descontoEmCents?: true
    descricao?: true
    observacoes?: true
    etapa?: true
  }

  export type ProdutoServicoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    produtoUid?: true
    servicoUid?: true
    quantidade?: true
    descontoEmCents?: true
    descricao?: true
    observacoes?: true
    etapa?: true
    _all?: true
  }

  export type ProdutoServicoAggregateArgs = {
    /**
     * Filter which ProdutoServico to aggregate.
     * 
    **/
    where?: ProdutoServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProdutoServicos to fetch.
     * 
    **/
    orderBy?: Enumerable<ProdutoServicoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProdutoServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProdutoServicos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProdutoServicos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProdutoServicos
    **/
    _count?: true | ProdutoServicoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutoServicoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutoServicoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutoServicoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutoServicoMaxAggregateInputType
  }

  export type GetProdutoServicoAggregateType<T extends ProdutoServicoAggregateArgs> = {
        [P in keyof T & keyof AggregateProdutoServico]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProdutoServico[P]>
      : GetScalarType<T[P], AggregateProdutoServico[P]>
  }




  export type ProdutoServicoGroupByArgs = {
    where?: ProdutoServicoWhereInput
    orderBy?: Enumerable<ProdutoServicoOrderByWithAggregationInput>
    by: Array<ProdutoServicoScalarFieldEnum>
    having?: ProdutoServicoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutoServicoCountAggregateInputType | true
    _avg?: ProdutoServicoAvgAggregateInputType
    _sum?: ProdutoServicoSumAggregateInputType
    _min?: ProdutoServicoMinAggregateInputType
    _max?: ProdutoServicoMaxAggregateInputType
  }


  export type ProdutoServicoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    produtoUid: string
    servicoUid: string
    quantidade: number
    descontoEmCents: number | null
    descricao: string | null
    observacoes: string | null
    etapa: string
    _count: ProdutoServicoCountAggregateOutputType | null
    _avg: ProdutoServicoAvgAggregateOutputType | null
    _sum: ProdutoServicoSumAggregateOutputType | null
    _min: ProdutoServicoMinAggregateOutputType | null
    _max: ProdutoServicoMaxAggregateOutputType | null
  }

  type GetProdutoServicoGroupByPayload<T extends ProdutoServicoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProdutoServicoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutoServicoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutoServicoGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutoServicoGroupByOutputType[P]>
        }
      >
    >


  export type ProdutoServicoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    produtoUid?: boolean
    servicoUid?: boolean
    quantidade?: boolean
    descontoEmCents?: boolean
    descricao?: boolean
    observacoes?: boolean
    etapa?: boolean
    produto?: boolean | ProdutoArgs
    servico?: boolean | ServicoArgs
    etapaFabricacao?: boolean | EtapaFabricacaoArgs
  }

  export type ProdutoServicoInclude = {
    produto?: boolean | ProdutoArgs
    servico?: boolean | ServicoArgs
    etapaFabricacao?: boolean | EtapaFabricacaoArgs
  }

  export type ProdutoServicoGetPayload<
    S extends boolean | null | undefined | ProdutoServicoArgs,
    U = keyof S
      > = S extends true
        ? ProdutoServico
    : S extends undefined
    ? never
    : S extends ProdutoServicoArgs | ProdutoServicoFindManyArgs
    ?'include' extends U
    ? ProdutoServico  & {
    [P in TrueKeys<S['include']>]:
        P extends 'produto' ? ProdutoGetPayload<S['include'][P]> :
        P extends 'servico' ? ServicoGetPayload<S['include'][P]> :
        P extends 'etapaFabricacao' ? EtapaFabricacaoGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'produto' ? ProdutoGetPayload<S['select'][P]> :
        P extends 'servico' ? ServicoGetPayload<S['select'][P]> :
        P extends 'etapaFabricacao' ? EtapaFabricacaoGetPayload<S['select'][P]> :  P extends keyof ProdutoServico ? ProdutoServico[P] : never
  } 
    : ProdutoServico
  : ProdutoServico


  type ProdutoServicoCountArgs = Merge<
    Omit<ProdutoServicoFindManyArgs, 'select' | 'include'> & {
      select?: ProdutoServicoCountAggregateInputType | true
    }
  >

  export interface ProdutoServicoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ProdutoServico that matches the filter.
     * @param {ProdutoServicoFindUniqueArgs} args - Arguments to find a ProdutoServico
     * @example
     * // Get one ProdutoServico
     * const produtoServico = await prisma.produtoServico.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProdutoServicoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProdutoServicoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ProdutoServico'> extends True ? CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico>, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T>>> : CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico | null >, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T> | null >>

    /**
     * Find the first ProdutoServico that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoServicoFindFirstArgs} args - Arguments to find a ProdutoServico
     * @example
     * // Get one ProdutoServico
     * const produtoServico = await prisma.produtoServico.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProdutoServicoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProdutoServicoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ProdutoServico'> extends True ? CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico>, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T>>> : CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico | null >, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T> | null >>

    /**
     * Find zero or more ProdutoServicos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoServicoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProdutoServicos
     * const produtoServicos = await prisma.produtoServico.findMany()
     * 
     * // Get first 10 ProdutoServicos
     * const produtoServicos = await prisma.produtoServico.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const produtoServicoWithUidOnly = await prisma.produtoServico.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends ProdutoServicoFindManyArgs>(
      args?: SelectSubset<T, ProdutoServicoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ProdutoServico>>, PrismaPromise<Array<ProdutoServicoGetPayload<T>>>>

    /**
     * Create a ProdutoServico.
     * @param {ProdutoServicoCreateArgs} args - Arguments to create a ProdutoServico.
     * @example
     * // Create one ProdutoServico
     * const ProdutoServico = await prisma.produtoServico.create({
     *   data: {
     *     // ... data to create a ProdutoServico
     *   }
     * })
     * 
    **/
    create<T extends ProdutoServicoCreateArgs>(
      args: SelectSubset<T, ProdutoServicoCreateArgs>
    ): CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico>, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T>>>

    /**
     * Create many ProdutoServicos.
     *     @param {ProdutoServicoCreateManyArgs} args - Arguments to create many ProdutoServicos.
     *     @example
     *     // Create many ProdutoServicos
     *     const produtoServico = await prisma.produtoServico.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProdutoServicoCreateManyArgs>(
      args?: SelectSubset<T, ProdutoServicoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ProdutoServico.
     * @param {ProdutoServicoDeleteArgs} args - Arguments to delete one ProdutoServico.
     * @example
     * // Delete one ProdutoServico
     * const ProdutoServico = await prisma.produtoServico.delete({
     *   where: {
     *     // ... filter to delete one ProdutoServico
     *   }
     * })
     * 
    **/
    delete<T extends ProdutoServicoDeleteArgs>(
      args: SelectSubset<T, ProdutoServicoDeleteArgs>
    ): CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico>, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T>>>

    /**
     * Update one ProdutoServico.
     * @param {ProdutoServicoUpdateArgs} args - Arguments to update one ProdutoServico.
     * @example
     * // Update one ProdutoServico
     * const produtoServico = await prisma.produtoServico.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProdutoServicoUpdateArgs>(
      args: SelectSubset<T, ProdutoServicoUpdateArgs>
    ): CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico>, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T>>>

    /**
     * Delete zero or more ProdutoServicos.
     * @param {ProdutoServicoDeleteManyArgs} args - Arguments to filter ProdutoServicos to delete.
     * @example
     * // Delete a few ProdutoServicos
     * const { count } = await prisma.produtoServico.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProdutoServicoDeleteManyArgs>(
      args?: SelectSubset<T, ProdutoServicoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProdutoServicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoServicoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProdutoServicos
     * const produtoServico = await prisma.produtoServico.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProdutoServicoUpdateManyArgs>(
      args: SelectSubset<T, ProdutoServicoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ProdutoServico.
     * @param {ProdutoServicoUpsertArgs} args - Arguments to update or create a ProdutoServico.
     * @example
     * // Update or create a ProdutoServico
     * const produtoServico = await prisma.produtoServico.upsert({
     *   create: {
     *     // ... data to create a ProdutoServico
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProdutoServico we want to update
     *   }
     * })
    **/
    upsert<T extends ProdutoServicoUpsertArgs>(
      args: SelectSubset<T, ProdutoServicoUpsertArgs>
    ): CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico>, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T>>>

    /**
     * Find one ProdutoServico that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ProdutoServicoFindUniqueOrThrowArgs} args - Arguments to find a ProdutoServico
     * @example
     * // Get one ProdutoServico
     * const produtoServico = await prisma.produtoServico.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProdutoServicoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProdutoServicoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico>, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T>>>

    /**
     * Find the first ProdutoServico that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoServicoFindFirstOrThrowArgs} args - Arguments to find a ProdutoServico
     * @example
     * // Get one ProdutoServico
     * const produtoServico = await prisma.produtoServico.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProdutoServicoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProdutoServicoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ProdutoServicoClient<ProdutoServico>, Prisma__ProdutoServicoClient<ProdutoServicoGetPayload<T>>>

    /**
     * Count the number of ProdutoServicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoServicoCountArgs} args - Arguments to filter ProdutoServicos to count.
     * @example
     * // Count the number of ProdutoServicos
     * const count = await prisma.produtoServico.count({
     *   where: {
     *     // ... the filter for the ProdutoServicos we want to count
     *   }
     * })
    **/
    count<T extends ProdutoServicoCountArgs>(
      args?: Subset<T, ProdutoServicoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutoServicoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProdutoServico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoServicoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutoServicoAggregateArgs>(args: Subset<T, ProdutoServicoAggregateArgs>): PrismaPromise<GetProdutoServicoAggregateType<T>>

    /**
     * Group by ProdutoServico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoServicoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProdutoServicoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutoServicoGroupByArgs['orderBy'] }
        : { orderBy?: ProdutoServicoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProdutoServicoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutoServicoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProdutoServico.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProdutoServicoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    produto<T extends ProdutoArgs = {}>(args?: Subset<T, ProdutoArgs>): CheckSelect<T, Prisma__ProdutoClient<Produto | null >, Prisma__ProdutoClient<ProdutoGetPayload<T> | null >>;

    servico<T extends ServicoArgs = {}>(args?: Subset<T, ServicoArgs>): CheckSelect<T, Prisma__ServicoClient<Servico | null >, Prisma__ServicoClient<ServicoGetPayload<T> | null >>;

    etapaFabricacao<T extends EtapaFabricacaoArgs = {}>(args?: Subset<T, EtapaFabricacaoArgs>): CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao | null >, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ProdutoServico base type for findUnique actions
   */
  export type ProdutoServicoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ProdutoServico
     * 
    **/
    select?: ProdutoServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoServicoInclude | null
    /**
     * Filter, which ProdutoServico to fetch.
     * 
    **/
    where: ProdutoServicoWhereUniqueInput
  }

  /**
   * ProdutoServico: findUnique
   */
  export interface ProdutoServicoFindUniqueArgs extends ProdutoServicoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ProdutoServico base type for findFirst actions
   */
  export type ProdutoServicoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ProdutoServico
     * 
    **/
    select?: ProdutoServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoServicoInclude | null
    /**
     * Filter, which ProdutoServico to fetch.
     * 
    **/
    where?: ProdutoServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProdutoServicos to fetch.
     * 
    **/
    orderBy?: Enumerable<ProdutoServicoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProdutoServicos.
     * 
    **/
    cursor?: ProdutoServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProdutoServicos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProdutoServicos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProdutoServicos.
     * 
    **/
    distinct?: Enumerable<ProdutoServicoScalarFieldEnum>
  }

  /**
   * ProdutoServico: findFirst
   */
  export interface ProdutoServicoFindFirstArgs extends ProdutoServicoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ProdutoServico findMany
   */
  export type ProdutoServicoFindManyArgs = {
    /**
     * Select specific fields to fetch from the ProdutoServico
     * 
    **/
    select?: ProdutoServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoServicoInclude | null
    /**
     * Filter, which ProdutoServicos to fetch.
     * 
    **/
    where?: ProdutoServicoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProdutoServicos to fetch.
     * 
    **/
    orderBy?: Enumerable<ProdutoServicoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProdutoServicos.
     * 
    **/
    cursor?: ProdutoServicoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProdutoServicos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProdutoServicos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProdutoServicoScalarFieldEnum>
  }


  /**
   * ProdutoServico create
   */
  export type ProdutoServicoCreateArgs = {
    /**
     * Select specific fields to fetch from the ProdutoServico
     * 
    **/
    select?: ProdutoServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoServicoInclude | null
    /**
     * The data needed to create a ProdutoServico.
     * 
    **/
    data: XOR<ProdutoServicoCreateInput, ProdutoServicoUncheckedCreateInput>
  }


  /**
   * ProdutoServico createMany
   */
  export type ProdutoServicoCreateManyArgs = {
    /**
     * The data used to create many ProdutoServicos.
     * 
    **/
    data: Enumerable<ProdutoServicoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ProdutoServico update
   */
  export type ProdutoServicoUpdateArgs = {
    /**
     * Select specific fields to fetch from the ProdutoServico
     * 
    **/
    select?: ProdutoServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoServicoInclude | null
    /**
     * The data needed to update a ProdutoServico.
     * 
    **/
    data: XOR<ProdutoServicoUpdateInput, ProdutoServicoUncheckedUpdateInput>
    /**
     * Choose, which ProdutoServico to update.
     * 
    **/
    where: ProdutoServicoWhereUniqueInput
  }


  /**
   * ProdutoServico updateMany
   */
  export type ProdutoServicoUpdateManyArgs = {
    /**
     * The data used to update ProdutoServicos.
     * 
    **/
    data: XOR<ProdutoServicoUpdateManyMutationInput, ProdutoServicoUncheckedUpdateManyInput>
    /**
     * Filter which ProdutoServicos to update
     * 
    **/
    where?: ProdutoServicoWhereInput
  }


  /**
   * ProdutoServico upsert
   */
  export type ProdutoServicoUpsertArgs = {
    /**
     * Select specific fields to fetch from the ProdutoServico
     * 
    **/
    select?: ProdutoServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoServicoInclude | null
    /**
     * The filter to search for the ProdutoServico to update in case it exists.
     * 
    **/
    where: ProdutoServicoWhereUniqueInput
    /**
     * In case the ProdutoServico found by the `where` argument doesn't exist, create a new ProdutoServico with this data.
     * 
    **/
    create: XOR<ProdutoServicoCreateInput, ProdutoServicoUncheckedCreateInput>
    /**
     * In case the ProdutoServico was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProdutoServicoUpdateInput, ProdutoServicoUncheckedUpdateInput>
  }


  /**
   * ProdutoServico delete
   */
  export type ProdutoServicoDeleteArgs = {
    /**
     * Select specific fields to fetch from the ProdutoServico
     * 
    **/
    select?: ProdutoServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoServicoInclude | null
    /**
     * Filter which ProdutoServico to delete.
     * 
    **/
    where: ProdutoServicoWhereUniqueInput
  }


  /**
   * ProdutoServico deleteMany
   */
  export type ProdutoServicoDeleteManyArgs = {
    /**
     * Filter which ProdutoServicos to delete
     * 
    **/
    where?: ProdutoServicoWhereInput
  }


  /**
   * ProdutoServico: findUniqueOrThrow
   */
  export type ProdutoServicoFindUniqueOrThrowArgs = ProdutoServicoFindUniqueArgsBase
      

  /**
   * ProdutoServico: findFirstOrThrow
   */
  export type ProdutoServicoFindFirstOrThrowArgs = ProdutoServicoFindFirstArgsBase
      

  /**
   * ProdutoServico without action
   */
  export type ProdutoServicoArgs = {
    /**
     * Select specific fields to fetch from the ProdutoServico
     * 
    **/
    select?: ProdutoServicoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProdutoServicoInclude | null
  }



  /**
   * Model EtapaFabricacao
   */


  export type AggregateEtapaFabricacao = {
    _count: EtapaFabricacaoCountAggregateOutputType | null
    _min: EtapaFabricacaoMinAggregateOutputType | null
    _max: EtapaFabricacaoMaxAggregateOutputType | null
  }

  export type EtapaFabricacaoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
    descricao: string | null
  }

  export type EtapaFabricacaoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    nome: string | null
    descricao: string | null
  }

  export type EtapaFabricacaoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    nome: number
    descricao: number
    _all: number
  }


  export type EtapaFabricacaoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
  }

  export type EtapaFabricacaoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
  }

  export type EtapaFabricacaoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    nome?: true
    descricao?: true
    _all?: true
  }

  export type EtapaFabricacaoAggregateArgs = {
    /**
     * Filter which EtapaFabricacao to aggregate.
     * 
    **/
    where?: EtapaFabricacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EtapaFabricacaos to fetch.
     * 
    **/
    orderBy?: Enumerable<EtapaFabricacaoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EtapaFabricacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EtapaFabricacaos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EtapaFabricacaos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EtapaFabricacaos
    **/
    _count?: true | EtapaFabricacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EtapaFabricacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EtapaFabricacaoMaxAggregateInputType
  }

  export type GetEtapaFabricacaoAggregateType<T extends EtapaFabricacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateEtapaFabricacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEtapaFabricacao[P]>
      : GetScalarType<T[P], AggregateEtapaFabricacao[P]>
  }




  export type EtapaFabricacaoGroupByArgs = {
    where?: EtapaFabricacaoWhereInput
    orderBy?: Enumerable<EtapaFabricacaoOrderByWithAggregationInput>
    by: Array<EtapaFabricacaoScalarFieldEnum>
    having?: EtapaFabricacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EtapaFabricacaoCountAggregateInputType | true
    _min?: EtapaFabricacaoMinAggregateInputType
    _max?: EtapaFabricacaoMaxAggregateInputType
  }


  export type EtapaFabricacaoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    nome: string
    descricao: string | null
    _count: EtapaFabricacaoCountAggregateOutputType | null
    _min: EtapaFabricacaoMinAggregateOutputType | null
    _max: EtapaFabricacaoMaxAggregateOutputType | null
  }

  type GetEtapaFabricacaoGroupByPayload<T extends EtapaFabricacaoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EtapaFabricacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EtapaFabricacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EtapaFabricacaoGroupByOutputType[P]>
            : GetScalarType<T[P], EtapaFabricacaoGroupByOutputType[P]>
        }
      >
    >


  export type EtapaFabricacaoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    nome?: boolean
    descricao?: boolean
    produtos?: boolean | ProdutoServicoFindManyArgs
    _count?: boolean | EtapaFabricacaoCountOutputTypeArgs
  }

  export type EtapaFabricacaoInclude = {
    produtos?: boolean | ProdutoServicoFindManyArgs
    _count?: boolean | EtapaFabricacaoCountOutputTypeArgs
  }

  export type EtapaFabricacaoGetPayload<
    S extends boolean | null | undefined | EtapaFabricacaoArgs,
    U = keyof S
      > = S extends true
        ? EtapaFabricacao
    : S extends undefined
    ? never
    : S extends EtapaFabricacaoArgs | EtapaFabricacaoFindManyArgs
    ?'include' extends U
    ? EtapaFabricacao  & {
    [P in TrueKeys<S['include']>]:
        P extends 'produtos' ? Array < ProdutoServicoGetPayload<S['include'][P]>>  :
        P extends '_count' ? EtapaFabricacaoCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'produtos' ? Array < ProdutoServicoGetPayload<S['select'][P]>>  :
        P extends '_count' ? EtapaFabricacaoCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof EtapaFabricacao ? EtapaFabricacao[P] : never
  } 
    : EtapaFabricacao
  : EtapaFabricacao


  type EtapaFabricacaoCountArgs = Merge<
    Omit<EtapaFabricacaoFindManyArgs, 'select' | 'include'> & {
      select?: EtapaFabricacaoCountAggregateInputType | true
    }
  >

  export interface EtapaFabricacaoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one EtapaFabricacao that matches the filter.
     * @param {EtapaFabricacaoFindUniqueArgs} args - Arguments to find a EtapaFabricacao
     * @example
     * // Get one EtapaFabricacao
     * const etapaFabricacao = await prisma.etapaFabricacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EtapaFabricacaoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EtapaFabricacaoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EtapaFabricacao'> extends True ? CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao>, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T>>> : CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao | null >, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T> | null >>

    /**
     * Find the first EtapaFabricacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtapaFabricacaoFindFirstArgs} args - Arguments to find a EtapaFabricacao
     * @example
     * // Get one EtapaFabricacao
     * const etapaFabricacao = await prisma.etapaFabricacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EtapaFabricacaoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EtapaFabricacaoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EtapaFabricacao'> extends True ? CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao>, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T>>> : CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao | null >, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T> | null >>

    /**
     * Find zero or more EtapaFabricacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtapaFabricacaoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EtapaFabricacaos
     * const etapaFabricacaos = await prisma.etapaFabricacao.findMany()
     * 
     * // Get first 10 EtapaFabricacaos
     * const etapaFabricacaos = await prisma.etapaFabricacao.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const etapaFabricacaoWithUidOnly = await prisma.etapaFabricacao.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends EtapaFabricacaoFindManyArgs>(
      args?: SelectSubset<T, EtapaFabricacaoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EtapaFabricacao>>, PrismaPromise<Array<EtapaFabricacaoGetPayload<T>>>>

    /**
     * Create a EtapaFabricacao.
     * @param {EtapaFabricacaoCreateArgs} args - Arguments to create a EtapaFabricacao.
     * @example
     * // Create one EtapaFabricacao
     * const EtapaFabricacao = await prisma.etapaFabricacao.create({
     *   data: {
     *     // ... data to create a EtapaFabricacao
     *   }
     * })
     * 
    **/
    create<T extends EtapaFabricacaoCreateArgs>(
      args: SelectSubset<T, EtapaFabricacaoCreateArgs>
    ): CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao>, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T>>>

    /**
     * Create many EtapaFabricacaos.
     *     @param {EtapaFabricacaoCreateManyArgs} args - Arguments to create many EtapaFabricacaos.
     *     @example
     *     // Create many EtapaFabricacaos
     *     const etapaFabricacao = await prisma.etapaFabricacao.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EtapaFabricacaoCreateManyArgs>(
      args?: SelectSubset<T, EtapaFabricacaoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EtapaFabricacao.
     * @param {EtapaFabricacaoDeleteArgs} args - Arguments to delete one EtapaFabricacao.
     * @example
     * // Delete one EtapaFabricacao
     * const EtapaFabricacao = await prisma.etapaFabricacao.delete({
     *   where: {
     *     // ... filter to delete one EtapaFabricacao
     *   }
     * })
     * 
    **/
    delete<T extends EtapaFabricacaoDeleteArgs>(
      args: SelectSubset<T, EtapaFabricacaoDeleteArgs>
    ): CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao>, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T>>>

    /**
     * Update one EtapaFabricacao.
     * @param {EtapaFabricacaoUpdateArgs} args - Arguments to update one EtapaFabricacao.
     * @example
     * // Update one EtapaFabricacao
     * const etapaFabricacao = await prisma.etapaFabricacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EtapaFabricacaoUpdateArgs>(
      args: SelectSubset<T, EtapaFabricacaoUpdateArgs>
    ): CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao>, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T>>>

    /**
     * Delete zero or more EtapaFabricacaos.
     * @param {EtapaFabricacaoDeleteManyArgs} args - Arguments to filter EtapaFabricacaos to delete.
     * @example
     * // Delete a few EtapaFabricacaos
     * const { count } = await prisma.etapaFabricacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EtapaFabricacaoDeleteManyArgs>(
      args?: SelectSubset<T, EtapaFabricacaoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EtapaFabricacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtapaFabricacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EtapaFabricacaos
     * const etapaFabricacao = await prisma.etapaFabricacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EtapaFabricacaoUpdateManyArgs>(
      args: SelectSubset<T, EtapaFabricacaoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EtapaFabricacao.
     * @param {EtapaFabricacaoUpsertArgs} args - Arguments to update or create a EtapaFabricacao.
     * @example
     * // Update or create a EtapaFabricacao
     * const etapaFabricacao = await prisma.etapaFabricacao.upsert({
     *   create: {
     *     // ... data to create a EtapaFabricacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EtapaFabricacao we want to update
     *   }
     * })
    **/
    upsert<T extends EtapaFabricacaoUpsertArgs>(
      args: SelectSubset<T, EtapaFabricacaoUpsertArgs>
    ): CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao>, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T>>>

    /**
     * Find one EtapaFabricacao that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {EtapaFabricacaoFindUniqueOrThrowArgs} args - Arguments to find a EtapaFabricacao
     * @example
     * // Get one EtapaFabricacao
     * const etapaFabricacao = await prisma.etapaFabricacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EtapaFabricacaoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EtapaFabricacaoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao>, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T>>>

    /**
     * Find the first EtapaFabricacao that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtapaFabricacaoFindFirstOrThrowArgs} args - Arguments to find a EtapaFabricacao
     * @example
     * // Get one EtapaFabricacao
     * const etapaFabricacao = await prisma.etapaFabricacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EtapaFabricacaoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EtapaFabricacaoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__EtapaFabricacaoClient<EtapaFabricacao>, Prisma__EtapaFabricacaoClient<EtapaFabricacaoGetPayload<T>>>

    /**
     * Count the number of EtapaFabricacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtapaFabricacaoCountArgs} args - Arguments to filter EtapaFabricacaos to count.
     * @example
     * // Count the number of EtapaFabricacaos
     * const count = await prisma.etapaFabricacao.count({
     *   where: {
     *     // ... the filter for the EtapaFabricacaos we want to count
     *   }
     * })
    **/
    count<T extends EtapaFabricacaoCountArgs>(
      args?: Subset<T, EtapaFabricacaoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EtapaFabricacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EtapaFabricacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtapaFabricacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EtapaFabricacaoAggregateArgs>(args: Subset<T, EtapaFabricacaoAggregateArgs>): PrismaPromise<GetEtapaFabricacaoAggregateType<T>>

    /**
     * Group by EtapaFabricacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EtapaFabricacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EtapaFabricacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EtapaFabricacaoGroupByArgs['orderBy'] }
        : { orderBy?: EtapaFabricacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EtapaFabricacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEtapaFabricacaoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for EtapaFabricacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EtapaFabricacaoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    produtos<T extends ProdutoServicoFindManyArgs = {}>(args?: Subset<T, ProdutoServicoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProdutoServico>>, PrismaPromise<Array<ProdutoServicoGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * EtapaFabricacao base type for findUnique actions
   */
  export type EtapaFabricacaoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the EtapaFabricacao
     * 
    **/
    select?: EtapaFabricacaoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EtapaFabricacaoInclude | null
    /**
     * Filter, which EtapaFabricacao to fetch.
     * 
    **/
    where: EtapaFabricacaoWhereUniqueInput
  }

  /**
   * EtapaFabricacao: findUnique
   */
  export interface EtapaFabricacaoFindUniqueArgs extends EtapaFabricacaoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * EtapaFabricacao base type for findFirst actions
   */
  export type EtapaFabricacaoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the EtapaFabricacao
     * 
    **/
    select?: EtapaFabricacaoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EtapaFabricacaoInclude | null
    /**
     * Filter, which EtapaFabricacao to fetch.
     * 
    **/
    where?: EtapaFabricacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EtapaFabricacaos to fetch.
     * 
    **/
    orderBy?: Enumerable<EtapaFabricacaoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EtapaFabricacaos.
     * 
    **/
    cursor?: EtapaFabricacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EtapaFabricacaos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EtapaFabricacaos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EtapaFabricacaos.
     * 
    **/
    distinct?: Enumerable<EtapaFabricacaoScalarFieldEnum>
  }

  /**
   * EtapaFabricacao: findFirst
   */
  export interface EtapaFabricacaoFindFirstArgs extends EtapaFabricacaoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * EtapaFabricacao findMany
   */
  export type EtapaFabricacaoFindManyArgs = {
    /**
     * Select specific fields to fetch from the EtapaFabricacao
     * 
    **/
    select?: EtapaFabricacaoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EtapaFabricacaoInclude | null
    /**
     * Filter, which EtapaFabricacaos to fetch.
     * 
    **/
    where?: EtapaFabricacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EtapaFabricacaos to fetch.
     * 
    **/
    orderBy?: Enumerable<EtapaFabricacaoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EtapaFabricacaos.
     * 
    **/
    cursor?: EtapaFabricacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EtapaFabricacaos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EtapaFabricacaos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EtapaFabricacaoScalarFieldEnum>
  }


  /**
   * EtapaFabricacao create
   */
  export type EtapaFabricacaoCreateArgs = {
    /**
     * Select specific fields to fetch from the EtapaFabricacao
     * 
    **/
    select?: EtapaFabricacaoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EtapaFabricacaoInclude | null
    /**
     * The data needed to create a EtapaFabricacao.
     * 
    **/
    data: XOR<EtapaFabricacaoCreateInput, EtapaFabricacaoUncheckedCreateInput>
  }


  /**
   * EtapaFabricacao createMany
   */
  export type EtapaFabricacaoCreateManyArgs = {
    /**
     * The data used to create many EtapaFabricacaos.
     * 
    **/
    data: Enumerable<EtapaFabricacaoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EtapaFabricacao update
   */
  export type EtapaFabricacaoUpdateArgs = {
    /**
     * Select specific fields to fetch from the EtapaFabricacao
     * 
    **/
    select?: EtapaFabricacaoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EtapaFabricacaoInclude | null
    /**
     * The data needed to update a EtapaFabricacao.
     * 
    **/
    data: XOR<EtapaFabricacaoUpdateInput, EtapaFabricacaoUncheckedUpdateInput>
    /**
     * Choose, which EtapaFabricacao to update.
     * 
    **/
    where: EtapaFabricacaoWhereUniqueInput
  }


  /**
   * EtapaFabricacao updateMany
   */
  export type EtapaFabricacaoUpdateManyArgs = {
    /**
     * The data used to update EtapaFabricacaos.
     * 
    **/
    data: XOR<EtapaFabricacaoUpdateManyMutationInput, EtapaFabricacaoUncheckedUpdateManyInput>
    /**
     * Filter which EtapaFabricacaos to update
     * 
    **/
    where?: EtapaFabricacaoWhereInput
  }


  /**
   * EtapaFabricacao upsert
   */
  export type EtapaFabricacaoUpsertArgs = {
    /**
     * Select specific fields to fetch from the EtapaFabricacao
     * 
    **/
    select?: EtapaFabricacaoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EtapaFabricacaoInclude | null
    /**
     * The filter to search for the EtapaFabricacao to update in case it exists.
     * 
    **/
    where: EtapaFabricacaoWhereUniqueInput
    /**
     * In case the EtapaFabricacao found by the `where` argument doesn't exist, create a new EtapaFabricacao with this data.
     * 
    **/
    create: XOR<EtapaFabricacaoCreateInput, EtapaFabricacaoUncheckedCreateInput>
    /**
     * In case the EtapaFabricacao was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EtapaFabricacaoUpdateInput, EtapaFabricacaoUncheckedUpdateInput>
  }


  /**
   * EtapaFabricacao delete
   */
  export type EtapaFabricacaoDeleteArgs = {
    /**
     * Select specific fields to fetch from the EtapaFabricacao
     * 
    **/
    select?: EtapaFabricacaoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EtapaFabricacaoInclude | null
    /**
     * Filter which EtapaFabricacao to delete.
     * 
    **/
    where: EtapaFabricacaoWhereUniqueInput
  }


  /**
   * EtapaFabricacao deleteMany
   */
  export type EtapaFabricacaoDeleteManyArgs = {
    /**
     * Filter which EtapaFabricacaos to delete
     * 
    **/
    where?: EtapaFabricacaoWhereInput
  }


  /**
   * EtapaFabricacao: findUniqueOrThrow
   */
  export type EtapaFabricacaoFindUniqueOrThrowArgs = EtapaFabricacaoFindUniqueArgsBase
      

  /**
   * EtapaFabricacao: findFirstOrThrow
   */
  export type EtapaFabricacaoFindFirstOrThrowArgs = EtapaFabricacaoFindFirstArgsBase
      

  /**
   * EtapaFabricacao without action
   */
  export type EtapaFabricacaoArgs = {
    /**
     * Select specific fields to fetch from the EtapaFabricacao
     * 
    **/
    select?: EtapaFabricacaoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EtapaFabricacaoInclude | null
  }



  /**
   * Model LancamentoFinanceiro
   */


  export type AggregateLancamentoFinanceiro = {
    _count: LancamentoFinanceiroCountAggregateOutputType | null
    _avg: LancamentoFinanceiroAvgAggregateOutputType | null
    _sum: LancamentoFinanceiroSumAggregateOutputType | null
    _min: LancamentoFinanceiroMinAggregateOutputType | null
    _max: LancamentoFinanceiroMaxAggregateOutputType | null
  }

  export type LancamentoFinanceiroAvgAggregateOutputType = {
    qtdParcelas: number | null
    intervaloDiasEntreParcelas: number | null
    valorEntradaEmCents: number | null
  }

  export type LancamentoFinanceiroSumAggregateOutputType = {
    qtdParcelas: number | null
    intervaloDiasEntreParcelas: number | null
    valorEntradaEmCents: number | null
  }

  export type LancamentoFinanceiroMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    qtdParcelas: number | null
    dtLancamento: Date | null
    dtPrimeiroVencimento: Date | null
    intervaloDiasEntreParcelas: number | null
    valorEntradaEmCents: number | null
    descricao: string | null
    observacoes: string | null
    servicoUid: string | null
    formaDePagamento: FormaPagamentoEnum | null
  }

  export type LancamentoFinanceiroMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    ativo: boolean | null
    qtdParcelas: number | null
    dtLancamento: Date | null
    dtPrimeiroVencimento: Date | null
    intervaloDiasEntreParcelas: number | null
    valorEntradaEmCents: number | null
    descricao: string | null
    observacoes: string | null
    servicoUid: string | null
    formaDePagamento: FormaPagamentoEnum | null
  }

  export type LancamentoFinanceiroCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    ativo: number
    qtdParcelas: number
    dtLancamento: number
    dtPrimeiroVencimento: number
    intervaloDiasEntreParcelas: number
    valorEntradaEmCents: number
    descricao: number
    observacoes: number
    servicoUid: number
    formaDePagamento: number
    _all: number
  }


  export type LancamentoFinanceiroAvgAggregateInputType = {
    qtdParcelas?: true
    intervaloDiasEntreParcelas?: true
    valorEntradaEmCents?: true
  }

  export type LancamentoFinanceiroSumAggregateInputType = {
    qtdParcelas?: true
    intervaloDiasEntreParcelas?: true
    valorEntradaEmCents?: true
  }

  export type LancamentoFinanceiroMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    qtdParcelas?: true
    dtLancamento?: true
    dtPrimeiroVencimento?: true
    intervaloDiasEntreParcelas?: true
    valorEntradaEmCents?: true
    descricao?: true
    observacoes?: true
    servicoUid?: true
    formaDePagamento?: true
  }

  export type LancamentoFinanceiroMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    qtdParcelas?: true
    dtLancamento?: true
    dtPrimeiroVencimento?: true
    intervaloDiasEntreParcelas?: true
    valorEntradaEmCents?: true
    descricao?: true
    observacoes?: true
    servicoUid?: true
    formaDePagamento?: true
  }

  export type LancamentoFinanceiroCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    ativo?: true
    qtdParcelas?: true
    dtLancamento?: true
    dtPrimeiroVencimento?: true
    intervaloDiasEntreParcelas?: true
    valorEntradaEmCents?: true
    descricao?: true
    observacoes?: true
    servicoUid?: true
    formaDePagamento?: true
    _all?: true
  }

  export type LancamentoFinanceiroAggregateArgs = {
    /**
     * Filter which LancamentoFinanceiro to aggregate.
     * 
    **/
    where?: LancamentoFinanceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LancamentoFinanceiros to fetch.
     * 
    **/
    orderBy?: Enumerable<LancamentoFinanceiroOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LancamentoFinanceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LancamentoFinanceiros from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LancamentoFinanceiros.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LancamentoFinanceiros
    **/
    _count?: true | LancamentoFinanceiroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LancamentoFinanceiroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LancamentoFinanceiroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LancamentoFinanceiroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LancamentoFinanceiroMaxAggregateInputType
  }

  export type GetLancamentoFinanceiroAggregateType<T extends LancamentoFinanceiroAggregateArgs> = {
        [P in keyof T & keyof AggregateLancamentoFinanceiro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLancamentoFinanceiro[P]>
      : GetScalarType<T[P], AggregateLancamentoFinanceiro[P]>
  }




  export type LancamentoFinanceiroGroupByArgs = {
    where?: LancamentoFinanceiroWhereInput
    orderBy?: Enumerable<LancamentoFinanceiroOrderByWithAggregationInput>
    by: Array<LancamentoFinanceiroScalarFieldEnum>
    having?: LancamentoFinanceiroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LancamentoFinanceiroCountAggregateInputType | true
    _avg?: LancamentoFinanceiroAvgAggregateInputType
    _sum?: LancamentoFinanceiroSumAggregateInputType
    _min?: LancamentoFinanceiroMinAggregateInputType
    _max?: LancamentoFinanceiroMaxAggregateInputType
  }


  export type LancamentoFinanceiroGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    ativo: boolean
    qtdParcelas: number
    dtLancamento: Date
    dtPrimeiroVencimento: Date | null
    intervaloDiasEntreParcelas: number | null
    valorEntradaEmCents: number | null
    descricao: string | null
    observacoes: string | null
    servicoUid: string | null
    formaDePagamento: FormaPagamentoEnum
    _count: LancamentoFinanceiroCountAggregateOutputType | null
    _avg: LancamentoFinanceiroAvgAggregateOutputType | null
    _sum: LancamentoFinanceiroSumAggregateOutputType | null
    _min: LancamentoFinanceiroMinAggregateOutputType | null
    _max: LancamentoFinanceiroMaxAggregateOutputType | null
  }

  type GetLancamentoFinanceiroGroupByPayload<T extends LancamentoFinanceiroGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LancamentoFinanceiroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LancamentoFinanceiroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LancamentoFinanceiroGroupByOutputType[P]>
            : GetScalarType<T[P], LancamentoFinanceiroGroupByOutputType[P]>
        }
      >
    >


  export type LancamentoFinanceiroSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    ativo?: boolean
    qtdParcelas?: boolean
    dtLancamento?: boolean
    dtPrimeiroVencimento?: boolean
    intervaloDiasEntreParcelas?: boolean
    valorEntradaEmCents?: boolean
    descricao?: boolean
    observacoes?: boolean
    saida?: boolean | LancamentoSaidaArgs
    servicoUid?: boolean
    parcelas?: boolean | ParcelaFindManyArgs
    formaDePagamento?: boolean
    servico?: boolean | ServicoArgs
    _count?: boolean | LancamentoFinanceiroCountOutputTypeArgs
  }

  export type LancamentoFinanceiroInclude = {
    saida?: boolean | LancamentoSaidaArgs
    parcelas?: boolean | ParcelaFindManyArgs
    servico?: boolean | ServicoArgs
    _count?: boolean | LancamentoFinanceiroCountOutputTypeArgs
  }

  export type LancamentoFinanceiroGetPayload<
    S extends boolean | null | undefined | LancamentoFinanceiroArgs,
    U = keyof S
      > = S extends true
        ? LancamentoFinanceiro
    : S extends undefined
    ? never
    : S extends LancamentoFinanceiroArgs | LancamentoFinanceiroFindManyArgs
    ?'include' extends U
    ? LancamentoFinanceiro  & {
    [P in TrueKeys<S['include']>]:
        P extends 'saida' ? LancamentoSaidaGetPayload<S['include'][P]> | null :
        P extends 'parcelas' ? Array < ParcelaGetPayload<S['include'][P]>>  :
        P extends 'servico' ? ServicoGetPayload<S['include'][P]> | null :
        P extends '_count' ? LancamentoFinanceiroCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'saida' ? LancamentoSaidaGetPayload<S['select'][P]> | null :
        P extends 'parcelas' ? Array < ParcelaGetPayload<S['select'][P]>>  :
        P extends 'servico' ? ServicoGetPayload<S['select'][P]> | null :
        P extends '_count' ? LancamentoFinanceiroCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof LancamentoFinanceiro ? LancamentoFinanceiro[P] : never
  } 
    : LancamentoFinanceiro
  : LancamentoFinanceiro


  type LancamentoFinanceiroCountArgs = Merge<
    Omit<LancamentoFinanceiroFindManyArgs, 'select' | 'include'> & {
      select?: LancamentoFinanceiroCountAggregateInputType | true
    }
  >

  export interface LancamentoFinanceiroDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one LancamentoFinanceiro that matches the filter.
     * @param {LancamentoFinanceiroFindUniqueArgs} args - Arguments to find a LancamentoFinanceiro
     * @example
     * // Get one LancamentoFinanceiro
     * const lancamentoFinanceiro = await prisma.lancamentoFinanceiro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LancamentoFinanceiroFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LancamentoFinanceiroFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LancamentoFinanceiro'> extends True ? CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro>, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T>>> : CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro | null >, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T> | null >>

    /**
     * Find the first LancamentoFinanceiro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFinanceiroFindFirstArgs} args - Arguments to find a LancamentoFinanceiro
     * @example
     * // Get one LancamentoFinanceiro
     * const lancamentoFinanceiro = await prisma.lancamentoFinanceiro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LancamentoFinanceiroFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LancamentoFinanceiroFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LancamentoFinanceiro'> extends True ? CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro>, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T>>> : CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro | null >, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T> | null >>

    /**
     * Find zero or more LancamentoFinanceiros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFinanceiroFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LancamentoFinanceiros
     * const lancamentoFinanceiros = await prisma.lancamentoFinanceiro.findMany()
     * 
     * // Get first 10 LancamentoFinanceiros
     * const lancamentoFinanceiros = await prisma.lancamentoFinanceiro.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const lancamentoFinanceiroWithUidOnly = await prisma.lancamentoFinanceiro.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends LancamentoFinanceiroFindManyArgs>(
      args?: SelectSubset<T, LancamentoFinanceiroFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<LancamentoFinanceiro>>, PrismaPromise<Array<LancamentoFinanceiroGetPayload<T>>>>

    /**
     * Create a LancamentoFinanceiro.
     * @param {LancamentoFinanceiroCreateArgs} args - Arguments to create a LancamentoFinanceiro.
     * @example
     * // Create one LancamentoFinanceiro
     * const LancamentoFinanceiro = await prisma.lancamentoFinanceiro.create({
     *   data: {
     *     // ... data to create a LancamentoFinanceiro
     *   }
     * })
     * 
    **/
    create<T extends LancamentoFinanceiroCreateArgs>(
      args: SelectSubset<T, LancamentoFinanceiroCreateArgs>
    ): CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro>, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T>>>

    /**
     * Create many LancamentoFinanceiros.
     *     @param {LancamentoFinanceiroCreateManyArgs} args - Arguments to create many LancamentoFinanceiros.
     *     @example
     *     // Create many LancamentoFinanceiros
     *     const lancamentoFinanceiro = await prisma.lancamentoFinanceiro.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LancamentoFinanceiroCreateManyArgs>(
      args?: SelectSubset<T, LancamentoFinanceiroCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a LancamentoFinanceiro.
     * @param {LancamentoFinanceiroDeleteArgs} args - Arguments to delete one LancamentoFinanceiro.
     * @example
     * // Delete one LancamentoFinanceiro
     * const LancamentoFinanceiro = await prisma.lancamentoFinanceiro.delete({
     *   where: {
     *     // ... filter to delete one LancamentoFinanceiro
     *   }
     * })
     * 
    **/
    delete<T extends LancamentoFinanceiroDeleteArgs>(
      args: SelectSubset<T, LancamentoFinanceiroDeleteArgs>
    ): CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro>, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T>>>

    /**
     * Update one LancamentoFinanceiro.
     * @param {LancamentoFinanceiroUpdateArgs} args - Arguments to update one LancamentoFinanceiro.
     * @example
     * // Update one LancamentoFinanceiro
     * const lancamentoFinanceiro = await prisma.lancamentoFinanceiro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LancamentoFinanceiroUpdateArgs>(
      args: SelectSubset<T, LancamentoFinanceiroUpdateArgs>
    ): CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro>, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T>>>

    /**
     * Delete zero or more LancamentoFinanceiros.
     * @param {LancamentoFinanceiroDeleteManyArgs} args - Arguments to filter LancamentoFinanceiros to delete.
     * @example
     * // Delete a few LancamentoFinanceiros
     * const { count } = await prisma.lancamentoFinanceiro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LancamentoFinanceiroDeleteManyArgs>(
      args?: SelectSubset<T, LancamentoFinanceiroDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more LancamentoFinanceiros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFinanceiroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LancamentoFinanceiros
     * const lancamentoFinanceiro = await prisma.lancamentoFinanceiro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LancamentoFinanceiroUpdateManyArgs>(
      args: SelectSubset<T, LancamentoFinanceiroUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one LancamentoFinanceiro.
     * @param {LancamentoFinanceiroUpsertArgs} args - Arguments to update or create a LancamentoFinanceiro.
     * @example
     * // Update or create a LancamentoFinanceiro
     * const lancamentoFinanceiro = await prisma.lancamentoFinanceiro.upsert({
     *   create: {
     *     // ... data to create a LancamentoFinanceiro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LancamentoFinanceiro we want to update
     *   }
     * })
    **/
    upsert<T extends LancamentoFinanceiroUpsertArgs>(
      args: SelectSubset<T, LancamentoFinanceiroUpsertArgs>
    ): CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro>, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T>>>

    /**
     * Find one LancamentoFinanceiro that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {LancamentoFinanceiroFindUniqueOrThrowArgs} args - Arguments to find a LancamentoFinanceiro
     * @example
     * // Get one LancamentoFinanceiro
     * const lancamentoFinanceiro = await prisma.lancamentoFinanceiro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LancamentoFinanceiroFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LancamentoFinanceiroFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro>, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T>>>

    /**
     * Find the first LancamentoFinanceiro that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFinanceiroFindFirstOrThrowArgs} args - Arguments to find a LancamentoFinanceiro
     * @example
     * // Get one LancamentoFinanceiro
     * const lancamentoFinanceiro = await prisma.lancamentoFinanceiro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LancamentoFinanceiroFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LancamentoFinanceiroFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro>, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T>>>

    /**
     * Count the number of LancamentoFinanceiros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFinanceiroCountArgs} args - Arguments to filter LancamentoFinanceiros to count.
     * @example
     * // Count the number of LancamentoFinanceiros
     * const count = await prisma.lancamentoFinanceiro.count({
     *   where: {
     *     // ... the filter for the LancamentoFinanceiros we want to count
     *   }
     * })
    **/
    count<T extends LancamentoFinanceiroCountArgs>(
      args?: Subset<T, LancamentoFinanceiroCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LancamentoFinanceiroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LancamentoFinanceiro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFinanceiroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LancamentoFinanceiroAggregateArgs>(args: Subset<T, LancamentoFinanceiroAggregateArgs>): PrismaPromise<GetLancamentoFinanceiroAggregateType<T>>

    /**
     * Group by LancamentoFinanceiro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFinanceiroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LancamentoFinanceiroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LancamentoFinanceiroGroupByArgs['orderBy'] }
        : { orderBy?: LancamentoFinanceiroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LancamentoFinanceiroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLancamentoFinanceiroGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for LancamentoFinanceiro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LancamentoFinanceiroClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    saida<T extends LancamentoSaidaArgs = {}>(args?: Subset<T, LancamentoSaidaArgs>): CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida | null >, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T> | null >>;

    parcelas<T extends ParcelaFindManyArgs = {}>(args?: Subset<T, ParcelaFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Parcela>>, PrismaPromise<Array<ParcelaGetPayload<T>>>>;

    servico<T extends ServicoArgs = {}>(args?: Subset<T, ServicoArgs>): CheckSelect<T, Prisma__ServicoClient<Servico | null >, Prisma__ServicoClient<ServicoGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * LancamentoFinanceiro base type for findUnique actions
   */
  export type LancamentoFinanceiroFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiro
     * 
    **/
    select?: LancamentoFinanceiroSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoFinanceiroInclude | null
    /**
     * Filter, which LancamentoFinanceiro to fetch.
     * 
    **/
    where: LancamentoFinanceiroWhereUniqueInput
  }

  /**
   * LancamentoFinanceiro: findUnique
   */
  export interface LancamentoFinanceiroFindUniqueArgs extends LancamentoFinanceiroFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LancamentoFinanceiro base type for findFirst actions
   */
  export type LancamentoFinanceiroFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiro
     * 
    **/
    select?: LancamentoFinanceiroSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoFinanceiroInclude | null
    /**
     * Filter, which LancamentoFinanceiro to fetch.
     * 
    **/
    where?: LancamentoFinanceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LancamentoFinanceiros to fetch.
     * 
    **/
    orderBy?: Enumerable<LancamentoFinanceiroOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LancamentoFinanceiros.
     * 
    **/
    cursor?: LancamentoFinanceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LancamentoFinanceiros from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LancamentoFinanceiros.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LancamentoFinanceiros.
     * 
    **/
    distinct?: Enumerable<LancamentoFinanceiroScalarFieldEnum>
  }

  /**
   * LancamentoFinanceiro: findFirst
   */
  export interface LancamentoFinanceiroFindFirstArgs extends LancamentoFinanceiroFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LancamentoFinanceiro findMany
   */
  export type LancamentoFinanceiroFindManyArgs = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiro
     * 
    **/
    select?: LancamentoFinanceiroSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoFinanceiroInclude | null
    /**
     * Filter, which LancamentoFinanceiros to fetch.
     * 
    **/
    where?: LancamentoFinanceiroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LancamentoFinanceiros to fetch.
     * 
    **/
    orderBy?: Enumerable<LancamentoFinanceiroOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LancamentoFinanceiros.
     * 
    **/
    cursor?: LancamentoFinanceiroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LancamentoFinanceiros from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LancamentoFinanceiros.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LancamentoFinanceiroScalarFieldEnum>
  }


  /**
   * LancamentoFinanceiro create
   */
  export type LancamentoFinanceiroCreateArgs = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiro
     * 
    **/
    select?: LancamentoFinanceiroSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoFinanceiroInclude | null
    /**
     * The data needed to create a LancamentoFinanceiro.
     * 
    **/
    data: XOR<LancamentoFinanceiroCreateInput, LancamentoFinanceiroUncheckedCreateInput>
  }


  /**
   * LancamentoFinanceiro createMany
   */
  export type LancamentoFinanceiroCreateManyArgs = {
    /**
     * The data used to create many LancamentoFinanceiros.
     * 
    **/
    data: Enumerable<LancamentoFinanceiroCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * LancamentoFinanceiro update
   */
  export type LancamentoFinanceiroUpdateArgs = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiro
     * 
    **/
    select?: LancamentoFinanceiroSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoFinanceiroInclude | null
    /**
     * The data needed to update a LancamentoFinanceiro.
     * 
    **/
    data: XOR<LancamentoFinanceiroUpdateInput, LancamentoFinanceiroUncheckedUpdateInput>
    /**
     * Choose, which LancamentoFinanceiro to update.
     * 
    **/
    where: LancamentoFinanceiroWhereUniqueInput
  }


  /**
   * LancamentoFinanceiro updateMany
   */
  export type LancamentoFinanceiroUpdateManyArgs = {
    /**
     * The data used to update LancamentoFinanceiros.
     * 
    **/
    data: XOR<LancamentoFinanceiroUpdateManyMutationInput, LancamentoFinanceiroUncheckedUpdateManyInput>
    /**
     * Filter which LancamentoFinanceiros to update
     * 
    **/
    where?: LancamentoFinanceiroWhereInput
  }


  /**
   * LancamentoFinanceiro upsert
   */
  export type LancamentoFinanceiroUpsertArgs = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiro
     * 
    **/
    select?: LancamentoFinanceiroSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoFinanceiroInclude | null
    /**
     * The filter to search for the LancamentoFinanceiro to update in case it exists.
     * 
    **/
    where: LancamentoFinanceiroWhereUniqueInput
    /**
     * In case the LancamentoFinanceiro found by the `where` argument doesn't exist, create a new LancamentoFinanceiro with this data.
     * 
    **/
    create: XOR<LancamentoFinanceiroCreateInput, LancamentoFinanceiroUncheckedCreateInput>
    /**
     * In case the LancamentoFinanceiro was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LancamentoFinanceiroUpdateInput, LancamentoFinanceiroUncheckedUpdateInput>
  }


  /**
   * LancamentoFinanceiro delete
   */
  export type LancamentoFinanceiroDeleteArgs = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiro
     * 
    **/
    select?: LancamentoFinanceiroSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoFinanceiroInclude | null
    /**
     * Filter which LancamentoFinanceiro to delete.
     * 
    **/
    where: LancamentoFinanceiroWhereUniqueInput
  }


  /**
   * LancamentoFinanceiro deleteMany
   */
  export type LancamentoFinanceiroDeleteManyArgs = {
    /**
     * Filter which LancamentoFinanceiros to delete
     * 
    **/
    where?: LancamentoFinanceiroWhereInput
  }


  /**
   * LancamentoFinanceiro: findUniqueOrThrow
   */
  export type LancamentoFinanceiroFindUniqueOrThrowArgs = LancamentoFinanceiroFindUniqueArgsBase
      

  /**
   * LancamentoFinanceiro: findFirstOrThrow
   */
  export type LancamentoFinanceiroFindFirstOrThrowArgs = LancamentoFinanceiroFindFirstArgsBase
      

  /**
   * LancamentoFinanceiro without action
   */
  export type LancamentoFinanceiroArgs = {
    /**
     * Select specific fields to fetch from the LancamentoFinanceiro
     * 
    **/
    select?: LancamentoFinanceiroSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoFinanceiroInclude | null
  }



  /**
   * Model LancamentoSaida
   */


  export type AggregateLancamentoSaida = {
    _count: LancamentoSaidaCountAggregateOutputType | null
    _min: LancamentoSaidaMinAggregateOutputType | null
    _max: LancamentoSaidaMaxAggregateOutputType | null
  }

  export type LancamentoSaidaMinAggregateOutputType = {
    uid: string | null
    paraQuemUid: string | null
    finalidade: FinalidadeSaidaEnum | null
  }

  export type LancamentoSaidaMaxAggregateOutputType = {
    uid: string | null
    paraQuemUid: string | null
    finalidade: FinalidadeSaidaEnum | null
  }

  export type LancamentoSaidaCountAggregateOutputType = {
    uid: number
    paraQuemUid: number
    finalidade: number
    _all: number
  }


  export type LancamentoSaidaMinAggregateInputType = {
    uid?: true
    paraQuemUid?: true
    finalidade?: true
  }

  export type LancamentoSaidaMaxAggregateInputType = {
    uid?: true
    paraQuemUid?: true
    finalidade?: true
  }

  export type LancamentoSaidaCountAggregateInputType = {
    uid?: true
    paraQuemUid?: true
    finalidade?: true
    _all?: true
  }

  export type LancamentoSaidaAggregateArgs = {
    /**
     * Filter which LancamentoSaida to aggregate.
     * 
    **/
    where?: LancamentoSaidaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LancamentoSaidas to fetch.
     * 
    **/
    orderBy?: Enumerable<LancamentoSaidaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LancamentoSaidaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LancamentoSaidas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LancamentoSaidas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LancamentoSaidas
    **/
    _count?: true | LancamentoSaidaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LancamentoSaidaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LancamentoSaidaMaxAggregateInputType
  }

  export type GetLancamentoSaidaAggregateType<T extends LancamentoSaidaAggregateArgs> = {
        [P in keyof T & keyof AggregateLancamentoSaida]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLancamentoSaida[P]>
      : GetScalarType<T[P], AggregateLancamentoSaida[P]>
  }




  export type LancamentoSaidaGroupByArgs = {
    where?: LancamentoSaidaWhereInput
    orderBy?: Enumerable<LancamentoSaidaOrderByWithAggregationInput>
    by: Array<LancamentoSaidaScalarFieldEnum>
    having?: LancamentoSaidaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LancamentoSaidaCountAggregateInputType | true
    _min?: LancamentoSaidaMinAggregateInputType
    _max?: LancamentoSaidaMaxAggregateInputType
  }


  export type LancamentoSaidaGroupByOutputType = {
    uid: string
    paraQuemUid: string
    finalidade: FinalidadeSaidaEnum
    _count: LancamentoSaidaCountAggregateOutputType | null
    _min: LancamentoSaidaMinAggregateOutputType | null
    _max: LancamentoSaidaMaxAggregateOutputType | null
  }

  type GetLancamentoSaidaGroupByPayload<T extends LancamentoSaidaGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LancamentoSaidaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LancamentoSaidaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LancamentoSaidaGroupByOutputType[P]>
            : GetScalarType<T[P], LancamentoSaidaGroupByOutputType[P]>
        }
      >
    >


  export type LancamentoSaidaSelect = {
    uid?: boolean
    paraQuemUid?: boolean
    finalidade?: boolean
    paraQuem?: boolean | ContatoArgs
    lancamentoFinanceiro?: boolean | LancamentoFinanceiroArgs
  }

  export type LancamentoSaidaInclude = {
    paraQuem?: boolean | ContatoArgs
    lancamentoFinanceiro?: boolean | LancamentoFinanceiroArgs
  }

  export type LancamentoSaidaGetPayload<
    S extends boolean | null | undefined | LancamentoSaidaArgs,
    U = keyof S
      > = S extends true
        ? LancamentoSaida
    : S extends undefined
    ? never
    : S extends LancamentoSaidaArgs | LancamentoSaidaFindManyArgs
    ?'include' extends U
    ? LancamentoSaida  & {
    [P in TrueKeys<S['include']>]:
        P extends 'paraQuem' ? ContatoGetPayload<S['include'][P]> :
        P extends 'lancamentoFinanceiro' ? LancamentoFinanceiroGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'paraQuem' ? ContatoGetPayload<S['select'][P]> :
        P extends 'lancamentoFinanceiro' ? LancamentoFinanceiroGetPayload<S['select'][P]> :  P extends keyof LancamentoSaida ? LancamentoSaida[P] : never
  } 
    : LancamentoSaida
  : LancamentoSaida


  type LancamentoSaidaCountArgs = Merge<
    Omit<LancamentoSaidaFindManyArgs, 'select' | 'include'> & {
      select?: LancamentoSaidaCountAggregateInputType | true
    }
  >

  export interface LancamentoSaidaDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one LancamentoSaida that matches the filter.
     * @param {LancamentoSaidaFindUniqueArgs} args - Arguments to find a LancamentoSaida
     * @example
     * // Get one LancamentoSaida
     * const lancamentoSaida = await prisma.lancamentoSaida.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LancamentoSaidaFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LancamentoSaidaFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LancamentoSaida'> extends True ? CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida>, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T>>> : CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida | null >, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T> | null >>

    /**
     * Find the first LancamentoSaida that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoSaidaFindFirstArgs} args - Arguments to find a LancamentoSaida
     * @example
     * // Get one LancamentoSaida
     * const lancamentoSaida = await prisma.lancamentoSaida.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LancamentoSaidaFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LancamentoSaidaFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LancamentoSaida'> extends True ? CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida>, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T>>> : CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida | null >, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T> | null >>

    /**
     * Find zero or more LancamentoSaidas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoSaidaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LancamentoSaidas
     * const lancamentoSaidas = await prisma.lancamentoSaida.findMany()
     * 
     * // Get first 10 LancamentoSaidas
     * const lancamentoSaidas = await prisma.lancamentoSaida.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const lancamentoSaidaWithUidOnly = await prisma.lancamentoSaida.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends LancamentoSaidaFindManyArgs>(
      args?: SelectSubset<T, LancamentoSaidaFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<LancamentoSaida>>, PrismaPromise<Array<LancamentoSaidaGetPayload<T>>>>

    /**
     * Create a LancamentoSaida.
     * @param {LancamentoSaidaCreateArgs} args - Arguments to create a LancamentoSaida.
     * @example
     * // Create one LancamentoSaida
     * const LancamentoSaida = await prisma.lancamentoSaida.create({
     *   data: {
     *     // ... data to create a LancamentoSaida
     *   }
     * })
     * 
    **/
    create<T extends LancamentoSaidaCreateArgs>(
      args: SelectSubset<T, LancamentoSaidaCreateArgs>
    ): CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida>, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T>>>

    /**
     * Create many LancamentoSaidas.
     *     @param {LancamentoSaidaCreateManyArgs} args - Arguments to create many LancamentoSaidas.
     *     @example
     *     // Create many LancamentoSaidas
     *     const lancamentoSaida = await prisma.lancamentoSaida.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LancamentoSaidaCreateManyArgs>(
      args?: SelectSubset<T, LancamentoSaidaCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a LancamentoSaida.
     * @param {LancamentoSaidaDeleteArgs} args - Arguments to delete one LancamentoSaida.
     * @example
     * // Delete one LancamentoSaida
     * const LancamentoSaida = await prisma.lancamentoSaida.delete({
     *   where: {
     *     // ... filter to delete one LancamentoSaida
     *   }
     * })
     * 
    **/
    delete<T extends LancamentoSaidaDeleteArgs>(
      args: SelectSubset<T, LancamentoSaidaDeleteArgs>
    ): CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida>, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T>>>

    /**
     * Update one LancamentoSaida.
     * @param {LancamentoSaidaUpdateArgs} args - Arguments to update one LancamentoSaida.
     * @example
     * // Update one LancamentoSaida
     * const lancamentoSaida = await prisma.lancamentoSaida.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LancamentoSaidaUpdateArgs>(
      args: SelectSubset<T, LancamentoSaidaUpdateArgs>
    ): CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida>, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T>>>

    /**
     * Delete zero or more LancamentoSaidas.
     * @param {LancamentoSaidaDeleteManyArgs} args - Arguments to filter LancamentoSaidas to delete.
     * @example
     * // Delete a few LancamentoSaidas
     * const { count } = await prisma.lancamentoSaida.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LancamentoSaidaDeleteManyArgs>(
      args?: SelectSubset<T, LancamentoSaidaDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more LancamentoSaidas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoSaidaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LancamentoSaidas
     * const lancamentoSaida = await prisma.lancamentoSaida.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LancamentoSaidaUpdateManyArgs>(
      args: SelectSubset<T, LancamentoSaidaUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one LancamentoSaida.
     * @param {LancamentoSaidaUpsertArgs} args - Arguments to update or create a LancamentoSaida.
     * @example
     * // Update or create a LancamentoSaida
     * const lancamentoSaida = await prisma.lancamentoSaida.upsert({
     *   create: {
     *     // ... data to create a LancamentoSaida
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LancamentoSaida we want to update
     *   }
     * })
    **/
    upsert<T extends LancamentoSaidaUpsertArgs>(
      args: SelectSubset<T, LancamentoSaidaUpsertArgs>
    ): CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida>, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T>>>

    /**
     * Find one LancamentoSaida that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {LancamentoSaidaFindUniqueOrThrowArgs} args - Arguments to find a LancamentoSaida
     * @example
     * // Get one LancamentoSaida
     * const lancamentoSaida = await prisma.lancamentoSaida.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LancamentoSaidaFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LancamentoSaidaFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida>, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T>>>

    /**
     * Find the first LancamentoSaida that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoSaidaFindFirstOrThrowArgs} args - Arguments to find a LancamentoSaida
     * @example
     * // Get one LancamentoSaida
     * const lancamentoSaida = await prisma.lancamentoSaida.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LancamentoSaidaFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LancamentoSaidaFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__LancamentoSaidaClient<LancamentoSaida>, Prisma__LancamentoSaidaClient<LancamentoSaidaGetPayload<T>>>

    /**
     * Count the number of LancamentoSaidas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoSaidaCountArgs} args - Arguments to filter LancamentoSaidas to count.
     * @example
     * // Count the number of LancamentoSaidas
     * const count = await prisma.lancamentoSaida.count({
     *   where: {
     *     // ... the filter for the LancamentoSaidas we want to count
     *   }
     * })
    **/
    count<T extends LancamentoSaidaCountArgs>(
      args?: Subset<T, LancamentoSaidaCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LancamentoSaidaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LancamentoSaida.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoSaidaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LancamentoSaidaAggregateArgs>(args: Subset<T, LancamentoSaidaAggregateArgs>): PrismaPromise<GetLancamentoSaidaAggregateType<T>>

    /**
     * Group by LancamentoSaida.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoSaidaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LancamentoSaidaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LancamentoSaidaGroupByArgs['orderBy'] }
        : { orderBy?: LancamentoSaidaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LancamentoSaidaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLancamentoSaidaGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for LancamentoSaida.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LancamentoSaidaClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    paraQuem<T extends ContatoArgs = {}>(args?: Subset<T, ContatoArgs>): CheckSelect<T, Prisma__ContatoClient<Contato | null >, Prisma__ContatoClient<ContatoGetPayload<T> | null >>;

    lancamentoFinanceiro<T extends LancamentoFinanceiroArgs = {}>(args?: Subset<T, LancamentoFinanceiroArgs>): CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro | null >, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * LancamentoSaida base type for findUnique actions
   */
  export type LancamentoSaidaFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the LancamentoSaida
     * 
    **/
    select?: LancamentoSaidaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoSaidaInclude | null
    /**
     * Filter, which LancamentoSaida to fetch.
     * 
    **/
    where: LancamentoSaidaWhereUniqueInput
  }

  /**
   * LancamentoSaida: findUnique
   */
  export interface LancamentoSaidaFindUniqueArgs extends LancamentoSaidaFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LancamentoSaida base type for findFirst actions
   */
  export type LancamentoSaidaFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the LancamentoSaida
     * 
    **/
    select?: LancamentoSaidaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoSaidaInclude | null
    /**
     * Filter, which LancamentoSaida to fetch.
     * 
    **/
    where?: LancamentoSaidaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LancamentoSaidas to fetch.
     * 
    **/
    orderBy?: Enumerable<LancamentoSaidaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LancamentoSaidas.
     * 
    **/
    cursor?: LancamentoSaidaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LancamentoSaidas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LancamentoSaidas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LancamentoSaidas.
     * 
    **/
    distinct?: Enumerable<LancamentoSaidaScalarFieldEnum>
  }

  /**
   * LancamentoSaida: findFirst
   */
  export interface LancamentoSaidaFindFirstArgs extends LancamentoSaidaFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LancamentoSaida findMany
   */
  export type LancamentoSaidaFindManyArgs = {
    /**
     * Select specific fields to fetch from the LancamentoSaida
     * 
    **/
    select?: LancamentoSaidaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoSaidaInclude | null
    /**
     * Filter, which LancamentoSaidas to fetch.
     * 
    **/
    where?: LancamentoSaidaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LancamentoSaidas to fetch.
     * 
    **/
    orderBy?: Enumerable<LancamentoSaidaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LancamentoSaidas.
     * 
    **/
    cursor?: LancamentoSaidaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LancamentoSaidas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LancamentoSaidas.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LancamentoSaidaScalarFieldEnum>
  }


  /**
   * LancamentoSaida create
   */
  export type LancamentoSaidaCreateArgs = {
    /**
     * Select specific fields to fetch from the LancamentoSaida
     * 
    **/
    select?: LancamentoSaidaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoSaidaInclude | null
    /**
     * The data needed to create a LancamentoSaida.
     * 
    **/
    data: XOR<LancamentoSaidaCreateInput, LancamentoSaidaUncheckedCreateInput>
  }


  /**
   * LancamentoSaida createMany
   */
  export type LancamentoSaidaCreateManyArgs = {
    /**
     * The data used to create many LancamentoSaidas.
     * 
    **/
    data: Enumerable<LancamentoSaidaCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * LancamentoSaida update
   */
  export type LancamentoSaidaUpdateArgs = {
    /**
     * Select specific fields to fetch from the LancamentoSaida
     * 
    **/
    select?: LancamentoSaidaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoSaidaInclude | null
    /**
     * The data needed to update a LancamentoSaida.
     * 
    **/
    data: XOR<LancamentoSaidaUpdateInput, LancamentoSaidaUncheckedUpdateInput>
    /**
     * Choose, which LancamentoSaida to update.
     * 
    **/
    where: LancamentoSaidaWhereUniqueInput
  }


  /**
   * LancamentoSaida updateMany
   */
  export type LancamentoSaidaUpdateManyArgs = {
    /**
     * The data used to update LancamentoSaidas.
     * 
    **/
    data: XOR<LancamentoSaidaUpdateManyMutationInput, LancamentoSaidaUncheckedUpdateManyInput>
    /**
     * Filter which LancamentoSaidas to update
     * 
    **/
    where?: LancamentoSaidaWhereInput
  }


  /**
   * LancamentoSaida upsert
   */
  export type LancamentoSaidaUpsertArgs = {
    /**
     * Select specific fields to fetch from the LancamentoSaida
     * 
    **/
    select?: LancamentoSaidaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoSaidaInclude | null
    /**
     * The filter to search for the LancamentoSaida to update in case it exists.
     * 
    **/
    where: LancamentoSaidaWhereUniqueInput
    /**
     * In case the LancamentoSaida found by the `where` argument doesn't exist, create a new LancamentoSaida with this data.
     * 
    **/
    create: XOR<LancamentoSaidaCreateInput, LancamentoSaidaUncheckedCreateInput>
    /**
     * In case the LancamentoSaida was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LancamentoSaidaUpdateInput, LancamentoSaidaUncheckedUpdateInput>
  }


  /**
   * LancamentoSaida delete
   */
  export type LancamentoSaidaDeleteArgs = {
    /**
     * Select specific fields to fetch from the LancamentoSaida
     * 
    **/
    select?: LancamentoSaidaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoSaidaInclude | null
    /**
     * Filter which LancamentoSaida to delete.
     * 
    **/
    where: LancamentoSaidaWhereUniqueInput
  }


  /**
   * LancamentoSaida deleteMany
   */
  export type LancamentoSaidaDeleteManyArgs = {
    /**
     * Filter which LancamentoSaidas to delete
     * 
    **/
    where?: LancamentoSaidaWhereInput
  }


  /**
   * LancamentoSaida: findUniqueOrThrow
   */
  export type LancamentoSaidaFindUniqueOrThrowArgs = LancamentoSaidaFindUniqueArgsBase
      

  /**
   * LancamentoSaida: findFirstOrThrow
   */
  export type LancamentoSaidaFindFirstOrThrowArgs = LancamentoSaidaFindFirstArgsBase
      

  /**
   * LancamentoSaida without action
   */
  export type LancamentoSaidaArgs = {
    /**
     * Select specific fields to fetch from the LancamentoSaida
     * 
    **/
    select?: LancamentoSaidaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LancamentoSaidaInclude | null
  }



  /**
   * Model Parcela
   */


  export type AggregateParcela = {
    _count: ParcelaCountAggregateOutputType | null
    _avg: ParcelaAvgAggregateOutputType | null
    _sum: ParcelaSumAggregateOutputType | null
    _min: ParcelaMinAggregateOutputType | null
    _max: ParcelaMaxAggregateOutputType | null
  }

  export type ParcelaAvgAggregateOutputType = {
    valorEmCents: number | null
    numParcela: number | null
  }

  export type ParcelaSumAggregateOutputType = {
    valorEmCents: number | null
    numParcela: number | null
  }

  export type ParcelaMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    valorEmCents: number | null
    numParcela: number | null
    status: StatusPagamentoEnum | null
    lancamentoFinanceiroUid: string | null
  }

  export type ParcelaMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    valorEmCents: number | null
    numParcela: number | null
    status: StatusPagamentoEnum | null
    lancamentoFinanceiroUid: string | null
  }

  export type ParcelaCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    valorEmCents: number
    numParcela: number
    status: number
    lancamentoFinanceiroUid: number
    _all: number
  }


  export type ParcelaAvgAggregateInputType = {
    valorEmCents?: true
    numParcela?: true
  }

  export type ParcelaSumAggregateInputType = {
    valorEmCents?: true
    numParcela?: true
  }

  export type ParcelaMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    valorEmCents?: true
    numParcela?: true
    status?: true
    lancamentoFinanceiroUid?: true
  }

  export type ParcelaMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    valorEmCents?: true
    numParcela?: true
    status?: true
    lancamentoFinanceiroUid?: true
  }

  export type ParcelaCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    valorEmCents?: true
    numParcela?: true
    status?: true
    lancamentoFinanceiroUid?: true
    _all?: true
  }

  export type ParcelaAggregateArgs = {
    /**
     * Filter which Parcela to aggregate.
     * 
    **/
    where?: ParcelaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelas to fetch.
     * 
    **/
    orderBy?: Enumerable<ParcelaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ParcelaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parcelas
    **/
    _count?: true | ParcelaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParcelaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParcelaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParcelaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParcelaMaxAggregateInputType
  }

  export type GetParcelaAggregateType<T extends ParcelaAggregateArgs> = {
        [P in keyof T & keyof AggregateParcela]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParcela[P]>
      : GetScalarType<T[P], AggregateParcela[P]>
  }




  export type ParcelaGroupByArgs = {
    where?: ParcelaWhereInput
    orderBy?: Enumerable<ParcelaOrderByWithAggregationInput>
    by: Array<ParcelaScalarFieldEnum>
    having?: ParcelaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParcelaCountAggregateInputType | true
    _avg?: ParcelaAvgAggregateInputType
    _sum?: ParcelaSumAggregateInputType
    _min?: ParcelaMinAggregateInputType
    _max?: ParcelaMaxAggregateInputType
  }


  export type ParcelaGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    valorEmCents: number
    numParcela: number
    status: StatusPagamentoEnum
    lancamentoFinanceiroUid: string
    _count: ParcelaCountAggregateOutputType | null
    _avg: ParcelaAvgAggregateOutputType | null
    _sum: ParcelaSumAggregateOutputType | null
    _min: ParcelaMinAggregateOutputType | null
    _max: ParcelaMaxAggregateOutputType | null
  }

  type GetParcelaGroupByPayload<T extends ParcelaGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ParcelaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParcelaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParcelaGroupByOutputType[P]>
            : GetScalarType<T[P], ParcelaGroupByOutputType[P]>
        }
      >
    >


  export type ParcelaSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    valorEmCents?: boolean
    numParcela?: boolean
    status?: boolean
    pagamentos?: boolean | PagamentoFindManyArgs
    lancamentoFinanceiroUid?: boolean
    lancamento?: boolean | LancamentoFinanceiroArgs
    _count?: boolean | ParcelaCountOutputTypeArgs
  }

  export type ParcelaInclude = {
    pagamentos?: boolean | PagamentoFindManyArgs
    lancamento?: boolean | LancamentoFinanceiroArgs
    _count?: boolean | ParcelaCountOutputTypeArgs
  }

  export type ParcelaGetPayload<
    S extends boolean | null | undefined | ParcelaArgs,
    U = keyof S
      > = S extends true
        ? Parcela
    : S extends undefined
    ? never
    : S extends ParcelaArgs | ParcelaFindManyArgs
    ?'include' extends U
    ? Parcela  & {
    [P in TrueKeys<S['include']>]:
        P extends 'pagamentos' ? Array < PagamentoGetPayload<S['include'][P]>>  :
        P extends 'lancamento' ? LancamentoFinanceiroGetPayload<S['include'][P]> :
        P extends '_count' ? ParcelaCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'pagamentos' ? Array < PagamentoGetPayload<S['select'][P]>>  :
        P extends 'lancamento' ? LancamentoFinanceiroGetPayload<S['select'][P]> :
        P extends '_count' ? ParcelaCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Parcela ? Parcela[P] : never
  } 
    : Parcela
  : Parcela


  type ParcelaCountArgs = Merge<
    Omit<ParcelaFindManyArgs, 'select' | 'include'> & {
      select?: ParcelaCountAggregateInputType | true
    }
  >

  export interface ParcelaDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Parcela that matches the filter.
     * @param {ParcelaFindUniqueArgs} args - Arguments to find a Parcela
     * @example
     * // Get one Parcela
     * const parcela = await prisma.parcela.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ParcelaFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ParcelaFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Parcela'> extends True ? CheckSelect<T, Prisma__ParcelaClient<Parcela>, Prisma__ParcelaClient<ParcelaGetPayload<T>>> : CheckSelect<T, Prisma__ParcelaClient<Parcela | null >, Prisma__ParcelaClient<ParcelaGetPayload<T> | null >>

    /**
     * Find the first Parcela that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaFindFirstArgs} args - Arguments to find a Parcela
     * @example
     * // Get one Parcela
     * const parcela = await prisma.parcela.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ParcelaFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ParcelaFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Parcela'> extends True ? CheckSelect<T, Prisma__ParcelaClient<Parcela>, Prisma__ParcelaClient<ParcelaGetPayload<T>>> : CheckSelect<T, Prisma__ParcelaClient<Parcela | null >, Prisma__ParcelaClient<ParcelaGetPayload<T> | null >>

    /**
     * Find zero or more Parcelas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parcelas
     * const parcelas = await prisma.parcela.findMany()
     * 
     * // Get first 10 Parcelas
     * const parcelas = await prisma.parcela.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const parcelaWithUidOnly = await prisma.parcela.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends ParcelaFindManyArgs>(
      args?: SelectSubset<T, ParcelaFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Parcela>>, PrismaPromise<Array<ParcelaGetPayload<T>>>>

    /**
     * Create a Parcela.
     * @param {ParcelaCreateArgs} args - Arguments to create a Parcela.
     * @example
     * // Create one Parcela
     * const Parcela = await prisma.parcela.create({
     *   data: {
     *     // ... data to create a Parcela
     *   }
     * })
     * 
    **/
    create<T extends ParcelaCreateArgs>(
      args: SelectSubset<T, ParcelaCreateArgs>
    ): CheckSelect<T, Prisma__ParcelaClient<Parcela>, Prisma__ParcelaClient<ParcelaGetPayload<T>>>

    /**
     * Create many Parcelas.
     *     @param {ParcelaCreateManyArgs} args - Arguments to create many Parcelas.
     *     @example
     *     // Create many Parcelas
     *     const parcela = await prisma.parcela.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ParcelaCreateManyArgs>(
      args?: SelectSubset<T, ParcelaCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Parcela.
     * @param {ParcelaDeleteArgs} args - Arguments to delete one Parcela.
     * @example
     * // Delete one Parcela
     * const Parcela = await prisma.parcela.delete({
     *   where: {
     *     // ... filter to delete one Parcela
     *   }
     * })
     * 
    **/
    delete<T extends ParcelaDeleteArgs>(
      args: SelectSubset<T, ParcelaDeleteArgs>
    ): CheckSelect<T, Prisma__ParcelaClient<Parcela>, Prisma__ParcelaClient<ParcelaGetPayload<T>>>

    /**
     * Update one Parcela.
     * @param {ParcelaUpdateArgs} args - Arguments to update one Parcela.
     * @example
     * // Update one Parcela
     * const parcela = await prisma.parcela.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ParcelaUpdateArgs>(
      args: SelectSubset<T, ParcelaUpdateArgs>
    ): CheckSelect<T, Prisma__ParcelaClient<Parcela>, Prisma__ParcelaClient<ParcelaGetPayload<T>>>

    /**
     * Delete zero or more Parcelas.
     * @param {ParcelaDeleteManyArgs} args - Arguments to filter Parcelas to delete.
     * @example
     * // Delete a few Parcelas
     * const { count } = await prisma.parcela.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ParcelaDeleteManyArgs>(
      args?: SelectSubset<T, ParcelaDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parcelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parcelas
     * const parcela = await prisma.parcela.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ParcelaUpdateManyArgs>(
      args: SelectSubset<T, ParcelaUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Parcela.
     * @param {ParcelaUpsertArgs} args - Arguments to update or create a Parcela.
     * @example
     * // Update or create a Parcela
     * const parcela = await prisma.parcela.upsert({
     *   create: {
     *     // ... data to create a Parcela
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parcela we want to update
     *   }
     * })
    **/
    upsert<T extends ParcelaUpsertArgs>(
      args: SelectSubset<T, ParcelaUpsertArgs>
    ): CheckSelect<T, Prisma__ParcelaClient<Parcela>, Prisma__ParcelaClient<ParcelaGetPayload<T>>>

    /**
     * Find one Parcela that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ParcelaFindUniqueOrThrowArgs} args - Arguments to find a Parcela
     * @example
     * // Get one Parcela
     * const parcela = await prisma.parcela.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ParcelaFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ParcelaFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ParcelaClient<Parcela>, Prisma__ParcelaClient<ParcelaGetPayload<T>>>

    /**
     * Find the first Parcela that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaFindFirstOrThrowArgs} args - Arguments to find a Parcela
     * @example
     * // Get one Parcela
     * const parcela = await prisma.parcela.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ParcelaFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ParcelaFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ParcelaClient<Parcela>, Prisma__ParcelaClient<ParcelaGetPayload<T>>>

    /**
     * Count the number of Parcelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaCountArgs} args - Arguments to filter Parcelas to count.
     * @example
     * // Count the number of Parcelas
     * const count = await prisma.parcela.count({
     *   where: {
     *     // ... the filter for the Parcelas we want to count
     *   }
     * })
    **/
    count<T extends ParcelaCountArgs>(
      args?: Subset<T, ParcelaCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParcelaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parcela.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParcelaAggregateArgs>(args: Subset<T, ParcelaAggregateArgs>): PrismaPromise<GetParcelaAggregateType<T>>

    /**
     * Group by Parcela.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParcelaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParcelaGroupByArgs['orderBy'] }
        : { orderBy?: ParcelaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParcelaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParcelaGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Parcela.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ParcelaClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    pagamentos<T extends PagamentoFindManyArgs = {}>(args?: Subset<T, PagamentoFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Pagamento>>, PrismaPromise<Array<PagamentoGetPayload<T>>>>;

    lancamento<T extends LancamentoFinanceiroArgs = {}>(args?: Subset<T, LancamentoFinanceiroArgs>): CheckSelect<T, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiro | null >, Prisma__LancamentoFinanceiroClient<LancamentoFinanceiroGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Parcela base type for findUnique actions
   */
  export type ParcelaFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Parcela
     * 
    **/
    select?: ParcelaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParcelaInclude | null
    /**
     * Filter, which Parcela to fetch.
     * 
    **/
    where: ParcelaWhereUniqueInput
  }

  /**
   * Parcela: findUnique
   */
  export interface ParcelaFindUniqueArgs extends ParcelaFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Parcela base type for findFirst actions
   */
  export type ParcelaFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Parcela
     * 
    **/
    select?: ParcelaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParcelaInclude | null
    /**
     * Filter, which Parcela to fetch.
     * 
    **/
    where?: ParcelaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelas to fetch.
     * 
    **/
    orderBy?: Enumerable<ParcelaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parcelas.
     * 
    **/
    cursor?: ParcelaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parcelas.
     * 
    **/
    distinct?: Enumerable<ParcelaScalarFieldEnum>
  }

  /**
   * Parcela: findFirst
   */
  export interface ParcelaFindFirstArgs extends ParcelaFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Parcela findMany
   */
  export type ParcelaFindManyArgs = {
    /**
     * Select specific fields to fetch from the Parcela
     * 
    **/
    select?: ParcelaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParcelaInclude | null
    /**
     * Filter, which Parcelas to fetch.
     * 
    **/
    where?: ParcelaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelas to fetch.
     * 
    **/
    orderBy?: Enumerable<ParcelaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parcelas.
     * 
    **/
    cursor?: ParcelaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelas.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ParcelaScalarFieldEnum>
  }


  /**
   * Parcela create
   */
  export type ParcelaCreateArgs = {
    /**
     * Select specific fields to fetch from the Parcela
     * 
    **/
    select?: ParcelaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParcelaInclude | null
    /**
     * The data needed to create a Parcela.
     * 
    **/
    data: XOR<ParcelaCreateInput, ParcelaUncheckedCreateInput>
  }


  /**
   * Parcela createMany
   */
  export type ParcelaCreateManyArgs = {
    /**
     * The data used to create many Parcelas.
     * 
    **/
    data: Enumerable<ParcelaCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Parcela update
   */
  export type ParcelaUpdateArgs = {
    /**
     * Select specific fields to fetch from the Parcela
     * 
    **/
    select?: ParcelaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParcelaInclude | null
    /**
     * The data needed to update a Parcela.
     * 
    **/
    data: XOR<ParcelaUpdateInput, ParcelaUncheckedUpdateInput>
    /**
     * Choose, which Parcela to update.
     * 
    **/
    where: ParcelaWhereUniqueInput
  }


  /**
   * Parcela updateMany
   */
  export type ParcelaUpdateManyArgs = {
    /**
     * The data used to update Parcelas.
     * 
    **/
    data: XOR<ParcelaUpdateManyMutationInput, ParcelaUncheckedUpdateManyInput>
    /**
     * Filter which Parcelas to update
     * 
    **/
    where?: ParcelaWhereInput
  }


  /**
   * Parcela upsert
   */
  export type ParcelaUpsertArgs = {
    /**
     * Select specific fields to fetch from the Parcela
     * 
    **/
    select?: ParcelaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParcelaInclude | null
    /**
     * The filter to search for the Parcela to update in case it exists.
     * 
    **/
    where: ParcelaWhereUniqueInput
    /**
     * In case the Parcela found by the `where` argument doesn't exist, create a new Parcela with this data.
     * 
    **/
    create: XOR<ParcelaCreateInput, ParcelaUncheckedCreateInput>
    /**
     * In case the Parcela was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ParcelaUpdateInput, ParcelaUncheckedUpdateInput>
  }


  /**
   * Parcela delete
   */
  export type ParcelaDeleteArgs = {
    /**
     * Select specific fields to fetch from the Parcela
     * 
    **/
    select?: ParcelaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParcelaInclude | null
    /**
     * Filter which Parcela to delete.
     * 
    **/
    where: ParcelaWhereUniqueInput
  }


  /**
   * Parcela deleteMany
   */
  export type ParcelaDeleteManyArgs = {
    /**
     * Filter which Parcelas to delete
     * 
    **/
    where?: ParcelaWhereInput
  }


  /**
   * Parcela: findUniqueOrThrow
   */
  export type ParcelaFindUniqueOrThrowArgs = ParcelaFindUniqueArgsBase
      

  /**
   * Parcela: findFirstOrThrow
   */
  export type ParcelaFindFirstOrThrowArgs = ParcelaFindFirstArgsBase
      

  /**
   * Parcela without action
   */
  export type ParcelaArgs = {
    /**
     * Select specific fields to fetch from the Parcela
     * 
    **/
    select?: ParcelaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParcelaInclude | null
  }



  /**
   * Model Pagamento
   */


  export type AggregatePagamento = {
    _count: PagamentoCountAggregateOutputType | null
    _avg: PagamentoAvgAggregateOutputType | null
    _sum: PagamentoSumAggregateOutputType | null
    _min: PagamentoMinAggregateOutputType | null
    _max: PagamentoMaxAggregateOutputType | null
  }

  export type PagamentoAvgAggregateOutputType = {
    valorEmCents: number | null
  }

  export type PagamentoSumAggregateOutputType = {
    valorEmCents: number | null
  }

  export type PagamentoMinAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    dt: Date | null
    valorEmCents: number | null
    parcelaUid: string | null
  }

  export type PagamentoMaxAggregateOutputType = {
    uid: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    dt: Date | null
    valorEmCents: number | null
    parcelaUid: string | null
  }

  export type PagamentoCountAggregateOutputType = {
    uid: number
    criadoEm: number
    atualizadoEm: number
    dt: number
    valorEmCents: number
    parcelaUid: number
    _all: number
  }


  export type PagamentoAvgAggregateInputType = {
    valorEmCents?: true
  }

  export type PagamentoSumAggregateInputType = {
    valorEmCents?: true
  }

  export type PagamentoMinAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    dt?: true
    valorEmCents?: true
    parcelaUid?: true
  }

  export type PagamentoMaxAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    dt?: true
    valorEmCents?: true
    parcelaUid?: true
  }

  export type PagamentoCountAggregateInputType = {
    uid?: true
    criadoEm?: true
    atualizadoEm?: true
    dt?: true
    valorEmCents?: true
    parcelaUid?: true
    _all?: true
  }

  export type PagamentoAggregateArgs = {
    /**
     * Filter which Pagamento to aggregate.
     * 
    **/
    where?: PagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagamentos to fetch.
     * 
    **/
    orderBy?: Enumerable<PagamentoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagamentos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagamentos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pagamentos
    **/
    _count?: true | PagamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagamentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagamentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagamentoMaxAggregateInputType
  }

  export type GetPagamentoAggregateType<T extends PagamentoAggregateArgs> = {
        [P in keyof T & keyof AggregatePagamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePagamento[P]>
      : GetScalarType<T[P], AggregatePagamento[P]>
  }




  export type PagamentoGroupByArgs = {
    where?: PagamentoWhereInput
    orderBy?: Enumerable<PagamentoOrderByWithAggregationInput>
    by: Array<PagamentoScalarFieldEnum>
    having?: PagamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagamentoCountAggregateInputType | true
    _avg?: PagamentoAvgAggregateInputType
    _sum?: PagamentoSumAggregateInputType
    _min?: PagamentoMinAggregateInputType
    _max?: PagamentoMaxAggregateInputType
  }


  export type PagamentoGroupByOutputType = {
    uid: string
    criadoEm: Date
    atualizadoEm: Date
    dt: Date
    valorEmCents: number
    parcelaUid: string
    _count: PagamentoCountAggregateOutputType | null
    _avg: PagamentoAvgAggregateOutputType | null
    _sum: PagamentoSumAggregateOutputType | null
    _min: PagamentoMinAggregateOutputType | null
    _max: PagamentoMaxAggregateOutputType | null
  }

  type GetPagamentoGroupByPayload<T extends PagamentoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PagamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagamentoGroupByOutputType[P]>
            : GetScalarType<T[P], PagamentoGroupByOutputType[P]>
        }
      >
    >


  export type PagamentoSelect = {
    uid?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    dt?: boolean
    valorEmCents?: boolean
    parcelaUid?: boolean
    parcela?: boolean | ParcelaArgs
  }

  export type PagamentoInclude = {
    parcela?: boolean | ParcelaArgs
  }

  export type PagamentoGetPayload<
    S extends boolean | null | undefined | PagamentoArgs,
    U = keyof S
      > = S extends true
        ? Pagamento
    : S extends undefined
    ? never
    : S extends PagamentoArgs | PagamentoFindManyArgs
    ?'include' extends U
    ? Pagamento  & {
    [P in TrueKeys<S['include']>]:
        P extends 'parcela' ? ParcelaGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'parcela' ? ParcelaGetPayload<S['select'][P]> :  P extends keyof Pagamento ? Pagamento[P] : never
  } 
    : Pagamento
  : Pagamento


  type PagamentoCountArgs = Merge<
    Omit<PagamentoFindManyArgs, 'select' | 'include'> & {
      select?: PagamentoCountAggregateInputType | true
    }
  >

  export interface PagamentoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Pagamento that matches the filter.
     * @param {PagamentoFindUniqueArgs} args - Arguments to find a Pagamento
     * @example
     * // Get one Pagamento
     * const pagamento = await prisma.pagamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PagamentoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PagamentoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Pagamento'> extends True ? CheckSelect<T, Prisma__PagamentoClient<Pagamento>, Prisma__PagamentoClient<PagamentoGetPayload<T>>> : CheckSelect<T, Prisma__PagamentoClient<Pagamento | null >, Prisma__PagamentoClient<PagamentoGetPayload<T> | null >>

    /**
     * Find the first Pagamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoFindFirstArgs} args - Arguments to find a Pagamento
     * @example
     * // Get one Pagamento
     * const pagamento = await prisma.pagamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PagamentoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PagamentoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Pagamento'> extends True ? CheckSelect<T, Prisma__PagamentoClient<Pagamento>, Prisma__PagamentoClient<PagamentoGetPayload<T>>> : CheckSelect<T, Prisma__PagamentoClient<Pagamento | null >, Prisma__PagamentoClient<PagamentoGetPayload<T> | null >>

    /**
     * Find zero or more Pagamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagamentos
     * const pagamentos = await prisma.pagamento.findMany()
     * 
     * // Get first 10 Pagamentos
     * const pagamentos = await prisma.pagamento.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const pagamentoWithUidOnly = await prisma.pagamento.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends PagamentoFindManyArgs>(
      args?: SelectSubset<T, PagamentoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Pagamento>>, PrismaPromise<Array<PagamentoGetPayload<T>>>>

    /**
     * Create a Pagamento.
     * @param {PagamentoCreateArgs} args - Arguments to create a Pagamento.
     * @example
     * // Create one Pagamento
     * const Pagamento = await prisma.pagamento.create({
     *   data: {
     *     // ... data to create a Pagamento
     *   }
     * })
     * 
    **/
    create<T extends PagamentoCreateArgs>(
      args: SelectSubset<T, PagamentoCreateArgs>
    ): CheckSelect<T, Prisma__PagamentoClient<Pagamento>, Prisma__PagamentoClient<PagamentoGetPayload<T>>>

    /**
     * Create many Pagamentos.
     *     @param {PagamentoCreateManyArgs} args - Arguments to create many Pagamentos.
     *     @example
     *     // Create many Pagamentos
     *     const pagamento = await prisma.pagamento.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PagamentoCreateManyArgs>(
      args?: SelectSubset<T, PagamentoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Pagamento.
     * @param {PagamentoDeleteArgs} args - Arguments to delete one Pagamento.
     * @example
     * // Delete one Pagamento
     * const Pagamento = await prisma.pagamento.delete({
     *   where: {
     *     // ... filter to delete one Pagamento
     *   }
     * })
     * 
    **/
    delete<T extends PagamentoDeleteArgs>(
      args: SelectSubset<T, PagamentoDeleteArgs>
    ): CheckSelect<T, Prisma__PagamentoClient<Pagamento>, Prisma__PagamentoClient<PagamentoGetPayload<T>>>

    /**
     * Update one Pagamento.
     * @param {PagamentoUpdateArgs} args - Arguments to update one Pagamento.
     * @example
     * // Update one Pagamento
     * const pagamento = await prisma.pagamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PagamentoUpdateArgs>(
      args: SelectSubset<T, PagamentoUpdateArgs>
    ): CheckSelect<T, Prisma__PagamentoClient<Pagamento>, Prisma__PagamentoClient<PagamentoGetPayload<T>>>

    /**
     * Delete zero or more Pagamentos.
     * @param {PagamentoDeleteManyArgs} args - Arguments to filter Pagamentos to delete.
     * @example
     * // Delete a few Pagamentos
     * const { count } = await prisma.pagamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PagamentoDeleteManyArgs>(
      args?: SelectSubset<T, PagamentoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagamentos
     * const pagamento = await prisma.pagamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PagamentoUpdateManyArgs>(
      args: SelectSubset<T, PagamentoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Pagamento.
     * @param {PagamentoUpsertArgs} args - Arguments to update or create a Pagamento.
     * @example
     * // Update or create a Pagamento
     * const pagamento = await prisma.pagamento.upsert({
     *   create: {
     *     // ... data to create a Pagamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pagamento we want to update
     *   }
     * })
    **/
    upsert<T extends PagamentoUpsertArgs>(
      args: SelectSubset<T, PagamentoUpsertArgs>
    ): CheckSelect<T, Prisma__PagamentoClient<Pagamento>, Prisma__PagamentoClient<PagamentoGetPayload<T>>>

    /**
     * Find one Pagamento that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PagamentoFindUniqueOrThrowArgs} args - Arguments to find a Pagamento
     * @example
     * // Get one Pagamento
     * const pagamento = await prisma.pagamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PagamentoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PagamentoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PagamentoClient<Pagamento>, Prisma__PagamentoClient<PagamentoGetPayload<T>>>

    /**
     * Find the first Pagamento that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoFindFirstOrThrowArgs} args - Arguments to find a Pagamento
     * @example
     * // Get one Pagamento
     * const pagamento = await prisma.pagamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PagamentoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PagamentoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PagamentoClient<Pagamento>, Prisma__PagamentoClient<PagamentoGetPayload<T>>>

    /**
     * Count the number of Pagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoCountArgs} args - Arguments to filter Pagamentos to count.
     * @example
     * // Count the number of Pagamentos
     * const count = await prisma.pagamento.count({
     *   where: {
     *     // ... the filter for the Pagamentos we want to count
     *   }
     * })
    **/
    count<T extends PagamentoCountArgs>(
      args?: Subset<T, PagamentoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pagamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagamentoAggregateArgs>(args: Subset<T, PagamentoAggregateArgs>): PrismaPromise<GetPagamentoAggregateType<T>>

    /**
     * Group by Pagamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PagamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagamentoGroupByArgs['orderBy'] }
        : { orderBy?: PagamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PagamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagamentoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pagamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PagamentoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    parcela<T extends ParcelaArgs = {}>(args?: Subset<T, ParcelaArgs>): CheckSelect<T, Prisma__ParcelaClient<Parcela | null >, Prisma__ParcelaClient<ParcelaGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Pagamento base type for findUnique actions
   */
  export type PagamentoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Pagamento
     * 
    **/
    select?: PagamentoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PagamentoInclude | null
    /**
     * Filter, which Pagamento to fetch.
     * 
    **/
    where: PagamentoWhereUniqueInput
  }

  /**
   * Pagamento: findUnique
   */
  export interface PagamentoFindUniqueArgs extends PagamentoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Pagamento base type for findFirst actions
   */
  export type PagamentoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Pagamento
     * 
    **/
    select?: PagamentoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PagamentoInclude | null
    /**
     * Filter, which Pagamento to fetch.
     * 
    **/
    where?: PagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagamentos to fetch.
     * 
    **/
    orderBy?: Enumerable<PagamentoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagamentos.
     * 
    **/
    cursor?: PagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagamentos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagamentos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagamentos.
     * 
    **/
    distinct?: Enumerable<PagamentoScalarFieldEnum>
  }

  /**
   * Pagamento: findFirst
   */
  export interface PagamentoFindFirstArgs extends PagamentoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Pagamento findMany
   */
  export type PagamentoFindManyArgs = {
    /**
     * Select specific fields to fetch from the Pagamento
     * 
    **/
    select?: PagamentoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PagamentoInclude | null
    /**
     * Filter, which Pagamentos to fetch.
     * 
    **/
    where?: PagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagamentos to fetch.
     * 
    **/
    orderBy?: Enumerable<PagamentoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pagamentos.
     * 
    **/
    cursor?: PagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagamentos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagamentos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PagamentoScalarFieldEnum>
  }


  /**
   * Pagamento create
   */
  export type PagamentoCreateArgs = {
    /**
     * Select specific fields to fetch from the Pagamento
     * 
    **/
    select?: PagamentoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PagamentoInclude | null
    /**
     * The data needed to create a Pagamento.
     * 
    **/
    data: XOR<PagamentoCreateInput, PagamentoUncheckedCreateInput>
  }


  /**
   * Pagamento createMany
   */
  export type PagamentoCreateManyArgs = {
    /**
     * The data used to create many Pagamentos.
     * 
    **/
    data: Enumerable<PagamentoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Pagamento update
   */
  export type PagamentoUpdateArgs = {
    /**
     * Select specific fields to fetch from the Pagamento
     * 
    **/
    select?: PagamentoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PagamentoInclude | null
    /**
     * The data needed to update a Pagamento.
     * 
    **/
    data: XOR<PagamentoUpdateInput, PagamentoUncheckedUpdateInput>
    /**
     * Choose, which Pagamento to update.
     * 
    **/
    where: PagamentoWhereUniqueInput
  }


  /**
   * Pagamento updateMany
   */
  export type PagamentoUpdateManyArgs = {
    /**
     * The data used to update Pagamentos.
     * 
    **/
    data: XOR<PagamentoUpdateManyMutationInput, PagamentoUncheckedUpdateManyInput>
    /**
     * Filter which Pagamentos to update
     * 
    **/
    where?: PagamentoWhereInput
  }


  /**
   * Pagamento upsert
   */
  export type PagamentoUpsertArgs = {
    /**
     * Select specific fields to fetch from the Pagamento
     * 
    **/
    select?: PagamentoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PagamentoInclude | null
    /**
     * The filter to search for the Pagamento to update in case it exists.
     * 
    **/
    where: PagamentoWhereUniqueInput
    /**
     * In case the Pagamento found by the `where` argument doesn't exist, create a new Pagamento with this data.
     * 
    **/
    create: XOR<PagamentoCreateInput, PagamentoUncheckedCreateInput>
    /**
     * In case the Pagamento was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PagamentoUpdateInput, PagamentoUncheckedUpdateInput>
  }


  /**
   * Pagamento delete
   */
  export type PagamentoDeleteArgs = {
    /**
     * Select specific fields to fetch from the Pagamento
     * 
    **/
    select?: PagamentoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PagamentoInclude | null
    /**
     * Filter which Pagamento to delete.
     * 
    **/
    where: PagamentoWhereUniqueInput
  }


  /**
   * Pagamento deleteMany
   */
  export type PagamentoDeleteManyArgs = {
    /**
     * Filter which Pagamentos to delete
     * 
    **/
    where?: PagamentoWhereInput
  }


  /**
   * Pagamento: findUniqueOrThrow
   */
  export type PagamentoFindUniqueOrThrowArgs = PagamentoFindUniqueArgsBase
      

  /**
   * Pagamento: findFirstOrThrow
   */
  export type PagamentoFindFirstOrThrowArgs = PagamentoFindFirstArgsBase
      

  /**
   * Pagamento without action
   */
  export type PagamentoArgs = {
    /**
     * Select specific fields to fetch from the Pagamento
     * 
    **/
    select?: PagamentoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PagamentoInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const ContatoScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    ativo: 'ativo',
    nome: 'nome',
    categorias: 'categorias',
    telefones: 'telefones'
  };

  export type ContatoScalarFieldEnum = (typeof ContatoScalarFieldEnum)[keyof typeof ContatoScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    contatoUid: 'contatoUid',
    email: 'email',
    username: 'username',
    senha: 'senha'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const ProdutoScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    ativo: 'ativo',
    nome: 'nome',
    descricao: 'descricao',
    tipo: 'tipo',
    marca: 'marca'
  };

  export type ProdutoScalarFieldEnum = (typeof ProdutoScalarFieldEnum)[keyof typeof ProdutoScalarFieldEnum]


  export const TipoProdutoScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    ativo: 'ativo',
    nome: 'nome',
    descricao: 'descricao'
  };

  export type TipoProdutoScalarFieldEnum = (typeof TipoProdutoScalarFieldEnum)[keyof typeof TipoProdutoScalarFieldEnum]


  export const MarcaProdutoScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    ativo: 'ativo',
    nome: 'nome',
    descricao: 'descricao'
  };

  export type MarcaProdutoScalarFieldEnum = (typeof MarcaProdutoScalarFieldEnum)[keyof typeof MarcaProdutoScalarFieldEnum]


  export const ValorProdutoScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    ativo: 'ativo',
    espOdont: 'espOdont',
    valorEmCents: 'valorEmCents',
    dtFim: 'dtFim',
    produtoUid: 'produtoUid'
  };

  export type ValorProdutoScalarFieldEnum = (typeof ValorProdutoScalarFieldEnum)[keyof typeof ValorProdutoScalarFieldEnum]


  export const ServicoScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    ativo: 'ativo',
    dentistaUid: 'dentistaUid',
    descricao: 'descricao',
    observacoes: 'observacoes',
    espOdont: 'espOdont'
  };

  export type ServicoScalarFieldEnum = (typeof ServicoScalarFieldEnum)[keyof typeof ServicoScalarFieldEnum]


  export const ProdutoServicoScalarFieldEnum: {
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
  };

  export type ProdutoServicoScalarFieldEnum = (typeof ProdutoServicoScalarFieldEnum)[keyof typeof ProdutoServicoScalarFieldEnum]


  export const EtapaFabricacaoScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    ativo: 'ativo',
    nome: 'nome',
    descricao: 'descricao'
  };

  export type EtapaFabricacaoScalarFieldEnum = (typeof EtapaFabricacaoScalarFieldEnum)[keyof typeof EtapaFabricacaoScalarFieldEnum]


  export const LancamentoFinanceiroScalarFieldEnum: {
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
  };

  export type LancamentoFinanceiroScalarFieldEnum = (typeof LancamentoFinanceiroScalarFieldEnum)[keyof typeof LancamentoFinanceiroScalarFieldEnum]


  export const LancamentoSaidaScalarFieldEnum: {
    uid: 'uid',
    paraQuemUid: 'paraQuemUid',
    finalidade: 'finalidade'
  };

  export type LancamentoSaidaScalarFieldEnum = (typeof LancamentoSaidaScalarFieldEnum)[keyof typeof LancamentoSaidaScalarFieldEnum]


  export const ParcelaScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    valorEmCents: 'valorEmCents',
    numParcela: 'numParcela',
    status: 'status',
    lancamentoFinanceiroUid: 'lancamentoFinanceiroUid'
  };

  export type ParcelaScalarFieldEnum = (typeof ParcelaScalarFieldEnum)[keyof typeof ParcelaScalarFieldEnum]


  export const PagamentoScalarFieldEnum: {
    uid: 'uid',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    dt: 'dt',
    valorEmCents: 'valorEmCents',
    parcelaUid: 'parcelaUid'
  };

  export type PagamentoScalarFieldEnum = (typeof PagamentoScalarFieldEnum)[keyof typeof PagamentoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type ContatoWhereInput = {
    AND?: Enumerable<ContatoWhereInput>
    OR?: Enumerable<ContatoWhereInput>
    NOT?: Enumerable<ContatoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    nome?: StringFilter | string
    servicosComoDentista?: ServicoListRelationFilter
    servicosComoPaciente?: ServicoListRelationFilter
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput> | null
    lancamentosRecebidos?: LancamentoSaidaListRelationFilter
    categorias?: EnumRoleEnumNullableListFilter
    telefones?: StringNullableListFilter
  }

  export type ContatoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    servicosComoDentista?: ServicoOrderByRelationAggregateInput
    servicosComoPaciente?: ServicoOrderByRelationAggregateInput
    usuario?: UsuarioOrderByWithRelationInput
    lancamentosRecebidos?: LancamentoSaidaOrderByRelationAggregateInput
    categorias?: SortOrder
    telefones?: SortOrder
  }

  export type ContatoWhereUniqueInput = {
    uid?: string
  }

  export type ContatoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    categorias?: SortOrder
    telefones?: SortOrder
    _count?: ContatoCountOrderByAggregateInput
    _max?: ContatoMaxOrderByAggregateInput
    _min?: ContatoMinOrderByAggregateInput
  }

  export type ContatoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ContatoScalarWhereWithAggregatesInput>
    OR?: Enumerable<ContatoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ContatoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    nome?: StringWithAggregatesFilter | string
    categorias?: EnumRoleEnumNullableListFilter
    telefones?: StringNullableListFilter
  }

  export type UsuarioWhereInput = {
    AND?: Enumerable<UsuarioWhereInput>
    OR?: Enumerable<UsuarioWhereInput>
    NOT?: Enumerable<UsuarioWhereInput>
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    contatoUid?: StringFilter | string
    email?: StringFilter | string
    username?: StringNullableFilter | string | null
    senha?: StringFilter | string
    contato?: XOR<ContatoRelationFilter, ContatoWhereInput>
  }

  export type UsuarioOrderByWithRelationInput = {
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    contatoUid?: SortOrder
    email?: SortOrder
    username?: SortOrder
    senha?: SortOrder
    contato?: ContatoOrderByWithRelationInput
  }

  export type UsuarioWhereUniqueInput = {
    contatoUid?: string
    email?: string
    username?: string
  }

  export type UsuarioOrderByWithAggregationInput = {
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    contatoUid?: SortOrder
    email?: SortOrder
    username?: SortOrder
    senha?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UsuarioScalarWhereWithAggregatesInput>
    OR?: Enumerable<UsuarioScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UsuarioScalarWhereWithAggregatesInput>
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    contatoUid?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    username?: StringNullableWithAggregatesFilter | string | null
    senha?: StringWithAggregatesFilter | string
  }

  export type ProdutoWhereInput = {
    AND?: Enumerable<ProdutoWhereInput>
    OR?: Enumerable<ProdutoWhereInput>
    NOT?: Enumerable<ProdutoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    nome?: StringFilter | string
    descricao?: StringNullableFilter | string | null
    tipo?: StringFilter | string
    marca?: StringNullableFilter | string | null
    valores?: ValorProdutoListRelationFilter
    servicos?: ProdutoServicoListRelationFilter
    tipoProduto?: XOR<TipoProdutoRelationFilter, TipoProdutoWhereInput>
    marcaProduto?: XOR<MarcaProdutoRelationFilter, MarcaProdutoWhereInput> | null
  }

  export type ProdutoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    tipo?: SortOrder
    marca?: SortOrder
    valores?: ValorProdutoOrderByRelationAggregateInput
    servicos?: ProdutoServicoOrderByRelationAggregateInput
    tipoProduto?: TipoProdutoOrderByWithRelationInput
    marcaProduto?: MarcaProdutoOrderByWithRelationInput
  }

  export type ProdutoWhereUniqueInput = {
    uid?: string
    nome_tipo_marca?: ProdutoNomeTipoMarcaCompoundUniqueInput
  }

  export type ProdutoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    tipo?: SortOrder
    marca?: SortOrder
    _count?: ProdutoCountOrderByAggregateInput
    _max?: ProdutoMaxOrderByAggregateInput
    _min?: ProdutoMinOrderByAggregateInput
  }

  export type ProdutoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProdutoScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProdutoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProdutoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    nome?: StringWithAggregatesFilter | string
    descricao?: StringNullableWithAggregatesFilter | string | null
    tipo?: StringWithAggregatesFilter | string
    marca?: StringNullableWithAggregatesFilter | string | null
  }

  export type TipoProdutoWhereInput = {
    AND?: Enumerable<TipoProdutoWhereInput>
    OR?: Enumerable<TipoProdutoWhereInput>
    NOT?: Enumerable<TipoProdutoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    nome?: StringFilter | string
    descricao?: StringNullableFilter | string | null
    produtos?: ProdutoListRelationFilter
  }

  export type TipoProdutoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    produtos?: ProdutoOrderByRelationAggregateInput
  }

  export type TipoProdutoWhereUniqueInput = {
    uid?: string
    nome?: string
  }

  export type TipoProdutoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    _count?: TipoProdutoCountOrderByAggregateInput
    _max?: TipoProdutoMaxOrderByAggregateInput
    _min?: TipoProdutoMinOrderByAggregateInput
  }

  export type TipoProdutoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TipoProdutoScalarWhereWithAggregatesInput>
    OR?: Enumerable<TipoProdutoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TipoProdutoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    nome?: StringWithAggregatesFilter | string
    descricao?: StringNullableWithAggregatesFilter | string | null
  }

  export type MarcaProdutoWhereInput = {
    AND?: Enumerable<MarcaProdutoWhereInput>
    OR?: Enumerable<MarcaProdutoWhereInput>
    NOT?: Enumerable<MarcaProdutoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    nome?: StringFilter | string
    descricao?: StringNullableFilter | string | null
    produtos?: ProdutoListRelationFilter
  }

  export type MarcaProdutoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    produtos?: ProdutoOrderByRelationAggregateInput
  }

  export type MarcaProdutoWhereUniqueInput = {
    uid?: string
    nome?: string
  }

  export type MarcaProdutoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    _count?: MarcaProdutoCountOrderByAggregateInput
    _max?: MarcaProdutoMaxOrderByAggregateInput
    _min?: MarcaProdutoMinOrderByAggregateInput
  }

  export type MarcaProdutoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MarcaProdutoScalarWhereWithAggregatesInput>
    OR?: Enumerable<MarcaProdutoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MarcaProdutoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    nome?: StringWithAggregatesFilter | string
    descricao?: StringNullableWithAggregatesFilter | string | null
  }

  export type ValorProdutoWhereInput = {
    AND?: Enumerable<ValorProdutoWhereInput>
    OR?: Enumerable<ValorProdutoWhereInput>
    NOT?: Enumerable<ValorProdutoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    espOdont?: BoolFilter | boolean
    valorEmCents?: IntFilter | number
    dtFim?: DateTimeNullableFilter | Date | string | null
    produtoUid?: StringFilter | string
    produto?: XOR<ProdutoRelationFilter, ProdutoWhereInput>
  }

  export type ValorProdutoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    espOdont?: SortOrder
    valorEmCents?: SortOrder
    dtFim?: SortOrder
    produtoUid?: SortOrder
    produto?: ProdutoOrderByWithRelationInput
  }

  export type ValorProdutoWhereUniqueInput = {
    uid?: string
  }

  export type ValorProdutoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    espOdont?: SortOrder
    valorEmCents?: SortOrder
    dtFim?: SortOrder
    produtoUid?: SortOrder
    _count?: ValorProdutoCountOrderByAggregateInput
    _avg?: ValorProdutoAvgOrderByAggregateInput
    _max?: ValorProdutoMaxOrderByAggregateInput
    _min?: ValorProdutoMinOrderByAggregateInput
    _sum?: ValorProdutoSumOrderByAggregateInput
  }

  export type ValorProdutoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ValorProdutoScalarWhereWithAggregatesInput>
    OR?: Enumerable<ValorProdutoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ValorProdutoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    espOdont?: BoolWithAggregatesFilter | boolean
    valorEmCents?: IntWithAggregatesFilter | number
    dtFim?: DateTimeNullableWithAggregatesFilter | Date | string | null
    produtoUid?: StringWithAggregatesFilter | string
  }

  export type ServicoWhereInput = {
    AND?: Enumerable<ServicoWhereInput>
    OR?: Enumerable<ServicoWhereInput>
    NOT?: Enumerable<ServicoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    dentistaUid?: StringFilter | string
    descricao?: StringNullableFilter | string | null
    observacoes?: StringNullableFilter | string | null
    espOdont?: BoolFilter | boolean
    itens?: ProdutoServicoListRelationFilter
    lancamentos?: LancamentoFinanceiroListRelationFilter
    pacientes?: ContatoListRelationFilter
    dentista?: XOR<ContatoRelationFilter, ContatoWhereInput>
  }

  export type ServicoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    dentistaUid?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    espOdont?: SortOrder
    itens?: ProdutoServicoOrderByRelationAggregateInput
    lancamentos?: LancamentoFinanceiroOrderByRelationAggregateInput
    pacientes?: ContatoOrderByRelationAggregateInput
    dentista?: ContatoOrderByWithRelationInput
  }

  export type ServicoWhereUniqueInput = {
    uid?: string
  }

  export type ServicoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    dentistaUid?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    espOdont?: SortOrder
    _count?: ServicoCountOrderByAggregateInput
    _max?: ServicoMaxOrderByAggregateInput
    _min?: ServicoMinOrderByAggregateInput
  }

  export type ServicoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ServicoScalarWhereWithAggregatesInput>
    OR?: Enumerable<ServicoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ServicoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    dentistaUid?: StringWithAggregatesFilter | string
    descricao?: StringNullableWithAggregatesFilter | string | null
    observacoes?: StringNullableWithAggregatesFilter | string | null
    espOdont?: BoolWithAggregatesFilter | boolean
  }

  export type ProdutoServicoWhereInput = {
    AND?: Enumerable<ProdutoServicoWhereInput>
    OR?: Enumerable<ProdutoServicoWhereInput>
    NOT?: Enumerable<ProdutoServicoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    produtoUid?: StringFilter | string
    servicoUid?: StringFilter | string
    quantidade?: IntFilter | number
    descontoEmCents?: IntNullableFilter | number | null
    descricao?: StringNullableFilter | string | null
    observacoes?: StringNullableFilter | string | null
    etapa?: StringFilter | string
    produto?: XOR<ProdutoRelationFilter, ProdutoWhereInput>
    servico?: XOR<ServicoRelationFilter, ServicoWhereInput>
    etapaFabricacao?: XOR<EtapaFabricacaoRelationFilter, EtapaFabricacaoWhereInput>
  }

  export type ProdutoServicoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    produtoUid?: SortOrder
    servicoUid?: SortOrder
    quantidade?: SortOrder
    descontoEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    etapa?: SortOrder
    produto?: ProdutoOrderByWithRelationInput
    servico?: ServicoOrderByWithRelationInput
    etapaFabricacao?: EtapaFabricacaoOrderByWithRelationInput
  }

  export type ProdutoServicoWhereUniqueInput = {
    uid?: string
    produtoUid_servicoUid?: ProdutoServicoProdutoUidServicoUidCompoundUniqueInput
  }

  export type ProdutoServicoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    produtoUid?: SortOrder
    servicoUid?: SortOrder
    quantidade?: SortOrder
    descontoEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    etapa?: SortOrder
    _count?: ProdutoServicoCountOrderByAggregateInput
    _avg?: ProdutoServicoAvgOrderByAggregateInput
    _max?: ProdutoServicoMaxOrderByAggregateInput
    _min?: ProdutoServicoMinOrderByAggregateInput
    _sum?: ProdutoServicoSumOrderByAggregateInput
  }

  export type ProdutoServicoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProdutoServicoScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProdutoServicoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProdutoServicoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    produtoUid?: StringWithAggregatesFilter | string
    servicoUid?: StringWithAggregatesFilter | string
    quantidade?: IntWithAggregatesFilter | number
    descontoEmCents?: IntNullableWithAggregatesFilter | number | null
    descricao?: StringNullableWithAggregatesFilter | string | null
    observacoes?: StringNullableWithAggregatesFilter | string | null
    etapa?: StringWithAggregatesFilter | string
  }

  export type EtapaFabricacaoWhereInput = {
    AND?: Enumerable<EtapaFabricacaoWhereInput>
    OR?: Enumerable<EtapaFabricacaoWhereInput>
    NOT?: Enumerable<EtapaFabricacaoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    nome?: StringFilter | string
    descricao?: StringNullableFilter | string | null
    produtos?: ProdutoServicoListRelationFilter
  }

  export type EtapaFabricacaoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    produtos?: ProdutoServicoOrderByRelationAggregateInput
  }

  export type EtapaFabricacaoWhereUniqueInput = {
    uid?: string
    nome?: string
  }

  export type EtapaFabricacaoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    _count?: EtapaFabricacaoCountOrderByAggregateInput
    _max?: EtapaFabricacaoMaxOrderByAggregateInput
    _min?: EtapaFabricacaoMinOrderByAggregateInput
  }

  export type EtapaFabricacaoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EtapaFabricacaoScalarWhereWithAggregatesInput>
    OR?: Enumerable<EtapaFabricacaoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EtapaFabricacaoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    nome?: StringWithAggregatesFilter | string
    descricao?: StringNullableWithAggregatesFilter | string | null
  }

  export type LancamentoFinanceiroWhereInput = {
    AND?: Enumerable<LancamentoFinanceiroWhereInput>
    OR?: Enumerable<LancamentoFinanceiroWhereInput>
    NOT?: Enumerable<LancamentoFinanceiroWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    qtdParcelas?: IntFilter | number
    dtLancamento?: DateTimeFilter | Date | string
    dtPrimeiroVencimento?: DateTimeNullableFilter | Date | string | null
    intervaloDiasEntreParcelas?: IntNullableFilter | number | null
    valorEntradaEmCents?: IntNullableFilter | number | null
    descricao?: StringNullableFilter | string | null
    observacoes?: StringNullableFilter | string | null
    saida?: XOR<LancamentoSaidaRelationFilter, LancamentoSaidaWhereInput> | null
    servicoUid?: StringNullableFilter | string | null
    parcelas?: ParcelaListRelationFilter
    formaDePagamento?: EnumFormaPagamentoEnumFilter | FormaPagamentoEnum
    servico?: XOR<ServicoRelationFilter, ServicoWhereInput> | null
  }

  export type LancamentoFinanceiroOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    qtdParcelas?: SortOrder
    dtLancamento?: SortOrder
    dtPrimeiroVencimento?: SortOrder
    intervaloDiasEntreParcelas?: SortOrder
    valorEntradaEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    saida?: LancamentoSaidaOrderByWithRelationInput
    servicoUid?: SortOrder
    parcelas?: ParcelaOrderByRelationAggregateInput
    formaDePagamento?: SortOrder
    servico?: ServicoOrderByWithRelationInput
  }

  export type LancamentoFinanceiroWhereUniqueInput = {
    uid?: string
  }

  export type LancamentoFinanceiroOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    qtdParcelas?: SortOrder
    dtLancamento?: SortOrder
    dtPrimeiroVencimento?: SortOrder
    intervaloDiasEntreParcelas?: SortOrder
    valorEntradaEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    servicoUid?: SortOrder
    formaDePagamento?: SortOrder
    _count?: LancamentoFinanceiroCountOrderByAggregateInput
    _avg?: LancamentoFinanceiroAvgOrderByAggregateInput
    _max?: LancamentoFinanceiroMaxOrderByAggregateInput
    _min?: LancamentoFinanceiroMinOrderByAggregateInput
    _sum?: LancamentoFinanceiroSumOrderByAggregateInput
  }

  export type LancamentoFinanceiroScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LancamentoFinanceiroScalarWhereWithAggregatesInput>
    OR?: Enumerable<LancamentoFinanceiroScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LancamentoFinanceiroScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    ativo?: BoolWithAggregatesFilter | boolean
    qtdParcelas?: IntWithAggregatesFilter | number
    dtLancamento?: DateTimeWithAggregatesFilter | Date | string
    dtPrimeiroVencimento?: DateTimeNullableWithAggregatesFilter | Date | string | null
    intervaloDiasEntreParcelas?: IntNullableWithAggregatesFilter | number | null
    valorEntradaEmCents?: IntNullableWithAggregatesFilter | number | null
    descricao?: StringNullableWithAggregatesFilter | string | null
    observacoes?: StringNullableWithAggregatesFilter | string | null
    servicoUid?: StringNullableWithAggregatesFilter | string | null
    formaDePagamento?: EnumFormaPagamentoEnumWithAggregatesFilter | FormaPagamentoEnum
  }

  export type LancamentoSaidaWhereInput = {
    AND?: Enumerable<LancamentoSaidaWhereInput>
    OR?: Enumerable<LancamentoSaidaWhereInput>
    NOT?: Enumerable<LancamentoSaidaWhereInput>
    uid?: StringFilter | string
    paraQuemUid?: StringFilter | string
    finalidade?: EnumFinalidadeSaidaEnumFilter | FinalidadeSaidaEnum
    paraQuem?: XOR<ContatoRelationFilter, ContatoWhereInput>
    lancamentoFinanceiro?: XOR<LancamentoFinanceiroRelationFilter, LancamentoFinanceiroWhereInput>
  }

  export type LancamentoSaidaOrderByWithRelationInput = {
    uid?: SortOrder
    paraQuemUid?: SortOrder
    finalidade?: SortOrder
    paraQuem?: ContatoOrderByWithRelationInput
    lancamentoFinanceiro?: LancamentoFinanceiroOrderByWithRelationInput
  }

  export type LancamentoSaidaWhereUniqueInput = {
    uid?: string
  }

  export type LancamentoSaidaOrderByWithAggregationInput = {
    uid?: SortOrder
    paraQuemUid?: SortOrder
    finalidade?: SortOrder
    _count?: LancamentoSaidaCountOrderByAggregateInput
    _max?: LancamentoSaidaMaxOrderByAggregateInput
    _min?: LancamentoSaidaMinOrderByAggregateInput
  }

  export type LancamentoSaidaScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LancamentoSaidaScalarWhereWithAggregatesInput>
    OR?: Enumerable<LancamentoSaidaScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LancamentoSaidaScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    paraQuemUid?: StringWithAggregatesFilter | string
    finalidade?: EnumFinalidadeSaidaEnumWithAggregatesFilter | FinalidadeSaidaEnum
  }

  export type ParcelaWhereInput = {
    AND?: Enumerable<ParcelaWhereInput>
    OR?: Enumerable<ParcelaWhereInput>
    NOT?: Enumerable<ParcelaWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    valorEmCents?: IntFilter | number
    numParcela?: IntFilter | number
    status?: EnumStatusPagamentoEnumFilter | StatusPagamentoEnum
    pagamentos?: PagamentoListRelationFilter
    lancamentoFinanceiroUid?: StringFilter | string
    lancamento?: XOR<LancamentoFinanceiroRelationFilter, LancamentoFinanceiroWhereInput>
  }

  export type ParcelaOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    valorEmCents?: SortOrder
    numParcela?: SortOrder
    status?: SortOrder
    pagamentos?: PagamentoOrderByRelationAggregateInput
    lancamentoFinanceiroUid?: SortOrder
    lancamento?: LancamentoFinanceiroOrderByWithRelationInput
  }

  export type ParcelaWhereUniqueInput = {
    uid?: string
  }

  export type ParcelaOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    valorEmCents?: SortOrder
    numParcela?: SortOrder
    status?: SortOrder
    lancamentoFinanceiroUid?: SortOrder
    _count?: ParcelaCountOrderByAggregateInput
    _avg?: ParcelaAvgOrderByAggregateInput
    _max?: ParcelaMaxOrderByAggregateInput
    _min?: ParcelaMinOrderByAggregateInput
    _sum?: ParcelaSumOrderByAggregateInput
  }

  export type ParcelaScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ParcelaScalarWhereWithAggregatesInput>
    OR?: Enumerable<ParcelaScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ParcelaScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    valorEmCents?: IntWithAggregatesFilter | number
    numParcela?: IntWithAggregatesFilter | number
    status?: EnumStatusPagamentoEnumWithAggregatesFilter | StatusPagamentoEnum
    lancamentoFinanceiroUid?: StringWithAggregatesFilter | string
  }

  export type PagamentoWhereInput = {
    AND?: Enumerable<PagamentoWhereInput>
    OR?: Enumerable<PagamentoWhereInput>
    NOT?: Enumerable<PagamentoWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    dt?: DateTimeFilter | Date | string
    valorEmCents?: IntFilter | number
    parcelaUid?: StringFilter | string
    parcela?: XOR<ParcelaRelationFilter, ParcelaWhereInput>
  }

  export type PagamentoOrderByWithRelationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    dt?: SortOrder
    valorEmCents?: SortOrder
    parcelaUid?: SortOrder
    parcela?: ParcelaOrderByWithRelationInput
  }

  export type PagamentoWhereUniqueInput = {
    uid?: string
  }

  export type PagamentoOrderByWithAggregationInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    dt?: SortOrder
    valorEmCents?: SortOrder
    parcelaUid?: SortOrder
    _count?: PagamentoCountOrderByAggregateInput
    _avg?: PagamentoAvgOrderByAggregateInput
    _max?: PagamentoMaxOrderByAggregateInput
    _min?: PagamentoMinOrderByAggregateInput
    _sum?: PagamentoSumOrderByAggregateInput
  }

  export type PagamentoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PagamentoScalarWhereWithAggregatesInput>
    OR?: Enumerable<PagamentoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PagamentoScalarWhereWithAggregatesInput>
    uid?: StringWithAggregatesFilter | string
    criadoEm?: DateTimeWithAggregatesFilter | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter | Date | string
    dt?: DateTimeWithAggregatesFilter | Date | string
    valorEmCents?: IntWithAggregatesFilter | number
    parcelaUid?: StringWithAggregatesFilter | string
  }

  export type ContatoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoDentista?: ServicoCreateNestedManyWithoutDentistaInput
    servicosComoPaciente?: ServicoCreateNestedManyWithoutPacientesInput
    usuario?: UsuarioCreateNestedOneWithoutContatoInput
    lancamentosRecebidos?: LancamentoSaidaCreateNestedManyWithoutParaQuemInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoDentista?: ServicoUncheckedCreateNestedManyWithoutDentistaInput
    servicosComoPaciente?: ServicoUncheckedCreateNestedManyWithoutPacientesInput
    usuario?: UsuarioUncheckedCreateNestedOneWithoutContatoInput
    lancamentosRecebidos?: LancamentoSaidaUncheckedCreateNestedManyWithoutParaQuemInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoDentista?: ServicoUpdateManyWithoutDentistaNestedInput
    servicosComoPaciente?: ServicoUpdateManyWithoutPacientesNestedInput
    usuario?: UsuarioUpdateOneWithoutContatoNestedInput
    lancamentosRecebidos?: LancamentoSaidaUpdateManyWithoutParaQuemNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoDentista?: ServicoUncheckedUpdateManyWithoutDentistaNestedInput
    servicosComoPaciente?: ServicoUncheckedUpdateManyWithoutPacientesNestedInput
    usuario?: UsuarioUncheckedUpdateOneWithoutContatoNestedInput
    lancamentosRecebidos?: LancamentoSaidaUncheckedUpdateManyWithoutParaQuemNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ContatoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type UsuarioCreateInput = {
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    email: string
    username?: string | null
    senha: string
    contato: ContatoCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    contatoUid: string
    email: string
    username?: string | null
    senha: string
  }

  export type UsuarioUpdateInput = {
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    contato?: ContatoUpdateOneRequiredWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    contatoUid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioCreateManyInput = {
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    contatoUid: string
    email: string
    username?: string | null
    senha: string
  }

  export type UsuarioUpdateManyMutationInput = {
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    contatoUid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type ProdutoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    valores?: ValorProdutoCreateNestedManyWithoutProdutoInput
    servicos?: ProdutoServicoCreateNestedManyWithoutProdutoInput
    tipoProduto: TipoProdutoCreateNestedOneWithoutProdutosInput
    marcaProduto?: MarcaProdutoCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    tipo: string
    marca?: string | null
    valores?: ValorProdutoUncheckedCreateNestedManyWithoutProdutoInput
    servicos?: ProdutoServicoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    valores?: ValorProdutoUpdateManyWithoutProdutoNestedInput
    servicos?: ProdutoServicoUpdateManyWithoutProdutoNestedInput
    tipoProduto?: TipoProdutoUpdateOneRequiredWithoutProdutosNestedInput
    marcaProduto?: MarcaProdutoUpdateOneWithoutProdutosNestedInput
  }

  export type ProdutoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    marca?: NullableStringFieldUpdateOperationsInput | string | null
    valores?: ValorProdutoUncheckedUpdateManyWithoutProdutoNestedInput
    servicos?: ProdutoServicoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    tipo: string
    marca?: string | null
  }

  export type ProdutoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProdutoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    marca?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TipoProdutoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    produtos?: ProdutoCreateNestedManyWithoutTipoProdutoInput
  }

  export type TipoProdutoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    produtos?: ProdutoUncheckedCreateNestedManyWithoutTipoProdutoInput
  }

  export type TipoProdutoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    produtos?: ProdutoUpdateManyWithoutTipoProdutoNestedInput
  }

  export type TipoProdutoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    produtos?: ProdutoUncheckedUpdateManyWithoutTipoProdutoNestedInput
  }

  export type TipoProdutoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type TipoProdutoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TipoProdutoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarcaProdutoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    produtos?: ProdutoCreateNestedManyWithoutMarcaProdutoInput
  }

  export type MarcaProdutoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    produtos?: ProdutoUncheckedCreateNestedManyWithoutMarcaProdutoInput
  }

  export type MarcaProdutoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    produtos?: ProdutoUpdateManyWithoutMarcaProdutoNestedInput
  }

  export type MarcaProdutoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    produtos?: ProdutoUncheckedUpdateManyWithoutMarcaProdutoNestedInput
  }

  export type MarcaProdutoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type MarcaProdutoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarcaProdutoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ValorProdutoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    espOdont: boolean
    valorEmCents: number
    dtFim?: Date | string | null
    produto: ProdutoCreateNestedOneWithoutValoresInput
  }

  export type ValorProdutoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    espOdont: boolean
    valorEmCents: number
    dtFim?: Date | string | null
    produtoUid: string
  }

  export type ValorProdutoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    valorEmCents?: IntFieldUpdateOperationsInput | number
    dtFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    produto?: ProdutoUpdateOneRequiredWithoutValoresNestedInput
  }

  export type ValorProdutoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    valorEmCents?: IntFieldUpdateOperationsInput | number
    dtFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    produtoUid?: StringFieldUpdateOperationsInput | string
  }

  export type ValorProdutoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    espOdont: boolean
    valorEmCents: number
    dtFim?: Date | string | null
    produtoUid: string
  }

  export type ValorProdutoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    valorEmCents?: IntFieldUpdateOperationsInput | number
    dtFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ValorProdutoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    valorEmCents?: IntFieldUpdateOperationsInput | number
    dtFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    produtoUid?: StringFieldUpdateOperationsInput | string
  }

  export type ServicoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    itens?: ProdutoServicoCreateNestedManyWithoutServicoInput
    lancamentos?: LancamentoFinanceiroCreateNestedManyWithoutServicoInput
    pacientes?: ContatoCreateNestedManyWithoutServicosComoPacienteInput
    dentista: ContatoCreateNestedOneWithoutServicosComoDentistaInput
  }

  export type ServicoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    dentistaUid: string
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    itens?: ProdutoServicoUncheckedCreateNestedManyWithoutServicoInput
    lancamentos?: LancamentoFinanceiroUncheckedCreateNestedManyWithoutServicoInput
    pacientes?: ContatoUncheckedCreateNestedManyWithoutServicosComoPacienteInput
  }

  export type ServicoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    itens?: ProdutoServicoUpdateManyWithoutServicoNestedInput
    lancamentos?: LancamentoFinanceiroUpdateManyWithoutServicoNestedInput
    pacientes?: ContatoUpdateManyWithoutServicosComoPacienteNestedInput
    dentista?: ContatoUpdateOneRequiredWithoutServicosComoDentistaNestedInput
  }

  export type ServicoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    dentistaUid?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    itens?: ProdutoServicoUncheckedUpdateManyWithoutServicoNestedInput
    lancamentos?: LancamentoFinanceiroUncheckedUpdateManyWithoutServicoNestedInput
    pacientes?: ContatoUncheckedUpdateManyWithoutServicosComoPacienteNestedInput
  }

  export type ServicoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    dentistaUid: string
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
  }

  export type ServicoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServicoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    dentistaUid?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProdutoServicoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    produto: ProdutoCreateNestedOneWithoutServicosInput
    servico: ServicoCreateNestedOneWithoutItensInput
    etapaFabricacao: EtapaFabricacaoCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoServicoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    produtoUid: string
    servicoUid: string
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    etapa: string
  }

  export type ProdutoServicoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    produto?: ProdutoUpdateOneRequiredWithoutServicosNestedInput
    servico?: ServicoUpdateOneRequiredWithoutItensNestedInput
    etapaFabricacao?: EtapaFabricacaoUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type ProdutoServicoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    produtoUid?: StringFieldUpdateOperationsInput | string
    servicoUid?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    etapa?: StringFieldUpdateOperationsInput | string
  }

  export type ProdutoServicoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    produtoUid: string
    servicoUid: string
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    etapa: string
  }

  export type ProdutoServicoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProdutoServicoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    produtoUid?: StringFieldUpdateOperationsInput | string
    servicoUid?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    etapa?: StringFieldUpdateOperationsInput | string
  }

  export type EtapaFabricacaoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    produtos?: ProdutoServicoCreateNestedManyWithoutEtapaFabricacaoInput
  }

  export type EtapaFabricacaoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    produtos?: ProdutoServicoUncheckedCreateNestedManyWithoutEtapaFabricacaoInput
  }

  export type EtapaFabricacaoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    produtos?: ProdutoServicoUpdateManyWithoutEtapaFabricacaoNestedInput
  }

  export type EtapaFabricacaoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    produtos?: ProdutoServicoUncheckedUpdateManyWithoutEtapaFabricacaoNestedInput
  }

  export type EtapaFabricacaoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type EtapaFabricacaoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EtapaFabricacaoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LancamentoFinanceiroCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    saida?: LancamentoSaidaCreateNestedOneWithoutLancamentoFinanceiroInput
    parcelas?: ParcelaCreateNestedManyWithoutLancamentoInput
    formaDePagamento?: FormaPagamentoEnum
    servico?: ServicoCreateNestedOneWithoutLancamentosInput
  }

  export type LancamentoFinanceiroUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    saida?: LancamentoSaidaUncheckedCreateNestedOneWithoutLancamentoFinanceiroInput
    servicoUid?: string | null
    parcelas?: ParcelaUncheckedCreateNestedManyWithoutLancamentoInput
    formaDePagamento?: FormaPagamentoEnum
  }

  export type LancamentoFinanceiroUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    saida?: LancamentoSaidaUpdateOneWithoutLancamentoFinanceiroNestedInput
    parcelas?: ParcelaUpdateManyWithoutLancamentoNestedInput
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
    servico?: ServicoUpdateOneWithoutLancamentosNestedInput
  }

  export type LancamentoFinanceiroUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    saida?: LancamentoSaidaUncheckedUpdateOneWithoutLancamentoFinanceiroNestedInput
    servicoUid?: NullableStringFieldUpdateOperationsInput | string | null
    parcelas?: ParcelaUncheckedUpdateManyWithoutLancamentoNestedInput
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
  }

  export type LancamentoFinanceiroCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    servicoUid?: string | null
    formaDePagamento?: FormaPagamentoEnum
  }

  export type LancamentoFinanceiroUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
  }

  export type LancamentoFinanceiroUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    servicoUid?: NullableStringFieldUpdateOperationsInput | string | null
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
  }

  export type LancamentoSaidaCreateInput = {
    finalidade: FinalidadeSaidaEnum
    paraQuem: ContatoCreateNestedOneWithoutLancamentosRecebidosInput
    lancamentoFinanceiro: LancamentoFinanceiroCreateNestedOneWithoutSaidaInput
  }

  export type LancamentoSaidaUncheckedCreateInput = {
    uid: string
    paraQuemUid: string
    finalidade: FinalidadeSaidaEnum
  }

  export type LancamentoSaidaUpdateInput = {
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
    paraQuem?: ContatoUpdateOneRequiredWithoutLancamentosRecebidosNestedInput
    lancamentoFinanceiro?: LancamentoFinanceiroUpdateOneRequiredWithoutSaidaNestedInput
  }

  export type LancamentoSaidaUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    paraQuemUid?: StringFieldUpdateOperationsInput | string
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
  }

  export type LancamentoSaidaCreateManyInput = {
    uid: string
    paraQuemUid: string
    finalidade: FinalidadeSaidaEnum
  }

  export type LancamentoSaidaUpdateManyMutationInput = {
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
  }

  export type LancamentoSaidaUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    paraQuemUid?: StringFieldUpdateOperationsInput | string
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
  }

  export type ParcelaCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    valorEmCents: number
    numParcela?: number
    status: StatusPagamentoEnum
    pagamentos?: PagamentoCreateNestedManyWithoutParcelaInput
    lancamento: LancamentoFinanceiroCreateNestedOneWithoutParcelasInput
  }

  export type ParcelaUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    valorEmCents: number
    numParcela?: number
    status: StatusPagamentoEnum
    pagamentos?: PagamentoUncheckedCreateNestedManyWithoutParcelaInput
    lancamentoFinanceiroUid: string
  }

  export type ParcelaUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
    pagamentos?: PagamentoUpdateManyWithoutParcelaNestedInput
    lancamento?: LancamentoFinanceiroUpdateOneRequiredWithoutParcelasNestedInput
  }

  export type ParcelaUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
    pagamentos?: PagamentoUncheckedUpdateManyWithoutParcelaNestedInput
    lancamentoFinanceiroUid?: StringFieldUpdateOperationsInput | string
  }

  export type ParcelaCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    valorEmCents: number
    numParcela?: number
    status: StatusPagamentoEnum
    lancamentoFinanceiroUid: string
  }

  export type ParcelaUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
  }

  export type ParcelaUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
    lancamentoFinanceiroUid?: StringFieldUpdateOperationsInput | string
  }

  export type PagamentoCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    dt?: Date | string
    valorEmCents: number
    parcela: ParcelaCreateNestedOneWithoutPagamentosInput
  }

  export type PagamentoUncheckedCreateInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    dt?: Date | string
    valorEmCents: number
    parcelaUid: string
  }

  export type PagamentoUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    dt?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    parcela?: ParcelaUpdateOneRequiredWithoutPagamentosNestedInput
  }

  export type PagamentoUncheckedUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    dt?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    parcelaUid?: StringFieldUpdateOperationsInput | string
  }

  export type PagamentoCreateManyInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    dt?: Date | string
    valorEmCents: number
    parcelaUid: string
  }

  export type PagamentoUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    dt?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
  }

  export type PagamentoUncheckedUpdateManyInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    dt?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    parcelaUid?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type ServicoListRelationFilter = {
    every?: ServicoWhereInput
    some?: ServicoWhereInput
    none?: ServicoWhereInput
  }

  export type UsuarioRelationFilter = {
    is?: UsuarioWhereInput | null
    isNot?: UsuarioWhereInput | null
  }

  export type LancamentoSaidaListRelationFilter = {
    every?: LancamentoSaidaWhereInput
    some?: LancamentoSaidaWhereInput
    none?: LancamentoSaidaWhereInput
  }

  export type EnumRoleEnumNullableListFilter = {
    equals?: Enumerable<RoleEnum> | null
    has?: RoleEnum | null
    hasEvery?: Enumerable<RoleEnum>
    hasSome?: Enumerable<RoleEnum>
    isEmpty?: boolean
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type ServicoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LancamentoSaidaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContatoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    categorias?: SortOrder
    telefones?: SortOrder
  }

  export type ContatoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
  }

  export type ContatoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type ContatoRelationFilter = {
    is?: ContatoWhereInput
    isNot?: ContatoWhereInput
  }

  export type UsuarioCountOrderByAggregateInput = {
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    contatoUid?: SortOrder
    email?: SortOrder
    username?: SortOrder
    senha?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    contatoUid?: SortOrder
    email?: SortOrder
    username?: SortOrder
    senha?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    contatoUid?: SortOrder
    email?: SortOrder
    username?: SortOrder
    senha?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type ValorProdutoListRelationFilter = {
    every?: ValorProdutoWhereInput
    some?: ValorProdutoWhereInput
    none?: ValorProdutoWhereInput
  }

  export type ProdutoServicoListRelationFilter = {
    every?: ProdutoServicoWhereInput
    some?: ProdutoServicoWhereInput
    none?: ProdutoServicoWhereInput
  }

  export type TipoProdutoRelationFilter = {
    is?: TipoProdutoWhereInput
    isNot?: TipoProdutoWhereInput
  }

  export type MarcaProdutoRelationFilter = {
    is?: MarcaProdutoWhereInput | null
    isNot?: MarcaProdutoWhereInput | null
  }

  export type ValorProdutoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProdutoServicoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProdutoNomeTipoMarcaCompoundUniqueInput = {
    nome: string
    tipo: string
    marca: string
  }

  export type ProdutoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    tipo?: SortOrder
    marca?: SortOrder
  }

  export type ProdutoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    tipo?: SortOrder
    marca?: SortOrder
  }

  export type ProdutoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    tipo?: SortOrder
    marca?: SortOrder
  }

  export type ProdutoListRelationFilter = {
    every?: ProdutoWhereInput
    some?: ProdutoWhereInput
    none?: ProdutoWhereInput
  }

  export type ProdutoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TipoProdutoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type TipoProdutoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type TipoProdutoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type MarcaProdutoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type MarcaProdutoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type MarcaProdutoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type ProdutoRelationFilter = {
    is?: ProdutoWhereInput
    isNot?: ProdutoWhereInput
  }

  export type ValorProdutoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    espOdont?: SortOrder
    valorEmCents?: SortOrder
    dtFim?: SortOrder
    produtoUid?: SortOrder
  }

  export type ValorProdutoAvgOrderByAggregateInput = {
    valorEmCents?: SortOrder
  }

  export type ValorProdutoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    espOdont?: SortOrder
    valorEmCents?: SortOrder
    dtFim?: SortOrder
    produtoUid?: SortOrder
  }

  export type ValorProdutoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    espOdont?: SortOrder
    valorEmCents?: SortOrder
    dtFim?: SortOrder
    produtoUid?: SortOrder
  }

  export type ValorProdutoSumOrderByAggregateInput = {
    valorEmCents?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type LancamentoFinanceiroListRelationFilter = {
    every?: LancamentoFinanceiroWhereInput
    some?: LancamentoFinanceiroWhereInput
    none?: LancamentoFinanceiroWhereInput
  }

  export type ContatoListRelationFilter = {
    every?: ContatoWhereInput
    some?: ContatoWhereInput
    none?: ContatoWhereInput
  }

  export type LancamentoFinanceiroOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContatoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServicoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    dentistaUid?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    espOdont?: SortOrder
  }

  export type ServicoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    dentistaUid?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    espOdont?: SortOrder
  }

  export type ServicoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    dentistaUid?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    espOdont?: SortOrder
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type ServicoRelationFilter = {
    is?: ServicoWhereInput
    isNot?: ServicoWhereInput
  }

  export type EtapaFabricacaoRelationFilter = {
    is?: EtapaFabricacaoWhereInput
    isNot?: EtapaFabricacaoWhereInput
  }

  export type ProdutoServicoProdutoUidServicoUidCompoundUniqueInput = {
    produtoUid: string
    servicoUid: string
  }

  export type ProdutoServicoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    produtoUid?: SortOrder
    servicoUid?: SortOrder
    quantidade?: SortOrder
    descontoEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    etapa?: SortOrder
  }

  export type ProdutoServicoAvgOrderByAggregateInput = {
    quantidade?: SortOrder
    descontoEmCents?: SortOrder
  }

  export type ProdutoServicoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    produtoUid?: SortOrder
    servicoUid?: SortOrder
    quantidade?: SortOrder
    descontoEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    etapa?: SortOrder
  }

  export type ProdutoServicoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    produtoUid?: SortOrder
    servicoUid?: SortOrder
    quantidade?: SortOrder
    descontoEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    etapa?: SortOrder
  }

  export type ProdutoServicoSumOrderByAggregateInput = {
    quantidade?: SortOrder
    descontoEmCents?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type EtapaFabricacaoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type EtapaFabricacaoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type EtapaFabricacaoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type LancamentoSaidaRelationFilter = {
    is?: LancamentoSaidaWhereInput | null
    isNot?: LancamentoSaidaWhereInput | null
  }

  export type ParcelaListRelationFilter = {
    every?: ParcelaWhereInput
    some?: ParcelaWhereInput
    none?: ParcelaWhereInput
  }

  export type EnumFormaPagamentoEnumFilter = {
    equals?: FormaPagamentoEnum
    in?: Enumerable<FormaPagamentoEnum>
    notIn?: Enumerable<FormaPagamentoEnum>
    not?: NestedEnumFormaPagamentoEnumFilter | FormaPagamentoEnum
  }

  export type ParcelaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LancamentoFinanceiroCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    qtdParcelas?: SortOrder
    dtLancamento?: SortOrder
    dtPrimeiroVencimento?: SortOrder
    intervaloDiasEntreParcelas?: SortOrder
    valorEntradaEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    servicoUid?: SortOrder
    formaDePagamento?: SortOrder
  }

  export type LancamentoFinanceiroAvgOrderByAggregateInput = {
    qtdParcelas?: SortOrder
    intervaloDiasEntreParcelas?: SortOrder
    valorEntradaEmCents?: SortOrder
  }

  export type LancamentoFinanceiroMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    qtdParcelas?: SortOrder
    dtLancamento?: SortOrder
    dtPrimeiroVencimento?: SortOrder
    intervaloDiasEntreParcelas?: SortOrder
    valorEntradaEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    servicoUid?: SortOrder
    formaDePagamento?: SortOrder
  }

  export type LancamentoFinanceiroMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    ativo?: SortOrder
    qtdParcelas?: SortOrder
    dtLancamento?: SortOrder
    dtPrimeiroVencimento?: SortOrder
    intervaloDiasEntreParcelas?: SortOrder
    valorEntradaEmCents?: SortOrder
    descricao?: SortOrder
    observacoes?: SortOrder
    servicoUid?: SortOrder
    formaDePagamento?: SortOrder
  }

  export type LancamentoFinanceiroSumOrderByAggregateInput = {
    qtdParcelas?: SortOrder
    intervaloDiasEntreParcelas?: SortOrder
    valorEntradaEmCents?: SortOrder
  }

  export type EnumFormaPagamentoEnumWithAggregatesFilter = {
    equals?: FormaPagamentoEnum
    in?: Enumerable<FormaPagamentoEnum>
    notIn?: Enumerable<FormaPagamentoEnum>
    not?: NestedEnumFormaPagamentoEnumWithAggregatesFilter | FormaPagamentoEnum
    _count?: NestedIntFilter
    _min?: NestedEnumFormaPagamentoEnumFilter
    _max?: NestedEnumFormaPagamentoEnumFilter
  }

  export type EnumFinalidadeSaidaEnumFilter = {
    equals?: FinalidadeSaidaEnum
    in?: Enumerable<FinalidadeSaidaEnum>
    notIn?: Enumerable<FinalidadeSaidaEnum>
    not?: NestedEnumFinalidadeSaidaEnumFilter | FinalidadeSaidaEnum
  }

  export type LancamentoFinanceiroRelationFilter = {
    is?: LancamentoFinanceiroWhereInput
    isNot?: LancamentoFinanceiroWhereInput
  }

  export type LancamentoSaidaCountOrderByAggregateInput = {
    uid?: SortOrder
    paraQuemUid?: SortOrder
    finalidade?: SortOrder
  }

  export type LancamentoSaidaMaxOrderByAggregateInput = {
    uid?: SortOrder
    paraQuemUid?: SortOrder
    finalidade?: SortOrder
  }

  export type LancamentoSaidaMinOrderByAggregateInput = {
    uid?: SortOrder
    paraQuemUid?: SortOrder
    finalidade?: SortOrder
  }

  export type EnumFinalidadeSaidaEnumWithAggregatesFilter = {
    equals?: FinalidadeSaidaEnum
    in?: Enumerable<FinalidadeSaidaEnum>
    notIn?: Enumerable<FinalidadeSaidaEnum>
    not?: NestedEnumFinalidadeSaidaEnumWithAggregatesFilter | FinalidadeSaidaEnum
    _count?: NestedIntFilter
    _min?: NestedEnumFinalidadeSaidaEnumFilter
    _max?: NestedEnumFinalidadeSaidaEnumFilter
  }

  export type EnumStatusPagamentoEnumFilter = {
    equals?: StatusPagamentoEnum
    in?: Enumerable<StatusPagamentoEnum>
    notIn?: Enumerable<StatusPagamentoEnum>
    not?: NestedEnumStatusPagamentoEnumFilter | StatusPagamentoEnum
  }

  export type PagamentoListRelationFilter = {
    every?: PagamentoWhereInput
    some?: PagamentoWhereInput
    none?: PagamentoWhereInput
  }

  export type PagamentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParcelaCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    valorEmCents?: SortOrder
    numParcela?: SortOrder
    status?: SortOrder
    lancamentoFinanceiroUid?: SortOrder
  }

  export type ParcelaAvgOrderByAggregateInput = {
    valorEmCents?: SortOrder
    numParcela?: SortOrder
  }

  export type ParcelaMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    valorEmCents?: SortOrder
    numParcela?: SortOrder
    status?: SortOrder
    lancamentoFinanceiroUid?: SortOrder
  }

  export type ParcelaMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    valorEmCents?: SortOrder
    numParcela?: SortOrder
    status?: SortOrder
    lancamentoFinanceiroUid?: SortOrder
  }

  export type ParcelaSumOrderByAggregateInput = {
    valorEmCents?: SortOrder
    numParcela?: SortOrder
  }

  export type EnumStatusPagamentoEnumWithAggregatesFilter = {
    equals?: StatusPagamentoEnum
    in?: Enumerable<StatusPagamentoEnum>
    notIn?: Enumerable<StatusPagamentoEnum>
    not?: NestedEnumStatusPagamentoEnumWithAggregatesFilter | StatusPagamentoEnum
    _count?: NestedIntFilter
    _min?: NestedEnumStatusPagamentoEnumFilter
    _max?: NestedEnumStatusPagamentoEnumFilter
  }

  export type ParcelaRelationFilter = {
    is?: ParcelaWhereInput
    isNot?: ParcelaWhereInput
  }

  export type PagamentoCountOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    dt?: SortOrder
    valorEmCents?: SortOrder
    parcelaUid?: SortOrder
  }

  export type PagamentoAvgOrderByAggregateInput = {
    valorEmCents?: SortOrder
  }

  export type PagamentoMaxOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    dt?: SortOrder
    valorEmCents?: SortOrder
    parcelaUid?: SortOrder
  }

  export type PagamentoMinOrderByAggregateInput = {
    uid?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    dt?: SortOrder
    valorEmCents?: SortOrder
    parcelaUid?: SortOrder
  }

  export type PagamentoSumOrderByAggregateInput = {
    valorEmCents?: SortOrder
  }

  export type ServicoCreateNestedManyWithoutDentistaInput = {
    create?: XOR<Enumerable<ServicoCreateWithoutDentistaInput>, Enumerable<ServicoUncheckedCreateWithoutDentistaInput>>
    connectOrCreate?: Enumerable<ServicoCreateOrConnectWithoutDentistaInput>
    createMany?: ServicoCreateManyDentistaInputEnvelope
    connect?: Enumerable<ServicoWhereUniqueInput>
  }

  export type ServicoCreateNestedManyWithoutPacientesInput = {
    create?: XOR<Enumerable<ServicoCreateWithoutPacientesInput>, Enumerable<ServicoUncheckedCreateWithoutPacientesInput>>
    connectOrCreate?: Enumerable<ServicoCreateOrConnectWithoutPacientesInput>
    connect?: Enumerable<ServicoWhereUniqueInput>
  }

  export type UsuarioCreateNestedOneWithoutContatoInput = {
    create?: XOR<UsuarioCreateWithoutContatoInput, UsuarioUncheckedCreateWithoutContatoInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutContatoInput
    connect?: UsuarioWhereUniqueInput
  }

  export type LancamentoSaidaCreateNestedManyWithoutParaQuemInput = {
    create?: XOR<Enumerable<LancamentoSaidaCreateWithoutParaQuemInput>, Enumerable<LancamentoSaidaUncheckedCreateWithoutParaQuemInput>>
    connectOrCreate?: Enumerable<LancamentoSaidaCreateOrConnectWithoutParaQuemInput>
    createMany?: LancamentoSaidaCreateManyParaQuemInputEnvelope
    connect?: Enumerable<LancamentoSaidaWhereUniqueInput>
  }

  export type ContatoCreatecategoriasInput = {
    set: Enumerable<RoleEnum>
  }

  export type ContatoCreatetelefonesInput = {
    set: Enumerable<string>
  }

  export type ServicoUncheckedCreateNestedManyWithoutDentistaInput = {
    create?: XOR<Enumerable<ServicoCreateWithoutDentistaInput>, Enumerable<ServicoUncheckedCreateWithoutDentistaInput>>
    connectOrCreate?: Enumerable<ServicoCreateOrConnectWithoutDentistaInput>
    createMany?: ServicoCreateManyDentistaInputEnvelope
    connect?: Enumerable<ServicoWhereUniqueInput>
  }

  export type ServicoUncheckedCreateNestedManyWithoutPacientesInput = {
    create?: XOR<Enumerable<ServicoCreateWithoutPacientesInput>, Enumerable<ServicoUncheckedCreateWithoutPacientesInput>>
    connectOrCreate?: Enumerable<ServicoCreateOrConnectWithoutPacientesInput>
    connect?: Enumerable<ServicoWhereUniqueInput>
  }

  export type UsuarioUncheckedCreateNestedOneWithoutContatoInput = {
    create?: XOR<UsuarioCreateWithoutContatoInput, UsuarioUncheckedCreateWithoutContatoInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutContatoInput
    connect?: UsuarioWhereUniqueInput
  }

  export type LancamentoSaidaUncheckedCreateNestedManyWithoutParaQuemInput = {
    create?: XOR<Enumerable<LancamentoSaidaCreateWithoutParaQuemInput>, Enumerable<LancamentoSaidaUncheckedCreateWithoutParaQuemInput>>
    connectOrCreate?: Enumerable<LancamentoSaidaCreateOrConnectWithoutParaQuemInput>
    createMany?: LancamentoSaidaCreateManyParaQuemInputEnvelope
    connect?: Enumerable<LancamentoSaidaWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ServicoUpdateManyWithoutDentistaNestedInput = {
    create?: XOR<Enumerable<ServicoCreateWithoutDentistaInput>, Enumerable<ServicoUncheckedCreateWithoutDentistaInput>>
    connectOrCreate?: Enumerable<ServicoCreateOrConnectWithoutDentistaInput>
    upsert?: Enumerable<ServicoUpsertWithWhereUniqueWithoutDentistaInput>
    createMany?: ServicoCreateManyDentistaInputEnvelope
    set?: Enumerable<ServicoWhereUniqueInput>
    disconnect?: Enumerable<ServicoWhereUniqueInput>
    delete?: Enumerable<ServicoWhereUniqueInput>
    connect?: Enumerable<ServicoWhereUniqueInput>
    update?: Enumerable<ServicoUpdateWithWhereUniqueWithoutDentistaInput>
    updateMany?: Enumerable<ServicoUpdateManyWithWhereWithoutDentistaInput>
    deleteMany?: Enumerable<ServicoScalarWhereInput>
  }

  export type ServicoUpdateManyWithoutPacientesNestedInput = {
    create?: XOR<Enumerable<ServicoCreateWithoutPacientesInput>, Enumerable<ServicoUncheckedCreateWithoutPacientesInput>>
    connectOrCreate?: Enumerable<ServicoCreateOrConnectWithoutPacientesInput>
    upsert?: Enumerable<ServicoUpsertWithWhereUniqueWithoutPacientesInput>
    set?: Enumerable<ServicoWhereUniqueInput>
    disconnect?: Enumerable<ServicoWhereUniqueInput>
    delete?: Enumerable<ServicoWhereUniqueInput>
    connect?: Enumerable<ServicoWhereUniqueInput>
    update?: Enumerable<ServicoUpdateWithWhereUniqueWithoutPacientesInput>
    updateMany?: Enumerable<ServicoUpdateManyWithWhereWithoutPacientesInput>
    deleteMany?: Enumerable<ServicoScalarWhereInput>
  }

  export type UsuarioUpdateOneWithoutContatoNestedInput = {
    create?: XOR<UsuarioCreateWithoutContatoInput, UsuarioUncheckedCreateWithoutContatoInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutContatoInput
    upsert?: UsuarioUpsertWithoutContatoInput
    disconnect?: boolean
    delete?: boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<UsuarioUpdateWithoutContatoInput, UsuarioUncheckedUpdateWithoutContatoInput>
  }

  export type LancamentoSaidaUpdateManyWithoutParaQuemNestedInput = {
    create?: XOR<Enumerable<LancamentoSaidaCreateWithoutParaQuemInput>, Enumerable<LancamentoSaidaUncheckedCreateWithoutParaQuemInput>>
    connectOrCreate?: Enumerable<LancamentoSaidaCreateOrConnectWithoutParaQuemInput>
    upsert?: Enumerable<LancamentoSaidaUpsertWithWhereUniqueWithoutParaQuemInput>
    createMany?: LancamentoSaidaCreateManyParaQuemInputEnvelope
    set?: Enumerable<LancamentoSaidaWhereUniqueInput>
    disconnect?: Enumerable<LancamentoSaidaWhereUniqueInput>
    delete?: Enumerable<LancamentoSaidaWhereUniqueInput>
    connect?: Enumerable<LancamentoSaidaWhereUniqueInput>
    update?: Enumerable<LancamentoSaidaUpdateWithWhereUniqueWithoutParaQuemInput>
    updateMany?: Enumerable<LancamentoSaidaUpdateManyWithWhereWithoutParaQuemInput>
    deleteMany?: Enumerable<LancamentoSaidaScalarWhereInput>
  }

  export type ContatoUpdatecategoriasInput = {
    set?: Enumerable<RoleEnum>
    push?: Enumerable<RoleEnum>
  }

  export type ContatoUpdatetelefonesInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type ServicoUncheckedUpdateManyWithoutDentistaNestedInput = {
    create?: XOR<Enumerable<ServicoCreateWithoutDentistaInput>, Enumerable<ServicoUncheckedCreateWithoutDentistaInput>>
    connectOrCreate?: Enumerable<ServicoCreateOrConnectWithoutDentistaInput>
    upsert?: Enumerable<ServicoUpsertWithWhereUniqueWithoutDentistaInput>
    createMany?: ServicoCreateManyDentistaInputEnvelope
    set?: Enumerable<ServicoWhereUniqueInput>
    disconnect?: Enumerable<ServicoWhereUniqueInput>
    delete?: Enumerable<ServicoWhereUniqueInput>
    connect?: Enumerable<ServicoWhereUniqueInput>
    update?: Enumerable<ServicoUpdateWithWhereUniqueWithoutDentistaInput>
    updateMany?: Enumerable<ServicoUpdateManyWithWhereWithoutDentistaInput>
    deleteMany?: Enumerable<ServicoScalarWhereInput>
  }

  export type ServicoUncheckedUpdateManyWithoutPacientesNestedInput = {
    create?: XOR<Enumerable<ServicoCreateWithoutPacientesInput>, Enumerable<ServicoUncheckedCreateWithoutPacientesInput>>
    connectOrCreate?: Enumerable<ServicoCreateOrConnectWithoutPacientesInput>
    upsert?: Enumerable<ServicoUpsertWithWhereUniqueWithoutPacientesInput>
    set?: Enumerable<ServicoWhereUniqueInput>
    disconnect?: Enumerable<ServicoWhereUniqueInput>
    delete?: Enumerable<ServicoWhereUniqueInput>
    connect?: Enumerable<ServicoWhereUniqueInput>
    update?: Enumerable<ServicoUpdateWithWhereUniqueWithoutPacientesInput>
    updateMany?: Enumerable<ServicoUpdateManyWithWhereWithoutPacientesInput>
    deleteMany?: Enumerable<ServicoScalarWhereInput>
  }

  export type UsuarioUncheckedUpdateOneWithoutContatoNestedInput = {
    create?: XOR<UsuarioCreateWithoutContatoInput, UsuarioUncheckedCreateWithoutContatoInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutContatoInput
    upsert?: UsuarioUpsertWithoutContatoInput
    disconnect?: boolean
    delete?: boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<UsuarioUpdateWithoutContatoInput, UsuarioUncheckedUpdateWithoutContatoInput>
  }

  export type LancamentoSaidaUncheckedUpdateManyWithoutParaQuemNestedInput = {
    create?: XOR<Enumerable<LancamentoSaidaCreateWithoutParaQuemInput>, Enumerable<LancamentoSaidaUncheckedCreateWithoutParaQuemInput>>
    connectOrCreate?: Enumerable<LancamentoSaidaCreateOrConnectWithoutParaQuemInput>
    upsert?: Enumerable<LancamentoSaidaUpsertWithWhereUniqueWithoutParaQuemInput>
    createMany?: LancamentoSaidaCreateManyParaQuemInputEnvelope
    set?: Enumerable<LancamentoSaidaWhereUniqueInput>
    disconnect?: Enumerable<LancamentoSaidaWhereUniqueInput>
    delete?: Enumerable<LancamentoSaidaWhereUniqueInput>
    connect?: Enumerable<LancamentoSaidaWhereUniqueInput>
    update?: Enumerable<LancamentoSaidaUpdateWithWhereUniqueWithoutParaQuemInput>
    updateMany?: Enumerable<LancamentoSaidaUpdateManyWithWhereWithoutParaQuemInput>
    deleteMany?: Enumerable<LancamentoSaidaScalarWhereInput>
  }

  export type ContatoCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<ContatoCreateWithoutUsuarioInput, ContatoUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: ContatoCreateOrConnectWithoutUsuarioInput
    connect?: ContatoWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ContatoUpdateOneRequiredWithoutUsuarioNestedInput = {
    create?: XOR<ContatoCreateWithoutUsuarioInput, ContatoUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: ContatoCreateOrConnectWithoutUsuarioInput
    upsert?: ContatoUpsertWithoutUsuarioInput
    connect?: ContatoWhereUniqueInput
    update?: XOR<ContatoUpdateWithoutUsuarioInput, ContatoUncheckedUpdateWithoutUsuarioInput>
  }

  export type ValorProdutoCreateNestedManyWithoutProdutoInput = {
    create?: XOR<Enumerable<ValorProdutoCreateWithoutProdutoInput>, Enumerable<ValorProdutoUncheckedCreateWithoutProdutoInput>>
    connectOrCreate?: Enumerable<ValorProdutoCreateOrConnectWithoutProdutoInput>
    createMany?: ValorProdutoCreateManyProdutoInputEnvelope
    connect?: Enumerable<ValorProdutoWhereUniqueInput>
  }

  export type ProdutoServicoCreateNestedManyWithoutProdutoInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutProdutoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutProdutoInput>
    createMany?: ProdutoServicoCreateManyProdutoInputEnvelope
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
  }

  export type TipoProdutoCreateNestedOneWithoutProdutosInput = {
    create?: XOR<TipoProdutoCreateWithoutProdutosInput, TipoProdutoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: TipoProdutoCreateOrConnectWithoutProdutosInput
    connect?: TipoProdutoWhereUniqueInput
  }

  export type MarcaProdutoCreateNestedOneWithoutProdutosInput = {
    create?: XOR<MarcaProdutoCreateWithoutProdutosInput, MarcaProdutoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: MarcaProdutoCreateOrConnectWithoutProdutosInput
    connect?: MarcaProdutoWhereUniqueInput
  }

  export type ValorProdutoUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<Enumerable<ValorProdutoCreateWithoutProdutoInput>, Enumerable<ValorProdutoUncheckedCreateWithoutProdutoInput>>
    connectOrCreate?: Enumerable<ValorProdutoCreateOrConnectWithoutProdutoInput>
    createMany?: ValorProdutoCreateManyProdutoInputEnvelope
    connect?: Enumerable<ValorProdutoWhereUniqueInput>
  }

  export type ProdutoServicoUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutProdutoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutProdutoInput>
    createMany?: ProdutoServicoCreateManyProdutoInputEnvelope
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
  }

  export type ValorProdutoUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<Enumerable<ValorProdutoCreateWithoutProdutoInput>, Enumerable<ValorProdutoUncheckedCreateWithoutProdutoInput>>
    connectOrCreate?: Enumerable<ValorProdutoCreateOrConnectWithoutProdutoInput>
    upsert?: Enumerable<ValorProdutoUpsertWithWhereUniqueWithoutProdutoInput>
    createMany?: ValorProdutoCreateManyProdutoInputEnvelope
    set?: Enumerable<ValorProdutoWhereUniqueInput>
    disconnect?: Enumerable<ValorProdutoWhereUniqueInput>
    delete?: Enumerable<ValorProdutoWhereUniqueInput>
    connect?: Enumerable<ValorProdutoWhereUniqueInput>
    update?: Enumerable<ValorProdutoUpdateWithWhereUniqueWithoutProdutoInput>
    updateMany?: Enumerable<ValorProdutoUpdateManyWithWhereWithoutProdutoInput>
    deleteMany?: Enumerable<ValorProdutoScalarWhereInput>
  }

  export type ProdutoServicoUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutProdutoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutProdutoInput>
    upsert?: Enumerable<ProdutoServicoUpsertWithWhereUniqueWithoutProdutoInput>
    createMany?: ProdutoServicoCreateManyProdutoInputEnvelope
    set?: Enumerable<ProdutoServicoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoServicoWhereUniqueInput>
    delete?: Enumerable<ProdutoServicoWhereUniqueInput>
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
    update?: Enumerable<ProdutoServicoUpdateWithWhereUniqueWithoutProdutoInput>
    updateMany?: Enumerable<ProdutoServicoUpdateManyWithWhereWithoutProdutoInput>
    deleteMany?: Enumerable<ProdutoServicoScalarWhereInput>
  }

  export type TipoProdutoUpdateOneRequiredWithoutProdutosNestedInput = {
    create?: XOR<TipoProdutoCreateWithoutProdutosInput, TipoProdutoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: TipoProdutoCreateOrConnectWithoutProdutosInput
    upsert?: TipoProdutoUpsertWithoutProdutosInput
    connect?: TipoProdutoWhereUniqueInput
    update?: XOR<TipoProdutoUpdateWithoutProdutosInput, TipoProdutoUncheckedUpdateWithoutProdutosInput>
  }

  export type MarcaProdutoUpdateOneWithoutProdutosNestedInput = {
    create?: XOR<MarcaProdutoCreateWithoutProdutosInput, MarcaProdutoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: MarcaProdutoCreateOrConnectWithoutProdutosInput
    upsert?: MarcaProdutoUpsertWithoutProdutosInput
    disconnect?: boolean
    delete?: boolean
    connect?: MarcaProdutoWhereUniqueInput
    update?: XOR<MarcaProdutoUpdateWithoutProdutosInput, MarcaProdutoUncheckedUpdateWithoutProdutosInput>
  }

  export type ValorProdutoUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<Enumerable<ValorProdutoCreateWithoutProdutoInput>, Enumerable<ValorProdutoUncheckedCreateWithoutProdutoInput>>
    connectOrCreate?: Enumerable<ValorProdutoCreateOrConnectWithoutProdutoInput>
    upsert?: Enumerable<ValorProdutoUpsertWithWhereUniqueWithoutProdutoInput>
    createMany?: ValorProdutoCreateManyProdutoInputEnvelope
    set?: Enumerable<ValorProdutoWhereUniqueInput>
    disconnect?: Enumerable<ValorProdutoWhereUniqueInput>
    delete?: Enumerable<ValorProdutoWhereUniqueInput>
    connect?: Enumerable<ValorProdutoWhereUniqueInput>
    update?: Enumerable<ValorProdutoUpdateWithWhereUniqueWithoutProdutoInput>
    updateMany?: Enumerable<ValorProdutoUpdateManyWithWhereWithoutProdutoInput>
    deleteMany?: Enumerable<ValorProdutoScalarWhereInput>
  }

  export type ProdutoServicoUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutProdutoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutProdutoInput>
    upsert?: Enumerable<ProdutoServicoUpsertWithWhereUniqueWithoutProdutoInput>
    createMany?: ProdutoServicoCreateManyProdutoInputEnvelope
    set?: Enumerable<ProdutoServicoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoServicoWhereUniqueInput>
    delete?: Enumerable<ProdutoServicoWhereUniqueInput>
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
    update?: Enumerable<ProdutoServicoUpdateWithWhereUniqueWithoutProdutoInput>
    updateMany?: Enumerable<ProdutoServicoUpdateManyWithWhereWithoutProdutoInput>
    deleteMany?: Enumerable<ProdutoServicoScalarWhereInput>
  }

  export type ProdutoCreateNestedManyWithoutTipoProdutoInput = {
    create?: XOR<Enumerable<ProdutoCreateWithoutTipoProdutoInput>, Enumerable<ProdutoUncheckedCreateWithoutTipoProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoCreateOrConnectWithoutTipoProdutoInput>
    createMany?: ProdutoCreateManyTipoProdutoInputEnvelope
    connect?: Enumerable<ProdutoWhereUniqueInput>
  }

  export type ProdutoUncheckedCreateNestedManyWithoutTipoProdutoInput = {
    create?: XOR<Enumerable<ProdutoCreateWithoutTipoProdutoInput>, Enumerable<ProdutoUncheckedCreateWithoutTipoProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoCreateOrConnectWithoutTipoProdutoInput>
    createMany?: ProdutoCreateManyTipoProdutoInputEnvelope
    connect?: Enumerable<ProdutoWhereUniqueInput>
  }

  export type ProdutoUpdateManyWithoutTipoProdutoNestedInput = {
    create?: XOR<Enumerable<ProdutoCreateWithoutTipoProdutoInput>, Enumerable<ProdutoUncheckedCreateWithoutTipoProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoCreateOrConnectWithoutTipoProdutoInput>
    upsert?: Enumerable<ProdutoUpsertWithWhereUniqueWithoutTipoProdutoInput>
    createMany?: ProdutoCreateManyTipoProdutoInputEnvelope
    set?: Enumerable<ProdutoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoWhereUniqueInput>
    delete?: Enumerable<ProdutoWhereUniqueInput>
    connect?: Enumerable<ProdutoWhereUniqueInput>
    update?: Enumerable<ProdutoUpdateWithWhereUniqueWithoutTipoProdutoInput>
    updateMany?: Enumerable<ProdutoUpdateManyWithWhereWithoutTipoProdutoInput>
    deleteMany?: Enumerable<ProdutoScalarWhereInput>
  }

  export type ProdutoUncheckedUpdateManyWithoutTipoProdutoNestedInput = {
    create?: XOR<Enumerable<ProdutoCreateWithoutTipoProdutoInput>, Enumerable<ProdutoUncheckedCreateWithoutTipoProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoCreateOrConnectWithoutTipoProdutoInput>
    upsert?: Enumerable<ProdutoUpsertWithWhereUniqueWithoutTipoProdutoInput>
    createMany?: ProdutoCreateManyTipoProdutoInputEnvelope
    set?: Enumerable<ProdutoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoWhereUniqueInput>
    delete?: Enumerable<ProdutoWhereUniqueInput>
    connect?: Enumerable<ProdutoWhereUniqueInput>
    update?: Enumerable<ProdutoUpdateWithWhereUniqueWithoutTipoProdutoInput>
    updateMany?: Enumerable<ProdutoUpdateManyWithWhereWithoutTipoProdutoInput>
    deleteMany?: Enumerable<ProdutoScalarWhereInput>
  }

  export type ProdutoCreateNestedManyWithoutMarcaProdutoInput = {
    create?: XOR<Enumerable<ProdutoCreateWithoutMarcaProdutoInput>, Enumerable<ProdutoUncheckedCreateWithoutMarcaProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoCreateOrConnectWithoutMarcaProdutoInput>
    createMany?: ProdutoCreateManyMarcaProdutoInputEnvelope
    connect?: Enumerable<ProdutoWhereUniqueInput>
  }

  export type ProdutoUncheckedCreateNestedManyWithoutMarcaProdutoInput = {
    create?: XOR<Enumerable<ProdutoCreateWithoutMarcaProdutoInput>, Enumerable<ProdutoUncheckedCreateWithoutMarcaProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoCreateOrConnectWithoutMarcaProdutoInput>
    createMany?: ProdutoCreateManyMarcaProdutoInputEnvelope
    connect?: Enumerable<ProdutoWhereUniqueInput>
  }

  export type ProdutoUpdateManyWithoutMarcaProdutoNestedInput = {
    create?: XOR<Enumerable<ProdutoCreateWithoutMarcaProdutoInput>, Enumerable<ProdutoUncheckedCreateWithoutMarcaProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoCreateOrConnectWithoutMarcaProdutoInput>
    upsert?: Enumerable<ProdutoUpsertWithWhereUniqueWithoutMarcaProdutoInput>
    createMany?: ProdutoCreateManyMarcaProdutoInputEnvelope
    set?: Enumerable<ProdutoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoWhereUniqueInput>
    delete?: Enumerable<ProdutoWhereUniqueInput>
    connect?: Enumerable<ProdutoWhereUniqueInput>
    update?: Enumerable<ProdutoUpdateWithWhereUniqueWithoutMarcaProdutoInput>
    updateMany?: Enumerable<ProdutoUpdateManyWithWhereWithoutMarcaProdutoInput>
    deleteMany?: Enumerable<ProdutoScalarWhereInput>
  }

  export type ProdutoUncheckedUpdateManyWithoutMarcaProdutoNestedInput = {
    create?: XOR<Enumerable<ProdutoCreateWithoutMarcaProdutoInput>, Enumerable<ProdutoUncheckedCreateWithoutMarcaProdutoInput>>
    connectOrCreate?: Enumerable<ProdutoCreateOrConnectWithoutMarcaProdutoInput>
    upsert?: Enumerable<ProdutoUpsertWithWhereUniqueWithoutMarcaProdutoInput>
    createMany?: ProdutoCreateManyMarcaProdutoInputEnvelope
    set?: Enumerable<ProdutoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoWhereUniqueInput>
    delete?: Enumerable<ProdutoWhereUniqueInput>
    connect?: Enumerable<ProdutoWhereUniqueInput>
    update?: Enumerable<ProdutoUpdateWithWhereUniqueWithoutMarcaProdutoInput>
    updateMany?: Enumerable<ProdutoUpdateManyWithWhereWithoutMarcaProdutoInput>
    deleteMany?: Enumerable<ProdutoScalarWhereInput>
  }

  export type ProdutoCreateNestedOneWithoutValoresInput = {
    create?: XOR<ProdutoCreateWithoutValoresInput, ProdutoUncheckedCreateWithoutValoresInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutValoresInput
    connect?: ProdutoWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProdutoUpdateOneRequiredWithoutValoresNestedInput = {
    create?: XOR<ProdutoCreateWithoutValoresInput, ProdutoUncheckedCreateWithoutValoresInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutValoresInput
    upsert?: ProdutoUpsertWithoutValoresInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<ProdutoUpdateWithoutValoresInput, ProdutoUncheckedUpdateWithoutValoresInput>
  }

  export type ProdutoServicoCreateNestedManyWithoutServicoInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutServicoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutServicoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutServicoInput>
    createMany?: ProdutoServicoCreateManyServicoInputEnvelope
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
  }

  export type LancamentoFinanceiroCreateNestedManyWithoutServicoInput = {
    create?: XOR<Enumerable<LancamentoFinanceiroCreateWithoutServicoInput>, Enumerable<LancamentoFinanceiroUncheckedCreateWithoutServicoInput>>
    connectOrCreate?: Enumerable<LancamentoFinanceiroCreateOrConnectWithoutServicoInput>
    createMany?: LancamentoFinanceiroCreateManyServicoInputEnvelope
    connect?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
  }

  export type ContatoCreateNestedManyWithoutServicosComoPacienteInput = {
    create?: XOR<Enumerable<ContatoCreateWithoutServicosComoPacienteInput>, Enumerable<ContatoUncheckedCreateWithoutServicosComoPacienteInput>>
    connectOrCreate?: Enumerable<ContatoCreateOrConnectWithoutServicosComoPacienteInput>
    connect?: Enumerable<ContatoWhereUniqueInput>
  }

  export type ContatoCreateNestedOneWithoutServicosComoDentistaInput = {
    create?: XOR<ContatoCreateWithoutServicosComoDentistaInput, ContatoUncheckedCreateWithoutServicosComoDentistaInput>
    connectOrCreate?: ContatoCreateOrConnectWithoutServicosComoDentistaInput
    connect?: ContatoWhereUniqueInput
  }

  export type ProdutoServicoUncheckedCreateNestedManyWithoutServicoInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutServicoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutServicoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutServicoInput>
    createMany?: ProdutoServicoCreateManyServicoInputEnvelope
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
  }

  export type LancamentoFinanceiroUncheckedCreateNestedManyWithoutServicoInput = {
    create?: XOR<Enumerable<LancamentoFinanceiroCreateWithoutServicoInput>, Enumerable<LancamentoFinanceiroUncheckedCreateWithoutServicoInput>>
    connectOrCreate?: Enumerable<LancamentoFinanceiroCreateOrConnectWithoutServicoInput>
    createMany?: LancamentoFinanceiroCreateManyServicoInputEnvelope
    connect?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
  }

  export type ContatoUncheckedCreateNestedManyWithoutServicosComoPacienteInput = {
    create?: XOR<Enumerable<ContatoCreateWithoutServicosComoPacienteInput>, Enumerable<ContatoUncheckedCreateWithoutServicosComoPacienteInput>>
    connectOrCreate?: Enumerable<ContatoCreateOrConnectWithoutServicosComoPacienteInput>
    connect?: Enumerable<ContatoWhereUniqueInput>
  }

  export type ProdutoServicoUpdateManyWithoutServicoNestedInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutServicoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutServicoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutServicoInput>
    upsert?: Enumerable<ProdutoServicoUpsertWithWhereUniqueWithoutServicoInput>
    createMany?: ProdutoServicoCreateManyServicoInputEnvelope
    set?: Enumerable<ProdutoServicoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoServicoWhereUniqueInput>
    delete?: Enumerable<ProdutoServicoWhereUniqueInput>
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
    update?: Enumerable<ProdutoServicoUpdateWithWhereUniqueWithoutServicoInput>
    updateMany?: Enumerable<ProdutoServicoUpdateManyWithWhereWithoutServicoInput>
    deleteMany?: Enumerable<ProdutoServicoScalarWhereInput>
  }

  export type LancamentoFinanceiroUpdateManyWithoutServicoNestedInput = {
    create?: XOR<Enumerable<LancamentoFinanceiroCreateWithoutServicoInput>, Enumerable<LancamentoFinanceiroUncheckedCreateWithoutServicoInput>>
    connectOrCreate?: Enumerable<LancamentoFinanceiroCreateOrConnectWithoutServicoInput>
    upsert?: Enumerable<LancamentoFinanceiroUpsertWithWhereUniqueWithoutServicoInput>
    createMany?: LancamentoFinanceiroCreateManyServicoInputEnvelope
    set?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
    disconnect?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
    delete?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
    connect?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
    update?: Enumerable<LancamentoFinanceiroUpdateWithWhereUniqueWithoutServicoInput>
    updateMany?: Enumerable<LancamentoFinanceiroUpdateManyWithWhereWithoutServicoInput>
    deleteMany?: Enumerable<LancamentoFinanceiroScalarWhereInput>
  }

  export type ContatoUpdateManyWithoutServicosComoPacienteNestedInput = {
    create?: XOR<Enumerable<ContatoCreateWithoutServicosComoPacienteInput>, Enumerable<ContatoUncheckedCreateWithoutServicosComoPacienteInput>>
    connectOrCreate?: Enumerable<ContatoCreateOrConnectWithoutServicosComoPacienteInput>
    upsert?: Enumerable<ContatoUpsertWithWhereUniqueWithoutServicosComoPacienteInput>
    set?: Enumerable<ContatoWhereUniqueInput>
    disconnect?: Enumerable<ContatoWhereUniqueInput>
    delete?: Enumerable<ContatoWhereUniqueInput>
    connect?: Enumerable<ContatoWhereUniqueInput>
    update?: Enumerable<ContatoUpdateWithWhereUniqueWithoutServicosComoPacienteInput>
    updateMany?: Enumerable<ContatoUpdateManyWithWhereWithoutServicosComoPacienteInput>
    deleteMany?: Enumerable<ContatoScalarWhereInput>
  }

  export type ContatoUpdateOneRequiredWithoutServicosComoDentistaNestedInput = {
    create?: XOR<ContatoCreateWithoutServicosComoDentistaInput, ContatoUncheckedCreateWithoutServicosComoDentistaInput>
    connectOrCreate?: ContatoCreateOrConnectWithoutServicosComoDentistaInput
    upsert?: ContatoUpsertWithoutServicosComoDentistaInput
    connect?: ContatoWhereUniqueInput
    update?: XOR<ContatoUpdateWithoutServicosComoDentistaInput, ContatoUncheckedUpdateWithoutServicosComoDentistaInput>
  }

  export type ProdutoServicoUncheckedUpdateManyWithoutServicoNestedInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutServicoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutServicoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutServicoInput>
    upsert?: Enumerable<ProdutoServicoUpsertWithWhereUniqueWithoutServicoInput>
    createMany?: ProdutoServicoCreateManyServicoInputEnvelope
    set?: Enumerable<ProdutoServicoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoServicoWhereUniqueInput>
    delete?: Enumerable<ProdutoServicoWhereUniqueInput>
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
    update?: Enumerable<ProdutoServicoUpdateWithWhereUniqueWithoutServicoInput>
    updateMany?: Enumerable<ProdutoServicoUpdateManyWithWhereWithoutServicoInput>
    deleteMany?: Enumerable<ProdutoServicoScalarWhereInput>
  }

  export type LancamentoFinanceiroUncheckedUpdateManyWithoutServicoNestedInput = {
    create?: XOR<Enumerable<LancamentoFinanceiroCreateWithoutServicoInput>, Enumerable<LancamentoFinanceiroUncheckedCreateWithoutServicoInput>>
    connectOrCreate?: Enumerable<LancamentoFinanceiroCreateOrConnectWithoutServicoInput>
    upsert?: Enumerable<LancamentoFinanceiroUpsertWithWhereUniqueWithoutServicoInput>
    createMany?: LancamentoFinanceiroCreateManyServicoInputEnvelope
    set?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
    disconnect?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
    delete?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
    connect?: Enumerable<LancamentoFinanceiroWhereUniqueInput>
    update?: Enumerable<LancamentoFinanceiroUpdateWithWhereUniqueWithoutServicoInput>
    updateMany?: Enumerable<LancamentoFinanceiroUpdateManyWithWhereWithoutServicoInput>
    deleteMany?: Enumerable<LancamentoFinanceiroScalarWhereInput>
  }

  export type ContatoUncheckedUpdateManyWithoutServicosComoPacienteNestedInput = {
    create?: XOR<Enumerable<ContatoCreateWithoutServicosComoPacienteInput>, Enumerable<ContatoUncheckedCreateWithoutServicosComoPacienteInput>>
    connectOrCreate?: Enumerable<ContatoCreateOrConnectWithoutServicosComoPacienteInput>
    upsert?: Enumerable<ContatoUpsertWithWhereUniqueWithoutServicosComoPacienteInput>
    set?: Enumerable<ContatoWhereUniqueInput>
    disconnect?: Enumerable<ContatoWhereUniqueInput>
    delete?: Enumerable<ContatoWhereUniqueInput>
    connect?: Enumerable<ContatoWhereUniqueInput>
    update?: Enumerable<ContatoUpdateWithWhereUniqueWithoutServicosComoPacienteInput>
    updateMany?: Enumerable<ContatoUpdateManyWithWhereWithoutServicosComoPacienteInput>
    deleteMany?: Enumerable<ContatoScalarWhereInput>
  }

  export type ProdutoCreateNestedOneWithoutServicosInput = {
    create?: XOR<ProdutoCreateWithoutServicosInput, ProdutoUncheckedCreateWithoutServicosInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutServicosInput
    connect?: ProdutoWhereUniqueInput
  }

  export type ServicoCreateNestedOneWithoutItensInput = {
    create?: XOR<ServicoCreateWithoutItensInput, ServicoUncheckedCreateWithoutItensInput>
    connectOrCreate?: ServicoCreateOrConnectWithoutItensInput
    connect?: ServicoWhereUniqueInput
  }

  export type EtapaFabricacaoCreateNestedOneWithoutProdutosInput = {
    create?: XOR<EtapaFabricacaoCreateWithoutProdutosInput, EtapaFabricacaoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: EtapaFabricacaoCreateOrConnectWithoutProdutosInput
    connect?: EtapaFabricacaoWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProdutoUpdateOneRequiredWithoutServicosNestedInput = {
    create?: XOR<ProdutoCreateWithoutServicosInput, ProdutoUncheckedCreateWithoutServicosInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutServicosInput
    upsert?: ProdutoUpsertWithoutServicosInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<ProdutoUpdateWithoutServicosInput, ProdutoUncheckedUpdateWithoutServicosInput>
  }

  export type ServicoUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<ServicoCreateWithoutItensInput, ServicoUncheckedCreateWithoutItensInput>
    connectOrCreate?: ServicoCreateOrConnectWithoutItensInput
    upsert?: ServicoUpsertWithoutItensInput
    connect?: ServicoWhereUniqueInput
    update?: XOR<ServicoUpdateWithoutItensInput, ServicoUncheckedUpdateWithoutItensInput>
  }

  export type EtapaFabricacaoUpdateOneRequiredWithoutProdutosNestedInput = {
    create?: XOR<EtapaFabricacaoCreateWithoutProdutosInput, EtapaFabricacaoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: EtapaFabricacaoCreateOrConnectWithoutProdutosInput
    upsert?: EtapaFabricacaoUpsertWithoutProdutosInput
    connect?: EtapaFabricacaoWhereUniqueInput
    update?: XOR<EtapaFabricacaoUpdateWithoutProdutosInput, EtapaFabricacaoUncheckedUpdateWithoutProdutosInput>
  }

  export type ProdutoServicoCreateNestedManyWithoutEtapaFabricacaoInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutEtapaFabricacaoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutEtapaFabricacaoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutEtapaFabricacaoInput>
    createMany?: ProdutoServicoCreateManyEtapaFabricacaoInputEnvelope
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
  }

  export type ProdutoServicoUncheckedCreateNestedManyWithoutEtapaFabricacaoInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutEtapaFabricacaoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutEtapaFabricacaoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutEtapaFabricacaoInput>
    createMany?: ProdutoServicoCreateManyEtapaFabricacaoInputEnvelope
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
  }

  export type ProdutoServicoUpdateManyWithoutEtapaFabricacaoNestedInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutEtapaFabricacaoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutEtapaFabricacaoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutEtapaFabricacaoInput>
    upsert?: Enumerable<ProdutoServicoUpsertWithWhereUniqueWithoutEtapaFabricacaoInput>
    createMany?: ProdutoServicoCreateManyEtapaFabricacaoInputEnvelope
    set?: Enumerable<ProdutoServicoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoServicoWhereUniqueInput>
    delete?: Enumerable<ProdutoServicoWhereUniqueInput>
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
    update?: Enumerable<ProdutoServicoUpdateWithWhereUniqueWithoutEtapaFabricacaoInput>
    updateMany?: Enumerable<ProdutoServicoUpdateManyWithWhereWithoutEtapaFabricacaoInput>
    deleteMany?: Enumerable<ProdutoServicoScalarWhereInput>
  }

  export type ProdutoServicoUncheckedUpdateManyWithoutEtapaFabricacaoNestedInput = {
    create?: XOR<Enumerable<ProdutoServicoCreateWithoutEtapaFabricacaoInput>, Enumerable<ProdutoServicoUncheckedCreateWithoutEtapaFabricacaoInput>>
    connectOrCreate?: Enumerable<ProdutoServicoCreateOrConnectWithoutEtapaFabricacaoInput>
    upsert?: Enumerable<ProdutoServicoUpsertWithWhereUniqueWithoutEtapaFabricacaoInput>
    createMany?: ProdutoServicoCreateManyEtapaFabricacaoInputEnvelope
    set?: Enumerable<ProdutoServicoWhereUniqueInput>
    disconnect?: Enumerable<ProdutoServicoWhereUniqueInput>
    delete?: Enumerable<ProdutoServicoWhereUniqueInput>
    connect?: Enumerable<ProdutoServicoWhereUniqueInput>
    update?: Enumerable<ProdutoServicoUpdateWithWhereUniqueWithoutEtapaFabricacaoInput>
    updateMany?: Enumerable<ProdutoServicoUpdateManyWithWhereWithoutEtapaFabricacaoInput>
    deleteMany?: Enumerable<ProdutoServicoScalarWhereInput>
  }

  export type LancamentoSaidaCreateNestedOneWithoutLancamentoFinanceiroInput = {
    create?: XOR<LancamentoSaidaCreateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedCreateWithoutLancamentoFinanceiroInput>
    connectOrCreate?: LancamentoSaidaCreateOrConnectWithoutLancamentoFinanceiroInput
    connect?: LancamentoSaidaWhereUniqueInput
  }

  export type ParcelaCreateNestedManyWithoutLancamentoInput = {
    create?: XOR<Enumerable<ParcelaCreateWithoutLancamentoInput>, Enumerable<ParcelaUncheckedCreateWithoutLancamentoInput>>
    connectOrCreate?: Enumerable<ParcelaCreateOrConnectWithoutLancamentoInput>
    createMany?: ParcelaCreateManyLancamentoInputEnvelope
    connect?: Enumerable<ParcelaWhereUniqueInput>
  }

  export type ServicoCreateNestedOneWithoutLancamentosInput = {
    create?: XOR<ServicoCreateWithoutLancamentosInput, ServicoUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: ServicoCreateOrConnectWithoutLancamentosInput
    connect?: ServicoWhereUniqueInput
  }

  export type LancamentoSaidaUncheckedCreateNestedOneWithoutLancamentoFinanceiroInput = {
    create?: XOR<LancamentoSaidaCreateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedCreateWithoutLancamentoFinanceiroInput>
    connectOrCreate?: LancamentoSaidaCreateOrConnectWithoutLancamentoFinanceiroInput
    connect?: LancamentoSaidaWhereUniqueInput
  }

  export type ParcelaUncheckedCreateNestedManyWithoutLancamentoInput = {
    create?: XOR<Enumerable<ParcelaCreateWithoutLancamentoInput>, Enumerable<ParcelaUncheckedCreateWithoutLancamentoInput>>
    connectOrCreate?: Enumerable<ParcelaCreateOrConnectWithoutLancamentoInput>
    createMany?: ParcelaCreateManyLancamentoInputEnvelope
    connect?: Enumerable<ParcelaWhereUniqueInput>
  }

  export type LancamentoSaidaUpdateOneWithoutLancamentoFinanceiroNestedInput = {
    create?: XOR<LancamentoSaidaCreateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedCreateWithoutLancamentoFinanceiroInput>
    connectOrCreate?: LancamentoSaidaCreateOrConnectWithoutLancamentoFinanceiroInput
    upsert?: LancamentoSaidaUpsertWithoutLancamentoFinanceiroInput
    disconnect?: boolean
    delete?: boolean
    connect?: LancamentoSaidaWhereUniqueInput
    update?: XOR<LancamentoSaidaUpdateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedUpdateWithoutLancamentoFinanceiroInput>
  }

  export type ParcelaUpdateManyWithoutLancamentoNestedInput = {
    create?: XOR<Enumerable<ParcelaCreateWithoutLancamentoInput>, Enumerable<ParcelaUncheckedCreateWithoutLancamentoInput>>
    connectOrCreate?: Enumerable<ParcelaCreateOrConnectWithoutLancamentoInput>
    upsert?: Enumerable<ParcelaUpsertWithWhereUniqueWithoutLancamentoInput>
    createMany?: ParcelaCreateManyLancamentoInputEnvelope
    set?: Enumerable<ParcelaWhereUniqueInput>
    disconnect?: Enumerable<ParcelaWhereUniqueInput>
    delete?: Enumerable<ParcelaWhereUniqueInput>
    connect?: Enumerable<ParcelaWhereUniqueInput>
    update?: Enumerable<ParcelaUpdateWithWhereUniqueWithoutLancamentoInput>
    updateMany?: Enumerable<ParcelaUpdateManyWithWhereWithoutLancamentoInput>
    deleteMany?: Enumerable<ParcelaScalarWhereInput>
  }

  export type EnumFormaPagamentoEnumFieldUpdateOperationsInput = {
    set?: FormaPagamentoEnum
  }

  export type ServicoUpdateOneWithoutLancamentosNestedInput = {
    create?: XOR<ServicoCreateWithoutLancamentosInput, ServicoUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: ServicoCreateOrConnectWithoutLancamentosInput
    upsert?: ServicoUpsertWithoutLancamentosInput
    disconnect?: boolean
    delete?: boolean
    connect?: ServicoWhereUniqueInput
    update?: XOR<ServicoUpdateWithoutLancamentosInput, ServicoUncheckedUpdateWithoutLancamentosInput>
  }

  export type LancamentoSaidaUncheckedUpdateOneWithoutLancamentoFinanceiroNestedInput = {
    create?: XOR<LancamentoSaidaCreateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedCreateWithoutLancamentoFinanceiroInput>
    connectOrCreate?: LancamentoSaidaCreateOrConnectWithoutLancamentoFinanceiroInput
    upsert?: LancamentoSaidaUpsertWithoutLancamentoFinanceiroInput
    disconnect?: boolean
    delete?: boolean
    connect?: LancamentoSaidaWhereUniqueInput
    update?: XOR<LancamentoSaidaUpdateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedUpdateWithoutLancamentoFinanceiroInput>
  }

  export type ParcelaUncheckedUpdateManyWithoutLancamentoNestedInput = {
    create?: XOR<Enumerable<ParcelaCreateWithoutLancamentoInput>, Enumerable<ParcelaUncheckedCreateWithoutLancamentoInput>>
    connectOrCreate?: Enumerable<ParcelaCreateOrConnectWithoutLancamentoInput>
    upsert?: Enumerable<ParcelaUpsertWithWhereUniqueWithoutLancamentoInput>
    createMany?: ParcelaCreateManyLancamentoInputEnvelope
    set?: Enumerable<ParcelaWhereUniqueInput>
    disconnect?: Enumerable<ParcelaWhereUniqueInput>
    delete?: Enumerable<ParcelaWhereUniqueInput>
    connect?: Enumerable<ParcelaWhereUniqueInput>
    update?: Enumerable<ParcelaUpdateWithWhereUniqueWithoutLancamentoInput>
    updateMany?: Enumerable<ParcelaUpdateManyWithWhereWithoutLancamentoInput>
    deleteMany?: Enumerable<ParcelaScalarWhereInput>
  }

  export type ContatoCreateNestedOneWithoutLancamentosRecebidosInput = {
    create?: XOR<ContatoCreateWithoutLancamentosRecebidosInput, ContatoUncheckedCreateWithoutLancamentosRecebidosInput>
    connectOrCreate?: ContatoCreateOrConnectWithoutLancamentosRecebidosInput
    connect?: ContatoWhereUniqueInput
  }

  export type LancamentoFinanceiroCreateNestedOneWithoutSaidaInput = {
    create?: XOR<LancamentoFinanceiroCreateWithoutSaidaInput, LancamentoFinanceiroUncheckedCreateWithoutSaidaInput>
    connectOrCreate?: LancamentoFinanceiroCreateOrConnectWithoutSaidaInput
    connect?: LancamentoFinanceiroWhereUniqueInput
  }

  export type EnumFinalidadeSaidaEnumFieldUpdateOperationsInput = {
    set?: FinalidadeSaidaEnum
  }

  export type ContatoUpdateOneRequiredWithoutLancamentosRecebidosNestedInput = {
    create?: XOR<ContatoCreateWithoutLancamentosRecebidosInput, ContatoUncheckedCreateWithoutLancamentosRecebidosInput>
    connectOrCreate?: ContatoCreateOrConnectWithoutLancamentosRecebidosInput
    upsert?: ContatoUpsertWithoutLancamentosRecebidosInput
    connect?: ContatoWhereUniqueInput
    update?: XOR<ContatoUpdateWithoutLancamentosRecebidosInput, ContatoUncheckedUpdateWithoutLancamentosRecebidosInput>
  }

  export type LancamentoFinanceiroUpdateOneRequiredWithoutSaidaNestedInput = {
    create?: XOR<LancamentoFinanceiroCreateWithoutSaidaInput, LancamentoFinanceiroUncheckedCreateWithoutSaidaInput>
    connectOrCreate?: LancamentoFinanceiroCreateOrConnectWithoutSaidaInput
    upsert?: LancamentoFinanceiroUpsertWithoutSaidaInput
    connect?: LancamentoFinanceiroWhereUniqueInput
    update?: XOR<LancamentoFinanceiroUpdateWithoutSaidaInput, LancamentoFinanceiroUncheckedUpdateWithoutSaidaInput>
  }

  export type PagamentoCreateNestedManyWithoutParcelaInput = {
    create?: XOR<Enumerable<PagamentoCreateWithoutParcelaInput>, Enumerable<PagamentoUncheckedCreateWithoutParcelaInput>>
    connectOrCreate?: Enumerable<PagamentoCreateOrConnectWithoutParcelaInput>
    createMany?: PagamentoCreateManyParcelaInputEnvelope
    connect?: Enumerable<PagamentoWhereUniqueInput>
  }

  export type LancamentoFinanceiroCreateNestedOneWithoutParcelasInput = {
    create?: XOR<LancamentoFinanceiroCreateWithoutParcelasInput, LancamentoFinanceiroUncheckedCreateWithoutParcelasInput>
    connectOrCreate?: LancamentoFinanceiroCreateOrConnectWithoutParcelasInput
    connect?: LancamentoFinanceiroWhereUniqueInput
  }

  export type PagamentoUncheckedCreateNestedManyWithoutParcelaInput = {
    create?: XOR<Enumerable<PagamentoCreateWithoutParcelaInput>, Enumerable<PagamentoUncheckedCreateWithoutParcelaInput>>
    connectOrCreate?: Enumerable<PagamentoCreateOrConnectWithoutParcelaInput>
    createMany?: PagamentoCreateManyParcelaInputEnvelope
    connect?: Enumerable<PagamentoWhereUniqueInput>
  }

  export type EnumStatusPagamentoEnumFieldUpdateOperationsInput = {
    set?: StatusPagamentoEnum
  }

  export type PagamentoUpdateManyWithoutParcelaNestedInput = {
    create?: XOR<Enumerable<PagamentoCreateWithoutParcelaInput>, Enumerable<PagamentoUncheckedCreateWithoutParcelaInput>>
    connectOrCreate?: Enumerable<PagamentoCreateOrConnectWithoutParcelaInput>
    upsert?: Enumerable<PagamentoUpsertWithWhereUniqueWithoutParcelaInput>
    createMany?: PagamentoCreateManyParcelaInputEnvelope
    set?: Enumerable<PagamentoWhereUniqueInput>
    disconnect?: Enumerable<PagamentoWhereUniqueInput>
    delete?: Enumerable<PagamentoWhereUniqueInput>
    connect?: Enumerable<PagamentoWhereUniqueInput>
    update?: Enumerable<PagamentoUpdateWithWhereUniqueWithoutParcelaInput>
    updateMany?: Enumerable<PagamentoUpdateManyWithWhereWithoutParcelaInput>
    deleteMany?: Enumerable<PagamentoScalarWhereInput>
  }

  export type LancamentoFinanceiroUpdateOneRequiredWithoutParcelasNestedInput = {
    create?: XOR<LancamentoFinanceiroCreateWithoutParcelasInput, LancamentoFinanceiroUncheckedCreateWithoutParcelasInput>
    connectOrCreate?: LancamentoFinanceiroCreateOrConnectWithoutParcelasInput
    upsert?: LancamentoFinanceiroUpsertWithoutParcelasInput
    connect?: LancamentoFinanceiroWhereUniqueInput
    update?: XOR<LancamentoFinanceiroUpdateWithoutParcelasInput, LancamentoFinanceiroUncheckedUpdateWithoutParcelasInput>
  }

  export type PagamentoUncheckedUpdateManyWithoutParcelaNestedInput = {
    create?: XOR<Enumerable<PagamentoCreateWithoutParcelaInput>, Enumerable<PagamentoUncheckedCreateWithoutParcelaInput>>
    connectOrCreate?: Enumerable<PagamentoCreateOrConnectWithoutParcelaInput>
    upsert?: Enumerable<PagamentoUpsertWithWhereUniqueWithoutParcelaInput>
    createMany?: PagamentoCreateManyParcelaInputEnvelope
    set?: Enumerable<PagamentoWhereUniqueInput>
    disconnect?: Enumerable<PagamentoWhereUniqueInput>
    delete?: Enumerable<PagamentoWhereUniqueInput>
    connect?: Enumerable<PagamentoWhereUniqueInput>
    update?: Enumerable<PagamentoUpdateWithWhereUniqueWithoutParcelaInput>
    updateMany?: Enumerable<PagamentoUpdateManyWithWhereWithoutParcelaInput>
    deleteMany?: Enumerable<PagamentoScalarWhereInput>
  }

  export type ParcelaCreateNestedOneWithoutPagamentosInput = {
    create?: XOR<ParcelaCreateWithoutPagamentosInput, ParcelaUncheckedCreateWithoutPagamentosInput>
    connectOrCreate?: ParcelaCreateOrConnectWithoutPagamentosInput
    connect?: ParcelaWhereUniqueInput
  }

  export type ParcelaUpdateOneRequiredWithoutPagamentosNestedInput = {
    create?: XOR<ParcelaCreateWithoutPagamentosInput, ParcelaUncheckedCreateWithoutPagamentosInput>
    connectOrCreate?: ParcelaCreateOrConnectWithoutPagamentosInput
    upsert?: ParcelaUpsertWithoutPagamentosInput
    connect?: ParcelaWhereUniqueInput
    update?: XOR<ParcelaUpdateWithoutPagamentosInput, ParcelaUncheckedUpdateWithoutPagamentosInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedEnumFormaPagamentoEnumFilter = {
    equals?: FormaPagamentoEnum
    in?: Enumerable<FormaPagamentoEnum>
    notIn?: Enumerable<FormaPagamentoEnum>
    not?: NestedEnumFormaPagamentoEnumFilter | FormaPagamentoEnum
  }

  export type NestedEnumFormaPagamentoEnumWithAggregatesFilter = {
    equals?: FormaPagamentoEnum
    in?: Enumerable<FormaPagamentoEnum>
    notIn?: Enumerable<FormaPagamentoEnum>
    not?: NestedEnumFormaPagamentoEnumWithAggregatesFilter | FormaPagamentoEnum
    _count?: NestedIntFilter
    _min?: NestedEnumFormaPagamentoEnumFilter
    _max?: NestedEnumFormaPagamentoEnumFilter
  }

  export type NestedEnumFinalidadeSaidaEnumFilter = {
    equals?: FinalidadeSaidaEnum
    in?: Enumerable<FinalidadeSaidaEnum>
    notIn?: Enumerable<FinalidadeSaidaEnum>
    not?: NestedEnumFinalidadeSaidaEnumFilter | FinalidadeSaidaEnum
  }

  export type NestedEnumFinalidadeSaidaEnumWithAggregatesFilter = {
    equals?: FinalidadeSaidaEnum
    in?: Enumerable<FinalidadeSaidaEnum>
    notIn?: Enumerable<FinalidadeSaidaEnum>
    not?: NestedEnumFinalidadeSaidaEnumWithAggregatesFilter | FinalidadeSaidaEnum
    _count?: NestedIntFilter
    _min?: NestedEnumFinalidadeSaidaEnumFilter
    _max?: NestedEnumFinalidadeSaidaEnumFilter
  }

  export type NestedEnumStatusPagamentoEnumFilter = {
    equals?: StatusPagamentoEnum
    in?: Enumerable<StatusPagamentoEnum>
    notIn?: Enumerable<StatusPagamentoEnum>
    not?: NestedEnumStatusPagamentoEnumFilter | StatusPagamentoEnum
  }

  export type NestedEnumStatusPagamentoEnumWithAggregatesFilter = {
    equals?: StatusPagamentoEnum
    in?: Enumerable<StatusPagamentoEnum>
    notIn?: Enumerable<StatusPagamentoEnum>
    not?: NestedEnumStatusPagamentoEnumWithAggregatesFilter | StatusPagamentoEnum
    _count?: NestedIntFilter
    _min?: NestedEnumStatusPagamentoEnumFilter
    _max?: NestedEnumStatusPagamentoEnumFilter
  }

  export type ServicoCreateWithoutDentistaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    itens?: ProdutoServicoCreateNestedManyWithoutServicoInput
    lancamentos?: LancamentoFinanceiroCreateNestedManyWithoutServicoInput
    pacientes?: ContatoCreateNestedManyWithoutServicosComoPacienteInput
  }

  export type ServicoUncheckedCreateWithoutDentistaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    itens?: ProdutoServicoUncheckedCreateNestedManyWithoutServicoInput
    lancamentos?: LancamentoFinanceiroUncheckedCreateNestedManyWithoutServicoInput
    pacientes?: ContatoUncheckedCreateNestedManyWithoutServicosComoPacienteInput
  }

  export type ServicoCreateOrConnectWithoutDentistaInput = {
    where: ServicoWhereUniqueInput
    create: XOR<ServicoCreateWithoutDentistaInput, ServicoUncheckedCreateWithoutDentistaInput>
  }

  export type ServicoCreateManyDentistaInputEnvelope = {
    data: Enumerable<ServicoCreateManyDentistaInput>
    skipDuplicates?: boolean
  }

  export type ServicoCreateWithoutPacientesInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    itens?: ProdutoServicoCreateNestedManyWithoutServicoInput
    lancamentos?: LancamentoFinanceiroCreateNestedManyWithoutServicoInput
    dentista: ContatoCreateNestedOneWithoutServicosComoDentistaInput
  }

  export type ServicoUncheckedCreateWithoutPacientesInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    dentistaUid: string
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    itens?: ProdutoServicoUncheckedCreateNestedManyWithoutServicoInput
    lancamentos?: LancamentoFinanceiroUncheckedCreateNestedManyWithoutServicoInput
  }

  export type ServicoCreateOrConnectWithoutPacientesInput = {
    where: ServicoWhereUniqueInput
    create: XOR<ServicoCreateWithoutPacientesInput, ServicoUncheckedCreateWithoutPacientesInput>
  }

  export type UsuarioCreateWithoutContatoInput = {
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    email: string
    username?: string | null
    senha: string
  }

  export type UsuarioUncheckedCreateWithoutContatoInput = {
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    email: string
    username?: string | null
    senha: string
  }

  export type UsuarioCreateOrConnectWithoutContatoInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutContatoInput, UsuarioUncheckedCreateWithoutContatoInput>
  }

  export type LancamentoSaidaCreateWithoutParaQuemInput = {
    finalidade: FinalidadeSaidaEnum
    lancamentoFinanceiro: LancamentoFinanceiroCreateNestedOneWithoutSaidaInput
  }

  export type LancamentoSaidaUncheckedCreateWithoutParaQuemInput = {
    uid: string
    finalidade: FinalidadeSaidaEnum
  }

  export type LancamentoSaidaCreateOrConnectWithoutParaQuemInput = {
    where: LancamentoSaidaWhereUniqueInput
    create: XOR<LancamentoSaidaCreateWithoutParaQuemInput, LancamentoSaidaUncheckedCreateWithoutParaQuemInput>
  }

  export type LancamentoSaidaCreateManyParaQuemInputEnvelope = {
    data: Enumerable<LancamentoSaidaCreateManyParaQuemInput>
    skipDuplicates?: boolean
  }

  export type ServicoUpsertWithWhereUniqueWithoutDentistaInput = {
    where: ServicoWhereUniqueInput
    update: XOR<ServicoUpdateWithoutDentistaInput, ServicoUncheckedUpdateWithoutDentistaInput>
    create: XOR<ServicoCreateWithoutDentistaInput, ServicoUncheckedCreateWithoutDentistaInput>
  }

  export type ServicoUpdateWithWhereUniqueWithoutDentistaInput = {
    where: ServicoWhereUniqueInput
    data: XOR<ServicoUpdateWithoutDentistaInput, ServicoUncheckedUpdateWithoutDentistaInput>
  }

  export type ServicoUpdateManyWithWhereWithoutDentistaInput = {
    where: ServicoScalarWhereInput
    data: XOR<ServicoUpdateManyMutationInput, ServicoUncheckedUpdateManyWithoutServicosComoDentistaInput>
  }

  export type ServicoScalarWhereInput = {
    AND?: Enumerable<ServicoScalarWhereInput>
    OR?: Enumerable<ServicoScalarWhereInput>
    NOT?: Enumerable<ServicoScalarWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    dentistaUid?: StringFilter | string
    descricao?: StringNullableFilter | string | null
    observacoes?: StringNullableFilter | string | null
    espOdont?: BoolFilter | boolean
  }

  export type ServicoUpsertWithWhereUniqueWithoutPacientesInput = {
    where: ServicoWhereUniqueInput
    update: XOR<ServicoUpdateWithoutPacientesInput, ServicoUncheckedUpdateWithoutPacientesInput>
    create: XOR<ServicoCreateWithoutPacientesInput, ServicoUncheckedCreateWithoutPacientesInput>
  }

  export type ServicoUpdateWithWhereUniqueWithoutPacientesInput = {
    where: ServicoWhereUniqueInput
    data: XOR<ServicoUpdateWithoutPacientesInput, ServicoUncheckedUpdateWithoutPacientesInput>
  }

  export type ServicoUpdateManyWithWhereWithoutPacientesInput = {
    where: ServicoScalarWhereInput
    data: XOR<ServicoUpdateManyMutationInput, ServicoUncheckedUpdateManyWithoutServicosComoPacienteInput>
  }

  export type UsuarioUpsertWithoutContatoInput = {
    update: XOR<UsuarioUpdateWithoutContatoInput, UsuarioUncheckedUpdateWithoutContatoInput>
    create: XOR<UsuarioCreateWithoutContatoInput, UsuarioUncheckedCreateWithoutContatoInput>
  }

  export type UsuarioUpdateWithoutContatoInput = {
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioUncheckedUpdateWithoutContatoInput = {
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type LancamentoSaidaUpsertWithWhereUniqueWithoutParaQuemInput = {
    where: LancamentoSaidaWhereUniqueInput
    update: XOR<LancamentoSaidaUpdateWithoutParaQuemInput, LancamentoSaidaUncheckedUpdateWithoutParaQuemInput>
    create: XOR<LancamentoSaidaCreateWithoutParaQuemInput, LancamentoSaidaUncheckedCreateWithoutParaQuemInput>
  }

  export type LancamentoSaidaUpdateWithWhereUniqueWithoutParaQuemInput = {
    where: LancamentoSaidaWhereUniqueInput
    data: XOR<LancamentoSaidaUpdateWithoutParaQuemInput, LancamentoSaidaUncheckedUpdateWithoutParaQuemInput>
  }

  export type LancamentoSaidaUpdateManyWithWhereWithoutParaQuemInput = {
    where: LancamentoSaidaScalarWhereInput
    data: XOR<LancamentoSaidaUpdateManyMutationInput, LancamentoSaidaUncheckedUpdateManyWithoutLancamentosRecebidosInput>
  }

  export type LancamentoSaidaScalarWhereInput = {
    AND?: Enumerable<LancamentoSaidaScalarWhereInput>
    OR?: Enumerable<LancamentoSaidaScalarWhereInput>
    NOT?: Enumerable<LancamentoSaidaScalarWhereInput>
    uid?: StringFilter | string
    paraQuemUid?: StringFilter | string
    finalidade?: EnumFinalidadeSaidaEnumFilter | FinalidadeSaidaEnum
  }

  export type ContatoCreateWithoutUsuarioInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoDentista?: ServicoCreateNestedManyWithoutDentistaInput
    servicosComoPaciente?: ServicoCreateNestedManyWithoutPacientesInput
    lancamentosRecebidos?: LancamentoSaidaCreateNestedManyWithoutParaQuemInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedCreateWithoutUsuarioInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoDentista?: ServicoUncheckedCreateNestedManyWithoutDentistaInput
    servicosComoPaciente?: ServicoUncheckedCreateNestedManyWithoutPacientesInput
    lancamentosRecebidos?: LancamentoSaidaUncheckedCreateNestedManyWithoutParaQuemInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoCreateOrConnectWithoutUsuarioInput = {
    where: ContatoWhereUniqueInput
    create: XOR<ContatoCreateWithoutUsuarioInput, ContatoUncheckedCreateWithoutUsuarioInput>
  }

  export type ContatoUpsertWithoutUsuarioInput = {
    update: XOR<ContatoUpdateWithoutUsuarioInput, ContatoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<ContatoCreateWithoutUsuarioInput, ContatoUncheckedCreateWithoutUsuarioInput>
  }

  export type ContatoUpdateWithoutUsuarioInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoDentista?: ServicoUpdateManyWithoutDentistaNestedInput
    servicosComoPaciente?: ServicoUpdateManyWithoutPacientesNestedInput
    lancamentosRecebidos?: LancamentoSaidaUpdateManyWithoutParaQuemNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedUpdateWithoutUsuarioInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoDentista?: ServicoUncheckedUpdateManyWithoutDentistaNestedInput
    servicosComoPaciente?: ServicoUncheckedUpdateManyWithoutPacientesNestedInput
    lancamentosRecebidos?: LancamentoSaidaUncheckedUpdateManyWithoutParaQuemNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ValorProdutoCreateWithoutProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    espOdont: boolean
    valorEmCents: number
    dtFim?: Date | string | null
  }

  export type ValorProdutoUncheckedCreateWithoutProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    espOdont: boolean
    valorEmCents: number
    dtFim?: Date | string | null
  }

  export type ValorProdutoCreateOrConnectWithoutProdutoInput = {
    where: ValorProdutoWhereUniqueInput
    create: XOR<ValorProdutoCreateWithoutProdutoInput, ValorProdutoUncheckedCreateWithoutProdutoInput>
  }

  export type ValorProdutoCreateManyProdutoInputEnvelope = {
    data: Enumerable<ValorProdutoCreateManyProdutoInput>
    skipDuplicates?: boolean
  }

  export type ProdutoServicoCreateWithoutProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    servico: ServicoCreateNestedOneWithoutItensInput
    etapaFabricacao: EtapaFabricacaoCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoServicoUncheckedCreateWithoutProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    servicoUid: string
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    etapa: string
  }

  export type ProdutoServicoCreateOrConnectWithoutProdutoInput = {
    where: ProdutoServicoWhereUniqueInput
    create: XOR<ProdutoServicoCreateWithoutProdutoInput, ProdutoServicoUncheckedCreateWithoutProdutoInput>
  }

  export type ProdutoServicoCreateManyProdutoInputEnvelope = {
    data: Enumerable<ProdutoServicoCreateManyProdutoInput>
    skipDuplicates?: boolean
  }

  export type TipoProdutoCreateWithoutProdutosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type TipoProdutoUncheckedCreateWithoutProdutosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type TipoProdutoCreateOrConnectWithoutProdutosInput = {
    where: TipoProdutoWhereUniqueInput
    create: XOR<TipoProdutoCreateWithoutProdutosInput, TipoProdutoUncheckedCreateWithoutProdutosInput>
  }

  export type MarcaProdutoCreateWithoutProdutosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type MarcaProdutoUncheckedCreateWithoutProdutosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type MarcaProdutoCreateOrConnectWithoutProdutosInput = {
    where: MarcaProdutoWhereUniqueInput
    create: XOR<MarcaProdutoCreateWithoutProdutosInput, MarcaProdutoUncheckedCreateWithoutProdutosInput>
  }

  export type ValorProdutoUpsertWithWhereUniqueWithoutProdutoInput = {
    where: ValorProdutoWhereUniqueInput
    update: XOR<ValorProdutoUpdateWithoutProdutoInput, ValorProdutoUncheckedUpdateWithoutProdutoInput>
    create: XOR<ValorProdutoCreateWithoutProdutoInput, ValorProdutoUncheckedCreateWithoutProdutoInput>
  }

  export type ValorProdutoUpdateWithWhereUniqueWithoutProdutoInput = {
    where: ValorProdutoWhereUniqueInput
    data: XOR<ValorProdutoUpdateWithoutProdutoInput, ValorProdutoUncheckedUpdateWithoutProdutoInput>
  }

  export type ValorProdutoUpdateManyWithWhereWithoutProdutoInput = {
    where: ValorProdutoScalarWhereInput
    data: XOR<ValorProdutoUpdateManyMutationInput, ValorProdutoUncheckedUpdateManyWithoutValoresInput>
  }

  export type ValorProdutoScalarWhereInput = {
    AND?: Enumerable<ValorProdutoScalarWhereInput>
    OR?: Enumerable<ValorProdutoScalarWhereInput>
    NOT?: Enumerable<ValorProdutoScalarWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    espOdont?: BoolFilter | boolean
    valorEmCents?: IntFilter | number
    dtFim?: DateTimeNullableFilter | Date | string | null
    produtoUid?: StringFilter | string
  }

  export type ProdutoServicoUpsertWithWhereUniqueWithoutProdutoInput = {
    where: ProdutoServicoWhereUniqueInput
    update: XOR<ProdutoServicoUpdateWithoutProdutoInput, ProdutoServicoUncheckedUpdateWithoutProdutoInput>
    create: XOR<ProdutoServicoCreateWithoutProdutoInput, ProdutoServicoUncheckedCreateWithoutProdutoInput>
  }

  export type ProdutoServicoUpdateWithWhereUniqueWithoutProdutoInput = {
    where: ProdutoServicoWhereUniqueInput
    data: XOR<ProdutoServicoUpdateWithoutProdutoInput, ProdutoServicoUncheckedUpdateWithoutProdutoInput>
  }

  export type ProdutoServicoUpdateManyWithWhereWithoutProdutoInput = {
    where: ProdutoServicoScalarWhereInput
    data: XOR<ProdutoServicoUpdateManyMutationInput, ProdutoServicoUncheckedUpdateManyWithoutServicosInput>
  }

  export type ProdutoServicoScalarWhereInput = {
    AND?: Enumerable<ProdutoServicoScalarWhereInput>
    OR?: Enumerable<ProdutoServicoScalarWhereInput>
    NOT?: Enumerable<ProdutoServicoScalarWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    produtoUid?: StringFilter | string
    servicoUid?: StringFilter | string
    quantidade?: IntFilter | number
    descontoEmCents?: IntNullableFilter | number | null
    descricao?: StringNullableFilter | string | null
    observacoes?: StringNullableFilter | string | null
    etapa?: StringFilter | string
  }

  export type TipoProdutoUpsertWithoutProdutosInput = {
    update: XOR<TipoProdutoUpdateWithoutProdutosInput, TipoProdutoUncheckedUpdateWithoutProdutosInput>
    create: XOR<TipoProdutoCreateWithoutProdutosInput, TipoProdutoUncheckedCreateWithoutProdutosInput>
  }

  export type TipoProdutoUpdateWithoutProdutosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TipoProdutoUncheckedUpdateWithoutProdutosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarcaProdutoUpsertWithoutProdutosInput = {
    update: XOR<MarcaProdutoUpdateWithoutProdutosInput, MarcaProdutoUncheckedUpdateWithoutProdutosInput>
    create: XOR<MarcaProdutoCreateWithoutProdutosInput, MarcaProdutoUncheckedCreateWithoutProdutosInput>
  }

  export type MarcaProdutoUpdateWithoutProdutosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarcaProdutoUncheckedUpdateWithoutProdutosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProdutoCreateWithoutTipoProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    valores?: ValorProdutoCreateNestedManyWithoutProdutoInput
    servicos?: ProdutoServicoCreateNestedManyWithoutProdutoInput
    marcaProduto?: MarcaProdutoCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoUncheckedCreateWithoutTipoProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    marca?: string | null
    valores?: ValorProdutoUncheckedCreateNestedManyWithoutProdutoInput
    servicos?: ProdutoServicoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutTipoProdutoInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutTipoProdutoInput, ProdutoUncheckedCreateWithoutTipoProdutoInput>
  }

  export type ProdutoCreateManyTipoProdutoInputEnvelope = {
    data: Enumerable<ProdutoCreateManyTipoProdutoInput>
    skipDuplicates?: boolean
  }

  export type ProdutoUpsertWithWhereUniqueWithoutTipoProdutoInput = {
    where: ProdutoWhereUniqueInput
    update: XOR<ProdutoUpdateWithoutTipoProdutoInput, ProdutoUncheckedUpdateWithoutTipoProdutoInput>
    create: XOR<ProdutoCreateWithoutTipoProdutoInput, ProdutoUncheckedCreateWithoutTipoProdutoInput>
  }

  export type ProdutoUpdateWithWhereUniqueWithoutTipoProdutoInput = {
    where: ProdutoWhereUniqueInput
    data: XOR<ProdutoUpdateWithoutTipoProdutoInput, ProdutoUncheckedUpdateWithoutTipoProdutoInput>
  }

  export type ProdutoUpdateManyWithWhereWithoutTipoProdutoInput = {
    where: ProdutoScalarWhereInput
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyWithoutProdutosInput>
  }

  export type ProdutoScalarWhereInput = {
    AND?: Enumerable<ProdutoScalarWhereInput>
    OR?: Enumerable<ProdutoScalarWhereInput>
    NOT?: Enumerable<ProdutoScalarWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    nome?: StringFilter | string
    descricao?: StringNullableFilter | string | null
    tipo?: StringFilter | string
    marca?: StringNullableFilter | string | null
  }

  export type ProdutoCreateWithoutMarcaProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    valores?: ValorProdutoCreateNestedManyWithoutProdutoInput
    servicos?: ProdutoServicoCreateNestedManyWithoutProdutoInput
    tipoProduto: TipoProdutoCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoUncheckedCreateWithoutMarcaProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    tipo: string
    valores?: ValorProdutoUncheckedCreateNestedManyWithoutProdutoInput
    servicos?: ProdutoServicoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutMarcaProdutoInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutMarcaProdutoInput, ProdutoUncheckedCreateWithoutMarcaProdutoInput>
  }

  export type ProdutoCreateManyMarcaProdutoInputEnvelope = {
    data: Enumerable<ProdutoCreateManyMarcaProdutoInput>
    skipDuplicates?: boolean
  }

  export type ProdutoUpsertWithWhereUniqueWithoutMarcaProdutoInput = {
    where: ProdutoWhereUniqueInput
    update: XOR<ProdutoUpdateWithoutMarcaProdutoInput, ProdutoUncheckedUpdateWithoutMarcaProdutoInput>
    create: XOR<ProdutoCreateWithoutMarcaProdutoInput, ProdutoUncheckedCreateWithoutMarcaProdutoInput>
  }

  export type ProdutoUpdateWithWhereUniqueWithoutMarcaProdutoInput = {
    where: ProdutoWhereUniqueInput
    data: XOR<ProdutoUpdateWithoutMarcaProdutoInput, ProdutoUncheckedUpdateWithoutMarcaProdutoInput>
  }

  export type ProdutoUpdateManyWithWhereWithoutMarcaProdutoInput = {
    where: ProdutoScalarWhereInput
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyWithoutProdutosInput>
  }

  export type ProdutoCreateWithoutValoresInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    servicos?: ProdutoServicoCreateNestedManyWithoutProdutoInput
    tipoProduto: TipoProdutoCreateNestedOneWithoutProdutosInput
    marcaProduto?: MarcaProdutoCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoUncheckedCreateWithoutValoresInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    tipo: string
    marca?: string | null
    servicos?: ProdutoServicoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutValoresInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutValoresInput, ProdutoUncheckedCreateWithoutValoresInput>
  }

  export type ProdutoUpsertWithoutValoresInput = {
    update: XOR<ProdutoUpdateWithoutValoresInput, ProdutoUncheckedUpdateWithoutValoresInput>
    create: XOR<ProdutoCreateWithoutValoresInput, ProdutoUncheckedCreateWithoutValoresInput>
  }

  export type ProdutoUpdateWithoutValoresInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    servicos?: ProdutoServicoUpdateManyWithoutProdutoNestedInput
    tipoProduto?: TipoProdutoUpdateOneRequiredWithoutProdutosNestedInput
    marcaProduto?: MarcaProdutoUpdateOneWithoutProdutosNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutValoresInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    marca?: NullableStringFieldUpdateOperationsInput | string | null
    servicos?: ProdutoServicoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoServicoCreateWithoutServicoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    produto: ProdutoCreateNestedOneWithoutServicosInput
    etapaFabricacao: EtapaFabricacaoCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoServicoUncheckedCreateWithoutServicoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    produtoUid: string
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    etapa: string
  }

  export type ProdutoServicoCreateOrConnectWithoutServicoInput = {
    where: ProdutoServicoWhereUniqueInput
    create: XOR<ProdutoServicoCreateWithoutServicoInput, ProdutoServicoUncheckedCreateWithoutServicoInput>
  }

  export type ProdutoServicoCreateManyServicoInputEnvelope = {
    data: Enumerable<ProdutoServicoCreateManyServicoInput>
    skipDuplicates?: boolean
  }

  export type LancamentoFinanceiroCreateWithoutServicoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    saida?: LancamentoSaidaCreateNestedOneWithoutLancamentoFinanceiroInput
    parcelas?: ParcelaCreateNestedManyWithoutLancamentoInput
    formaDePagamento?: FormaPagamentoEnum
  }

  export type LancamentoFinanceiroUncheckedCreateWithoutServicoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    saida?: LancamentoSaidaUncheckedCreateNestedOneWithoutLancamentoFinanceiroInput
    parcelas?: ParcelaUncheckedCreateNestedManyWithoutLancamentoInput
    formaDePagamento?: FormaPagamentoEnum
  }

  export type LancamentoFinanceiroCreateOrConnectWithoutServicoInput = {
    where: LancamentoFinanceiroWhereUniqueInput
    create: XOR<LancamentoFinanceiroCreateWithoutServicoInput, LancamentoFinanceiroUncheckedCreateWithoutServicoInput>
  }

  export type LancamentoFinanceiroCreateManyServicoInputEnvelope = {
    data: Enumerable<LancamentoFinanceiroCreateManyServicoInput>
    skipDuplicates?: boolean
  }

  export type ContatoCreateWithoutServicosComoPacienteInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoDentista?: ServicoCreateNestedManyWithoutDentistaInput
    usuario?: UsuarioCreateNestedOneWithoutContatoInput
    lancamentosRecebidos?: LancamentoSaidaCreateNestedManyWithoutParaQuemInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedCreateWithoutServicosComoPacienteInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoDentista?: ServicoUncheckedCreateNestedManyWithoutDentistaInput
    usuario?: UsuarioUncheckedCreateNestedOneWithoutContatoInput
    lancamentosRecebidos?: LancamentoSaidaUncheckedCreateNestedManyWithoutParaQuemInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoCreateOrConnectWithoutServicosComoPacienteInput = {
    where: ContatoWhereUniqueInput
    create: XOR<ContatoCreateWithoutServicosComoPacienteInput, ContatoUncheckedCreateWithoutServicosComoPacienteInput>
  }

  export type ContatoCreateWithoutServicosComoDentistaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoPaciente?: ServicoCreateNestedManyWithoutPacientesInput
    usuario?: UsuarioCreateNestedOneWithoutContatoInput
    lancamentosRecebidos?: LancamentoSaidaCreateNestedManyWithoutParaQuemInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedCreateWithoutServicosComoDentistaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoPaciente?: ServicoUncheckedCreateNestedManyWithoutPacientesInput
    usuario?: UsuarioUncheckedCreateNestedOneWithoutContatoInput
    lancamentosRecebidos?: LancamentoSaidaUncheckedCreateNestedManyWithoutParaQuemInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoCreateOrConnectWithoutServicosComoDentistaInput = {
    where: ContatoWhereUniqueInput
    create: XOR<ContatoCreateWithoutServicosComoDentistaInput, ContatoUncheckedCreateWithoutServicosComoDentistaInput>
  }

  export type ProdutoServicoUpsertWithWhereUniqueWithoutServicoInput = {
    where: ProdutoServicoWhereUniqueInput
    update: XOR<ProdutoServicoUpdateWithoutServicoInput, ProdutoServicoUncheckedUpdateWithoutServicoInput>
    create: XOR<ProdutoServicoCreateWithoutServicoInput, ProdutoServicoUncheckedCreateWithoutServicoInput>
  }

  export type ProdutoServicoUpdateWithWhereUniqueWithoutServicoInput = {
    where: ProdutoServicoWhereUniqueInput
    data: XOR<ProdutoServicoUpdateWithoutServicoInput, ProdutoServicoUncheckedUpdateWithoutServicoInput>
  }

  export type ProdutoServicoUpdateManyWithWhereWithoutServicoInput = {
    where: ProdutoServicoScalarWhereInput
    data: XOR<ProdutoServicoUpdateManyMutationInput, ProdutoServicoUncheckedUpdateManyWithoutItensInput>
  }

  export type LancamentoFinanceiroUpsertWithWhereUniqueWithoutServicoInput = {
    where: LancamentoFinanceiroWhereUniqueInput
    update: XOR<LancamentoFinanceiroUpdateWithoutServicoInput, LancamentoFinanceiroUncheckedUpdateWithoutServicoInput>
    create: XOR<LancamentoFinanceiroCreateWithoutServicoInput, LancamentoFinanceiroUncheckedCreateWithoutServicoInput>
  }

  export type LancamentoFinanceiroUpdateWithWhereUniqueWithoutServicoInput = {
    where: LancamentoFinanceiroWhereUniqueInput
    data: XOR<LancamentoFinanceiroUpdateWithoutServicoInput, LancamentoFinanceiroUncheckedUpdateWithoutServicoInput>
  }

  export type LancamentoFinanceiroUpdateManyWithWhereWithoutServicoInput = {
    where: LancamentoFinanceiroScalarWhereInput
    data: XOR<LancamentoFinanceiroUpdateManyMutationInput, LancamentoFinanceiroUncheckedUpdateManyWithoutLancamentosInput>
  }

  export type LancamentoFinanceiroScalarWhereInput = {
    AND?: Enumerable<LancamentoFinanceiroScalarWhereInput>
    OR?: Enumerable<LancamentoFinanceiroScalarWhereInput>
    NOT?: Enumerable<LancamentoFinanceiroScalarWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    qtdParcelas?: IntFilter | number
    dtLancamento?: DateTimeFilter | Date | string
    dtPrimeiroVencimento?: DateTimeNullableFilter | Date | string | null
    intervaloDiasEntreParcelas?: IntNullableFilter | number | null
    valorEntradaEmCents?: IntNullableFilter | number | null
    descricao?: StringNullableFilter | string | null
    observacoes?: StringNullableFilter | string | null
    servicoUid?: StringNullableFilter | string | null
    formaDePagamento?: EnumFormaPagamentoEnumFilter | FormaPagamentoEnum
  }

  export type ContatoUpsertWithWhereUniqueWithoutServicosComoPacienteInput = {
    where: ContatoWhereUniqueInput
    update: XOR<ContatoUpdateWithoutServicosComoPacienteInput, ContatoUncheckedUpdateWithoutServicosComoPacienteInput>
    create: XOR<ContatoCreateWithoutServicosComoPacienteInput, ContatoUncheckedCreateWithoutServicosComoPacienteInput>
  }

  export type ContatoUpdateWithWhereUniqueWithoutServicosComoPacienteInput = {
    where: ContatoWhereUniqueInput
    data: XOR<ContatoUpdateWithoutServicosComoPacienteInput, ContatoUncheckedUpdateWithoutServicosComoPacienteInput>
  }

  export type ContatoUpdateManyWithWhereWithoutServicosComoPacienteInput = {
    where: ContatoScalarWhereInput
    data: XOR<ContatoUpdateManyMutationInput, ContatoUncheckedUpdateManyWithoutPacientesInput>
  }

  export type ContatoScalarWhereInput = {
    AND?: Enumerable<ContatoScalarWhereInput>
    OR?: Enumerable<ContatoScalarWhereInput>
    NOT?: Enumerable<ContatoScalarWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    ativo?: BoolFilter | boolean
    nome?: StringFilter | string
    categorias?: EnumRoleEnumNullableListFilter
    telefones?: StringNullableListFilter
  }

  export type ContatoUpsertWithoutServicosComoDentistaInput = {
    update: XOR<ContatoUpdateWithoutServicosComoDentistaInput, ContatoUncheckedUpdateWithoutServicosComoDentistaInput>
    create: XOR<ContatoCreateWithoutServicosComoDentistaInput, ContatoUncheckedCreateWithoutServicosComoDentistaInput>
  }

  export type ContatoUpdateWithoutServicosComoDentistaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoPaciente?: ServicoUpdateManyWithoutPacientesNestedInput
    usuario?: UsuarioUpdateOneWithoutContatoNestedInput
    lancamentosRecebidos?: LancamentoSaidaUpdateManyWithoutParaQuemNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedUpdateWithoutServicosComoDentistaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoPaciente?: ServicoUncheckedUpdateManyWithoutPacientesNestedInput
    usuario?: UsuarioUncheckedUpdateOneWithoutContatoNestedInput
    lancamentosRecebidos?: LancamentoSaidaUncheckedUpdateManyWithoutParaQuemNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ProdutoCreateWithoutServicosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    valores?: ValorProdutoCreateNestedManyWithoutProdutoInput
    tipoProduto: TipoProdutoCreateNestedOneWithoutProdutosInput
    marcaProduto?: MarcaProdutoCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoUncheckedCreateWithoutServicosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    tipo: string
    marca?: string | null
    valores?: ValorProdutoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutServicosInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutServicosInput, ProdutoUncheckedCreateWithoutServicosInput>
  }

  export type ServicoCreateWithoutItensInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    lancamentos?: LancamentoFinanceiroCreateNestedManyWithoutServicoInput
    pacientes?: ContatoCreateNestedManyWithoutServicosComoPacienteInput
    dentista: ContatoCreateNestedOneWithoutServicosComoDentistaInput
  }

  export type ServicoUncheckedCreateWithoutItensInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    dentistaUid: string
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    lancamentos?: LancamentoFinanceiroUncheckedCreateNestedManyWithoutServicoInput
    pacientes?: ContatoUncheckedCreateNestedManyWithoutServicosComoPacienteInput
  }

  export type ServicoCreateOrConnectWithoutItensInput = {
    where: ServicoWhereUniqueInput
    create: XOR<ServicoCreateWithoutItensInput, ServicoUncheckedCreateWithoutItensInput>
  }

  export type EtapaFabricacaoCreateWithoutProdutosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type EtapaFabricacaoUncheckedCreateWithoutProdutosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
  }

  export type EtapaFabricacaoCreateOrConnectWithoutProdutosInput = {
    where: EtapaFabricacaoWhereUniqueInput
    create: XOR<EtapaFabricacaoCreateWithoutProdutosInput, EtapaFabricacaoUncheckedCreateWithoutProdutosInput>
  }

  export type ProdutoUpsertWithoutServicosInput = {
    update: XOR<ProdutoUpdateWithoutServicosInput, ProdutoUncheckedUpdateWithoutServicosInput>
    create: XOR<ProdutoCreateWithoutServicosInput, ProdutoUncheckedCreateWithoutServicosInput>
  }

  export type ProdutoUpdateWithoutServicosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    valores?: ValorProdutoUpdateManyWithoutProdutoNestedInput
    tipoProduto?: TipoProdutoUpdateOneRequiredWithoutProdutosNestedInput
    marcaProduto?: MarcaProdutoUpdateOneWithoutProdutosNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutServicosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    marca?: NullableStringFieldUpdateOperationsInput | string | null
    valores?: ValorProdutoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ServicoUpsertWithoutItensInput = {
    update: XOR<ServicoUpdateWithoutItensInput, ServicoUncheckedUpdateWithoutItensInput>
    create: XOR<ServicoCreateWithoutItensInput, ServicoUncheckedCreateWithoutItensInput>
  }

  export type ServicoUpdateWithoutItensInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    lancamentos?: LancamentoFinanceiroUpdateManyWithoutServicoNestedInput
    pacientes?: ContatoUpdateManyWithoutServicosComoPacienteNestedInput
    dentista?: ContatoUpdateOneRequiredWithoutServicosComoDentistaNestedInput
  }

  export type ServicoUncheckedUpdateWithoutItensInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    dentistaUid?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    lancamentos?: LancamentoFinanceiroUncheckedUpdateManyWithoutServicoNestedInput
    pacientes?: ContatoUncheckedUpdateManyWithoutServicosComoPacienteNestedInput
  }

  export type EtapaFabricacaoUpsertWithoutProdutosInput = {
    update: XOR<EtapaFabricacaoUpdateWithoutProdutosInput, EtapaFabricacaoUncheckedUpdateWithoutProdutosInput>
    create: XOR<EtapaFabricacaoCreateWithoutProdutosInput, EtapaFabricacaoUncheckedCreateWithoutProdutosInput>
  }

  export type EtapaFabricacaoUpdateWithoutProdutosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EtapaFabricacaoUncheckedUpdateWithoutProdutosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProdutoServicoCreateWithoutEtapaFabricacaoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    produto: ProdutoCreateNestedOneWithoutServicosInput
    servico: ServicoCreateNestedOneWithoutItensInput
  }

  export type ProdutoServicoUncheckedCreateWithoutEtapaFabricacaoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    produtoUid: string
    servicoUid: string
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
  }

  export type ProdutoServicoCreateOrConnectWithoutEtapaFabricacaoInput = {
    where: ProdutoServicoWhereUniqueInput
    create: XOR<ProdutoServicoCreateWithoutEtapaFabricacaoInput, ProdutoServicoUncheckedCreateWithoutEtapaFabricacaoInput>
  }

  export type ProdutoServicoCreateManyEtapaFabricacaoInputEnvelope = {
    data: Enumerable<ProdutoServicoCreateManyEtapaFabricacaoInput>
    skipDuplicates?: boolean
  }

  export type ProdutoServicoUpsertWithWhereUniqueWithoutEtapaFabricacaoInput = {
    where: ProdutoServicoWhereUniqueInput
    update: XOR<ProdutoServicoUpdateWithoutEtapaFabricacaoInput, ProdutoServicoUncheckedUpdateWithoutEtapaFabricacaoInput>
    create: XOR<ProdutoServicoCreateWithoutEtapaFabricacaoInput, ProdutoServicoUncheckedCreateWithoutEtapaFabricacaoInput>
  }

  export type ProdutoServicoUpdateWithWhereUniqueWithoutEtapaFabricacaoInput = {
    where: ProdutoServicoWhereUniqueInput
    data: XOR<ProdutoServicoUpdateWithoutEtapaFabricacaoInput, ProdutoServicoUncheckedUpdateWithoutEtapaFabricacaoInput>
  }

  export type ProdutoServicoUpdateManyWithWhereWithoutEtapaFabricacaoInput = {
    where: ProdutoServicoScalarWhereInput
    data: XOR<ProdutoServicoUpdateManyMutationInput, ProdutoServicoUncheckedUpdateManyWithoutProdutosInput>
  }

  export type LancamentoSaidaCreateWithoutLancamentoFinanceiroInput = {
    finalidade: FinalidadeSaidaEnum
    paraQuem: ContatoCreateNestedOneWithoutLancamentosRecebidosInput
  }

  export type LancamentoSaidaUncheckedCreateWithoutLancamentoFinanceiroInput = {
    paraQuemUid: string
    finalidade: FinalidadeSaidaEnum
  }

  export type LancamentoSaidaCreateOrConnectWithoutLancamentoFinanceiroInput = {
    where: LancamentoSaidaWhereUniqueInput
    create: XOR<LancamentoSaidaCreateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedCreateWithoutLancamentoFinanceiroInput>
  }

  export type ParcelaCreateWithoutLancamentoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    valorEmCents: number
    numParcela?: number
    status: StatusPagamentoEnum
    pagamentos?: PagamentoCreateNestedManyWithoutParcelaInput
  }

  export type ParcelaUncheckedCreateWithoutLancamentoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    valorEmCents: number
    numParcela?: number
    status: StatusPagamentoEnum
    pagamentos?: PagamentoUncheckedCreateNestedManyWithoutParcelaInput
  }

  export type ParcelaCreateOrConnectWithoutLancamentoInput = {
    where: ParcelaWhereUniqueInput
    create: XOR<ParcelaCreateWithoutLancamentoInput, ParcelaUncheckedCreateWithoutLancamentoInput>
  }

  export type ParcelaCreateManyLancamentoInputEnvelope = {
    data: Enumerable<ParcelaCreateManyLancamentoInput>
    skipDuplicates?: boolean
  }

  export type ServicoCreateWithoutLancamentosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    itens?: ProdutoServicoCreateNestedManyWithoutServicoInput
    pacientes?: ContatoCreateNestedManyWithoutServicosComoPacienteInput
    dentista: ContatoCreateNestedOneWithoutServicosComoDentistaInput
  }

  export type ServicoUncheckedCreateWithoutLancamentosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    dentistaUid: string
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
    itens?: ProdutoServicoUncheckedCreateNestedManyWithoutServicoInput
    pacientes?: ContatoUncheckedCreateNestedManyWithoutServicosComoPacienteInput
  }

  export type ServicoCreateOrConnectWithoutLancamentosInput = {
    where: ServicoWhereUniqueInput
    create: XOR<ServicoCreateWithoutLancamentosInput, ServicoUncheckedCreateWithoutLancamentosInput>
  }

  export type LancamentoSaidaUpsertWithoutLancamentoFinanceiroInput = {
    update: XOR<LancamentoSaidaUpdateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedUpdateWithoutLancamentoFinanceiroInput>
    create: XOR<LancamentoSaidaCreateWithoutLancamentoFinanceiroInput, LancamentoSaidaUncheckedCreateWithoutLancamentoFinanceiroInput>
  }

  export type LancamentoSaidaUpdateWithoutLancamentoFinanceiroInput = {
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
    paraQuem?: ContatoUpdateOneRequiredWithoutLancamentosRecebidosNestedInput
  }

  export type LancamentoSaidaUncheckedUpdateWithoutLancamentoFinanceiroInput = {
    paraQuemUid?: StringFieldUpdateOperationsInput | string
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
  }

  export type ParcelaUpsertWithWhereUniqueWithoutLancamentoInput = {
    where: ParcelaWhereUniqueInput
    update: XOR<ParcelaUpdateWithoutLancamentoInput, ParcelaUncheckedUpdateWithoutLancamentoInput>
    create: XOR<ParcelaCreateWithoutLancamentoInput, ParcelaUncheckedCreateWithoutLancamentoInput>
  }

  export type ParcelaUpdateWithWhereUniqueWithoutLancamentoInput = {
    where: ParcelaWhereUniqueInput
    data: XOR<ParcelaUpdateWithoutLancamentoInput, ParcelaUncheckedUpdateWithoutLancamentoInput>
  }

  export type ParcelaUpdateManyWithWhereWithoutLancamentoInput = {
    where: ParcelaScalarWhereInput
    data: XOR<ParcelaUpdateManyMutationInput, ParcelaUncheckedUpdateManyWithoutParcelasInput>
  }

  export type ParcelaScalarWhereInput = {
    AND?: Enumerable<ParcelaScalarWhereInput>
    OR?: Enumerable<ParcelaScalarWhereInput>
    NOT?: Enumerable<ParcelaScalarWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    valorEmCents?: IntFilter | number
    numParcela?: IntFilter | number
    status?: EnumStatusPagamentoEnumFilter | StatusPagamentoEnum
    lancamentoFinanceiroUid?: StringFilter | string
  }

  export type ServicoUpsertWithoutLancamentosInput = {
    update: XOR<ServicoUpdateWithoutLancamentosInput, ServicoUncheckedUpdateWithoutLancamentosInput>
    create: XOR<ServicoCreateWithoutLancamentosInput, ServicoUncheckedCreateWithoutLancamentosInput>
  }

  export type ServicoUpdateWithoutLancamentosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    itens?: ProdutoServicoUpdateManyWithoutServicoNestedInput
    pacientes?: ContatoUpdateManyWithoutServicosComoPacienteNestedInput
    dentista?: ContatoUpdateOneRequiredWithoutServicosComoDentistaNestedInput
  }

  export type ServicoUncheckedUpdateWithoutLancamentosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    dentistaUid?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    itens?: ProdutoServicoUncheckedUpdateManyWithoutServicoNestedInput
    pacientes?: ContatoUncheckedUpdateManyWithoutServicosComoPacienteNestedInput
  }

  export type ContatoCreateWithoutLancamentosRecebidosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoDentista?: ServicoCreateNestedManyWithoutDentistaInput
    servicosComoPaciente?: ServicoCreateNestedManyWithoutPacientesInput
    usuario?: UsuarioCreateNestedOneWithoutContatoInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedCreateWithoutLancamentosRecebidosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    servicosComoDentista?: ServicoUncheckedCreateNestedManyWithoutDentistaInput
    servicosComoPaciente?: ServicoUncheckedCreateNestedManyWithoutPacientesInput
    usuario?: UsuarioUncheckedCreateNestedOneWithoutContatoInput
    categorias?: ContatoCreatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoCreatetelefonesInput | Enumerable<string>
  }

  export type ContatoCreateOrConnectWithoutLancamentosRecebidosInput = {
    where: ContatoWhereUniqueInput
    create: XOR<ContatoCreateWithoutLancamentosRecebidosInput, ContatoUncheckedCreateWithoutLancamentosRecebidosInput>
  }

  export type LancamentoFinanceiroCreateWithoutSaidaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    parcelas?: ParcelaCreateNestedManyWithoutLancamentoInput
    formaDePagamento?: FormaPagamentoEnum
    servico?: ServicoCreateNestedOneWithoutLancamentosInput
  }

  export type LancamentoFinanceiroUncheckedCreateWithoutSaidaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    servicoUid?: string | null
    parcelas?: ParcelaUncheckedCreateNestedManyWithoutLancamentoInput
    formaDePagamento?: FormaPagamentoEnum
  }

  export type LancamentoFinanceiroCreateOrConnectWithoutSaidaInput = {
    where: LancamentoFinanceiroWhereUniqueInput
    create: XOR<LancamentoFinanceiroCreateWithoutSaidaInput, LancamentoFinanceiroUncheckedCreateWithoutSaidaInput>
  }

  export type ContatoUpsertWithoutLancamentosRecebidosInput = {
    update: XOR<ContatoUpdateWithoutLancamentosRecebidosInput, ContatoUncheckedUpdateWithoutLancamentosRecebidosInput>
    create: XOR<ContatoCreateWithoutLancamentosRecebidosInput, ContatoUncheckedCreateWithoutLancamentosRecebidosInput>
  }

  export type ContatoUpdateWithoutLancamentosRecebidosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoDentista?: ServicoUpdateManyWithoutDentistaNestedInput
    servicosComoPaciente?: ServicoUpdateManyWithoutPacientesNestedInput
    usuario?: UsuarioUpdateOneWithoutContatoNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedUpdateWithoutLancamentosRecebidosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoDentista?: ServicoUncheckedUpdateManyWithoutDentistaNestedInput
    servicosComoPaciente?: ServicoUncheckedUpdateManyWithoutPacientesNestedInput
    usuario?: UsuarioUncheckedUpdateOneWithoutContatoNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type LancamentoFinanceiroUpsertWithoutSaidaInput = {
    update: XOR<LancamentoFinanceiroUpdateWithoutSaidaInput, LancamentoFinanceiroUncheckedUpdateWithoutSaidaInput>
    create: XOR<LancamentoFinanceiroCreateWithoutSaidaInput, LancamentoFinanceiroUncheckedCreateWithoutSaidaInput>
  }

  export type LancamentoFinanceiroUpdateWithoutSaidaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    parcelas?: ParcelaUpdateManyWithoutLancamentoNestedInput
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
    servico?: ServicoUpdateOneWithoutLancamentosNestedInput
  }

  export type LancamentoFinanceiroUncheckedUpdateWithoutSaidaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    servicoUid?: NullableStringFieldUpdateOperationsInput | string | null
    parcelas?: ParcelaUncheckedUpdateManyWithoutLancamentoNestedInput
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
  }

  export type PagamentoCreateWithoutParcelaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    dt?: Date | string
    valorEmCents: number
  }

  export type PagamentoUncheckedCreateWithoutParcelaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    dt?: Date | string
    valorEmCents: number
  }

  export type PagamentoCreateOrConnectWithoutParcelaInput = {
    where: PagamentoWhereUniqueInput
    create: XOR<PagamentoCreateWithoutParcelaInput, PagamentoUncheckedCreateWithoutParcelaInput>
  }

  export type PagamentoCreateManyParcelaInputEnvelope = {
    data: Enumerable<PagamentoCreateManyParcelaInput>
    skipDuplicates?: boolean
  }

  export type LancamentoFinanceiroCreateWithoutParcelasInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    saida?: LancamentoSaidaCreateNestedOneWithoutLancamentoFinanceiroInput
    formaDePagamento?: FormaPagamentoEnum
    servico?: ServicoCreateNestedOneWithoutLancamentosInput
  }

  export type LancamentoFinanceiroUncheckedCreateWithoutParcelasInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    saida?: LancamentoSaidaUncheckedCreateNestedOneWithoutLancamentoFinanceiroInput
    servicoUid?: string | null
    formaDePagamento?: FormaPagamentoEnum
  }

  export type LancamentoFinanceiroCreateOrConnectWithoutParcelasInput = {
    where: LancamentoFinanceiroWhereUniqueInput
    create: XOR<LancamentoFinanceiroCreateWithoutParcelasInput, LancamentoFinanceiroUncheckedCreateWithoutParcelasInput>
  }

  export type PagamentoUpsertWithWhereUniqueWithoutParcelaInput = {
    where: PagamentoWhereUniqueInput
    update: XOR<PagamentoUpdateWithoutParcelaInput, PagamentoUncheckedUpdateWithoutParcelaInput>
    create: XOR<PagamentoCreateWithoutParcelaInput, PagamentoUncheckedCreateWithoutParcelaInput>
  }

  export type PagamentoUpdateWithWhereUniqueWithoutParcelaInput = {
    where: PagamentoWhereUniqueInput
    data: XOR<PagamentoUpdateWithoutParcelaInput, PagamentoUncheckedUpdateWithoutParcelaInput>
  }

  export type PagamentoUpdateManyWithWhereWithoutParcelaInput = {
    where: PagamentoScalarWhereInput
    data: XOR<PagamentoUpdateManyMutationInput, PagamentoUncheckedUpdateManyWithoutPagamentosInput>
  }

  export type PagamentoScalarWhereInput = {
    AND?: Enumerable<PagamentoScalarWhereInput>
    OR?: Enumerable<PagamentoScalarWhereInput>
    NOT?: Enumerable<PagamentoScalarWhereInput>
    uid?: StringFilter | string
    criadoEm?: DateTimeFilter | Date | string
    atualizadoEm?: DateTimeFilter | Date | string
    dt?: DateTimeFilter | Date | string
    valorEmCents?: IntFilter | number
    parcelaUid?: StringFilter | string
  }

  export type LancamentoFinanceiroUpsertWithoutParcelasInput = {
    update: XOR<LancamentoFinanceiroUpdateWithoutParcelasInput, LancamentoFinanceiroUncheckedUpdateWithoutParcelasInput>
    create: XOR<LancamentoFinanceiroCreateWithoutParcelasInput, LancamentoFinanceiroUncheckedCreateWithoutParcelasInput>
  }

  export type LancamentoFinanceiroUpdateWithoutParcelasInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    saida?: LancamentoSaidaUpdateOneWithoutLancamentoFinanceiroNestedInput
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
    servico?: ServicoUpdateOneWithoutLancamentosNestedInput
  }

  export type LancamentoFinanceiroUncheckedUpdateWithoutParcelasInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    saida?: LancamentoSaidaUncheckedUpdateOneWithoutLancamentoFinanceiroNestedInput
    servicoUid?: NullableStringFieldUpdateOperationsInput | string | null
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
  }

  export type ParcelaCreateWithoutPagamentosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    valorEmCents: number
    numParcela?: number
    status: StatusPagamentoEnum
    lancamento: LancamentoFinanceiroCreateNestedOneWithoutParcelasInput
  }

  export type ParcelaUncheckedCreateWithoutPagamentosInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    valorEmCents: number
    numParcela?: number
    status: StatusPagamentoEnum
    lancamentoFinanceiroUid: string
  }

  export type ParcelaCreateOrConnectWithoutPagamentosInput = {
    where: ParcelaWhereUniqueInput
    create: XOR<ParcelaCreateWithoutPagamentosInput, ParcelaUncheckedCreateWithoutPagamentosInput>
  }

  export type ParcelaUpsertWithoutPagamentosInput = {
    update: XOR<ParcelaUpdateWithoutPagamentosInput, ParcelaUncheckedUpdateWithoutPagamentosInput>
    create: XOR<ParcelaCreateWithoutPagamentosInput, ParcelaUncheckedCreateWithoutPagamentosInput>
  }

  export type ParcelaUpdateWithoutPagamentosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
    lancamento?: LancamentoFinanceiroUpdateOneRequiredWithoutParcelasNestedInput
  }

  export type ParcelaUncheckedUpdateWithoutPagamentosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
    lancamentoFinanceiroUid?: StringFieldUpdateOperationsInput | string
  }

  export type ServicoCreateManyDentistaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    descricao?: string | null
    observacoes?: string | null
    espOdont: boolean
  }

  export type LancamentoSaidaCreateManyParaQuemInput = {
    uid: string
    finalidade: FinalidadeSaidaEnum
  }

  export type ServicoUpdateWithoutDentistaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    itens?: ProdutoServicoUpdateManyWithoutServicoNestedInput
    lancamentos?: LancamentoFinanceiroUpdateManyWithoutServicoNestedInput
    pacientes?: ContatoUpdateManyWithoutServicosComoPacienteNestedInput
  }

  export type ServicoUncheckedUpdateWithoutDentistaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    itens?: ProdutoServicoUncheckedUpdateManyWithoutServicoNestedInput
    lancamentos?: LancamentoFinanceiroUncheckedUpdateManyWithoutServicoNestedInput
    pacientes?: ContatoUncheckedUpdateManyWithoutServicosComoPacienteNestedInput
  }

  export type ServicoUncheckedUpdateManyWithoutServicosComoDentistaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServicoUpdateWithoutPacientesInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    itens?: ProdutoServicoUpdateManyWithoutServicoNestedInput
    lancamentos?: LancamentoFinanceiroUpdateManyWithoutServicoNestedInput
    dentista?: ContatoUpdateOneRequiredWithoutServicosComoDentistaNestedInput
  }

  export type ServicoUncheckedUpdateWithoutPacientesInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    dentistaUid?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    itens?: ProdutoServicoUncheckedUpdateManyWithoutServicoNestedInput
    lancamentos?: LancamentoFinanceiroUncheckedUpdateManyWithoutServicoNestedInput
  }

  export type ServicoUncheckedUpdateManyWithoutServicosComoPacienteInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    dentistaUid?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    espOdont?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LancamentoSaidaUpdateWithoutParaQuemInput = {
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
    lancamentoFinanceiro?: LancamentoFinanceiroUpdateOneRequiredWithoutSaidaNestedInput
  }

  export type LancamentoSaidaUncheckedUpdateWithoutParaQuemInput = {
    uid?: StringFieldUpdateOperationsInput | string
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
  }

  export type LancamentoSaidaUncheckedUpdateManyWithoutLancamentosRecebidosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    finalidade?: EnumFinalidadeSaidaEnumFieldUpdateOperationsInput | FinalidadeSaidaEnum
  }

  export type ValorProdutoCreateManyProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    espOdont: boolean
    valorEmCents: number
    dtFim?: Date | string | null
  }

  export type ProdutoServicoCreateManyProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    servicoUid: string
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    etapa: string
  }

  export type ValorProdutoUpdateWithoutProdutoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    valorEmCents?: IntFieldUpdateOperationsInput | number
    dtFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ValorProdutoUncheckedUpdateWithoutProdutoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    valorEmCents?: IntFieldUpdateOperationsInput | number
    dtFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ValorProdutoUncheckedUpdateManyWithoutValoresInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    espOdont?: BoolFieldUpdateOperationsInput | boolean
    valorEmCents?: IntFieldUpdateOperationsInput | number
    dtFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProdutoServicoUpdateWithoutProdutoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    servico?: ServicoUpdateOneRequiredWithoutItensNestedInput
    etapaFabricacao?: EtapaFabricacaoUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type ProdutoServicoUncheckedUpdateWithoutProdutoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    servicoUid?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    etapa?: StringFieldUpdateOperationsInput | string
  }

  export type ProdutoServicoUncheckedUpdateManyWithoutServicosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    servicoUid?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    etapa?: StringFieldUpdateOperationsInput | string
  }

  export type ProdutoCreateManyTipoProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    marca?: string | null
  }

  export type ProdutoUpdateWithoutTipoProdutoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    valores?: ValorProdutoUpdateManyWithoutProdutoNestedInput
    servicos?: ProdutoServicoUpdateManyWithoutProdutoNestedInput
    marcaProduto?: MarcaProdutoUpdateOneWithoutProdutosNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutTipoProdutoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    marca?: NullableStringFieldUpdateOperationsInput | string | null
    valores?: ValorProdutoUncheckedUpdateManyWithoutProdutoNestedInput
    servicos?: ProdutoServicoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateManyWithoutProdutosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    marca?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProdutoCreateManyMarcaProdutoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    nome: string
    descricao?: string | null
    tipo: string
  }

  export type ProdutoUpdateWithoutMarcaProdutoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    valores?: ValorProdutoUpdateManyWithoutProdutoNestedInput
    servicos?: ProdutoServicoUpdateManyWithoutProdutoNestedInput
    tipoProduto?: TipoProdutoUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutMarcaProdutoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    valores?: ValorProdutoUncheckedUpdateManyWithoutProdutoNestedInput
    servicos?: ProdutoServicoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoServicoCreateManyServicoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    produtoUid: string
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    etapa: string
  }

  export type LancamentoFinanceiroCreateManyServicoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    qtdParcelas?: number
    dtLancamento?: Date | string
    dtPrimeiroVencimento?: Date | string | null
    intervaloDiasEntreParcelas?: number | null
    valorEntradaEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
    formaDePagamento?: FormaPagamentoEnum
  }

  export type ProdutoServicoUpdateWithoutServicoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    produto?: ProdutoUpdateOneRequiredWithoutServicosNestedInput
    etapaFabricacao?: EtapaFabricacaoUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type ProdutoServicoUncheckedUpdateWithoutServicoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    produtoUid?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    etapa?: StringFieldUpdateOperationsInput | string
  }

  export type ProdutoServicoUncheckedUpdateManyWithoutItensInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    produtoUid?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    etapa?: StringFieldUpdateOperationsInput | string
  }

  export type LancamentoFinanceiroUpdateWithoutServicoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    saida?: LancamentoSaidaUpdateOneWithoutLancamentoFinanceiroNestedInput
    parcelas?: ParcelaUpdateManyWithoutLancamentoNestedInput
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
  }

  export type LancamentoFinanceiroUncheckedUpdateWithoutServicoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    saida?: LancamentoSaidaUncheckedUpdateOneWithoutLancamentoFinanceiroNestedInput
    parcelas?: ParcelaUncheckedUpdateManyWithoutLancamentoNestedInput
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
  }

  export type LancamentoFinanceiroUncheckedUpdateManyWithoutLancamentosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    qtdParcelas?: IntFieldUpdateOperationsInput | number
    dtLancamento?: DateTimeFieldUpdateOperationsInput | Date | string
    dtPrimeiroVencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intervaloDiasEntreParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    valorEntradaEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    formaDePagamento?: EnumFormaPagamentoEnumFieldUpdateOperationsInput | FormaPagamentoEnum
  }

  export type ContatoUpdateWithoutServicosComoPacienteInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoDentista?: ServicoUpdateManyWithoutDentistaNestedInput
    usuario?: UsuarioUpdateOneWithoutContatoNestedInput
    lancamentosRecebidos?: LancamentoSaidaUpdateManyWithoutParaQuemNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedUpdateWithoutServicosComoPacienteInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    servicosComoDentista?: ServicoUncheckedUpdateManyWithoutDentistaNestedInput
    usuario?: UsuarioUncheckedUpdateOneWithoutContatoNestedInput
    lancamentosRecebidos?: LancamentoSaidaUncheckedUpdateManyWithoutParaQuemNestedInput
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ContatoUncheckedUpdateManyWithoutPacientesInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    nome?: StringFieldUpdateOperationsInput | string
    categorias?: ContatoUpdatecategoriasInput | Enumerable<RoleEnum>
    telefones?: ContatoUpdatetelefonesInput | Enumerable<string>
  }

  export type ProdutoServicoCreateManyEtapaFabricacaoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    ativo?: boolean
    produtoUid: string
    servicoUid: string
    quantidade?: number
    descontoEmCents?: number | null
    descricao?: string | null
    observacoes?: string | null
  }

  export type ProdutoServicoUpdateWithoutEtapaFabricacaoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    produto?: ProdutoUpdateOneRequiredWithoutServicosNestedInput
    servico?: ServicoUpdateOneRequiredWithoutItensNestedInput
  }

  export type ProdutoServicoUncheckedUpdateWithoutEtapaFabricacaoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    produtoUid?: StringFieldUpdateOperationsInput | string
    servicoUid?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProdutoServicoUncheckedUpdateManyWithoutProdutosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    ativo?: BoolFieldUpdateOperationsInput | boolean
    produtoUid?: StringFieldUpdateOperationsInput | string
    servicoUid?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    descontoEmCents?: NullableIntFieldUpdateOperationsInput | number | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    observacoes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParcelaCreateManyLancamentoInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    valorEmCents: number
    numParcela?: number
    status: StatusPagamentoEnum
  }

  export type ParcelaUpdateWithoutLancamentoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
    pagamentos?: PagamentoUpdateManyWithoutParcelaNestedInput
  }

  export type ParcelaUncheckedUpdateWithoutLancamentoInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
    pagamentos?: PagamentoUncheckedUpdateManyWithoutParcelaNestedInput
  }

  export type ParcelaUncheckedUpdateManyWithoutParcelasInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusPagamentoEnumFieldUpdateOperationsInput | StatusPagamentoEnum
  }

  export type PagamentoCreateManyParcelaInput = {
    uid?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    dt?: Date | string
    valorEmCents: number
  }

  export type PagamentoUpdateWithoutParcelaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    dt?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
  }

  export type PagamentoUncheckedUpdateWithoutParcelaInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    dt?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
  }

  export type PagamentoUncheckedUpdateManyWithoutPagamentosInput = {
    uid?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    dt?: DateTimeFieldUpdateOperationsInput | Date | string
    valorEmCents?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}