// src\app\api\auth\[...nextauth]\prisma.ts

import { PrismaClient } from "@prisma/client";

// Use a global variable to avoid multiple instances in dev
const globalForPrisma = globalThis as { prisma?: PrismaClient };

// Use existing Prisma instance if available, otherwise create a new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Prevent multiple instances in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
