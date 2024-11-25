import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../ui/Button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { clearCart, getCart } from "./cartSlice";
import CartItem from "./CartItem";
import { useNavigation } from "react-router-dom";
import Loader from "../../ui/Loader";

function Cart() {
  const user = useSelector((state) => state.user.name);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loader />;
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="p-5 sm:px-1 sm:py-5">
      <Button to="/menu" type="secondary">
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="sm"
          style={{ color: "currentColor" }}
        />
        <span className="ml-2">Back to the menu</span>
      </Button>

      <h2 className="mb-4 mt-6 text-xl font-semibold">Your cart, {user}</h2>

      <ul className="divide-y divide-stone-300">
        {cart.map((pizza) => (
          <CartItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>

        <Button onClick={() => dispatch(clearCart())} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
