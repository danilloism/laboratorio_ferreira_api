/*
  Warnings:

  - You are about to drop the column `esp_odont` on the `dentista` table. All the data in the column will be lost.
  - You are about to drop the column `esp_odont` on the `paciente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "dentista" DROP COLUMN "esp_odont";

-- AlterTable
ALTER TABLE "paciente" DROP COLUMN "esp_odont";
