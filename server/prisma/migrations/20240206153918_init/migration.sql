/*
  Warnings:

  - You are about to drop the column `likedsongId` on the `Music` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_likedsongId_fkey";

-- AlterTable
ALTER TABLE "Liked_songs" ADD COLUMN     "music" JSONB;

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "likedsongId";
