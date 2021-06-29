const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware to check if review exists given id
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
      res.locals.body = req.body;
    res.locals.review = review;
    res.locals.reviewId = reviewId;
    return next();
  }
  return next({ status: 404, message: `cannot be found` });
}

// Middleware to check if request has body
function hasBody(req, res, next) {
  const { content, score } = req.body;
  if (content && score) {
    res.locals.body = { content: content, score: score };
    return next();
  }
  return next({
    status: 400,
    message: `A content and score property are required`,
  });
}

// Route handler for delete request
async function destroy(req, res, next) {
  const { reviewId } = res.locals;
  await service.delete(reviewId);
  res.sendStatus(204);
}

// Route handler for updating a review
async function update(req, res, next) {
  const { reviewId } = res.locals;
  const { data: {content, score} } = req.body
  if (content || score) {
    await service.update(reviewId, { content, score });
  }
  const updateWithCritic = await service.showUpdate(reviewId);
  res.json({ data: updateWithCritic });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
