import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { LogIn } from "../LogIn/LogIn";
import { CreateAccount } from "../CreateAccount/CreateAccount";
import { Home } from "../Home/Home";
import { Layout } from "../Layout/Layout";
import { ForgotPassword } from "../ForgotPassword/ForgotPassword";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { CreateProjectPage } from "../Home/CreateProjectPage/CreateProjectPage";
import { EmptyStateProject } from "../Home/EmptyStateProject/EmptyStateProject";
import { EmptyStateTask } from "../Home/EmptyStateTask/EmptyStateTask";

export const App: FC = () => {

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route element={<Home />} path="/" />
          <Route element={<CreateProjectPage />} path="/create_project" />
          <Route element={<EmptyStateProject />} path="/empty_state_project" />
          <Route element={<EmptyStateTask />} path="/empty_state_task" />
        </Route>
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
    </Routes>
  );
};
