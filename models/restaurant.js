const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user: String,
    rating: Number,
    comment: String
});

const MenuItemSchema = new mongoose.Schema({
    item: String,
    price: Number
});

const LocationSchema = new mongoose.Schema({
    city: String,
    zip: String
});

const RestaurantSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: [ReviewSchema], // Array of reviews
    location: LocationSchema, // Embedded location object
    menu: [MenuItemSchema] // Array of menu items
});

const Restaurant = mongoose.model("restaurants", RestaurantSchema);

module.exports = Restaurant;
