import Button from "../../ui/Button";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <Button type="secondary" to="/menu">
        &larr; Back to the menu
      </Button>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas. 😀🍕
      </p>
    </div>
  );
}

export default EmptyCart;
