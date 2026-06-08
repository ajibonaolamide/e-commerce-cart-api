import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "iPhone 15",
        description: "Latest Apple phone",
        price: 1200,
        stock: 10,
      },
      {
        name: "Samsung S24",
        description: "Flagship Android phone",
        price: 1000,
        stock: 15,
      },
    ],
  });

  console.log("Products seeded");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });