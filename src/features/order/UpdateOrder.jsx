import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  //Submit the form and revalidate the page
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

//Revalidation - data has changed as a result of this actions, re-fetch data and re-render
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}
