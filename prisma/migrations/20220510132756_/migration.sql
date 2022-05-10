/*
  Warnings:

  - You are about to drop the column `estado_fabricacao` on the `item_servico` table. All the data in the column will be lost.
  - Added the required column `etapaId` to the `item_servico` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `produto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "produto_nome_tipo_key";

-- AlterTable
ALTER TABLE "item_servico" DROP COLUMN "estado_fabricacao",
ADD COLUMN     "etapaFabricacaoId" TEXT,
ADD COLUMN     "etapaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "atualizado_em" TIMESTAMP(3),
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" TEXT NOT NULL;

-- DropEnum
DROP TYPE "estado_fabricacao";

-- DropEnum
DROP TYPE "tipo_produto";

-- CreateTable
CREATE TABLE "EtapaFabricacaoProduto" (
    "id" TEXT NOT NULL,
    "etapa" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "EtapaFabricacaoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "tipo_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etapa_fabricacao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "etapa_fabricacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EtapaFabricacaoProduto_ordem_produtoId_key" ON "EtapaFabricacaoProduto"("ordem", "produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "EtapaFabricacaoProduto_etapa_produtoId_key" ON "EtapaFabricacaoProduto"("etapa", "produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_produto_nome_key" ON "tipo_produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "etapa_fabricacao_nome_key" ON "etapa_fabricacao"("nome");

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "tipo_produto"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaFabricacaoProduto" ADD CONSTRAINT "EtapaFabricacaoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaFabricacaoProduto" ADD CONSTRAINT "EtapaFabricacaoProduto_etapa_fkey" FOREIGN KEY ("etapa") REFERENCES "etapa_fabricacao"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_servico" ADD CONSTRAINT "item_servico_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "EtapaFabricacaoProduto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_servico" ADD CONSTRAINT "item_servico_etapaFabricacaoId_fkey" FOREIGN KEY ("etapaFabricacaoId") REFERENCES "etapa_fabricacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
