/*
  Warnings:

  - You are about to drop the `_servico_paciente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_servico_paciente" DROP CONSTRAINT "_servico_paciente_A_fkey";

-- DropForeignKey
ALTER TABLE "_servico_paciente" DROP CONSTRAINT "_servico_paciente_B_fkey";

-- DropForeignKey
ALTER TABLE "lancamento_saida" DROP CONSTRAINT "lancamento_saida_contato_uid_fkey";

-- DropForeignKey
ALTER TABLE "servico" DROP CONSTRAINT "servico_dentista_uid_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_contato_uid_fkey";

-- DropTable
DROP TABLE "_servico_paciente";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "dentista" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "esp_odont" BOOLEAN NOT NULL,

    CONSTRAINT "dentista_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "paciente" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "esp_odont" BOOLEAN,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "colaborador" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "colaborador_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "account" (
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "contato_uid" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50),
    "senha" VARCHAR(200) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("contato_uid")
);

-- CreateTable
CREATE TABLE "_PacienteToServico" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_PacienteToServico_AB_unique" ON "_PacienteToServico"("A", "B");

-- CreateIndex
CREATE INDEX "_PacienteToServico_B_index" ON "_PacienteToServico"("B");

-- AddForeignKey
ALTER TABLE "dentista" ADD CONSTRAINT "dentista_uid_fkey" FOREIGN KEY ("uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paciente" ADD CONSTRAINT "paciente_uid_fkey" FOREIGN KEY ("uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborador" ADD CONSTRAINT "colaborador_uid_fkey" FOREIGN KEY ("uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_contato_uid_fkey" FOREIGN KEY ("contato_uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "servico_dentista_uid_fkey" FOREIGN KEY ("dentista_uid") REFERENCES "dentista"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamento_saida" ADD CONSTRAINT "lancamento_saida_contato_uid_fkey" FOREIGN KEY ("contato_uid") REFERENCES "colaborador"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PacienteToServico" ADD CONSTRAINT "_PacienteToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "paciente"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PacienteToServico" ADD CONSTRAINT "_PacienteToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "servico"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
