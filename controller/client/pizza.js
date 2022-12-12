const asyncHandler = require("../../middleware/asyncHandler");
const MyError = require("../../utility/myError");
const pizza = require("../../models/pizza");
const { validationResult } = require("express-validator");

exports.getPizza = asyncHandler(async (req, res, next) => {
  //get all the pizza's

  const thePizzas = await pizza
    .find({}, { price: 1, name: 1, description: 1, img: 1 })
    .lean();
  res.status(200).json({
    success: true,
    data: thePizzas,
  });
});

exports.getPizzaDetail = asyncHandler(async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new MyError(`${error.array()}`, 400);
  }
  //check if the pizza exists

  const thePizza = await pizza.findById({ _id: req.query.id }).lean();
  if (!thePizza) {
    throw new MyError("pizza doesnt' exist", 400);
  }

  res.status(200).json({
    success: true,
    data: thePizza,
  });
});
