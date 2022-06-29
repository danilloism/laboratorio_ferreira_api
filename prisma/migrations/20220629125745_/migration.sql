/*
 Warnings:

 - A unique constraint covering the columns `[numero,contato_uid]` on the table `telefone` will be added. If there are existing duplicate values, this will fail.
 */
-- DropIndex

DROP INDEX "telefone_contato_uid_key";

-- CreateIndex

CREATE UNIQUE INDEX "telefone_numero_contato_uid_key" ON "telefone" ("numero", "contato_uid");
