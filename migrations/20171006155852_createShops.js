
exports.up = function(knex, Promise) {
  return Promise.all( [
    knex.schema.createTable('shops', function(table) {
      table.increments('id') //increments is PK
      table.string('name')
      table.string('city')
      table.timestamps()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('shops')
  ])
};
