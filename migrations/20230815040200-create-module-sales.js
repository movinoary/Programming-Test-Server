"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("module_sales", {
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("module_sales");
  },
};
