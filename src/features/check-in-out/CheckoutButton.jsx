import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckout();

  return (
    <Button
      size="small"
      variation="primary"
      disabled={isCheckingout}
      onClick={() => checkout(bookingId)}
    >
      {isCheckingout ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
