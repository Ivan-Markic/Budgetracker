import { Transaction } from "./Transaction";
import { User } from "./User";

export class Account {
  id: number | null = null;
  name: string = "";
  balance: number | null = null;
  user: User | null = null;
  transactions: Transaction[] = [];
}
