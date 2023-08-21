import { prisma } from "~/prisma/db";

export interface IPostDoctor {
  name: string;
  email: string;
  image: string;
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as IPostDoctor;

  if (!body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: "name is not provided",
    });
  }

  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "email is not provided",
    });
  }

  if (!body.image) {
    throw createError({
      statusCode: 400,
      statusMessage: "image is not provided",
    });
  }

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
