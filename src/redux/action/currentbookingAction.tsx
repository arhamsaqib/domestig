export interface Booking {
  id?: string;
}

const updateCurrentBookingAction = (user: Booking) => {
  return {
    type: 'updateCurrentBooking',
    user: user,
  };
};

export default updateCurrentBookingAction;
