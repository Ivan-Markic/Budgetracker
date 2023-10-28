import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AuthService from "../service/AuthService";
import { User } from "../model/User";
import { createUserFromResponse } from "../utils/userUtils";
import { Role } from "../model/Role";
import i18n from "../i18n/config";
import { generateRandomString } from "../utils/mathUtils";
import Copyright from "./Copyright";

function renderImage(image: any) {
  if (!image) {
    return null;
  }
  //get image from
  return (
    <img
      src={URL.createObjectURL(image)}
      alt="Profile"
      style={{ width: "100px", height: "100px" }}
    />
  );
}

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: generateRandomString(10),
    lastName: generateRandomString(10),
    username: generateRandomString(10),
    password: generateRandomString(10),
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
  });

  const [fieldsTouched, setFieldsTouched] = useState({
    firstName: true,
    lastName: true,
    username: true,
    password: true,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFieldsTouched({
      ...fieldsTouched,
      [name]: true,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
    // Validate all fields (e.g., check if it's empty)
    setFormErrors({
      ...formErrors,
      [name]: value.trim() === "",
    });
  };

  const isFormValid =
    Object.values(formErrors).every((isValid) => !isValid) &&
    Object.values(fieldsTouched).every((isTouched) => isTouched);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (isFormValid) {
      // Perform the form submission
      const data = new FormData(event.currentTarget);
      const user: User = createUserFromResponse(
        data.get("firstName") as string,
        data.get("lastName") as string,
        data.get("username") as string,
        data.get("password") as string,
        Role.USER,
        i18n.language
      );
      AuthService.registerUser(user, image);
    } else {
      // Display an error message or prevent submission
      alert(t("form_invalid"));
    }
  };
  const { t } = useTranslation();
  const [image, setImage] = useState<null | File>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) return;

    if (selectedImage.type.startsWith("image/")) {
      setImage(selectedImage);
    } else {
      alert("file_type_not_supported"); // Replace with your translation function if needed
    }
  };

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          {renderImage(image)}
          <Typography component="h1" variant="h5">
            {t("sign_up")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  type="file"
                  id="image-upload"
                  name="profileImage"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ mt: 1, mb: 2 }}
                  >
                    {t("upload_profile_picture")}
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t("first_name")}
                  autoFocus
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("last_name")}
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formErrors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label={t("username")}
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={formErrors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t("password")}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid}
              sx={{ mt: 3, mb: 2 }}
            >
              {t("sign_up")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  {t("already_have_an_account")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {t("sign_in")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
