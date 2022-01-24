//  Libraries
import express from 'express';

// Database Model
import {RestaurantModel} from '../../database/allModels';

// Validation
import {ValidateRestaurantCity, ValidateRestaurantSearchString} from '../../validation/restaurant'
import {ValidateRestaurantId} from '../../validation/common'

const Router = express.Router();

/**
 * Route        /
 * Des          Get all the restaurants details based on a city
 * Params       none
 * Access       Public
 * Method       GET
 */

 Router.get("/", async (req,res) => {
     try{
        //  await ValidateRestaurantCity(req.query);
        //  http://localhost:4000/restaurant/?city=nagpur
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        if (restaurants.length === 0) {
            return res.json({ error: "No restaurants found in this city" });
        }
        return res.json({restaurants});
     } catch(error){
         return res.status(500).json({error: error.message});
     }
 });

 /**
 * Route        /:_id
 * Des          Get individual restaurant details based on id
 * Params       none
 * Access       Public
 * Method       GET
 */
// http://localhost:4000/restaurant/12454dsfdofi438532
Router.get("/:_id", async (req,res) => {
    try{
        await ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findById(_id);

        if(!restaurant) return res.json({ error: "Restaurant not found" });

        return res.json({restaurant});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

/**
 * Route        /search
 * Des          Get restaurant details based on search string
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get("/search/:searchString", async (req,res) => {
    /**
   * searchString = Raj
   * results = {
   *      RajHotel
   *      RajRow
   *      RonRaj
   *      Ronraj
   * }
   */
    try{
        await ValidateRestaurantSearchString(req.params);
        const {searchString} =  req.params;
        const restaurants = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"},
        });
        
        if(!restaurant) return res.status(404).json({ error: `No restaurant matched with ${searchString}`});

        return res.json({restaurants});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

 

export default Router;