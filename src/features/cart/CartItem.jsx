import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import UpdateQuantityButtons from "../../ui/UpdateQuantityButtons";
import { removeProduct } from "./cartSlice";
import { formatCurrency } from "../../helpers";

/*eslint-disable react/prop-types */
function CartItem({ pizza }) {
  const dispatch = useDispatch();

  return (
    <li className="grid w-full grid-rows-2 items-center px-0 py-3 sm:flex sm:px-3 sm:py-6">
      <div className="mr-auto">
        {pizza.quantity}&times; {pizza.name}
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">
          {formatCurrency(pizza.totalPrice)}
        </span>
        <UpdateQuantityButtons pizza={pizza} />
        <Button type="small" onClick={() => dispatch(removeProduct(pizza.id))}>
          Remove
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
