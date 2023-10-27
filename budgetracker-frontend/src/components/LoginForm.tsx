import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Copyright from "./Copyright";
import AuthService from "../service/AuthService";
import AlertDialog from "./AlertDialog";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleAlertDialogClose = () => {
    setError("");
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    if (!username || !password) {
      setError(t("username_password_required"));
      setOpen(true);
      return;
    }

    AuthService.loginUser(username, password)
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {
        // pop up error message

        if (error.message === "Network Error") {
          setError(t("network_error"));
        } else {
          setError(t("sign_in_error"));
        }
        setOpen(true);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("sign_in")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t("username")}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("sign_in")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  {t("dont_have_an_account")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {t("sign_up")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <AlertDialog
          open={open}
          message={error}
          handleClose={handleAlertDialogClose}
        />
      </Container>
    </ThemeProvider>
  );
}
