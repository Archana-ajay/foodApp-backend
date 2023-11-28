const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Food extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            //User.hasMany(model.Cart, { foreignKey: 'id'});
          //  User.hasMany(model.Order, { foreignKey: 'id',});
        }
    }
    Food.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoryName: {
                type: DataTypes.STRING,
                allowNull: false
                
            },
            photoUrl: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
           
        },
        {
            sequelize,
            modelName: Food.name,
            tableName: 'Food',
            timestamps: true,
        }
    );

    return Food;
};