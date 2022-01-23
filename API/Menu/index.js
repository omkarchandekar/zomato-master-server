//  Libraries
import express from 'express';

// Database Model
import {MenuModel, ImageModel} from '../../database/allModels';

const Router = express.Router();

/**
 * Route        /list
 * Des          Get all list menu based on restaurant id
 * Params       _id
 * Access       Public
 * Method       GET
 */

 Router.get("/list/:_id", async (req,res) => {
     try{
        const {_id} = req.params;
        const menus = await MenuModel.findById(_id);

        if(!menus) {
            return res.status(404).json({error: "No menu present for this restaurant"});
        }

        return res.json({menus});
     } catch(error){
         return res.status(500).json({error: error.message});
     }
 });

 /**
 * Route        /image
 * Des          Get all list menu images with restaurant id
 * Params       _id
 * Access       Public
 * Method       GET
 */

  Router.get("/image/:_id", async (req,res) => {
    try{
       const {_id} = req.params;
       const menuImages = await ImageModel.findOne(_id);

       if(!menuImages) {
           return res.status(404).json({error: "No menu image present for this restaurant"});
       }

       return res.json({menuImages});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});



 export default Router;