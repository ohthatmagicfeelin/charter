-- CreateTable
CREATE TABLE "sensor_data" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "device_id" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sensor_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sensor_data_device_id_idx" ON "sensor_data"("device_id");

-- CreateIndex
CREATE INDEX "sensor_data_type_idx" ON "sensor_data"("type");

-- CreateIndex
CREATE INDEX "sensor_data_created_at_idx" ON "sensor_data"("created_at");
