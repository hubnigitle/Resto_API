-- CreateTable
CREATE TABLE "Menu" (
    "id" UUID NOT NULL,
    "menu" VARCHAR(50) NOT NULL,
    "deskripsi" VARCHAR(100) NOT NULL,
    "harga" INTEGER NOT NULL,
    "kategoriId" UUID NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" UUID NOT NULL,
    "kategori" VARCHAR(20) NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
