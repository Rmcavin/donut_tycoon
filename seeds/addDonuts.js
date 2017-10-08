
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('donuts').del()
    .then(function () {
      // Inserts seed entries
      return knex('donuts').insert([
        {name: 'cherry icing', topping: 'none', price: 100},
        {name: 'cherry icing', topping: 'sprinkles', price: 125},
        {name: 'blueberry cake', topping: 'none', price: 150},
        {name: 'glazed', topping: 'none', price: 100},
        {name: 'chocolate icing', topping: 'none', price: 100},
        {name: 'chocolate icing', topping: 'sprinkles', price: 125},
        {name: 'vanilla icing', topping: 'none', price: 100},
        {name: 'vanilla icing', topping: 'sprinkles', price: 125}
      ]);
    });
};
