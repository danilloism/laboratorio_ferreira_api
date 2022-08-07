/*
  Warnings:

  - The values [CLIENTE] on the enum `role_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "role_enum_new" AS ENUM ('ADMIN', 'GERENTE', 'COLABORADOR', 'DENTISTA', 'PACIENTE', 'FORNECEDOR', 'ENTREGADOR');
ALTER TABLE "contato" ALTER COLUMN "categorias" TYPE "role_enum_new"[] USING ("categorias"::text::"role_enum_new"[]);
ALTER TYPE "role_enum" RENAME TO "role_enum_old";
ALTER TYPE "role_enum_new" RENAME TO "role_enum";
DROP TYPE "role_enum_old";
COMMIT;
