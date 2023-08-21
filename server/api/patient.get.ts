import { prisma } from "~/prisma/db";

export type Patient = Awaited<
  ReturnType<typeof prisma.patient.findMany>
>[number];

export default defineEventHandler(async (event): Promise<Patient[]> => {
  return await prisma.patient.findMany({
    orderBy: { registrationDate: "asc" },
  });
});

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
