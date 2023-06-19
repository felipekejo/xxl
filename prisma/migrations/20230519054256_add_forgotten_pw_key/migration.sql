/*
  Warnings:

  - A unique constraint covering the columns `[reset_key]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "key_date" TIMESTAMP(3),
ADD COLUMN     "reset_key" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_reset_key_key" ON "users"("reset_key");
