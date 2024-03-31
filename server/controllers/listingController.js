const Listing = require("../models/Listing");
const User = require("../models/User");

module.exports.createListing = async (req, res) => {
  try {
    // get information from the form
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedCount,
      bedroomCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDescription,
      price,
    } = req.body;

    // note here we use req.files since we are uploading many, in the user register we used req.file since we were uploading one picture
    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).send("No file uploaded");
    }
    const listingPhotoPaths = listingPhotos.map((file) => file.path);
    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedCount,
      bedroomCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDescription,
      price,
    });
    await newListing.save();
    return res.status(201).json(newListing);
  } catch (error) {
    console.log(error);
    return res
      .status(409)
      .json({ message: "Failed to created listing", error: error.message });
  }
};

// get listings
module.exports.getListings = async (req, res) => {
  const category = req.query.category;
  try {
    let listings;
    if (category) {
      listings = await Listing.find({ category }).populate({
        path: "creator",
        select: "id firstName",
      });
    } else {
      listings = await Listing.find().populate({
        path: "creator",
        select: "id firstName",
      });
    }
    return res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Unable to fetch the listings", error: error.message });
  }
};
