/*
  Warnings:

  - You are about to drop the `_PacienteToServico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `colaborador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dentista` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "role_enum" AS ENUM ('ADMIN', 'GERENTE', 'COLABORADOR', 'DENTISTA', 'CLIENTE', 'FORNECEDOR', 'ENTREGADOR');

-- DropForeignKey
ALTER TABLE "_PacienteToServico" DROP CONSTRAINT "_PacienteToServico_A_fkey";

-- DropForeignKey
ALTER TABLE "_PacienteToServico" DROP CONSTRAINT "_PacienteToServico_B_fkey";

-- DropForeignKey
ALTER TABLE "colaborador" DROP CONSTRAINT "colaborador_uid_fkey";

-- DropForeignKey
ALTER TABLE "dentista" DROP CONSTRAINT "dentista_uid_fkey";

-- DropForeignKey
ALTER TABLE "lancamento_saida" DROP CONSTRAINT "lancamento_saida_contato_uid_fkey";

-- DropForeignKey
ALTER TABLE "paciente" DROP CONSTRAINT "paciente_uid_fkey";

-- DropForeignKey
ALTER TABLE "servico" DROP CONSTRAINT "servico_dentista_uid_fkey";

-- AlterTable
ALTER TABLE "contato" ADD COLUMN     "categorias" "role_enum"[];

-- DropTable
DROP TABLE "_PacienteToServico";

-- DropTable
DROP TABLE "colaborador";

-- DropTable
DROP TABLE "dentista";

-- DropTable
DROP TABLE "paciente";

-- CreateTable
CREATE TABLE "_servico_paciente" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_servico_paciente_AB_unique" ON "_servico_paciente"("A", "B");

-- CreateIndex
CREATE INDEX "_servico_paciente_B_index" ON "_servico_paciente"("B");

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "servico_dentista_uid_fkey" FOREIGN KEY ("dentista_uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamento_saida" ADD CONSTRAINT "lancamento_saida_contato_uid_fkey" FOREIGN KEY ("contato_uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_servico_paciente" ADD CONSTRAINT "_servico_paciente_A_fkey" FOREIGN KEY ("A") REFERENCES "contato"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_servico_paciente" ADD CONSTRAINT "_servico_paciente_B_fkey" FOREIGN KEY ("B") REFERENCES "servico"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
