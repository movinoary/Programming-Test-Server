const {
  module_sales,
  module_item,
  sales_item,
  module_customer,
} = require("../../models");

/* body = {
    "tanggal_transaksi": "2023-07-20",
    "customer": "b48cb91b-0ac7-49cc-8fcf-61bb5b15e79b",
    "item": [
      {
        "id_item" : "54b15236-c37e-454c-ac8b-9628ce31f2a7",
        "qty" : 3
      },    {
        "id_item" : "b053ac77-a608-40db-8688-1aa38149c205",
        "qty" : 5
      }
    ]
  } */

exports.addSales = async (req, res) => {
  try {
    const { ...data } = req.body;
    const db = await module_sales.findAll({});
    const get_item = await module_item.findAll({});
    const data_customer = await module_customer.findOne({
      where: {
        id: data.customer,
      },
    });
    const { diskon, tipe_diskon } = data_customer;

    let total_harga = [];
    let total_harga_item = [];
    let total_diskon = [];

    for (let i = 0; i < data.item.length; i++) {
      const find_item = get_item.find(
        (item) => item.id === data.item[i].id_item
      );
      const harga_item = find_item.harga_satuan * data.item[i].qty;
      const stok_item = find_item.stok - data.item[i].qty;
      total_harga.push(harga_item);
      const body_item = {
        stok: stok_item,
      };
      const body_sales = {
        id_item: data.item[i].id_item,
        total_harga: harga_item,
      };

      total_harga_item.push(body_sales);

      await module_item.update(body_item, {
        where: {
          id: data.item[i].id_item,
        },
      });
    }

    let total_bayar;
    total_harga = total_harga.reduce((a, b) => a + b);

    if (diskon !== null || diskon !== undefined || diskon !== 0) {
      if (tipe_diskon === "fix diskon") {
        total_bayar = total_harga - diskon;
      } else if (tipe_diskon === "persentase") {
        total_diskon = (diskon / 100) * total_harga;
        total_bayar = total_harga - total_diskon;
      }
    }

    const code = `KD00${db.length + 1}`;

    const fields = await module_sales.create({
      ...data,
      qty: data.item.length,
      code_transaksi: code,
      total_diskon: total_diskon || 0,
      total_harga,
      total_bayar,
    });

    let body = await module_sales.findOne({
      where: {
        id: fields.id,
      },
    });

    const body_item = data.item.map((item) => {
      const harga_per_item = total_harga_item.find(
        (d) => d.id_item === item.id_item
      ).total_harga;

      return {
        id_sales: body.id,
        id_item: item.id_item,
        qty: item.qty,
        total_harga: harga_per_item,
      };
    });

    const fields_item = await sales_item.bulkCreate(body_item);

    body = JSON.parse(JSON.stringify(body));
    res.send({
      status: "Success",
      data: {
        ...body,
        item: [...fields_item],
      },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getSales = async (req, res) => {
  try {
    const data = await module_sales.findAll({
      include: [
        {
          model: sales_item,
          as: "item",
          attributes: {
            exclude: ["id", "id_sales", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: module_item,
              as: "item",
              attributes: {
                exclude: ["id", "id_item", "createdAt", "updatedAt"],
              },
            },
          ],
        },
        {
          model: module_customer,
          as: "name_customers",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["customer", "createdAt", "updatedAt"],
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

exports.getIdSales = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await module_sales.findOne({
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

exports.updateSales = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const body = {
      ...data,
    };

    await module_sales.update(body, {
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

exports.deleteSales = async (req, res) => {
  try {
    const { id } = req.params;

    const body = await module_sales.destroy({
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
