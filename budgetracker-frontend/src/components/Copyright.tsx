import { Link, Typography } from "@mui/material";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://hr.linkedin.com/in/aleksander-radovan-57a29a35"
      >
        Budgetracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
