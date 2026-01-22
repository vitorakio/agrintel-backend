/*
  Warnings:

  - You are about to drop the `Area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Crop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Farm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Harvest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MarketPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeedVariety` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_farmId_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_areaId_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_farmId_fkey";

-- DropForeignKey
ALTER TABLE "Harvest" DROP CONSTRAINT "Harvest_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Harvest" DROP CONSTRAINT "Harvest_seedVarietyId_fkey";

-- DropForeignKey
ALTER TABLE "MarketPrice" DROP CONSTRAINT "MarketPrice_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_cropId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_farmId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_seedVarietyId_fkey";

-- DropForeignKey
ALTER TABLE "SeedVariety" DROP CONSTRAINT "SeedVariety_cropId_fkey";

-- DropTable
DROP TABLE "Area";

-- DropTable
DROP TABLE "Crop";

-- DropTable
DROP TABLE "Farm";

-- DropTable
DROP TABLE "Field";

-- DropTable
DROP TABLE "Harvest";

-- DropTable
DROP TABLE "MarketPrice";

-- DropTable
DROP TABLE "Season";

-- DropTable
DROP TABLE "SeedVariety";

-- CreateTable
CREATE TABLE "farms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "area_ha" DOUBLE PRECISION NOT NULL,
    "original_unit" "AreaUnit",
    "original_size" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "area_id" INTEGER,
    "name" TEXT NOT NULL,
    "area_ha" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seed_varieties" (
    "id" SERIAL NOT NULL,
    "crop_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seed_varieties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "field_id" INTEGER,
    "crop_id" INTEGER NOT NULL,
    "seed_variety_id" INTEGER,
    "name" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "productivity_sc_ha" DOUBLE PRECISION,
    "area_ha_override" DOUBLE PRECISION,
    "region" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvests" (
    "id" SERIAL NOT NULL,
    "season_id" INTEGER NOT NULL,
    "seed_variety_id" INTEGER,
    "name" TEXT,
    "harvest_date" TIMESTAMP(3) NOT NULL,
    "yield_sc" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "harvests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_prices" (
    "id" SERIAL NOT NULL,
    "season_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price_per_sack" DOUBLE PRECISION NOT NULL,
    "source" TEXT,
    "region" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "market_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_farms_name" ON "farms"("name");

-- CreateIndex
CREATE INDEX "idx_areas_farm_id" ON "areas"("farm_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_areas_farm_id_name" ON "areas"("farm_id", "name");

-- CreateIndex
CREATE INDEX "idx_fields_farm_id" ON "fields"("farm_id");

-- CreateIndex
CREATE INDEX "idx_fields_area_id" ON "fields"("area_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_fields_farm_id_name" ON "fields"("farm_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "uq_crops_code" ON "crops"("code");

-- CreateIndex
CREATE UNIQUE INDEX "uq_crops_name" ON "crops"("name");

-- CreateIndex
CREATE INDEX "idx_seed_varieties_crop_id" ON "seed_varieties"("crop_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_seed_varieties_crop_id_name" ON "seed_varieties"("crop_id", "name");

-- CreateIndex
CREATE INDEX "idx_seasons_farm_id" ON "seasons"("farm_id");

-- CreateIndex
CREATE INDEX "idx_seasons_field_id" ON "seasons"("field_id");

-- CreateIndex
CREATE INDEX "idx_seasons_crop_id" ON "seasons"("crop_id");

-- CreateIndex
CREATE INDEX "idx_seasons_start_end" ON "seasons"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "idx_harvests_season_id" ON "harvests"("season_id");

-- CreateIndex
CREATE INDEX "idx_harvests_harvest_date" ON "harvests"("harvest_date");

-- CreateIndex
CREATE INDEX "idx_market_prices_season_id" ON "market_prices"("season_id");

-- CreateIndex
CREATE INDEX "idx_market_prices_date" ON "market_prices"("date");

-- AddForeignKey
ALTER TABLE "areas" ADD CONSTRAINT "areas_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seed_varieties" ADD CONSTRAINT "seed_varieties_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "fields"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_seed_variety_id_fkey" FOREIGN KEY ("seed_variety_id") REFERENCES "seed_varieties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_seed_variety_id_fkey" FOREIGN KEY ("seed_variety_id") REFERENCES "seed_varieties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_prices" ADD CONSTRAINT "market_prices_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
