exports.up = function (knex) {
    return knex.schema.createTable("theaters", (table) => {
      table.increments("theater_id").primary(); //sets theater_id as primary, autoincrementing
      table.string("name");
      table.string("address_line_1");
      table.string("address_line_2");
      table.string("city");
      table.string("state");
      table.string("zip");
      table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("theaters");
  };
  