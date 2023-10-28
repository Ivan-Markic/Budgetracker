import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import { AdminPanelSettings, Delete, Home, Logout } from "@mui/icons-material";
import ApiService from "../service/ApiService";
import { useEffect } from "react";
import { User } from "../model/User";
import { Role } from "../model/Role";
import { LoadingPage } from "./LoadingPage";
import AuthService from "../service/AuthService";

export function MainListItems() {
  const [user, setUser] = React.useState<User | null>(null);
  const [authorized, setAuthorized] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { t } = useTranslation();

  useEffect(() => {
    ApiService.getUserByJwt().then((user) => {
      setUser(user);
      console.log(user.role.localeCompare(Role.ADMIN) === 0);
      setAuthorized(user.role.localeCompare(Role.ADMIN) === 0);
      setLoading(false);
    });
  }, []);

  function deleteAccount() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      // Call the API to delete the account
      ApiService.deleteUser(user?.id ?? 0).then((data) => {
        // Handle success, e.g., updating the transactions list
        console.log(data);
        localStorage.removeItem("jwt");
        window.location.href = "/login";
      });
    }
  }
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={() => (window.location.href = "/")}>
        <ListItemIcon>
          <Home color="primary" />
        </ListItemIcon>
        <ListItemText primary={t("home")} />
      </ListItemButton>
      <ListItemButton onClick={() => AuthService.logoutUser()}>
        <ListItemIcon>
          <Logout color="warning" />
        </ListItemIcon>
        <ListItemText primary={t("log_out")} />
      </ListItemButton>
      {authorized && (
        <ListItemButton onClick={() => (window.location.href = "/adminPanel")}>
          <ListItemIcon>
            <AdminPanelSettings color="primary" />
          </ListItemIcon>
          <ListItemText primary={t("admin_panel")} />
        </ListItemButton>
      )}
      <ListItemButton onClick={deleteAccount}>
        <ListItemIcon>
          <Delete color="error" />
        </ListItemIcon>
        <ListItemText primary={t("delete_account")} />
      </ListItemButton>
    </React.Fragment>
  );
}
