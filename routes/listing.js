const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync( listingControllers.index ))
    .post(isLoggedIn, upload.single("listing[image][url]"), validateListing, wrapAsync( listingControllers.create ));

// New Route : To add a new villa/house/hotel
router.get("/new", isLoggedIn, listingControllers.new );

router.route("/:id")
    .get(wrapAsync( listingControllers.show ))
    .put(isLoggedIn, isOwner, upload.single("listing[image][url]"), validateListing, wrapAsync( listingControllers.update ))
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.delete));
    
// Edit Route : To edit the details of a particular villa/house/hotel
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingControllers.edit ));

module.exports = router;