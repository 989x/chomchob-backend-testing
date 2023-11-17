import User from "../models/user";
import UserCard from "../models/userCard";
import Item from "../models/item";
import Purchase from "../models/purchase";

const seedData = async (model: any, data: any[]) => {
  try {
    for (const item of data) {
      const whereCondition: { [key: string]: any } = {};
      Object.keys(item).forEach((key) => {
        if (key.endsWith("_id")) {
          // assuming "_id" is part of primary key fields
          whereCondition[key] = item[key];
        }
      });

      const existingItem = await model.findOne({ where: whereCondition });

      if (!existingItem) {
        await model.create(item);
        console.log(`${model.name} seeded successfully`);
      } else {
        console.log(`${model.name} already exists, skipping seeding`);
      }
    }
  } catch (error) {
    console.error(`Error seeding ${model.name.toLowerCase()}s:`, error);
  }
};

export const seedUsers = async () => {
  const userData = [
    { name: "John Doe", age: 25 },
    { name: "Jane Smith", age: 30 },
  ];

  await seedData(User, userData);
};

export const seedUserCards = async () => {
  const userCardData = [
    { userId: 1, maskPan: "**** **** **** 1234" },
    { userId: 2, maskPan: "**** **** **** 5678" },
  ];

  await seedData(UserCard, userCardData);
};

export const seedItems = async () => {
  const itemData = [
    {
      productName: "Item 1",
      productDetail: "Details for Item 1",
      salePrice: 100.0,
      normalPrice: 150.0,
      openSaleDate: new Date("2023-01-01"),
      endSaleDate: new Date("2023-01-31"),
      discountPrice: 100.0,
      discountStartDate: new Date("2023-01-15"),
      discountEndDate: new Date("2023-01-20"),
    },
    {
      productName: "Item 2",
      productDetail: "Details for Item 2",
      salePrice: 100.0,
      normalPrice: 150.0,
      openSaleDate: new Date("2023-02-01"),
      endSaleDate: new Date("2023-02-28"),
      discountPrice: 100.0,
      discountStartDate: new Date("2023-02-15"),
      discountEndDate: new Date("2023-02-20"),
    },
  ];

  await seedData(Item, itemData);
};

export const seedPurchases = async () => {
  const purchaseData = [
    {
      userCardId: 1,
      itemId: 1,
      customerId: 1,
      purchaseDate: new Date(),
      code: "ABC123",
    },
    {
      userCardId: 2,
      itemId: 2,
      customerId: 2,
      purchaseDate: new Date(),
      code: "XYZ789",
    },
  ];

  await seedData(Purchase, purchaseData);
};

export const allSeedFunctions = [seedUsers, seedUserCards, seedItems, seedPurchases];
