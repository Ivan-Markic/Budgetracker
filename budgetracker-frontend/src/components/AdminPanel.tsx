import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { User } from "../model/User";
import ApiService from "../service/ApiService";
import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AppBar from "./AppBar";
import { useTranslation } from "react-i18next";

const defaultTheme = createTheme();

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const { t } = useTranslation();

  const handleDeleteUser = (userId: number) => {
    ApiService.deleteUser(userId).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    ApiService.getAllUsers().then((users) => {
      setUsers(users);
    });
    ApiService.getUserByJwt().then((user) => {
      setProfilePicture(user.profilePicture as string);
    });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: t("first_name"), width: 130 },
    { field: "lastName", headerName: t("last_name"), width: 130 },
    { field: "username", headerName: t("username"), width: 130 },
    {
      field: "numAccounts",
      headerName: t("num_accounts"),
      type: "number",
      width: 170,
    },
    {
      field: "actions",
      headerName: t("actions"),
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => handleDeleteUser(params.row.id)}
          style={{ backgroundColor: "red", color: "white" }}
        >
          {t("delete")}
        </Button>
      ),
    },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar profilePictureUrl={profilePicture} />
        <div
          style={{ height: 400, width: "80%", marginLeft: 30, marginTop: 70 }}
        >
          <DataGrid
            rows={users.map((user) => ({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              numAccounts: user.accounts.length,
            }))}
            columns={columns}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
}
