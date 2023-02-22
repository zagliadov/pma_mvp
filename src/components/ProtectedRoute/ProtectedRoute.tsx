import { FC } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";

export const ProtectedRoute: FC = () => {
  const isAuthenticated: boolean = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
