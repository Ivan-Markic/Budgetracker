import { Account } from "./Account";

export class Transaction {
  id: number | null = null;
  name: string = "";
  amount: number | null = null;
  date: Date | null = null;
  account: Account | null = null;
  description: string = "";
}
