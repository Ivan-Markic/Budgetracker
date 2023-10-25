import { Account } from "./Account";
import { Role } from "./Role";

// User.ts
export class User {
  id: number | null = null;
  firstName: string = "";
  lastName: string = "";
  username: string = "";
  password: string = "";
  language: string = "HR";
  profilePicture: File | string | null = null;
  role: Role = Role.USER;
  accounts: Account[] = [];
}
