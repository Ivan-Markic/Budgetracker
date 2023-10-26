import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useTranslation } from "react-i18next";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Title>{t("balance_title")}</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t("view_tips")}
        </Link>
      </div>
    </React.Fragment>
  );
}
