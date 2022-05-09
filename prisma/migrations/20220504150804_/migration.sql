/*
  Warnings:

  - The primary key for the `item_servico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `valor` on the `valor_produto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produto_id,servico_id]` on the table `item_servico` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome,tipo]` on the table `produto` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `item_servico` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `valor_em_cents` to the `valor_produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_servico" DROP CONSTRAINT "item_servico_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "item_servico_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "valor_produto" DROP COLUMN "valor",
ADD COLUMN     "valor_em_cents" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "item_servico_produto_id_servico_id_key" ON "item_servico"("produto_id", "servico_id");

-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_tipo_key" ON "produto"("nome", "tipo");
