const Review = require("./models/review");
const Listing = require("./models/listing.js");
// const listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing.");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = ((req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next(); 
}); 

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        console.log(listing.owner, "..", req.user._id);
        req.flash("error", "Sorry, You don't have permission to update.");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if(error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};  

module.exports.validateReview = (req, res, next) => {
  if (req.body.review && req.body.review.rating) {
    req.body.review.rating = parseInt(req.body.review.rating, 10);
  }
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        console.log(listing.owner, "..", req.user._id);
        req.flash("error", "Sorry, You don't have permission to delete.");
        return res.redirect(`/listing/${id}`);
    }
    next();
};