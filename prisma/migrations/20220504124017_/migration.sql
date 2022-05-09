/*
  Warnings:

  - Added the required column `valor` to the `valor_produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "valor_produto" ADD COLUMN     "valor" INTEGER NOT NULL;
