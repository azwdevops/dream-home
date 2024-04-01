const router = require("express").Router();

const multer = require("multer");

const {
  createListing,
  getListings,
  getSingleListing,
  searchListing,
} = require("../controllers/listingController");

// configuration multer for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//  create listing
router.post("/create", upload.array("listingPhotos"), createListing);

router.get("/", getListings);
router.get("/search/:searchTerm", searchListing);
router.get("/:listingId", getSingleListing);

module.exports = router;
