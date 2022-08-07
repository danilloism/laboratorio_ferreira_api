/*
  Warnings:

  - You are about to drop the column `categorias` on the `contato` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contato" DROP COLUMN "categorias";

-- DropEnum
DROP TYPE "role_enum";
