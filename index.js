// const UserModel = require("./database/users");
import { FoodModel, ImageModel, MenuModel, OrderModel, RestaurantModel, ReviewModel, UserModel } from "./database/allModels";

require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});
require('dotenv').config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//Database Connection
import ConnectDB from "./database/connection";

// import google authentication config
import googleAuthConfig from './config/google.config';

// Private route authentication config
import privateRouteConfig from "./config/route.config"

// API
import Auth from "./API/Auth";
import Restaurants from "./API/Restaurants";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Orders from "./API/Orders";
import Reviews from "./API/Reviews";
import User from "./API/User";


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

zomato.listen(4000,()=>{
    ConnectDB().then(()=>{
        console.log("Server is running!!!");
    }).catch((error)=>{
        console.log("Server is running, but database connection failed...");
        console.log(error);
    })
});

