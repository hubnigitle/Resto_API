-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ukuran" (
    "id" UUID NOT NULL,
    "ukuran" VARCHAR(100) NOT NULL,

    CONSTRAINT "Ukuran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuToUkuran" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_MenuToUkuran_AB_unique" ON "_MenuToUkuran"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuToUkuran_B_index" ON "_MenuToUkuran"("B");

-- AddForeignKey
ALTER TABLE "_MenuToUkuran" ADD CONSTRAINT "_MenuToUkuran_A_fkey" FOREIGN KEY ("A") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToUkuran" ADD CONSTRAINT "_MenuToUkuran_B_fkey" FOREIGN KEY ("B") REFERENCES "Ukuran"("id") ON DELETE CASCADE ON UPDATE CASCADE;
