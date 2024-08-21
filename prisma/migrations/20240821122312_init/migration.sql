/*
  Warnings:

  - Added the required column `content` to the `Micropost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Micropost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Micropost" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
