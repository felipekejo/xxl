-- CreateTable
CREATE TABLE "repairs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "problemDescription" TEXT NOT NULL,
    "contact" TEXT,
    "serviceId" TEXT,

    CONSTRAINT "repairs_pkey" PRIMARY KEY ("id")
);
