import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id;

  if (typeof id !== "string" || !id) {
    throw createError({
      statusCode: 400,
      statusMessage: "please provide a valid id",
    });
  }

  return await prisma.patient.delete({ where: { id } });
});
