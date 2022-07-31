/*
 Warnings:

 - You are about to drop the `telefone` table. If the table is not empty, all the data it contains will be lost.
 */
-- DropForeignKey

ALTER TABLE "telefone" DROP CONSTRAINT "telefone_contato_uid_fkey";

-- AlterTable

ALTER TABLE "contato"
    ADD COLUMN "telefones" INTEGER[];

-- DropTable

DROP TABLE "telefone";

