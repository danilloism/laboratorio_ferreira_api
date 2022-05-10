/*
  Warnings:

  - A unique constraint covering the columns `[nome,tipo]` on the table `produto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_tipo_key" ON "produto"("nome", "tipo");
