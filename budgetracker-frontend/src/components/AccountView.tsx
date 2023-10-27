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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AccountView() {
  const [userProfilePicture] = useState<string | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { accoundId } = useParams();
  if (!accoundId) {
    throw new Error("No account ID provided");
  }
  // Now, accountId contains the ID from the URL, e.g., '3' in http://localhost:3000/account/3

  useEffect(() => {
    // Fetch the user's profile picture when the component mounts
    ApiService.getAccountById(parseFloat(accoundId)).then((account) => {
      setAccount(account);
      setLoading(false);
    });
  }, [accoundId]); // Include accountId as a dependency if it's needed
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar profilePictureUrl={userProfilePicture ?? ""} />
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
                  <Deposits balance={account!!.balance ?? 0} />
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
