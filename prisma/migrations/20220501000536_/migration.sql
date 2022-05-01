-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('dentista', 'fornecedor', 'cliente', 'colaborador', 'entregador', 'gerente', 'admin');

-- CreateTable
CREATE TABLE "contato" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categorias" "Categoria"[],
    "telefone" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "contato_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "senha" TEXT NOT NULL,
    "usa_esp_odont" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("contato_id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "valor_produto" (
    "id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "esp_odont" BOOLEAN NOT NULL,
    "dt_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_fim" TIMESTAMP(3),

    CONSTRAINT "valor_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servico" (
    "id" TEXT NOT NULL,

    CONSTRAINT "servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_servico" (
    "produto_id" TEXT NOT NULL,
    "servico_id" TEXT NOT NULL,

    CONSTRAINT "item_servico_pkey" PRIMARY KEY ("produto_id","servico_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contato_telefone_key" ON "contato"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_key" ON "produto"("nome");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valor_produto" ADD CONSTRAINT "valor_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_servico" ADD CONSTRAINT "item_servico_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_servico" ADD CONSTRAINT "item_servico_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
