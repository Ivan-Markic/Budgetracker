import axios from "axios";
import ApiService from "./ApiService";
import { User } from "../model/User";
import { createBase64Image } from "../utils/imageUtils";

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
      //save it to local storage
      console.log("Saving token to local storage");
      window.localStorage.setItem("token", token);

      console.log("Logged in successfully");
    }
    return response;
  }

  // Register endpoint
  static registerUser(user: User, image: File | null) {
    if (image) {
      createBase64Image(image!!).then((base64String) => {
        base64String = base64String.replace(/^data:image\/\w+;base64,/, "");
        user.profilePicture = base64String;
        this.sendRegistrationRequest(user);
      });
    } else {
      this.sendRegistrationRequest(user);
    }
  }

  private static sendRegistrationRequest(user: User) {
    axios.post(`${API_BASE_URL}/register`, user, {}).then((response) => {
      ApiService.setJwtToken(response.data.token);
      this.loginUser(user.username, user.password).then((response) => {
        if (response.status === 200) {
          ApiService.setJwtToken(response.data.token);
          window.localStorage.setItem("token", response.data.token);
          window.location.href = "/"; // Redirect to home page
        }
      });
    });
  }

  // Logout endpoint
  static logoutUser() {
    ApiService.removeJwtToken();
    window.localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  }
}

export default AuthService;
