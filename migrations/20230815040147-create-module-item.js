"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("module_items", {
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("module_items");
  },
};
