/*
  Warnings:

  - You are about to drop the column `music` on the `Artist_Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `music` on the `User_Playlist` table. All the data in the column will be lost.
  - Added the required column `name` to the `Artist_Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likedsongId` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `music_photo` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User_Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist_Playlist" DROP COLUMN "music",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "likedsongId" INTEGER NOT NULL,
ADD COLUMN     "music_photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_Playlist" DROP COLUMN "music",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Liked_songs" (
    "id" SERIAL NOT NULL,
    "User_id" INTEGER,
    "ArtistId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Liked_songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MusicToUser_Playlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Artist_PlaylistToMusic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MusicToUser_Playlist_AB_unique" ON "_MusicToUser_Playlist"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicToUser_Playlist_B_index" ON "_MusicToUser_Playlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Artist_PlaylistToMusic_AB_unique" ON "_Artist_PlaylistToMusic"("A", "B");

-- CreateIndex
CREATE INDEX "_Artist_PlaylistToMusic_B_index" ON "_Artist_PlaylistToMusic"("B");

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_likedsongId_fkey" FOREIGN KEY ("likedsongId") REFERENCES "Liked_songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked_songs" ADD CONSTRAINT "Liked_songs_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked_songs" ADD CONSTRAINT "Liked_songs_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicToUser_Playlist" ADD CONSTRAINT "_MusicToUser_Playlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicToUser_Playlist" ADD CONSTRAINT "_MusicToUser_Playlist_B_fkey" FOREIGN KEY ("B") REFERENCES "User_Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Artist_PlaylistToMusic" ADD CONSTRAINT "_Artist_PlaylistToMusic_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist_Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Artist_PlaylistToMusic" ADD CONSTRAINT "_Artist_PlaylistToMusic_B_fkey" FOREIGN KEY ("B") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;
