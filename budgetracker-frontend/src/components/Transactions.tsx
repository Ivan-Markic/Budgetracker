import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Transaction } from "../model/Transaction";
import i18n from "../i18n/config";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Transactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {row.date?.toLocaleDateString(i18n.language)}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more transactions
      </Link>
    </React.Fragment>
  );
}
