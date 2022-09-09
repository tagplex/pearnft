module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        username: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        profile_image: {
            type: dataTypes.STRING
        },
        user_state: {
            type: dataTypes.INTEGER
        },
        id_rol: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "users",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Role, { 
            as: "role",
            foreignKey: "id_rol"
        });
        User.hasMany(models.Product, { 
            as: "creator",
            foreignKey: "id_creator"
        })
    }
    return User;
}