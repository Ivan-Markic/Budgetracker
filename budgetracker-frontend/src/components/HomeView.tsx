import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import AppBar from "./AppBar";
import ApiService from "../service/ApiService";
import { Account } from "../model/Account";
import { User } from "../model/User";
import { convertImageUrlToBase64 } from "../utils/imageUtils";
import { Delete } from "@mui/icons-material";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const HomeView = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountBalance, setNewAccountBalance] = useState("");

  useEffect(() => {
    //Fetch the user's accounts when the component mounts
    ApiService.getUserByJwt()
      .then((user) => {
        setAccounts(user.accounts);
        setUser(user);
      })
      .catch(() => {});
  }, []);

  const handleAddAccount = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveAccount = () => {
    if (newAccountName && newAccountBalance) {
      // Create a new account object and add it to the list
      const newAccount: Account = {
        id: null,
        name: newAccountName,
        balance: parseFloat(newAccountBalance),
        user: null,
        transactions: [],
      };
      if (user) {
        convertImageUrlToBase64(user.profilePicture as string).then(
          (base64Image) => {
            user.profilePicture = base64Image;
            ApiService.createAccount(newAccount).then(() => {
              window.location.reload();
            });
          }
        ); // Convert the URL to a base64 string
      }
      setNewAccountName("");
      setNewAccountBalance("");
      setDialogOpen(false);
    }
  };

  const handleDeleteAccount = (accountId: number) => {
    // Show a confirmation dialog (optional)
    if (window.confirm("Are you sure you want to delete this account?")) {
      // Call an API or perform the delete operation
      ApiService.deleteAccount(accountId).then(() => {
        // After successful deletion, you can refresh the account list or take other actions.
        // Example: Reload the account list.
        window.location.reload();
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar profilePictureUrl="" />
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{ mt: 8 }}
            >
              Accounts
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddAccount}
            >
              Add Account
            </Button>

            <List>
              {accounts.map((account, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  style={{ margin: "16px", padding: "16px" }}
                  onClick={() => {
                    window.location.href = `/account/${account.id}`;
                  }}
                >
                  <ListItemButton>
                    <ListItemText
                      primary={account.name}
                      secondary={`Balance: $${account.balance} | Transactions: ${account.transactions.length}`}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the click event on the Paper from triggering
                        handleDeleteAccount(account.id!!); // Handle the delete action
                      }}
                      color="secondary"
                    >
                      <Delete />
                    </IconButton>
                  </ListItemButton>
                </Paper>
              ))}
            </List>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogContentText align="center" sx={{ mt: 2 }}>
                Add New Account
              </DialogContentText>
              <DialogContent>
                <TextField
                  id="account-name"
                  label="Account Name"
                  variant="outlined"
                  type="text"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                />
                <br />
                <br />
                <TextField
                  id="initial-balance"
                  label="Initial Balance"
                  variant="outlined"
                  type="number"
                  value={newAccountBalance}
                  onChange={(e) => setNewAccountBalance(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSaveAccount} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomeView;
