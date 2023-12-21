const { User, Item_devices } = require("../models");
const fs = require("fs");

const itemDeviceController = {};

/*
    this is auto generate example, you can continue 

*/
itemDeviceController.create = async (req, res) => {
  const {
    id_user,
    name_device,
    brand_device,
    type_device,
    problem_description,
  } = req.body;
  try {
    const cekUser = await User.findOne({
      where: {
        id: id_user,
      },
    });
    if (!cekUser) {
      return res.status(404).json({
        message: `Data Id ${id_user} tidak ditemukan`,
      });
    }
    const fields = [
      "id_user",
      "name_device",
      "brand_device",
      "type_device",
      "problem_description",
    ];
    const filterFields = fields.filter((f) => !req.body[f]);
    if (filterFields.length) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: `Mohon lengkapi data ${filterFields.join(",")}`,
      });
    }
    // validasi photo
    const typeFile = ["image/jpeg", "image/png"];
    if (!req.file) {
      return res.status(400).json({
        massage: "Mohon lengkapi data photo",
      });
    }
    if (!typeFile.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: "Hanya dapat menerima file berupa jpeg/png",
      });
    }
    const createItemDevice = await Item_devices.create({
      id_user: id_user,
      name_device: name_device,
      brand_device: brand_device,
      type_device: type_device,
      problem_description: problem_description,
      photo_device: req.file.filename,
    });
    return res.status(201).json({
      message: "Data berhasil dibuat",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

itemDeviceController.getAll = async (req, res) => {
  try {
    const getItemDevices = await User.findAll({
      include: [
        {
          model: Item_devices
        }
      ]
    });
    return res.status(200).json({
      data: getItemDevices,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

itemDeviceController.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const getByItemDevice = await Item_devices.findOne({
      where: {
        id: id,
      },
    });
    if (!getByItemDevice) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      return res.status(200).json({
        data: getByItemDevice,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

itemDeviceController.update = async (req, res) => {
  const {
    id_user,
    name_device,
    brand_device,
    type_device,
    problem_description,
  } = req.body;
  const { id } = req.params;
  try {
    const cekItemDevice = await Item_devices.findOne({
      where: {
        id: id,
      },
    });
    if (!cekItemDevice) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }
    const fields = [
      "id_user",
      "name_device",
      "brand_device",
      "type_device",
      "problem_description",
    ];
    const filterFields = fields.filter((f) => !req.body[f]);
    if (filterFields.length) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: `Mohon lengkapi data ${filterFields.join(",")}`,
      });
    }

    // validasi photo
    const typeFile = ["image/jpeg", "image/png"];
    if (!req.file) {
      return res.status(400).json({
        massage: "Mohon lengkapi data photo",
      });
    }
    if (!typeFile.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: "Hanya dapat menerima file berupa jpeg/png",
      });
    }
    const updateItemDevice = await Item_devices.update(
      {
        id_user: id_user,
        name_device: name_device,
        brand_device: brand_device,
        type_device: type_device,
        problem_description: problem_description,
        photo_device: req.file.filename,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(201).json({
      message: "Data berhasil diperbarui",
    });
  } catch (error) {
    return res.status(201).json({
      message: "Gagal memperbarui data, Terjadi kesalahan pada server",
    });
  }
};

itemDeviceController.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const cekItemDevice = await Item_devices.findOne({
      where: {
        id: id,
      },
    });
    if (!cekItemDevice) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      const deleteItemDevice = await Item_devices.destroy({
        where: {
          id: id,
        },
      });
      return res.status(201).json({
        message: "Data berhasil dihapus",
      });
    }
  } catch (error) {
    return res.status(201).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = itemDeviceController;
