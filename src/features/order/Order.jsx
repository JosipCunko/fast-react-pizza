/*eslint-disable */
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons/faMoneyCheckDollar";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons/faRectangleList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getOrder } from "../../apiRestaurant";
import { useFetcher, useLoaderData, useNavigation } from "react-router-dom";
import { formatDate, calcMinutesLeft, formatCurrency } from "../../helpers";
import Loader from "../../ui/Loader";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const {
    id,
    status,
    customer,
    estimatedDelivery,
    cart,
    orderPrice,
    priorityPrice,
    priority,
  } = order;

  const fetcher = useFetcher();
  useEffect(
    function () {
      //loading, idle, submitting
      //Use the loader func from the menu without navigating there
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const navigation = useNavigation();
  if (navigation.state === "loading") return <Loader />;

  return (
    <div className="flex flex-col gap-4 px-1 py-5">
      <div className="mb-3 flex gap-2">
        <h3 className="mr-auto text-lg font-semibold">
          Order <span className="border-b-2 border-black">#{id}</span> for
          customer {customer}
        </h3>

        {priority && (
          <span className="rounded-full bg-red-500 px-3 py-1 font-semibold text-white">
            Priority
          </span>
        )}
        <span className="rounded-full bg-green-500 px-3 py-1 font-semibold capitalize text-white">
          {status} order
        </span>
      </div>

      <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border-[5px] border-yellow-500 border-opacity-20 px-5 py-6">
        <p className="font-semibold">
          {status === "delivered"
            ? "Order should have arrived"
            : `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😀`}
        </p>
        <p className="mr-[10%] text-sm text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>

        <FontAwesomeIcon
          icon={faRectangleList}
          size="2xl"
          style={{ color: "#eab308", opacity: 0.5 }}
          className="absolute right-[3%] top-[10%] rotate-45 scale-[250%]"
        />
      </div>

      <ul className="flex flex-col divide-y divide-stone-300">
        {cart.map((item) => (
          <OrderItem
            item={item}
            //Its pizzaId because I changed it for the API to undestand
            key={item.pizzaId}
            ingredients={
              //Finds ingredients of a current pizza using menu data
              fetcher?.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
            isLoadingIngredients={
              //Because it needs to do another fetch -- loading state
              fetcher.state === "loading"
            }
          />
        ))}
      </ul>
      <div className="relative flex flex-col gap-1 overflow-hidden rounded-2xl border-[5px] border-yellow-500 border-opacity-20 px-5 py-6">
        <p>Price of the pizzas: {formatCurrency(orderPrice)}</p>
        <p>Priority price: {formatCurrency(priorityPrice)}</p>
        <p className="font-semibold">
          To pay on a delivery: {formatCurrency(priorityPrice + orderPrice)}
        </p>

        <FontAwesomeIcon
          icon={faMoneyCheckDollar}
          size="2xl"
          style={{ color: "#eab308", opacity: 0.5 }}
          className="absolute right-[2.5%] top-[10%] rotate-45 scale-[300%]"
        />
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId); //name of our param
  return order;
}

export default Order;
