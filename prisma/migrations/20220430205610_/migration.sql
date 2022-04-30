/*
  Warnings:

  - You are about to drop the `telefone_alternativo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "telefone_alternativo" DROP CONSTRAINT "telefone_alternativo_contato_id_fkey";

-- DropTable
DROP TABLE "telefone_alternativo";
