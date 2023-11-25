import styled from "styled-components";
import { useCheckin } from "./useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useBooking } from "../bookings/useBooking";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { checkIn, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const { booking, isLoading: isLoadingBookings } = useBooking();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numNights,
    numGuests,
    isPaid,
    hasBreakfast,
  } = booking || {};
  const { settings: { breakfastPrice } = {}, isLoading: isLoadingSettings } =
    useSettings();

  const optionalBreakfastFees = breakfastPrice * numGuests * numNights;

  useEffect(() => setConfirmPaid(isPaid || false), [isPaid]);
  useEffect(() => setBreakfast(hasBreakfast || false), [hasBreakfast]);

  if (isLoadingBookings || isLoadingSettings) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return;

    breakfast
      ? checkIn({
          bookingId,
          breakfast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastFees,
            totalPrice: totalPrice + optionalBreakfastFees,
          },
        })
      : checkIn({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={breakfast}
            onChange={() => {
              setBreakfast((check) => !check);
              setConfirmPaid(false);
            }}
            id="breakfast"
            disabled={isCheckingIn}
          >
            Add breakfast for an additional fee of{" "}
            {formatCurrency(optionalBreakfastFees)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((check) => !check)}
          disabled={confirmPaid || isCheckingIn}
          id="confirmPaid"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!breakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastFees
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastFees
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
