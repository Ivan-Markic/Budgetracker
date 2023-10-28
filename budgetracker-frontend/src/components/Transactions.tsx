import * as React from "react";
import Title from "./Title";
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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Transaction } from "../model/Transaction";
import { useTranslation } from "react-i18next";

const initialTransaction: Transaction = createEmptyTransaction();

export default function Transactions({ account }: { account: Account }) {
  const { t } = useTranslation();
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
    const confirmDelete = window.confirm(t("confirm_delete_transaction"));
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
          window.location.reload();
        }
      );
    } else {
      ApiService.createTransaction(editingTransaction, account.id!!).then(
        () => {
          window.location.reload();
        }
      );
    }
    setEditingTransaction(initialTransaction);
    setDialogOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: t("date"), width: 130 },
    { field: "name", headerName: t("name"), width: 130 },
    { field: "description", headerName: t("description"), width: 200 },
    { field: "amount", headerName: t("table_amount"), width: 130 },
    {
      field: "actions",
      headerName: t("actions"),
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Title>{t("recent_transactions")}</Title>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={transactions} columns={columns} />
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => {
          handleAddTransaction();
        }}
        sx={{ mt: 3 }}
      >
        {t("add_transaction")}
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContentText align="center">
          {editingTransaction.id ? t("edit_transaction") : t("add_transaction")}
        </DialogContentText>
        <DialogContent>
          <TextField
            label={t("name")}
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
            label={t("description")}
            value={editingTransaction.description}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                description: e.target.value,
              })
            }
          />
          <TextField
            label={t("table_amount")}
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
          <Button onClick={() => setDialogOpen(false)}>{t("cancel")}</Button>
          <Button onClick={handleSaveTransaction} color="primary">
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
