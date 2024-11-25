import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import {
  decreaseProductQuantity,
  getCart,
  increaseProductQuantity,
} from "../features/cart/cartSlice";

/*eslint-disable react/prop-types */
function UpdateQuantityButtons({ pizza }) {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const currentPizza = cart.find((el) => el.id === pizza.id);

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => dispatch(decreaseProductQuantity(currentPizza.id))}
        type="round"
      >
        -
      </Button>
      <span className="font-medium">{currentPizza.quantity}</span>
      <Button
        onClick={() => dispatch(increaseProductQuantity(currentPizza.id))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}

export default UpdateQuantityButtons;
