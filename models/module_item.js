"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class module_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  module_item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nama_item: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.INTEGER(11),
      },
      stok: {
        type: DataTypes.INTEGER(11),
      },
      harga_satuan: {
        type: DataTypes.INTEGER(11),
      },
      barang: {
        type: DataTypes.STRING,
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
      modelName: "module_item",
    }
  );
  return module_item;
};
