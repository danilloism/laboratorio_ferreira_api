/*
 Warnings:

 - You are about to drop the `_contato_categoria` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
 */
-- CreateEnum

CREATE TYPE "role" AS ENUM ( 'admin',
    'gerente',
    'colaborador',
    'dentista',
    'cliente',
    'fornecedor',
    'entregador'
);

-- DropForeignKey

ALTER TABLE "_contato_categoria" DROP CONSTRAINT "_contato_categoria_A_fkey";

-- DropForeignKey

ALTER TABLE "_contato_categoria" DROP CONSTRAINT "_contato_categoria_B_fkey";

-- AlterTable

ALTER TABLE "contato"
    ADD COLUMN "categorias" "role"[];

-- DropTable

DROP TABLE "_contato_categoria";

-- DropTable

DROP TABLE "categoria";
