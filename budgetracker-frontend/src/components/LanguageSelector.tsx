import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

const languages: {
  [key: string]: { nativeName: string };
} = {
  en: { nativeName: "English" },
  hr: { nativeName: "Hrvatski" },
  ru: { nativeName: "Русский" },
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.resolvedLanguage}
      onChange={handleLanguageChange}
      variant="outlined"
      color="primary"
    >
      {Object.keys(languages).map((lng) => (
        <MenuItem key={lng} value={lng}>
          {languages[lng].nativeName}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
