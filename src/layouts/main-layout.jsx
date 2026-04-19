import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-black text-neutral-200 antialiased">
      <Outlet />
    </div>
  );
};

export default MainLayout;
