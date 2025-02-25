const Restaurant=require("../models/restaurant")

exports.getData=async (req,res)=>{
    try{
        const restaurants = await Restaurant.find(); // Fetch all restaurant data
        res.status(200).json({
            success: true,
            data: restaurants
        });

    }
    catch(err){
        console.log(err.message)
        res.status(501).json({
            message:err.message,
            success:false
        })
    }
}