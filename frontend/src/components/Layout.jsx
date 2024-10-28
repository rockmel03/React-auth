import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <main className="bg-blue-400 w-full min-h-screen flex flex-col items-center justify-center">
      <Outlet />
    </main>
  );
};
