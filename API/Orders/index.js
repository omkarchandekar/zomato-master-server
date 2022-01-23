// Libraries
import express from 'express';
import passport from 'passport';

// Database Model
import {OrderModel} from '../../database/allModels';

// Validate User
import ValidateUser from '../../config/validateUser';

const Router = express.Router();

/**
 * Route        /
 * Des          Get all orders based on id
 * Params       _id
 * Access       Private
 * Method       GET
 */

 Router.get("/:_id", passport.authenticate("jwt"), async (req,res) => {
     try{
         await ValidateUser (req,res);
        const {_id} = req.params;
        const getOrders = await OrderModel.findOne({ user: _id});

        if(!getOrders) {
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json({order: getOrders});

     } catch(error){
        return res.status(500).json({error: error.message});
     }
 });

 /**
 * Route        /new
 * Des          Adding a new order
 * Params       _id
 * Access       Private
 * Method       POST
 */

  Router.post("/new/:_id", async (req,res) => {
    try{
       const {_id} = req.params;
       const {orderDetails} = req.body;

       const addNewOrder = await OrderModel.findOneAndUpdate({
           user: _id
       },
       {
           $push: {orderDetails},
       },
       {new: true}
       );

       return res.json({order : addNewOrder});

    } catch(error){
       return res.status(500).json({error: error.message});
    }
});

 export default Router;