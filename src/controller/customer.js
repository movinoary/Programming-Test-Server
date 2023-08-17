const { module_customer } = require("../../models");

/*  Body = {
      nama_item: "oxva xlim",
      unit: 1,
      stok: 10,
      harga_satuan: 180000,
      barang: "image.jpg",
    }; */

exports.addCustomer = async (req, res) => {
  try {
    const { ...data } = req.body;
    const image = req.file.filename;

    const fields = await module_customer.create({
      ...data,
      ktp: image,
    });

    let body = await module_customer.findOne({
      where: {
        id: fields.id,
      },
    });

    body = JSON.parse(JSON.stringify(body));
    res.send({
      status: "Success",
      data: {
        ...body,
      },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const data = await module_customer.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getIdCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await module_customer.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const body = {
      ...data,
    };

    await module_customer.update(body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update  informasi id: ${id}`,
      data,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateCustomerImg = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const image = req.file.filename;

    const body = {
      ...data,
      ktp: image,
    };

    await module_customer.update(body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update  informasi id: ${id}`,
      data,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const body = await module_customer.destroy({
      where: {
        id,
      },
    });

    if (body === 1) {
      res.send({
        status: "success",
        message: `Delete informasi  id:${id}`,
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: "id not found",
      });
    }
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
