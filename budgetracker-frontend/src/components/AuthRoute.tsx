import { Navigate } from "react-router-dom";
import { getUserRoles } from "../hooks";
import { ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const AuthRoute = ({ children, allowedRoles }: AuthRouteProps) => {
  const userRoles = getUserRoles();

  if (!userRoles.some((role) => allowedRoles.includes(role))) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
