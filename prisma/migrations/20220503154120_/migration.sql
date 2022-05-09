/*
  Warnings:

  - Changed the type of `estado_fabricacao` on the `item_servico` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "estado_fabricacao" AS ENUM ('recebido', 'fabricando', 'concluido');

-- AlterTable
ALTER TABLE "item_servico" DROP COLUMN "estado_fabricacao",
ADD COLUMN     "estado_fabricacao" "estado_fabricacao" NOT NULL;

-- DropEnum
DROP TYPE "EstaoFabricacao";
