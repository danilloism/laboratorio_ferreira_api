/*
  Warnings:

  - The `categorias` column on the `contato` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `estado_fabricacao` to the `item_servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `item_servico` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `produto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "categoria" AS ENUM ('dentista', 'fornecedor', 'cliente', 'colaborador', 'entregador', 'gerente', 'admin');

-- CreateEnum
CREATE TYPE "tipo_produto" AS ENUM ('pt', 'ppr', 'pino', 'restauracao');

-- CreateEnum
CREATE TYPE "EstaoFabricacao" AS ENUM ('recebido', 'fabricando', 'concluido');

-- AlterTable
ALTER TABLE "contato" DROP COLUMN "categorias",
ADD COLUMN     "categorias" "categoria"[];

-- AlterTable
ALTER TABLE "item_servico" ADD COLUMN     "estado_fabricacao" "EstaoFabricacao" NOT NULL,
ADD COLUMN     "quantidade" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "tipo_produto" NOT NULL;

-- DropEnum
DROP TYPE "Categoria";
