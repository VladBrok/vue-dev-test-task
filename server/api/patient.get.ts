import { Prisma } from "@prisma/client";
import { prisma } from "~/prisma/db";

export type Patient = Awaited<
  ReturnType<typeof prisma.patient.findMany>
>[number] & {
  doctors: { name: string; id: string; image: string | null; email: string }[];
};

export default defineEventHandler(async (event): Promise<Patient[]> => {
  const query = getQuery(event);

  const whereDoctor =
    typeof query.doctorId === "string" && query.doctorId
      ? { DoctorPatient: { some: { doctorId: query.doctorId } } }
      : undefined;

  const whereSubstr: Prisma.PatientWhereInput | undefined =
    typeof query.substr === "string" && query.substr
      ? {
          OR: [
            { email: { contains: query.substr, mode: "insensitive" } },
            { name: { contains: query.substr, mode: "insensitive" } },
            { diagnosis: { contains: query.substr, mode: "insensitive" } },
            {
              DoctorPatient: {
                some: {
                  doctor: {
                    name: { contains: query.substr, mode: "insensitive" },
                  },
                },
              },
            },
          ],
        }
      : undefined;

  const whereId =
    typeof query.id === "string" && query.id ? { id: query.id } : undefined;

  return (
    await prisma.patient.findMany({
      where: whereId || { ...whereDoctor, ...whereSubstr },
      orderBy: { registrationDate: "asc" },
      include: {
        DoctorPatient: {
          include: {
            doctor: {
              select: { name: true, id: true, image: true, email: true },
            },
          },
        },
      },
    })
  ).map((x) => ({
    ...x,
    doctors: x?.DoctorPatient.map((dp) => ({
      name: dp.doctor.name,
      id: dp.doctor.id,
      image: dp.doctor.image,
      email: dp.doctor.email,
    })),
  }));
});
