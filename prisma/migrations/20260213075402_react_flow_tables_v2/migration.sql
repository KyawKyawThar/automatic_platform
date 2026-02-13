/*
  Warnings:

  - You are about to drop the column `toOutput` on the `Connection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromNodeId,toNodeId,fromOutput,toInput]` on the table `Connection` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Node` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('INITIAL');

-- DropIndex
DROP INDEX "Connection_fromNodeId_toNodeId_fromOutput_toOutput_key";

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "toOutput",
ADD COLUMN     "toInput" TEXT NOT NULL DEFAULT 'main';

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "type",
ADD COLUMN     "type" "NodeType" NOT NULL;

-- DropEnum
DROP TYPE "NoteType";

-- CreateIndex
CREATE UNIQUE INDEX "Connection_fromNodeId_toNodeId_fromOutput_toInput_key" ON "Connection"("fromNodeId", "toNodeId", "fromOutput", "toInput");
