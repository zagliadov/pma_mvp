import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { LogIn } from "../LogIn/LogIn";
import { CreateAccount } from "../CreateAccount/CreateAccount";
import { Home } from "../Home/Home";
import { Layout } from "../Layout/Layout";
import { ForgotPassword } from "../ForgotPassword/ForgotPassword";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export const App: FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute path="/" element={<Layout /> } />}>
        <Route path="/" element={<ProtectedRoute path="/" element={<Home /> } />} />
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
    </Routes>
  );
};
