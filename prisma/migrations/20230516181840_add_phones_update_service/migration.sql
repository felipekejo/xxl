/*
  Warnings:

  - Added the required column `phoneId` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "phoneId" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "phones" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "phones_name_key" ON "phones"("name");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "phones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
