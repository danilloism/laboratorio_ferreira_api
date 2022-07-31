/*
 Warnings:

 - A unique constraint covering the columns `[telefones]` on the table `contato` will be added. If there are existing duplicate values, this will fail.
 */
-- CreateIndex

CREATE UNIQUE INDEX "contato_telefones_key" ON "contato" ("telefones");

