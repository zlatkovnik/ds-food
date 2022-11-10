-- CreateTable
CREATE TABLE "AuthUser" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "OrderSession" (
    "uuid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expire" TIMESTAMP(3) NOT NULL,
    "createdByUuid" TEXT NOT NULL,
    "deliveryCost" DECIMAL(65,30) NOT NULL,
    "restaurant" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "OrderSession_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserOrder" (
    "uuid" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUuid" TEXT NOT NULL,
    "orderSessionUuid" TEXT NOT NULL,
    "meal" TEXT NOT NULL,
    "condaments" TEXT,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "UserOrder_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_email_key" ON "AuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_username_key" ON "AuthUser"("username");

-- AddForeignKey
ALTER TABLE "OrderSession" ADD CONSTRAINT "OrderSession_createdByUuid_fkey" FOREIGN KEY ("createdByUuid") REFERENCES "AuthUser"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "AuthUser"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_orderSessionUuid_fkey" FOREIGN KEY ("orderSessionUuid") REFERENCES "OrderSession"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
