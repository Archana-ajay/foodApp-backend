const { sequelize } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            await queryInterface.createTable('Restaurants', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                restaurantId:{
                  type:Sequelize.INTEGER,
               },
               categoryName: {
                   type: Sequelize.STRING,
                   allowNull: false,
               },
               description: {
                   type: Sequelize.STRING,
               },
               restaurantName: {
                   type: Sequelize.STRING,
                   allowNull: false,
               },
               price: {
                   type: Sequelize.BIGINT,
                   allowNull: false,
               },
               availability:{
                   type: Sequelize.BOOLEAN
               },
               photoUrl:{
                   type: Sequelize.TEXT
               },
               openingHours:{
                   type: Sequelize.STRING
               },
               categoryId:{
                   type: Sequelize.INTEGER
               },
               createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
                
            }),
        ]);
    },

   
    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('Restaurants');
    },
};