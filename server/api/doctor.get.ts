import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const substr =
    typeof query.substr === "string" && query.substr ? query.substr : undefined;

  return await prisma.doctor.findMany({
    where: {
      OR: [
        { name: { contains: substr, mode: "insensitive" } },
        { email: { contains: substr, mode: "insensitive" } },
      ],
    },
  });
});
