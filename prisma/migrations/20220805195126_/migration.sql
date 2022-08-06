/*
  Warnings:

  - Added the required column `fluxo` to the `lancamento_financeiro` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "fluxo_lancamento_enum" AS ENUM ('ENTRADA', 'SAIDA');

-- AlterTable
ALTER TABLE "lancamento_financeiro" ADD COLUMN     "fluxo" "fluxo_lancamento_enum" NOT NULL;
