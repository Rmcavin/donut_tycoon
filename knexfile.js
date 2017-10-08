// Update with your config settings.

module.exports = {

  development: {
    client: 'postgres',
    connection:'postgres://localhost:5432/donut_tycoon_dev'
  },
  test: {
    client: 'postgres',
    connection:'postgres://localhost:5432/donut_tycoon_test'
  }
};
