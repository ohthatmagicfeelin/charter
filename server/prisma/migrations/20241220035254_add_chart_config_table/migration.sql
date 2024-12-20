-- CreateTable
CREATE TABLE "chart_configs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "config" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chart_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chart_configs_user_id_idx" ON "chart_configs"("user_id");

-- AddForeignKey
ALTER TABLE "chart_configs" ADD CONSTRAINT "chart_configs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
