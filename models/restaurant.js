const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Restaurant extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            
            Restaurant.hasMany(model.Cart, { foreignKey: 'id' });
            
        }
    }
    Restaurant.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
                
            },
            restaurantId:{
               type:DataTypes.INTEGER,
            },
            categoryName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            restaurantName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            availability:{
                type: DataTypes.BOOLEAN
            },
            photoUrl:{
                type: DataTypes.TEXT
            },
            openingHours:{
                type: DataTypes.STRING
            },
            categoryId:{
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            modelName: Restaurant.name,
            tableName: 'Restaurants',
            timestamps: true,
        }
    );

    return Restaurant;
};