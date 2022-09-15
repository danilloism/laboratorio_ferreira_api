/*
  Warnings:

  - You are about to alter the column `telefones` on the `contato` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE "contato" ALTER COLUMN "telefones" SET DATA TYPE VARCHAR(11)[];

-- CreateTable
CREATE TABLE "SolicitacaoCadastro" (
    "uid" UUID NOT NULL,
    "solicitado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(100) NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "categorias" "role_enum"[],
    "observacoes" TEXT,
    "aceito" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SolicitacaoCadastro_pkey" PRIMARY KEY ("uid")
);
