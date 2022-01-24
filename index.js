// const UserModel = require("./database/users");
import { FoodModel, ImageModel, MenuModel, OrderModel, RestaurantModel, ReviewModel, UserModel } from "./src/database/allModels";

require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});
require('dotenv').config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//Database Connection
import ConnectDB from "./src/database/connection";

// import google authentication config
import googleAuthConfig from './src/config/google.config';

// Private route authentication config
import privateRouteConfig from "./src/config/route.config"

// API
import Auth from "./src/API/Auth";
import Restaurants from "./src/API/Restaurants";
import Food from "./src/API/Food";
import Menu from "./src/API/Menu";
import Image from "./src/API/Image";
import Orders from "./src/API/Orders";
import Reviews from "./src/API/Reviews";
import User from "./src/API/User";


// passport configuration
googleAuthConfig(passport);
privateRouteConfig(passport);

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());

// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurants);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/orders", Orders);
zomato.use("/reviews", Reviews);
zomato.use("/user", User);

const PORT = process.env.PORT || 4000;

zomato.listen(PORT,()=>{
    ConnectDB().then(()=>{
        console.log("Server is running!!!");
    }).catch((error)=>{
        console.log("Server is running, but database connection failed...");
        console.log(error);
    })
});

