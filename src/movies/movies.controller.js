const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");
// Nested critic object
const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
});

// Middleware that checks to see if movie with given id exists
async function movieExists(req, res, next){
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if(movie){
        res.locals.movieId = movieId;
        res.locals.movie = movie;
        return next();
    }
    return next({ status: 404, message: `Movie with ID: ${movieId} does not exist.`})
}

// Route handler that will list all movies
async function list(req, res, next){
    // If query: is_showing = true, then only movies showing will be requested
    if(req.query.is_showing){
        return res.json({data: await service.listIsShowing()});
    }
    // If no query, then the default of all movies will be displayed
    res.json({data: await service.list()});
}

// Route handler to read details of a movie
function read(req, res, next){
    const { movie } = res.locals;
    res.json({ data: movie });
}

// Route handler to list all theaters showing a given movie according to the movie_id
async function listTheaters(req, res, next){
    const { movieId } = res.locals;
    res.json({ data: await service.listTheaters(movieId) });
}

// Route handler that will list all reviews related to a given movie according to the movie_id
async function listReviews(req, res, next){
    const { movieId } = res.locals;
    res.json({ data: await service.listReviews(movieId) });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]
}