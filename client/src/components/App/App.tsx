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
import { MainTable } from "../Home/MainTable/MainTable";
import { Timeline } from "../Home/Timeline/Timeline";

export const App: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path="/" />
          <Route element={<CreateProjectPage />} path="/create_project" />
          <Route element={<EmptyStateProject />} path="/empty_state_project" />
          <Route element={<MainTable />} path="/main_table/:project_id" />
          <Route element={<Timeline />} path="/timeline/:project_id" />
        </Route>
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
    </Routes>
  );
};
