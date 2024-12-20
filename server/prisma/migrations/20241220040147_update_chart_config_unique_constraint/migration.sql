/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `chart_configs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "chart_configs_user_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "chart_configs_user_id_key" ON "chart_configs"("user_id");
