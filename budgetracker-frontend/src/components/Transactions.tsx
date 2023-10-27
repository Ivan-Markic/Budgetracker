import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Transaction } from "../model/Transaction";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import ApiService from "../service/ApiService";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { createEmptyTransaction } from "../utils/transactionUtils";
import { Account } from "../model/Account";

// Define state for the transaction being edited or added
const initialTransaction: Transaction = createEmptyTransaction();

export default function Transactions({ account }: { account: Account }) {
  const [transactions] = useState<Transaction[]>(account.transactions);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState(initialTransaction);

  const handleEdit = (transaction: Transaction) => {
    // Open the dialog for editing
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDelete = (transaction: Transaction) => {
    // Confirm the user's intent to delete
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmDelete) {
      // Call the API to delete the transaction
      ApiService.deleteTransaction(transaction.id!!).then(() => {
        // Handle success, e.g., updating the transactions list
        window.location.reload();
      });
    }
  };

  const handleAddTransaction = () => {
    // Open the dialog for creating a new transaction
    setEditingTransaction(initialTransaction);
    setDialogOpen(true);
  };

  const handleSaveTransaction = () => {
    console.log(editingTransaction);
    if (editingTransaction.id) {
      ApiService.updateTransaction(editingTransaction, account.id!!).then(
        () => {
          // Handle success, e.g., updating the transactions list
          window.location.reload();
        }
      );
    } else {
      ApiService.createTransaction(editingTransaction, account.id!!).then(
        () => {
          // Handle success, e.g., updating the transactions list
          window.location.reload();
        }
      );
    }
    setEditingTransaction(initialTransaction);
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date!! as unknown as string}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{`€${row.amount}`}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(row)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => {
          handleAddTransaction();
        }}
        sx={{ mt: 3 }}
      >
        Add Transaction
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContentText align="center">
          {editingTransaction.id === 0 ? "Adding " : "Editing "} Transaction
        </DialogContentText>
        <DialogContent>
          <TextField
            label="Name"
            value={editingTransaction.name}
            sx={{ mb: 2 }}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                name: e.target.value,
              })
            }
          />
          <TextField
            label="Description"
            value={editingTransaction.description}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Amount"
            type="number"
            value={editingTransaction.amount}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                amount: parseFloat(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveTransaction} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
