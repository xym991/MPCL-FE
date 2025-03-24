import React, { useContext, useMemo } from "react";
import { UserContext } from "../context/UserContext";

const PermissionWrapper = ({ roles, children }) => {
  const { user } = useContext(UserContext);

  const isAllowed = useMemo(() => {
    if (!user) return false;

    if (user.role.toLowerCase() === "admin") {
      return true; // Admin has access to everything
    }

    return roles.some((role) => {
      if (typeof role === "string") {
        return role.toLowerCase() === user.role.toLowerCase();
      } else if (typeof role === "object" && role.name && role.condition) {
        return (
          role.name.toLowerCase() === user.role.toLowerCase() &&
          role.condition(user)
        );
      }
      return false;
    });
  }, [user, roles]);

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionWrapper;
