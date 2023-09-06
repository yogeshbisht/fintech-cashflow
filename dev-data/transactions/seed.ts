import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";

enum FrequencyType {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
  CUSTOM = "custom",
}

enum TransactionEndType {
  NEVER = "never",
  LIMIT = "limit",
  DATE = "date",
}

const transactions = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  description: faker.finance.transactionDescription(),
  amount: faker.finance.amount(),
  start_date: faker.date.past().toISOString(),
  type: faker.helpers.arrayElement(["manual", "bank", "sub", "data"]),
  scenario: faker.string.uuid(),
  category: faker.string.uuid(),
  reminder: {
    status: faker.datatype.boolean(),
    date: faker.date.future().toISOString(),
    notes: faker.lorem.sentence(),
  },
  frequency: {
    type: faker.helpers.arrayElement(Object.values(FrequencyType)),
    value: faker.number.int({ min: 1, max: 10 }),
  },
  transaction_end: {
    type: faker.helpers.arrayElement(Object.values(TransactionEndType)),
    value: faker.datatype.boolean()
      ? faker.date.future().toISOString()
      : faker.number.int({ min: 1, max: 10 }),
  },
  created: faker.date.past().toISOString(),
  updated: faker.date.past().toISOString(),
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.writeFileSync(
  path.join(__dirname, "transactions.json"),
  JSON.stringify(transactions, null, 2)
);

console.log("✅ Transactions data generated.");
