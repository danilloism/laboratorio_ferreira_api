/*
  Warnings:

  - You are about to drop the column `telefone` on the `agenda` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "contato_telefone_key";

-- AlterTable
ALTER TABLE "contato" DROP COLUMN "telefone";

-- CreateTable
CREATE TABLE "telefone" (
    "uid" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "contato_uid" UUID NOT NULL,
    "ddd" SMALLINT,
    "numero" INTEGER NOT NULL,
    "whatsapp" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "telefone_contato_uid_key" ON "telefone"("contato_uid");

-- CreateIndex
CREATE UNIQUE INDEX "telefone_ddd_numero_key" ON "telefone"("ddd", "numero");

-- AddForeignKey
ALTER TABLE "telefone" ADD CONSTRAINT "telefone_contato_uid_fkey" FOREIGN KEY ("contato_uid") REFERENCES "contato"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
