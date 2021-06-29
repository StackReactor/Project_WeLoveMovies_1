const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// Route handler that will display a list of theaters
async function list(req, res, next){
    res.json({ data: await service.list() });
}

module.exports = {
    list: asyncErrorBoundary(list),
}