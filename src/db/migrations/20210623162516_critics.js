exports.up = function (knex) {
    return knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary(); //sets critic_id as primary, autoincrementing
      table.string("preferred_name");
      table.string("surname");
      table.string("organization_name");
      table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("critics");
  };
  