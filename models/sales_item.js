"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sales_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sales_item.belongsTo(models.module_item, {
        as: "item",
        foreignKey: {
          name: "id_item",
        },
      });
    }
  }
  sales_item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      id_sales: {
        type: DataTypes.UUID,
        references: {
          model: "module_sales",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_item: {
        type: DataTypes.UUID,
        references: {
          model: "module_items",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      qty: {
        type: DataTypes.INTEGER(11),
      },
      total_harga: {
        type: DataTypes.INTEGER(15),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "sales_item",
    }
  );
  return sales_item;
};
