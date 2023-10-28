import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { Transaction } from "../model/Transaction";
import { Container } from "@mui/material";
import { Account } from "../model/Account";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Chart({ account }: { account: Account }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [transactions] = useState<Transaction[]>(account.transactions);
  const [data, setData] = useState<{ time: string; amount: number }[]>([]);

  useEffect(() => {
    // Calculate the new balance
    let balance = account.balance ?? 0;
    const newData = transactions.map((transaction) => {
      balance += transaction.amount ?? 0;
      console.log(balance);
      return {
        time:
          new Date(transaction.date ?? 0).getHours() +
          ":" +
          new Date(transaction.date ?? 0).getMinutes(),
        amount: balance,
      };
    });

    setData(newData);
  }, [account, transactions]);

  if (data.length === 0) {
    return <Container>{t("no_transactions_to_display")}</Container>;
  }

  return (
    <React.Fragment>
      <Title>{t("show_of_transactions")}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              {t("amount")}
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
