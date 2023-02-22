import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { RootState } from "../../redux/store";

interface ProtectedRouteProps {
  path: string;
  element: JSX.Element;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ path, element }) => {
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
