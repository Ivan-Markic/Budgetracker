import { Account } from "../model/Account";
import { Role } from "../model/Role";
import { User } from "../model/User";
import ApiService from "../service/ApiService";

// Create empty user object
export const emptyUser: User = {
  id: null,
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  role: Role.USER,
  profilePicture: null,
  accounts: [],
  language: "hr",
};

export function createUserFromResponse(
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  role: Role,
  language: string,
  id: number | null = null,
  accounts: Account[] = [],
  profilePicture: File | string | null = null
): User {
  return {
    id,
    username,
    password,
    firstName,
    lastName,
    role,
    profilePicture,
    accounts,
    language,
  };
}

export function getUserRole() {
  const userRole = ApiService.getUserByJwt()
    .then((user) => {
      return user.role;
    })
    .catch(() => {
      return "";
    });
  // return the current user roles
  return userRole;
}
