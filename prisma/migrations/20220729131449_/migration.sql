/*
 Warnings:

 - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - You are about to drop the column `uid` on the `usuario` table. All the data in the column will be lost.
 */
-- AlterTable

ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey", DROP COLUMN "uid";
