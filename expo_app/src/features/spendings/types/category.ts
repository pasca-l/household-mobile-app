export const category = {
  food: "food",
  daily_goods: "daily goods",
  home_applicance: "home appliance",
  network: "network",
  gas: "gas",
  water: "water",
  electricity: "electricity",
  house_rent: "house rent",
} as const;

export type Category = (typeof category)[keyof typeof category];
