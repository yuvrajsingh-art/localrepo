import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const shop = await Shop.findOne({ owner: req.userId })
        if (!shop) {
            return res.status(400).json({ message: "shop not found" })

        }
        const item = await Item.create({
            name, category, foodType, price, image, shop: shop._id
        })

        shop.items.push(item._id)
        await shop.save()
        await shop.populate("owner")
        await shop.populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        })
        return res.status(201).json(shop)

    } catch (error) {
        return res.status(500).json({ message: `add item error ${error}` })
    }
}

export const editItem = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const { name, category, foodType, price } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const item = await Item.findByIdAndUpdate(itemId, {
            name, category, foodType, price, image
        }, { new: true })
        if (!item) {
            return res.status(400).json({ message: "item not found" })
        }
        const shop = await Shop.findOne({ owner: req.userId }).populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        })
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({ message: `edit item error ${error}` })
    }
}

export const getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const item = await Item.findById(itemId)
        if (!item) {
            return res.status(400).json({ message: "item not found" })
        }
        return res.status(200).json(item)
    } catch (error) {
        return res.status(500).json({ message: `get item error ${error}` })

    }
}




export const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        console.log("Delete request received for item:", itemId);

        // Delete item from DB
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Find the shop of the current user
        const shop = await Shop.findOne({ owner: req.userId });

        if (shop) {
            // Remove item from shop's items array
            shop.items = shop.items.filter(
                (i) => i.toString() !== deletedItem._id.toString()
            );

            await shop.save();

            // Populate updated items list
            await shop.populate({
                path: "items",
                options: { sort: { updatedAt: -1 } }
            });
        }

        return res.status(200).json(shop || { message: "Item deleted successfully" });

    } catch (error) {
        console.error("Delete item error:", error);
        return res.status(500).json({ message: `Delete item error: ${error.message}` });
    }
}


export const getItemByCity = async (req, res) => {
    try {
        const { city } = req.params
        if (!city) {
            return res.status(400).json({ message: "city is required" })
        }
        const shops = await Shop.find({
            city:{$regex:new RegExp(`^${city}$`, "i")}
        }).populate('items')
        if (!shops) {
            return res.status(400).json({ message: "shops not found" })
        }
        const shopIds = shops.map((shop) => shop._id)

        const items = await Item.find({ shop:{$in:shopIds}})
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({ message: `get item by city error: ${error.message}` })
    }
}
