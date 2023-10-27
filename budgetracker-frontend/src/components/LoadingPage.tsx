import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function LoadingPage() {
  const { t } = useTranslation();
  return (
    // Centered loading UI with CircularProgress and text
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6">{t("loading_page_text")}</Typography>
    </Box>
  );
}
