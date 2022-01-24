import Mongoose from "mongoose";
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    images: [{location: {type: String, required: true}}]
});

export const ImageModel = mongoose.model("Images", ImageSchema);