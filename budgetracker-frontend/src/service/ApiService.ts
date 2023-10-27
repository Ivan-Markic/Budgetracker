import axios from "axios";
import { User } from "../model/User";
import { Transaction } from "../model/Transaction";
import { Account } from "../model/Account";
import { createUserFromResponse } from "../utils/userUtils";
import { createimageUrl } from "../utils/imageUtils";

const API_BASE_URL = "http://localhost:8080/api/v1"; // Adjust the URL to your API endpoint

class ApiService {
  // JWT token
  static jwtToken = window.localStorage.getItem("token") ?? ""; // Initialize this with your token when the user logs in

  // Set the JWT token
  static setJwtToken(token: string) {
    ApiService.jwtToken = token;
  }

  // User endpoints
  static createUser(user: User) {
    return axios.post(`${API_BASE_URL}/user/create`, user, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }
  static async updateUser(user: User) {
    const response = await axios.put(`${API_BASE_URL}/user/update`, user, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
    return createUserFromResponse(
      response.data.firstName,
      response.data.lastName,
      response.data.username,
      response.data.password,
      response.data.role,
      response.data.language,
      response.data.id,
      response.data.accounts,
      createimageUrl(response.data.profilePicture)
    );
  }

  static deleteUser(userId: number) {
    return axios.delete(`${API_BASE_URL}/user/delete?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }

  static async getUser(username: string): Promise<User> {
    const response = await axios.get(`${API_BASE_URL}/user/get`, {
      params: { username },
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
    return createUserFromResponse(
      response.data.firstName,
      response.data.lastName,
      response.data.username,
      response.data.password,
      response.data.role,
      response.data.language,
      response.data.id,
      response.data.accounts,
      createimageUrl(response.data.profilePicture)
    );
  }

  static async getUserByJwt() {
    const response = await axios.get(`${API_BASE_URL}/user/get/jwt`, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
    return createUserFromResponse(
      response.data.firstName,
      response.data.lastName,
      response.data.username,
      response.data.password,
      response.data.role,
      response.data.language,
      response.data.id,
      response.data.accounts,
      createimageUrl(response.data.profilePicture)
    );
  }

  static getAllUsers() {
    return axios.get(`${API_BASE_URL}/user/all`, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }

  // Transaction endpoints
  static createTransaction(transaction: Transaction, accountId: number) {
    return axios.post(`${API_BASE_URL}/transaction/create`, transaction, {
      params: { accountId },
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }

  static updateTransaction(transaction: Transaction, accountId: number) {
    return axios.put(`${API_BASE_URL}/transaction/update`, transaction, {
      params: { accountId },
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }

  static deleteTransaction(transactionId: number) {
    return axios.delete(`${API_BASE_URL}/transaction/delete`, {
      params: { transactionId },
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }

  static getTransaction(transactionId: number) {
    return axios.get(
      `${API_BASE_URL}/transaction?transactionId=${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${ApiService.jwtToken}`,
        },
      }
    );
  }

  static getAllTransactions() {
    return axios.get(`${API_BASE_URL}/transaction/all`, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }

  // Account endpoints
  static async createAccount(account: Account): Promise<Account> {
    const response = await axios.post(
      `${API_BASE_URL}/account/create`,
      account,
      {
        headers: {
          Authorization: `Bearer ${ApiService.jwtToken}`,
        },
      }
    );
    return response.data;
  }

  static updateAccount(account: Account) {
    return axios.post(`${API_BASE_URL}/account/update`, account, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }

  static deleteAccount(accountId: number) {
    return axios.delete(
      `${API_BASE_URL}/account/delete?accountId=${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${ApiService.jwtToken}`,
        },
      }
    );
  }

  static async getAccountById(accountId: number): Promise<Account> {
    const response = await axios.get(`${API_BASE_URL}/account/get`, {
      params: { accountId },
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
    return response.data;
  }

  static getAllAccounts() {
    return axios.get(`${API_BASE_URL}/account/all`, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }

  // Upload profile picture
  static uploadProfilePicture(image: File) {
    const formData = new FormData();
    formData.append("file", image);
    return axios.post(`${API_BASE_URL}/profile/picture`, formData, {
      headers: {
        Authorization: `Bearer ${ApiService.jwtToken}`,
      },
    });
  }
}

export default ApiService;
