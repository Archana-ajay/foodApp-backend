const { sequelize } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            await queryInterface.createTable('Cart', {

            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            restaurantId:{
               type:Sequelize.UUID,
            },
            quantity: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            userId:{
              type: Sequelize.UUID,
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
        return queryInterface.dropTable('Cart');
    },
};