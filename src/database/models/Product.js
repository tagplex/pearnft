module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        id_category: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        url: {
            type: dataTypes.STRING
        },
        cid: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.FLOAT(10, 2)
        },
        description: {
            type: dataTypes.TEXT
        },
        id_creator: {
            type: dataTypes.INTEGER
        },
        state: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "products",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, { 
            as: "category",
            foreignKey: "id_category"
        })

        Product.belongsTo(models.User,{
            as: "creator",
            foreignKey: "id_creator"
        })
    }
    return Product;
}