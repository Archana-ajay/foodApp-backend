const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(model) {
            Cart.belongsTo(model.User, { foreignKey: "userId" });
            Cart.belongsTo(model.Restaurant, { foreignKey: "restaurantId" });
        }
    }
    Cart.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            restaurantId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: Cart.name,
            tableName: "Cart",
            timestamps: true,
        }
    );

    return Cart;
};
