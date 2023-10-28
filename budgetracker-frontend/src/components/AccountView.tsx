import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Transactions from "./Transactions";
import AppBar from "./AppBar";
import Copyright from "./Copyright";
import ApiService from "./../service/ApiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Account } from "../model/Account";
import { LoadingPage } from "./LoadingPage";
import { useTranslation } from "react-i18next";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AccountView() {
  const { t } = useTranslation();

  const [profilePicture, setProfilePicture] = useState<string>("");
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // create balanace state which will be counted from transactions
  const [balance, setBalance] = useState<number>(0);

  const { accoundId } = useParams();
  if (!accoundId) {
    alert(t("account_id_required"));
    window.location.href = "/";
  }

  useEffect(() => {
    // Fetch the user's profile picture when the component mounts
    ApiService.getAccountById(parseFloat(accoundId!!))
      .then((account) => {
        // Calculate the balance from the account's initial balance and its transactions
        ApiService.getUserByJwt().then((user) => {
          setProfilePicture(user.profilePicture as string);
          let calculatedBalance = account.balance ?? 0;
          account.transactions?.forEach((transaction) => {
            calculatedBalance += transaction.amount ?? 0;
          });
          setAccount(account);
          setBalance(calculatedBalance);
          setProfilePicture(user.profilePicture as string);
          setLoading(false);
        });
      })
      .catch(() => {
        alert("account_not_found");
        window.location.href = "/";
      });
  }, [accoundId]);
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar profilePictureUrl={profilePicture} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart account={account!!} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits balance={balance} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Transactions account={account!!} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
