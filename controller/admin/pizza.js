const asyncHandler = require("../../middleware/asyncHandler");
const MyError = require("../../utility/myError");
const pizza = require("../../models/pizza");
const { validationResult } = require("express-validator");

exports.createPizza = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new MyError(`${errors.array()}`, 400);
  }
  const data = req.body;
  //check if the pizza name exists or not

  const thePizza = await pizza.findOne({ name: data.name }).lean();
  if (thePizza) {
    throw new MyError("name already exists", 400);
  }

  await pizza.create({
    ...data,
    size: [
      { size: "small", price: data.price - 3000 },
      { size: "middle", price: data.price },
      { size: "big", price: data.price + 3000 },
    ],
    type: ["Зузаан", "Нимгэн"],
  });

  res.status(200).json({
    success: true,
  });
});
