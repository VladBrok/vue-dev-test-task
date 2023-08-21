import { prisma } from "~/prisma/db";

export interface IPostDoctor {
  name: string;
  email: string;
  image: string;
}

// TODO: validate with zod, infer type from zod

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as IPostDoctor;

  await prisma.doctor.upsert({
    where: { email: body.email },
    create: {
      email: body.email,
      image: body.image,
      name: body.name,
    },
    update: {},
  });
});
