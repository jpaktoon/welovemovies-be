const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const { movie_id } = request.params;
  if (!movie_id) {
    const theaters = await service.list();
    response.json({ data: theaters });
  } else {
    const theaters = await service.read(movie_id);
    response.json({ data: theaters });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
