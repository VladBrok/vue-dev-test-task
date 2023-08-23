import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const substr =
    typeof query.substr === "string" && query.substr ? query.substr : undefined;
  const id = typeof query.id === "string" && query.id ? query.id : undefined;

  return await prisma.doctor.findMany({
    where: {
      OR: [
        substr ? { name: { contains: substr, mode: "insensitive" } } : {},
        substr ? { email: { contains: substr, mode: "insensitive" } } : {},
        { id },
      ],
    },
  });
});
