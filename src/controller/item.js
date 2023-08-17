const { module_item } = require("../../models");

/*  Body = {
      id: "5c65c0bd-fb5f-4c29-b479-86b1bd881d41",
      nama_item: "oxva xlim",
      unit: 1,
      stok: 10,
      harga_satuan: 180000,
      barang: "image.jpg",
    }; */

exports.addItem = async (req, res) => {
  try {
    const { ...data } = req.body;
    const image = req.file.filename;

    const fields = await module_item.create({
      ...data,
      barang: image,
    });

    let body = await module_item.findOne({
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

exports.getItem = async (req, res) => {
  try {
    const data = await module_item.findAll({
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

exports.getIdItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await module_item.findOne({
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

exports.updateItem = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const body = {
      ...data,
    };

    await module_item.update(body, {
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

exports.updateItemImg = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const image = req.file.filename;

    const body = {
      ...data,
      barang: image,
    };

    await module_item.update(body, {
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

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const body = await module_item.destroy({
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
