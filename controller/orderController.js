const { Order, Service, User } = require("../models");
const orderController = {};

/*
    this is auto generate example, you can continue 

*/
orderController.getAll = async (req, res) => {
  try {
    const id_user = req.id_user;
    const cekRole = await User.findOne({
      where: {
        id: id_user,
      },
    });
    if (cekRole.id_role === 1) {
      const getOrder = await Order.findAll({
        include: [
          {
            model: Service,
          },
        ],
        where: {
          id_user: id_user,
        },
      });

      return res.status(200).json({
        data: getOrder,
      });
    } else {
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
    }
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
    const id_role = req.id_role;
    const id_user = req.id_user;
    const is_admin = req.id_role == 2 ? true : false;
    const getByIdOrder = await Order.findOne({
      where: {
        id: id,
      },
    });
    if (!getByIdOrder) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }
    if (id_role != 2) {
      const cekUser = await User.findOne({
        where: {
          id: getByIdOrder.id_user,
          id_role: id_role,
        },
      });
    }
    const cekUser = await User.findOne({
      where: {
        id: getByIdOrder.id_user,
        id_role: id_role,
      },
    });

    if (cekUser?.id != id_user && is_admin == false) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      return res.status(200).json({
        data: getByIdOrder,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

orderController.create = async (req, res) => {
  try {
    const { order } = req.body;
    const id_user = req.id_user;

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
