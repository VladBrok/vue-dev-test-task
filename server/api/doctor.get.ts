import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const substr =
    typeof query.substr === "string" && query.substr ? query.substr : undefined;
  const id = typeof query.id === "string" && query.id ? query.id : undefined;

  return await prisma.doctor.findMany({
    where: id
      ? { id }
      : {
          OR: [
            { name: { contains: substr, mode: "insensitive" } },
            { email: { contains: substr, mode: "insensitive" } },
          ],
        },
  });
});
