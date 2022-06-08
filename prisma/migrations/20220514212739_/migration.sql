/*
  Warnings:

  - You are about to drop the column `etapaFabricacaoId` on the `item_servico` table. All the data in the column will be lost.
  - You are about to drop the column `etapaId` on the `item_servico` table. All the data in the column will be lost.
  - Added the required column `etapa` to the `item_servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contato_id` to the `servico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_servico" DROP CONSTRAINT "item_servico_etapaFabricacaoId_fkey";

-- AlterTable
ALTER TABLE "item_servico" DROP COLUMN "etapaFabricacaoId",
DROP COLUMN "etapaId",
ADD COLUMN     "etapa" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "servico" ADD COLUMN     "contato_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "paciente_servico" (
    "id" TEXT NOT NULL,
    "paciente_id" TEXT NOT NULL,
    "servico_id" TEXT NOT NULL,

    CONSTRAINT "paciente_servico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paciente_servico_servico_id_paciente_id_key" ON "paciente_servico"("servico_id", "paciente_id");

-- AddForeignKey
ALTER TABLE "paciente_servico" ADD CONSTRAINT "paciente_servico_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paciente_servico" ADD CONSTRAINT "paciente_servico_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "servico_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_servico" ADD CONSTRAINT "item_servico_etapa_fkey" FOREIGN KEY ("etapa") REFERENCES "etapa_fabricacao"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;
