import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import { formatCurrency, isValidPhone } from "../../helpers";
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../apiRestaurant";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";

function CreateOrder() {
  const dispatch = useDispatch();

  const {
    name: username,
    address,
    position,
    status,
    error,
  } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = status === "loading";
  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-1 py-5">
      <h2 className="mb-4 font-semibold">Ready to order? Let&apos;s go!</h2>

      <Form
        method="POST"
        className={`grid grid-cols-1 grid-rows-8 items-center p-4 sm:grid-cols-[max-content_1fr_min-content] sm:grid-rows-5 ${status === "error" || formErrors?.phone ? "max-h-[55vh] gap-x-5 gap-y-0 sm:gap-x-7" : "gap-x-2 gap-y-1 sm:gap-7"} `}
      >
        <label htmlFor="name" className="w-max font-semibold">
          First Name
        </label>
        <input
          required
          id="name"
          type="text"
          name="customer"
          defaultValue={username}
          className="input col-span-2 focus:scale-[105%]"
        />

        <label htmlFor="tel" className="w-max font-semibold">
          Phone Number
        </label>
        <div className="col-span-2">
          <input
            required
            id="tel"
            type="tel"
            className="input col-span-2 w-full focus:scale-[105%]"
            name="phone"
          />

          {formErrors?.phone && (
            <p className="mg-red-100 mt-0 rounded-md p-2 text-sm text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <label htmlFor="address" className="col-start-1 w-max font-semibold">
          Adress
        </label>
        <div className="relative row-start-6 row-end-7 sm:col-span-1 sm:col-start-2 sm:row-start-3 sm:row-end-4">
          <input
            required
            id="address"
            name="address"
            defaultValue={address}
            disabled={isLoading}
            type="text"
            className="input col-span-2 w-[105%] focus:scale-[105%]"
          />

          {status === "error" && (
            <p className="mg-red-100 mt-0 rounded-md p-2 text-sm text-red-700">
              {error}
            </p>
          )}

          {!position.latitude && !position.longitude && (
            <span className="absolute -right-6 top-[2px] sm:top-[3px] md:top-[5px]">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                type="small"
                disabled={isLoading}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="col-span-2 flex items-center gap-4">
          <input
            name="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            id="priority"
            type="checkbox"
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
          />
          <label className="font-semibold" htmlFor="priority">
            Want to give your order a priority?
          </label>
        </div>

        {/*These inputs get submitted to the form but aren't displayed */}
        <div className="col-span-2">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <div className="col-span-2">
            <Button type="primary" disabled={isSubmitting || isLoading}>
              {isSubmitting
                ? "Placing order..."
                : `Order now for ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  //Changed id to pizzaId that the API needs
  const cart = JSON.parse(data.cart);
  const transformedCart = cart.map((item) => {
    const { id, ...rest } = item;
    return { pizzaId: id, ...rest };
  });
  console.log(transformedCart);

  const order = {
    ...data,
    cart: transformedCart,
    priority: data.priority === "true",
  };
  console.log(order);

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number we might need it to contact you";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log(newOrder);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
