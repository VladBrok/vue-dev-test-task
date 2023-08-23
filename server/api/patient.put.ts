import { z } from "zod";
import { prisma } from "~/prisma/db";
import { patientSchema } from "~/utils/validation/patient-schema";

export type PutPatient = z.infer<typeof patientSchema>;

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as PutPatient;

  const parseResult = patientSchema.safeParse(body);

  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: JSON.stringify(parseResult.error.errors),
    });
  }

  const id = getQuery(event).id;

  if (typeof id !== "string" || !id) {
    throw createError({
      statusCode: 400,
      statusMessage: "please provide a valid id",
    });
  }

  return await prisma.$transaction(async (tx) => {
    await tx.doctorPatient.deleteMany({
      where: { patientId: id },
    });

    return await tx.patient.update({
      where: { id },
      data: {
        diagnosis: body.diagnosis,
        name: body.name,
        image: body.avatarUrl,
        email: body.email,
        DoctorPatient: {
          create: body.doctorIds
            .filter(Boolean)
            .map((id) => ({ doctorId: id })),
        },
      },
    });
  });
});
