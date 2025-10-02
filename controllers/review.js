const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
// const ExpressError = require("../utils/ExpressError.js");

module.exports.create = async (req, res) => {
  console.log(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.review.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("New Review Added");
  req.flash("success", "Review posted");
  res.redirect(`/listing/${listing._id}`);
}

module.exports.delete = async(req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { review : reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted");
  res.redirect(`/listing/${ id }`);
}