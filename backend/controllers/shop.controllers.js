import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";

export const createEditShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body;
        let image;

        if (req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }

        let shop = await Shop.findOne({ owner: req.userId });

        if (!shop) {
            // 🆕 CREATE SHOP
            shop = await Shop.create({
                name,
                city,
                state,
                address,
                image,
                owner: req.userId
            });
        } else {
            // 🛠 UPDATE SHOP
            const updateData = { name, city, state, address, owner: req.userId };
            if (image) updateData.image = image; // Only update if new image provided

            shop = await Shop.findByIdAndUpdate(
                shop._id,
                updateData,
                { new: true }
            );
        }

        await shop.populate("owner items");
        return res.status(201).json(shop);

    } catch (error) {
        console.error("Create/Edit Shop Error:", error);
        return res.status(500).json({ message: `create shop error: ${error.message}` });
    }
};

export const getMyShop = async (req,res)=>{
     try {
    const shop = await Shop.findOne({ owner: req.userId }).populate({
            path:"items",
            options:{sort:{updatedAt:-1}}
        })        
    if (!shop) return res.status(404).json({ message: "Shop not found" })
    res.json(shop)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getShopByCity =async (req,res)=>{
    try {
        const {city}=req.params 
        const shops=await Shop.find({
            city:{$regex:new RegExp(`^${city}$`,"i")}
        }).populate('items')
        if (!shops) {
          return res.status(400).json({message:"shops not found"})  
        }
        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({message:`get shop by city error ${error}`})
    }
}