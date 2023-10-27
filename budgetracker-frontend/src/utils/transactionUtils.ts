import { Transaction } from "../model/Transaction";

export function createEmptyTransaction(): Transaction {
  return {
    id: null, // You may need to update this to a default value
    name: "",
    amount: 0,
    date: new Date(),
    account: null,
    description: "",
  };
}
