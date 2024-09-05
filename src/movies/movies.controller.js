const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const movie = await service.read(request.params.movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: "Movie cannot be found." });
}

async function read(request, response) {
  const { movie } = response.locals;
  response.json({ data: movie });
}

async function list(request, response) {
  const is_showing = request.query.is_showing === "true";
  response.json({ data: await service.list(is_showing) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists: [asyncErrorBoundary(movieExists)],
};
