import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();

  //Submit the form and revalidate the page
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  console.log(request);
  const data = { priority: true };
  await updateOrder(params.orderId, data);
}

export default UpdateOrder;
