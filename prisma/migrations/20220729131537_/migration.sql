-- DropIndex
DROP INDEX "usuario_contato_uid_key";

-- AlterTable

ALTER TABLE "usuario"
    ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("contato_uid");
