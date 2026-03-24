import { prisma } from "@/lib/prisma";

export type HealthPayload = {
  ok: boolean;
  database: { configured: boolean; reachable: boolean };
};

export async function getHealthPayload(): Promise<HealthPayload> {
  const configured = Boolean(process.env.DATABASE_URL?.trim());
  if (!configured) {
    return { ok: false, database: { configured: false, reachable: false } };
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true, database: { configured: true, reachable: true } };
  } catch (e) {
    console.error("[health]", e instanceof Error ? e.message : e);
    return { ok: false, database: { configured: true, reachable: false } };
  }
}
