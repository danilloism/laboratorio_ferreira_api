/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `contato` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contato_telefone_key" ON "contato"("telefone");
