/*
 Warnings:

 - The `categorias` column on the `contato` table would be dropped and recreated. This will lead to data loss if there is data in the column.
 - The `forma_pagamento` column on the `lancamento_financeiro` table would be dropped and recreated. This will lead to data loss if there is data in the column.
 - Changed the type of `finalidade` on the `lancamento_saida` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
 - Changed the type of `status` on the `parcela` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
 */
-- CreateEnum

CREATE TYPE "role_enum" AS ENUM ( 'admin',
    'gerente',
    'colaborador',
    'dentista',
    'cliente',
    'fornecedor',
    'entregador'
);

-- CreateEnum

CREATE TYPE "finalidade_saida_enum" AS ENUM ( 'agua',
    'energia',
    'gas',
    'salario',
    'repasse_dent_esp_odont',
    'pgmnt_fornecedor',
    'outro'
);

-- CreateEnum

CREATE TYPE "status_pagamento_enum" AS ENUM ( 'aberto',
    'quitado',
    'vencido',
    'renegociado'
);

-- CreateEnum

CREATE TYPE "forma_pagamento_enum" AS ENUM ( 'dinheiro',
    'cheque',
    'cartao'
);

-- AlterTable

ALTER TABLE "contato" DROP COLUMN "categorias",
    ADD COLUMN "categorias" "role_enum"[];

-- AlterTable

ALTER TABLE "lancamento_financeiro" DROP COLUMN "forma_pagamento",
    ADD COLUMN "forma_pagamento" "forma_pagamento_enum" NOT NULL DEFAULT E'dinheiro';

-- AlterTable

ALTER TABLE "lancamento_saida" DROP COLUMN "finalidade",
    ADD COLUMN "finalidade" "finalidade_saida_enum" NOT NULL;

-- AlterTable

ALTER TABLE "parcela" DROP COLUMN "status",
    ADD COLUMN "status" "status_pagamento_enum" NOT NULL;

-- DropEnum

DROP TYPE "finalidade_saida";

-- DropEnum

DROP TYPE "forma_pagamento";

-- DropEnum

DROP TYPE "role";

-- DropEnum

DROP TYPE "status_pagamento";

