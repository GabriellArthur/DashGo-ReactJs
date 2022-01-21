import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  for (let user = 0; user < 20; user++) {
    await prisma.user.create({
      data: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 8),
        createdAt: faker.date.recent(35)
      }
    });
  }

  // Create admin user

  await prisma.user.create({
    data: {
      name: "Administrador Dashgo",
      email: "administrador@dashgo.net",
      password: await bcrypt.hash("admin", 8),
      createdAt: new Date()
    }
  });
}

main()
  .catch(() => process.exit(1))
  .finally(() => {
    prisma.$disconnect();
  });
