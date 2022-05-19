export default function (currentReservation = "", action) {
  if (action.type == "addReservation") {
    console.log(action.reservation);
    return action.reservation;
  } else if (action.type == "cleanReservation") {
    return "";
  } else {
    return currentReservation;
  }
}
