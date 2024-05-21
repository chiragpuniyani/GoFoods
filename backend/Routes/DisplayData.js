const express=require('express');
const router=express.Router();


router.post('/foodData',(req,res)=>{
    try {
        const foodData = [global.food_items, global.food_catagories];
        res.send(foodData);

    } catch (error) {
        console.error(error.message);
        res.send("server Error");
    }
})



module.exports=router;