/*
  Warnings:

  - You are about to drop the `SolicitacaoCadastro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SolicitacaoCadastro";

-- CreateTable
CREATE TABLE "solicitacao_cadastro"
(
    "uid"           UUID         NOT NULL,
    "solicitado_em" TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email"         VARCHAR(100) NOT NULL,
    "nome"          VARCHAR(80)  NOT NULL,
    "telefone"      VARCHAR(11)  NOT NULL,
    "categorias"    "role_enum"[],
    "observacoes"   TEXT,
    "aceito"        BOOLEAN      NOT NULL DEFAULT false,

    CONSTRAINT "solicitacao_cadastro_pkey" PRIMARY KEY ("uid")
);
