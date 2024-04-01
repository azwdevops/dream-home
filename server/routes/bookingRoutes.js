const {
  createBooking,
  getMyTripList,
  addToWishList,
  getMyProperties,
  getReservationList,
  getMyWishList,
} = require("../controllers/bookingController");

const router = require("express").Router();

router.post("/create", createBooking);
router.get("/get-my-trip-list/:userId", getMyTripList);
router.patch("/add-to-wishlist/:userId/:listingId", addToWishList);
router.get("/get-my-wishlist/:userId", getMyWishList);
router.get("/get-my-properties/:userId", getMyProperties);
router.get("/reservations/:userId", getReservationList); // to get a list of reservations made for my properties

module.exports = router;
