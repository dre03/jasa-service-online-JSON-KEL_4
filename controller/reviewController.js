const reviewController = {};
const { User, Review, Order } = require("../models");

/*
    this is auto generate example, you can continue 

*/
reviewController.create = async (req, res) => {
  try {
    const { id_order, review } = req.body;
    const id_user = req.id_user 

    const cekOrder = await Order.findOne({
      attributes: {
        include: ["id"],
      },
      where: {
        id: id_order,
      },
    });

    if (cekOrder.id_user !== id_user) {
      return res.status(404).json({
        message: `Anda tidak bisa Mereview Order milik orang lain`,
      });
    }

    // Validasi Jika Orderan Sudah Direview
    const getReviewId = await Review.findOne({
      attributes: {
        include: ["id"],
      },
      where: {
        id_order: id_order,
      },
    });
    if (getReviewId) {
      return res.status(200).json({
        message: `Orderan Tersebut Sudah DiReview`,
      });
    }

    const fields = ["id_order", "review"];
    const filterField = fields.filter((f) => !req.body[f]);
    if (filterField.length) {
      return res.status(400).json({
        message: `Mohon Lengkapi Data ${filterField.join(", ")}`,
      });
    }

    if (review.rating <= 0 || review.rating > 5) {
      return res.status(400).json({
        message: `Rating Hanya 1 sampai 5`,
      });
    }

    // Validasi Id Order
    const getOrder = await Order.findOne({
      attributes: {
        include: ["id"],
      },
      where: {
        id: id_order,
      },
    });
    if (!getOrder) {
      return res.status(404).json({
        message: `Data Id ${id_order} Tidak Ditemukan`,
      });
    }

    // Validasi Id User
    const getUser = await User.findOne({
      where: {
        id: id_user,
      },
    });

    const createReview = await Review.create({
      id_user: id_user,
      id_order: getOrder.id,
      rating: review.rating,
      comment: review.comment,
    });
    return res.status(201).json({
      message: "Data Berhasil Dibuat",
      nama: getUser.name,
      id_order: getOrder.id,
      review: review,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

reviewController.getAll = async (req, res) => {
  try {
    const id_user = req.id_user;
    const cekUser = await User.findOne({
      where: {
        id: id_user,
      },
    });

    if (cekUser.id_role == 1) {
      const getOrder = await Review.findAll({
        include: [
          {
            model: Order,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        where: {
          id_user: id_user,
        },
        attributes: {
          exclude: [
            "createdAt",
            "id",
            "id_role",
            "username",
            "password",
            "passwordSalt",
            "updatedAt",
          ],
        },
      });
      return res.status(200).json({
        data: getOrder,
      });
    } else {
      const getOrder = await Review.findAll({
        include: [
          {
            model: Order,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: [
            "createdAt",
            "id",
            "id_role",
            "username",
            "password",
            "passwordSalt",
            "updatedAt",
          ],
        },
      });

      return res.status(200).json({
        data: getOrder,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

reviewController.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const getReviewById = await User.findOne({
      include: [
        {
          model: Order,
          attributes: {
            exclude: ["createdAt", "id", "id_items_device", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "id",
          "id_role",
          "username",
          "password",
          "passwordSalt",
          "updatedAt",
        ],
      },
      where: {
        id: id,
      },
    });
    if (getReviewById === null) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }
    res.status(200).json({
      data: getReviewById,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = reviewController;
