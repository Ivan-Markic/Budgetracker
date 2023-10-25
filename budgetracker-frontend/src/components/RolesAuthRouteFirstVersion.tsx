import { Fragment, ReactNode, useEffect } from "react";
import { getUserRoles } from "../hooks";
import { useNavigate } from "react-router-dom";

export function RolesAuthRoute({
  children,
  roles,
}: {
  children: ReactNode;
  roles: Array<string>;
}) {
  const navigate = useNavigate();
  const userRoles = getUserRoles();
  const canAccess = userRoles.some((userRole) => roles.includes(userRole));

  useEffect(() => {
    if (!canAccess) {
      navigate('/');
    }
  }, [canAccess, navigate]);


  return <Fragment>{children}</Fragment>;;
}
