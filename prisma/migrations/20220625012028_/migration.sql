-- CreateEnum
CREATE TYPE "finalidade_saida" AS ENUM ('agua', 'energia', 'gas', 'salario', 'repasse_dent_esp_odont', 'pgmnt_fornecedor', 'outro');

-- CreateEnum
CREATE TYPE "status_pagamento" AS ENUM ('aberto', 'quitado', 'vencido', 'renegociado');

-- CreateEnum
CREATE TYPE "forma_pagamento" AS ENUM ('dinheiro', 'cheque', 'cartao');

-- CreateTable
CREATE TABLE "contato" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(80) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,

    CONSTRAINT "contato_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "categoria" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(80) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "usuario" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50),
    "senha" VARCHAR(200) NOT NULL,
    "contato_uid" UUID NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "produto" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT,
    "tipo" VARCHAR(30) NOT NULL,
    "marca" VARCHAR(30) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "tipo_produto" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(30) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "tipo_produto_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "marca_produto" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(30) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "marca_produto_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "valor_produto" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "esp_odont" BOOLEAN NOT NULL,
    "valor_em_cents" INTEGER NOT NULL,
    "dt_fim" TIMESTAMP,
    "produto_uid" UUID NOT NULL,

    CONSTRAINT "valor_produto_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "servico" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "dentista_uid" UUID NOT NULL,
    "descricao" TEXT,
    "observacoes" TEXT,
    "esp_odont" BOOLEAN NOT NULL,

    CONSTRAINT "servico_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "produto_servico" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "produto_uid" UUID NOT NULL,
    "servico_uid" UUID NOT NULL,
    "quantidade" SMALLINT NOT NULL DEFAULT 1,
    "desconto_em_cents" INTEGER,
    "descricao" TEXT,
    "observacoes" TEXT,
    "etapa" VARCHAR(30) NOT NULL,

    CONSTRAINT "produto_servico_pkey" PRIMARY KEY ("produto_uid","servico_uid")
);

-- CreateTable
CREATE TABLE "etapa_fabricacao" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(30) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "etapa_fabricacao_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lancamento_financeiro" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "qtd_parcelas" SMALLINT NOT NULL DEFAULT 1,
    "dt_lancamento" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_primeiro_vencimento" TIMESTAMP,
    "intervalo_dias_entre_parcelas" SMALLINT,
    "valor_entrada_em_cents" INTEGER,
    "descricao" TEXT,
    "observacoes" TEXT,
    "servico_uid" UUID,
    "forma_pagamento" "forma_pagamento" NOT NULL DEFAULT E'dinheiro',

    CONSTRAINT "lancamento_financeiro_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "lancamento_saida" (
    "uid" UUID NOT NULL,
    "contato_uid" UUID NOT NULL,
    "finalidade" "finalidade_saida" NOT NULL,

    CONSTRAINT "lancamento_saida_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "parcela" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "valor_em_cents" INTEGER NOT NULL,
    "num_parcela" SMALLINT NOT NULL DEFAULT 1,
    "status" "status_pagamento" NOT NULL,
    "lancamento_financeiro_uid" UUID NOT NULL,

    CONSTRAINT "parcela_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "dt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_em_cents" INTEGER NOT NULL,
    "parcela_uid" UUID NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "_servico_paciente" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_contato_categoria" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "contato_telefone_key" ON "contato"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_key" ON "categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_contato_uid_key" ON "usuario"("contato_uid");

-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_tipo_marca_key" ON "produto"("nome", "tipo", "marca");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_produto_nome_key" ON "tipo_produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "marca_produto_nome_key" ON "marca_produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "produto_servico_uid_key" ON "produto_servico"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "etapa_fabricacao_nome_key" ON "etapa_fabricacao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_servico_paciente_AB_unique" ON "_servico_paciente"("A", "B");

-- CreateIndex
CREATE INDEX "_servico_paciente_B_index" ON "_servico_paciente"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_contato_categoria_AB_unique" ON "_contato_categoria"("A", "B");

-- CreateIndex
CREATE INDEX "_contato_categoria_B_index" ON "_contato_categoria"("B");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_contato_uid_fkey" FOREIGN KEY ("contato_uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "tipo_produto"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_marca_fkey" FOREIGN KEY ("marca") REFERENCES "marca_produto"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valor_produto" ADD CONSTRAINT "valor_produto_produto_uid_fkey" FOREIGN KEY ("produto_uid") REFERENCES "produto"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "servico_dentista_uid_fkey" FOREIGN KEY ("dentista_uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_servico" ADD CONSTRAINT "produto_servico_produto_uid_fkey" FOREIGN KEY ("produto_uid") REFERENCES "produto"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_servico" ADD CONSTRAINT "produto_servico_servico_uid_fkey" FOREIGN KEY ("servico_uid") REFERENCES "servico"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_servico" ADD CONSTRAINT "produto_servico_etapa_fkey" FOREIGN KEY ("etapa") REFERENCES "etapa_fabricacao"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamento_financeiro" ADD CONSTRAINT "lancamento_financeiro_servico_uid_fkey" FOREIGN KEY ("servico_uid") REFERENCES "servico"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamento_saida" ADD CONSTRAINT "lancamento_saida_contato_uid_fkey" FOREIGN KEY ("contato_uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamento_saida" ADD CONSTRAINT "lancamento_saida_uid_fkey" FOREIGN KEY ("uid") REFERENCES "lancamento_financeiro"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcela" ADD CONSTRAINT "parcela_lancamento_financeiro_uid_fkey" FOREIGN KEY ("lancamento_financeiro_uid") REFERENCES "lancamento_financeiro"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_parcela_uid_fkey" FOREIGN KEY ("parcela_uid") REFERENCES "parcela"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_servico_paciente" ADD CONSTRAINT "_servico_paciente_A_fkey" FOREIGN KEY ("A") REFERENCES "contato"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_servico_paciente" ADD CONSTRAINT "_servico_paciente_B_fkey" FOREIGN KEY ("B") REFERENCES "servico"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contato_categoria" ADD CONSTRAINT "_contato_categoria_A_fkey" FOREIGN KEY ("A") REFERENCES "categoria"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contato_categoria" ADD CONSTRAINT "_contato_categoria_B_fkey" FOREIGN KEY ("B") REFERENCES "contato"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
