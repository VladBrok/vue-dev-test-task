import { prisma } from "~/prisma/db";

export type Patient = Awaited<
  ReturnType<typeof prisma.patient.findMany>
>[number];

export default defineEventHandler(async (event): Promise<Patient[]> => {
  const query = getQuery(event);

  if (typeof query.doctorId === "string" && query.doctorId) {
    return await prisma.patient.findMany({
      where: { DoctorPatient: { some: { doctorId: query.doctorId } } },
      orderBy: { registrationDate: "asc" },
    });
  } else {
    return await prisma.patient.findMany({
      orderBy: { registrationDate: "asc" },
    });
  }
});
