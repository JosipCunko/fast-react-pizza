import {
  faCartShopping,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCart, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../helpers";

function CartOverview() {
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  if (!cart.length > 0) return null;

  return (
    <Link
      to="/cart"
      className="absolute -right-3 bottom-3 flex scale-[0.8] items-center justify-between gap-4 rounded-full bg-yellow-500 px-4 py-3 text-xl tracking-tight text-gray-100 transition-all duration-200 hover:scale-105 sm:bottom-4 sm:right-8 sm:scale-100"
    >
      <FontAwesomeIcon
        icon={faCartShopping}
        size="2xl"
        style={{ color: "#fff" }}
      />
      <div className="flex flex-col items-center justify-center gap-0.5">
        <p>
          Pizzas:{" "}
          <span className="font-semibold">
            {cart.reduce((acc, pizza) => acc + pizza.quantity, 0)}
          </span>
        </p>
        <p>
          Price:{" "}
          <span className="font-semibold"> {formatCurrency(totalPrice)}</span>
        </p>
      </div>
      <FontAwesomeIcon
        icon={faChevronRight}
        size="sm"
        style={{ color: "#fff" }}
      />
    </Link>
  );
}

export default CartOverview;
