import orderModel from "../models/orderModel.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.user._id; // Get the current user's ID from the request

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};

// Get orders for the current user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await orderModel.find({ userId });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};
