import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as newOrderAction,
} from "./features/order/CreateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { element: <Home />, path: "/" },
      { element: <Cart />, path: "/cart" },
      { element: <Menu />, path: "/menu", loader: menuLoader },
      { element: <Order />, path: "/order/:orderId", loader: orderLoader },
      { element: <CreateOrder />, path: "/order/new", action: newOrderAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
