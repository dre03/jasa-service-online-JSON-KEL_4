const { Order, Service, User } = require("../models");
const orderController = {};

/*
    this is auto generate example, you can continue 

*/
orderController.getAll = async (req, res) => {
  try {
    const getOrder = await Order.findAll({
      include: [
        {
          model: Service,
        },
      ],
    });

    return res.status(200).json({
      data: getOrder,
    });
  } catch (error) {
    console.log(error);
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
      },
    });
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
    const { id_user, order } = req.body;

    const cekUser = await User.findOne({
      where: {
        id: id_user,
      },
    });
    const cekService = await Service.findOne({
      where: {
        name_service: order.service,
      },
    });

    if (!cekUser) {
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
      id_user: id_user,
      id_service: cekService.id,
      order_date: new Date(),
      qty: order.qty,
      total_price: order.qty * cekService.price_service,
    });
    return res.status(201).json({
      message: "Data Berhasil dibuat",
      nama: cekUser.name,
      total_price: order.qty * cekService.price_service,
      order: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = orderController;
