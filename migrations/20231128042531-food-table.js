const { sequelize } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            await queryInterface.createTable('Food', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                categoryId: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
              },
              categoryName: {
                  type: Sequelize.STRING,
                  allowNull: false
                  
              },
              photoUrl: {
                  type: Sequelize.TEXT,
                  allowNull: false,
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
        return queryInterface.dropTable('Food');
    },
};