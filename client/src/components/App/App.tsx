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
import { UserSettings } from "../UserSettings/UserSettings";
import { MySettings } from "../UserSettings/MySettings/MySettings";
import { Notification } from "../UserSettings/Notification/Notification";
import { Projects } from "../UserSettings/Projects/Projects";
import { Information } from "../UserSettings/Information/Information";

export const App: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path="/" />
          <Route element={<CreateProjectPage />} path="/create_project/:workspace_id" />
          <Route element={<EmptyStateProject />} path="/empty_state_project/:workspace_id" />
          <Route element={<MainTable />} path="/main_table/:project_id" />
          <Route element={<Timeline />} path="/timeline/:project_id" />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<UserSettings />}>
          <Route element={<MySettings />} path="/user_settings/my_settings" />
          <Route element={<Notification />} path="/user_settings/notification" />
          <Route element={<Projects />} path="/user_settings/projects" />
          <Route element={<Information />} path="/user_settings/information" />
        </Route>
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
    </Routes>
  );
};
