
exports.up = function(knex, Promise) {
  return Promise.all( [
    knex.schema.createTable('shops_donuts', function(table) {
      table.increments('id');

      table.integer('shop_id').notNullable().references('id').inTable('shops').onDelete('CASCADE');

      table.integer('donut_id').notNullable().references('id').inTable('donuts').onDelete('CASCADE');

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('shops_donuts')
  ])
};
