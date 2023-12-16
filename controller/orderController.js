const { Order, Item_devices, Service } = require("../models");
const orderController = {};

/*
    this is auto generate example, you can continue 

*/
orderController.getAll = async (req, res) => {
  try {
    const getOrder = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({
      data: getOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

orderController.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const getByIdOrder = await Order.findOne({
        where: {
            id: id,
        }
    })
    if (!getByIdOrder) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      return res.status(200).json({
        data: getByIdOrder,
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

orderController.create = async (req, res) => {
  try {
    const { id_items_device, id_service, qty } = req.body;
    const cekItemDevice = await Item_devices.findOne({
      where: {
        id: id_items_device,
      },
    });
    const cekService = await Service.findOne({
      where: {
        id: id_service,
      },
    });
    if (!cekItemDevice) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }
    if (!cekService) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    const createOrder = await Order.create({
      id_items_device: id_items_device,
      id_service: id_service,
      order_date: new Date(),
      qty: qty,
    });
    return res.status(201).json({
      message: "Data Berhasil dibuat",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = orderController;
