"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class module_sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      module_sales.hasMany(models.sales_item, {
        as: "item",
        foreignKey: {
          name: "id_sales",
        },
      });
      module_sales.belongsTo(models.module_customer, {
        as: "name_customers",
        foreignKey: {
          name: "customer",
        },
      });
    }
  }
  module_sales.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      code_transaksi: {
        type: DataTypes.STRING,
      },
      tanggal_transaksi: {
        type: DataTypes.DATE,
      },
      customer: {
        type: DataTypes.UUID,
        references: {
          model: "module_customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      qty: {
        type: DataTypes.INTEGER(11),
      },
      total_diskon: {
        type: DataTypes.INTEGER(11),
      },
      total_harga: {
        type: DataTypes.INTEGER(11),
      },
      total_bayar: {
        type: DataTypes.INTEGER(11),
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
      modelName: "module_sales",
    }
  );
  return module_sales;
};
