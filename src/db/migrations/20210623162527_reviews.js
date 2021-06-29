exports.up = function (knex) {
    return knex.schema.createTable("reviews", (table) => {
      table.increments("review_id").primary(); //sets review_id as primary, autoincrementing
      table.integer("score");
      table.text("content");
      table.integer("critic_id").unsigned().notNullable; //get from critics
      table
        .foreign("critic_id")
        .references("critic_id")
        .inTable("critics")
        .onDelete("CASCADE");
      table.integer("movie_id"); //get from movies
      table
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("CASCADE");
      table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("reviews");
  };
  