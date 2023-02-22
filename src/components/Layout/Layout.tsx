import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import { Footer } from "../Footer/Footer";

export const Layout: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
