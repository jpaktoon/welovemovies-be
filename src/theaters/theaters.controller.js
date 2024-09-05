const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const { movieId } = request.params;
  if (!movieId) {
    const theaters = await service.list();
    response.json({ data: theaters });
  } else {
    const theaters = await service.read(movieId);
    response.json({ data: theaters });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
