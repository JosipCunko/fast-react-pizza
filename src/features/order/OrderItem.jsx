/*eslint-disable */
import { formatCurrency } from "../../helpers";

function OrderItem({ item, ingredients, isLoadingIngredients }) {
  return (
    <li className="grid grid-cols-[1fr_min-content] grid-rows-2 gap-1.5 px-3 py-4">
      <span className="col-start-1 col-end-2 font-semibold">
        {item.quantity}&times; {item.name}
      </span>
      <span className="col-start-2 col-end-3 font-semibold">
        {formatCurrency(item.totalPrice)}
      </span>
      <p className="col-start-1 col-end-2 row-start-2 row-end-3 capitalize text-stone-500">
        {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
