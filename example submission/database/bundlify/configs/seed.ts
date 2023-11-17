import User from "../models/user";
import UserCard from "../models/userCard";
import Item from "../models/item";
import Purchase from "../models/purchase";
import Bundle from "../models/bundle";
import ItemInBundle from "../models/itemInBundle";

const seedData = async (model: any, data: any[]) => {
  try {
    for (const item of data) {
      const existingItem = await model.findOne();

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
      productName: "Sword of the Dragon",
      productDetail: "A legendary sword forged by ancient dragons.",
      salePrice: 100.0,
      normalPrice: 140.0,
      openSaleDate: new Date("2023-01-01"),
      endSaleDate: new Date("2023-01-31"),
      discountPrice: 100.0,
      discountStartDate: new Date("2023-01-15"),
      discountEndDate: new Date("2023-01-20"),
    },
    {
      productName: "Potion of Healing",
      productDetail: "Restores health instantly.",
      salePrice: 220.0,
      normalPrice: 260.0,
      openSaleDate: new Date("2023-02-01"),
      endSaleDate: new Date("2023-02-28"),
      discountPrice: 200.0,
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

export const seedBundles = async () => {
  const bundleData = [
    {
      bundleName: "Character Skin Set Bundle",
      bundleDescription: "A special bundle with multiple character skins",
      bundlePrice: 19.99,
    },
    {
      bundleName: "Gachapon Box Bundle",
      bundleDescription: "A bundle containing five gachapon boxes",
      bundlePrice: 29.99,
    },
  ];

  await seedData(Bundle, bundleData);
};

export const seedItemsInBundle = async () => {
  const itemInBundleData = [
    {
      bundleId: 1,
      itemId: 1,
      quantity: 2,
    },
    {
      bundleId: 2,
      itemId: 2,
      quantity: 5,
    },
  ];

  await seedData(ItemInBundle, itemInBundleData);
};

export const allSeedFunctions = [
  seedUsers,
  seedUserCards,
  seedItems,
  seedPurchases,
  seedBundles,
  seedItemsInBundle,
];
