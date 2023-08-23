import { z } from "zod";
import { prisma } from "~/prisma/db";
import { patientSchema } from "~/utils/validation/patient-schema";

export type PostPatient = z.infer<typeof patientSchema>;

export default defineEventHandler(async (event) => {
  const body = JSON.parse(await readBody(event)) as PostPatient;

  const parseResult = patientSchema.safeParse(body);

  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: JSON.stringify(parseResult.error.errors),
    });
  }

  return await prisma.patient.create({
    data: {
      diagnosis: body.diagnosis,
      name: body.name,
      image: body.avatarUrl,
      email: body.email,
      DoctorPatient: {
        create: body.doctorIds.map((id) => ({ doctorId: id })),
      },
    },
  });
});
