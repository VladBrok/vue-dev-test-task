import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const PATIENTS_COUNT = 10;

async function main() {
  await prisma.doctorPatient.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();

  await Promise.all(
    Array(PATIENTS_COUNT)
      .fill(null)
      .map(() =>
        prisma.patient.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            image: faker.image.avatar(),
            diagnosis:
              "Hypertonic disease. Persistent atrial fibrillation. Chronic heart failure",
          },
        }),
      ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
