const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// PSQL to show list of theaters with nested movies object
function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "m.*")
    .then(
      reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        rating: ["movies", null, "rating"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        created_at: ["movies", null, "created_at"],
        updated_at: ["movies", null, "updated_at"],
        is_showing: ["movies", null, "is_showing"],
        theater_id: ["movies", null, "theater_id"],
      })
    );
}

module.exports = {
  list,
};
