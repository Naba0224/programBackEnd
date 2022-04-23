const asyncHandler = (naba) => (req, res, next) =>
  Promise.resolve(naba(req, res, next)).catch(next);

module.exports = asyncHandler;
