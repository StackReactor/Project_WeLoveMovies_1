exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.boolean("is_showing");
    table.integer("movie_id");
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE");
    table.integer("theater_id");
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("CASCADE");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
