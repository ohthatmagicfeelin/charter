-- Add sensor column with a default value
ALTER TABLE "sensor_data" ADD COLUMN "sensor" VARCHAR(50) NOT NULL DEFAULT 'unknown';

-- Create index on sensor column
CREATE INDEX "sensor_data_sensor_idx" ON "sensor_data"("sensor");

-- Update existing records based on type
UPDATE "sensor_data"
SET "sensor" = CASE
    WHEN "type" LIKE 'temperature%' THEN 'bme680'
    WHEN "type" LIKE 'humidity%' THEN 'bme680'
    WHEN "type" LIKE 'pressure%' THEN 'bme680'
    WHEN "type" LIKE 'gas%' THEN 'bme680'
    WHEN "type" LIKE 'soil_moisture%' THEN 'soil_moisture'
    WHEN "type" LIKE 'wifi%' THEN 'network'
    WHEN "type" LIKE 'stored_readings%' THEN 'network'
    WHEN "type" LIKE 'battery_%' THEN 'battery'
    ELSE 'unknown'
END;

-- Remove the default value constraint
ALTER TABLE "sensor_data" ALTER COLUMN "sensor" DROP DEFAULT;