const asyncHandler = require("../../middleware/asyncHandler");
const MyError = require("../../utility/myError");
const Orders = require("../../models/order");
const User = require("../../models/user");

exports.getOrders = asyncHandler(async (req, res, next) => {
  const theOrders = await Orders.find({}).lean().sort({ _id: -1 });
  for (let i = 0; i < theOrders.length; i++) {
    const theUser = await User.findById(
      { _id: theOrders[i].userId },
      { username: 1 }
    ).lean();
    theOrders[i].username = theUser.username;
  }
  res.status(200).json({
    success: true,
    data: theOrders,
  });
});

exports.confirmOrder = asyncHandler(async (req, res, next) => {
  //get the order id

  const { orderId } = req.body;
  console.log(orderId);
  //check if the order exists

  const theOrder = await Orders.findById(
    { _id: orderId },
    { confirmed: 1 }
  ).lean();
  if (!theOrder) {
    throw new MyError("order doesn't exist", 400);
  }
  if (theOrder.confirmed === true) {
    throw new MyError("order already confirmed", 400);
  }

  await Orders.findByIdAndUpdate(
    { _id: theOrder._id },
    {
      $set: {
        confirmed: true,
      },
    }
  );
  res.status(200).json({
    success: true,
  });
});

exports.selectOrderProcess = asyncHandler(async (req, res, next) => {
  //--->
  //get the index

  const { index, orderId } = req.body;
  //get the order by id
  const theOrder = await Orders.findOne({ _id: orderId });
  // for (let i = 0; i < theOrder.process.length; i++) {
  //   theOrder.process[i].inProcess = false;
  // }
  theOrder.process[index].inProcess = true;
  await Orders.findByIdAndUpdate(
    { _id: theOrder._id },
    {
      $set: {
        process: theOrder.process,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});
