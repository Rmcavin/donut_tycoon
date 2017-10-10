
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shops').del()
    .then(function () {
      // Inserts seed entries
      return knex('shops').insert([
        {name: 'Donut Tycoon', city: 'San Marcos'},
        {name: 'Donut Tycoon', city: 'Round Rock'},
        {name: 'Donut Tycoon', city: 'Austin'}
      ]);
    });
};
