
exports.up = function(knex, Promise) {
  return Promise.all( [
    knex.schema.createTable('shops_donuts', function(table) {
      table.increments('id')

      table.integer('shop_id')
      table.foreign('shop_id').references('shops.id')

      table.integer('donut_id')
      table.foreign('donut_id').references('donuts.id')

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('shops_donuts')
  ])
};
