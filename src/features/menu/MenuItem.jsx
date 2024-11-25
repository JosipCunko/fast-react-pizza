import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import UpdateQuantityButtons from "../../ui/UpdateQuantityButtons";
import {
  addProduct,
  getCurrentCartItemQuantityById,
  removeProduct,
} from "../cart/cartSlice";
import { formatCurrency } from "../../helpers";

/*eslint-disable react/prop-types */
function MenuItem({ pizza }) {
  const { id, name, unitPrice, soldOut, ingredients, imageUrl } = pizza;
  const dispatch = useDispatch();

  function handleAddToCart() {
    const newCartItem = {
      id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addProduct(newCartItem));
  }

  const currentPizzaQuantity = useSelector(getCurrentCartItemQuantityById(id));
  const isInCart = currentPizzaQuantity > 0;

  return (
    <li key={id} className="flex items-center gap-3 p-4 sm:gap-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-20 rounded-md sm:h-28 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3
            className={`font-semibold ${soldOut ? "opacity-70 grayscale" : ""}`}
          >
            {name}
          </h3>
          <p
            className={`text-sm capitalize italic text-gray-500 ${soldOut ? "opacity-70 grayscale" : ""}`}
          >
            {ingredients.join(", ")}
          </p>
        </div>

        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {!soldOut ? (
            <p className="absolute bottom-2 right-2 mr-auto font-semibold sm:relative">
              {soldOut ? "SOLD OUT" : `${formatCurrency(unitPrice)}`}
            </p>
          ) : (
            <p
              className={`mr-auto font-semibold text-gray-500 ${soldOut ? "opacity-70 grayscale" : ""}`}
            >
              SOLD OUT
            </p>
          )}

          {!soldOut ? (
            isInCart ? (
              <div className="flex gap-2">
                <UpdateQuantityButtons pizza={pizza} />
                <Button
                  onClick={() => dispatch(removeProduct(id))}
                  type="small"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button type="small" onClick={() => dispatch(handleAddToCart)}>
                Add to cart
              </Button>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
