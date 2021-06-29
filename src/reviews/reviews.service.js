const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("reviews").select("*");
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function update(reviewId, {content, score}) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .update({
        content: content,
        score: score,
    });
}

function showUpdate(reviewId){
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("c.*", "r.*")
    .where({ review_id: reviewId })
    .first()
    .then(
      mapProperties({
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
        "c.created_at": "critic.created_at",
        "c.updated_at": "critic.updated_at",
      })
    );
}

module.exports = {
  read,
  delete: destroy,
  list,
  update,
  showUpdate
};
