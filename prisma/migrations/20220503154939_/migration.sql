/*
  Warnings:

  - A unique constraint covering the columns `[marca,tipo]` on the table `produto` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "produto_nome_key";

-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "marca" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "produto_marca_tipo_key" ON "produto"("marca", "tipo");
