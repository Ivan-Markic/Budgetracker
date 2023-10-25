import axios from "axios";
import ApiService from "./ApiService";
import { User } from "../model/User";

const API_BASE_URL = "http://localhost:8080/api/v1/auth";

class AuthService {
  // Login endpoint
  static async loginUser(username: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    if (response.status === 200) {
      const token = response.data.token; // Assuming your token field is named "token" in the response
      ApiService.setJwtToken(token); // Save the JWT token
    }
    return response;
  }

  // Register endpoint
  static registerUser(user: User, image: File | null) {
    axios.post(`${API_BASE_URL}/register`, user, {}).then((response) => {
      ApiService.setJwtToken(response.data.token);
      this.loginUser(user.username, user.password).then((response) => {
        if (response.status === 200) {
          ApiService.setJwtToken(response.data.token);
          if (image) {
            ApiService.uploadProfilePicture(image);
          }
          window.location.href = "/"; // Redirect to home page
        }
      });
    });
  }
}

export default AuthService;
