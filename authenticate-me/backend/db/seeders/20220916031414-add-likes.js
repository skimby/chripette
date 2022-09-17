'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Likes', [
      {
        id: 1,
        userId: 1,
        tweetId: 2
      },
      {
        id: 2,
        userId: 1,
        tweetId: 4
      },
      {
        id: 3,
        userId: 2,
        tweetId: 5
      },
      {
        id: 4,
        userId: 3,
        tweetId: 1
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Likes', {})

  }
};