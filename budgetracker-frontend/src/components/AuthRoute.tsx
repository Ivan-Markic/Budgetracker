import { useState, useEffect, ReactNode } from "react";
import ApiService from "../service/ApiService"; // Import your API service
import AlertDialog from "./AlertDialog";
import { useTranslation } from "react-i18next";
import { LoadingPage } from "./LoadingPage";

interface AuthRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const AuthRoute = ({ children, allowedRoles }: AuthRouteProps) => {
  const { t } = useTranslation();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [open, setOpen] = useState(true); // Add open state for alert dialog

  const handleClose = () => {
    window.location.href = "/login";
    setOpen(false);
  };

  useEffect(() => {
    // Fetch the user's role when the component mounts
    ApiService.getUserByJwt()
      .then((user) => {
        setUserRole(user.role);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      }); // Set loading to false when the fetch is complete
  }, [allowedRoles]);

  if (loading) {
    // While loading, you can show a loading indicator or any other UI
    <LoadingPage />;
  }

  // Once loading is complete, render the children only if the user has the allowed role
  return (
    <>
      {userRole && allowedRoles.includes(userRole) ? (
        children
      ) : (
        <AlertDialog
          open={open}
          message={t("not_authorized_text")}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
