/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contact_phone_key" ON "contact"("phone");
