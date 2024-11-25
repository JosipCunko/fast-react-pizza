import { Outlet } from "react-router";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview.jsx";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[1fr] grid-rows-[min-content_1fr] tracking-tight">
      <Header />
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
