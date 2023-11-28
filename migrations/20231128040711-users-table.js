const { sequelize } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            await queryInterface.createTable('Users', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                mobileNumber:{
                  type:Sequelize.BIGINT,
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
        return queryInterface.dropTable('Users');
    },
};