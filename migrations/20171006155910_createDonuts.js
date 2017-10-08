
exports.up = function(knex, Promise) {
  return Promise.all( [
    knex.schema.createTable('donuts', function(table) => {
      table.increments().primary()
      table.string('name')
      table.string('topping')
      table.integer('price')
      table.timestamps()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('donuts')
  ])
};
