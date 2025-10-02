const mongoose = require("mongoose");   
const review = require("./review");
const Schema = mongoose.Schema;
const default_link = "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzb3J0fGVufDB8fDB8fHww";

const listingSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
   image: {
    url: String,
    filename: String,
  },
  price: { 
    type: Number, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  country : { 
    type: String, 
    required: true 
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing){
    await review.deleteMany({ _id: { $in: listing.review }});
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;