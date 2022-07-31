-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_marca_fkey";

-- AlterTable
ALTER TABLE "produto" ALTER COLUMN "marca" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_marca_fkey" FOREIGN KEY ("marca") REFERENCES "marca_produto"("nome") ON DELETE SET NULL ON UPDATE CASCADE;
