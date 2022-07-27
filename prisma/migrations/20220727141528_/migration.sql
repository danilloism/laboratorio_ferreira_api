/*
  Warnings:

  - The values [agua,energia,gas,salario,repasse_dent_esp_odont,pgmnt_fornecedor,outro] on the enum `finalidade_saida_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [dinheiro,cheque,cartao] on the enum `forma_pagamento_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [admin,gerente,colaborador,dentista,cliente,fornecedor,entregador] on the enum `role_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [aberto,quitado,vencido,renegociado] on the enum `status_pagamento_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "finalidade_saida_enum_new" AS ENUM ('AGUA', 'ENERGIA', 'GAS', 'SALARIO', 'REPASSE_DENT_ESP_ODONT', 'PGMNT_FONECEDOR', 'OUTRO');
ALTER TABLE "lancamento_saida" ALTER COLUMN "finalidade" TYPE "finalidade_saida_enum_new" USING ("finalidade"::text::"finalidade_saida_enum_new");
ALTER TYPE "finalidade_saida_enum" RENAME TO "finalidade_saida_enum_old";
ALTER TYPE "finalidade_saida_enum_new" RENAME TO "finalidade_saida_enum";
DROP TYPE "finalidade_saida_enum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "forma_pagamento_enum_new" AS ENUM ('DINHEIRO', 'CHEQUE', 'CARTAO');
ALTER TABLE "lancamento_financeiro" ALTER COLUMN "forma_pagamento" DROP DEFAULT;
ALTER TABLE "lancamento_financeiro" ALTER COLUMN "forma_pagamento" TYPE "forma_pagamento_enum_new" USING ("forma_pagamento"::text::"forma_pagamento_enum_new");
ALTER TYPE "forma_pagamento_enum" RENAME TO "forma_pagamento_enum_old";
ALTER TYPE "forma_pagamento_enum_new" RENAME TO "forma_pagamento_enum";
DROP TYPE "forma_pagamento_enum_old";
ALTER TABLE "lancamento_financeiro" ALTER COLUMN "forma_pagamento" SET DEFAULT 'DINHEIRO';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "role_enum_new" AS ENUM ('ADMIN', 'GERENTE', 'COLABORADOR', 'DENTISTA', 'CLIENTE', 'FORNECEDOR', 'ENTREGADOR');
ALTER TABLE "contato" ALTER COLUMN "categorias" TYPE "role_enum_new"[] USING ("categorias"::text::"role_enum_new"[]);
ALTER TYPE "role_enum" RENAME TO "role_enum_old";
ALTER TYPE "role_enum_new" RENAME TO "role_enum";
DROP TYPE "role_enum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "status_pagamento_enum_new" AS ENUM ('ABERTO', 'QUITADO', 'VENCIDO', 'RENEGOCIADO');
ALTER TABLE "parcela" ALTER COLUMN "status" TYPE "status_pagamento_enum_new" USING ("status"::text::"status_pagamento_enum_new");
ALTER TYPE "status_pagamento_enum" RENAME TO "status_pagamento_enum_old";
ALTER TYPE "status_pagamento_enum_new" RENAME TO "status_pagamento_enum";
DROP TYPE "status_pagamento_enum_old";
COMMIT;

-- AlterTable
ALTER TABLE "lancamento_financeiro" ALTER COLUMN "forma_pagamento" SET DEFAULT 'DINHEIRO';
