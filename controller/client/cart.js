const asyncHandler = require("../../middleware/asyncHandler");
const MyError = require("../../utility/myError");
const User = require("../../models/user");
const Cart = require("../../models/cartItems");
const Pizza = require("../../models/pizza");
const jwt = require("jsonwebtoken");

exports.addToCart = asyncHandler(async (req, res, next) => {
  //decode the accessToken and get the user information
  //get the pizzaId id size type from req.body

  const { pizzaId, size, type } = req.body;
  const tokenData = jwt.decode(req.headers.authorization.split(" ")[1]);
  //find the pizza
  const thePizza = await Pizza.findById(
    { _id: pizzaId },
    { size: 1, name: 1 }
  ).lean();
  if (!thePizza) {
    throw new MyError("pizza not found", 400);
  }
  let price;
  //assign the right price
  for (let i = 0; i < thePizza.size.length; i++) {
    if (thePizza.size[i].size === size) {
      price = thePizza.size[i].price;
    }
  }
  const savingObject = {
    userId: tokenData.id,
    itemId: thePizza._id,
    price: price,
    type: type,
    size: size,
  };
  await Cart.create(savingObject);

  res.status(200).json({
    success: true,
  });
});

exports.getCartItems = asyncHandler(async (req, res, next) => {
  const tokenData = jwt.decode(req.headers.authorization.split(" ")[1]);

  const thePizzas = await Cart.find({ userId: tokenData.id }).lean();
  //we need to replace the itemId with the item's name and img. In order to do that we can create an array and push objects that
  //their itemId is replaced by name and img. We name it finalData.
  const finalData = [];

  for (let i = 0; i < thePizzas.length; i++) {
    const thePizza = await Pizza.findById(
      { _id: thePizzas[i].itemId },
      { img: 1, name: 1 }
    ).lean();
    const tempObject = {
      name: thePizza.name,
      img: thePizza.img,
      price: thePizzas[i].price,
      size: thePizzas[i].size,
      type: thePizzas[i].type,
      cartItemId: thePizzas[i]._id,
    };
    finalData.push(tempObject);
  }
  //finally we send it to the client side
  res.status(200).json({
    success: true,
    data: finalData,
  });
});

exports.removeFromCart = asyncHandler(async (req, res, next) => {
  //takes cartItemId in req.body

  const { cartItemId } = req.body;
  //check if the cart item exist or not

  const theCartItem = await Cart.findById({ _id: cartItemId }).lean();
  if (!theCartItem) {
    throw new MyError("cart item doesn't exist", 400);
  }

  await Cart.findByIdAndDelete({ _id: theCartItem._id });
  res.status(200).json({
    success: true,
  });
});
