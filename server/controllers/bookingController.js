const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

// create booking

module.exports.createBooking = async (req, res) => {
  try {
    const { customer, host, listing, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customer,
      host,
      listing,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();

    return res.status(201).json(newBooking);
  } catch (error) {
    console.log(err);
    return res.status(400).json({
      message: "Failed to create your new booking",
      error: err.message,
    });
  }
};

module.exports.getMyTripList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const trips = await Booking.find({ customer: userId })
      .select("startDate endDate totalPrice")
      .populate([
        { path: "customer", select: "id firstName" },
        { path: "host", select: "id firstName" },
        {
          path: "listing",
          select: "id listingPhotoPaths city province country category",
        },
      ]);
    return res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Cannot find trips", error: error.message });
  }
};
module.exports.getMyWishList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const wishList = await user.wishList;

    return res.status(200).json(wishList);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Cannot find trips", error: error.message });
  }
};

module.exports.addToWishList = async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate({
      path: "creator",
      select: "id",
    });
    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );
    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();

      return res.status(200).json({
        message: "Listing has been removed from your wishlist",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      return res.status(200).json({
        message: "Listing has been added to your wishlist",
        wishList: user.wishList,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Unable to process your request currently",
      error: error.message,
    });
  }
};

// get properties list
module.exports.getMyProperties = async (req, res) => {
  try {
    const userId = req.params.userId;
    const properties = await Listing.find({ creator: userId }).populate({
      path: "creator",
      select: "id firstName",
    });
    return res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Unable to find properties", error: error.message });
  }
};

// get reservation list
module.exports.getReservationList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reservations = await Booking.find({ host: userId }).populate([
      {
        path: "listing",
        select: "id listingPhotoPaths city province country category",
      },
      { path: "host", select: "id" },
    ]);
    return res.status(200).json(reservations);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Unable to find reservations", error: error.message });
  }
};
