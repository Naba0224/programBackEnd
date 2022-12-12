const asyncHandler = require("../../middleware/asyncHandler");
const MyError = require("../../utility/myError");
const jwt = require("jsonwebtoken");
const Order = require("../../models/order");
const Cart = require("../../models/cartItems");
const Pizza = require("../../models/pizza");

exports.createOrder = asyncHandler(async (req, res, next) => {
  //get the token data we need the user Id

  const tokenData = jwt.decode(req.headers.authorization.split(" ")[1]);
  //get the Cart Items of the user

  const theItems = await Cart.find({ userId: tokenData.id }).lean();
  if (theItems.length === 0) {
    throw new MyError("cart is empty", 400);
  }
  let totalPrice = 0;

  //calculate the total price and get the image  name and image of the items and save it to another array

  const orderItems = [];

  for (let i = 0; i < theItems.length; i++) {
    totalPrice = totalPrice + theItems[i].price;
    const theItem = await Pizza.findById(
      { _id: theItems[i].itemId },
      { img: 1, name: 1 }
    ).lean();
    const tempObject = {
      name: theItem.name,
      img: theItem.img,
      size: theItems[i].size,
      price: theItems[i].price,
      type: theItems[i].type,
    };
    orderItems.push(tempObject);
  }
  const savingObject = {
    userId: tokenData.id,
    items: orderItems,
    totalPrice: totalPrice,
  };
  //save it to the order
  await Order.create(savingObject);
  //delete all the current cart items of the user
  await Cart.deleteMany({ userId: tokenData.id });

  res.status(200).json({
    success: true,
  });
});

exports.getOrders = asyncHandler(async (req, res, next) => {
  //decode the token
  const tokenData = jwt.decode(req.headers.authorization.split(" ")[1]);
  //get the orders by userId

  const theORders = await Order.find({ userId: tokenData.id }).lean();
  res.status(200).json({
    success: true,
    data: theORders,
  });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  //takes order Id
  const { orderId } = req.body;
  if (!orderId) {
    throw new MyError("order id is required", 400);
  }

  //check if the order is completed or not

  const theOrder = await Order.findById({ _id: orderId }).lean();
  if (!theOrder) {
    throw new MyError("order doesn't exist anymore", 400);
  }

  if (theOrder.confirmed === true) {
    throw new MyError(" you can't delete already confirmed order", 400);
  }

  //if no problem occured we can delete the order

  await Order.findByIdAndDelete({ _id: theOrder._id });

  res.status(200).json({
    success: true,
  });
});
