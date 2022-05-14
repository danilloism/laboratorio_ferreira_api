/*
  Warnings:

  - You are about to drop the `EtapaFabricacaoProduto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EtapaFabricacaoProduto" DROP CONSTRAINT "EtapaFabricacaoProduto_etapa_fkey";

-- DropForeignKey
ALTER TABLE "EtapaFabricacaoProduto" DROP CONSTRAINT "EtapaFabricacaoProduto_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "item_servico" DROP CONSTRAINT "item_servico_etapaId_fkey";

-- DropTable
DROP TABLE "EtapaFabricacaoProduto";
