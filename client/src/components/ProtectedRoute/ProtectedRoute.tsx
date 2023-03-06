import { FC, useEffect, useMemo, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../redux/authSlice/authSlice";
import { RootState } from "../../redux/store";

export const ProtectedRoute: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const token: string = useMemo(
    () => (localStorage.getItem("token") as string) || "",
    []
  );
  // const user = useAppSelector((state: RootState) => state.auth.user);
  // useEffect(() => {
  //   if (!token) return;
  //   if (isOpen) {
  //     console.log(token);
  //     dispatch(verifyToken(token));
  //     setIsOpen(false);
  //   }
  //   setIsOpen(true);
  //   return () => {
  //     setIsOpen(true);
  //   };
  // }, [dispatch, isOpen, token]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return !token && !isAuthenticated ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
