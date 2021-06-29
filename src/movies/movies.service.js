const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

// Nested critic object
/*const addCritics = reduceProperties(critic_id, {
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
});*/

function list() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .groupBy("m.movie_id")
    .where({ "mt.is_showing": true });
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listTheaters(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId });
}

function listReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then(
      reduceProperties("critic_id", {
        critic_id: ["critic", "critic_id"],
        preferred_name: ["critic", "preferred_name"],
        surname: ["critic", "surname"],
        organization_name: ["critic", "organization_name"],
      })
    );
}

module.exports = {
  list,
  listIsShowing,
  read,
  listTheaters,
  listReviews,
};
