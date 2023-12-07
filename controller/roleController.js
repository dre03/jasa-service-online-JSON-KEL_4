const { Role } = require("../models");
const roleController = {};

/*
    this is auto generate example, you can continue 

*/
roleController.create = async (req, res) => {
  const { role } = req.body;
  try {
    const cekRole = await Role.findOne({
      where: {
        role,
      },
    });

    if (!role) {
      return res.status(400).json({
        message: "Gagal menambahkan role. Mohon isi role",
      });
    }
    if (cekRole) {
      return res.status(400).json({
        message: "Data sudah terdaftar",
      });
    } else {
      const createRole = await Role.create({
        role: role,
      });
      return res.status(201).json({
        message: "Data Berhasil ditambahkan",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

roleController.getAll = async (req, res) => {
  try {
    const getRole = await Role.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({
      data: getRole,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

roleController.gettById = async (req, res) => {
  const { id } = req.params;
  try {
    const getByIdRole = await Role.findOne({
      where: {
        id: id,
      },
    });
    if (!getByIdRole) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      return res.status(200).json({
        data: getByIdRole,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

roleController.update = async (req, res) => {
  const { role } = req.body;
  const id = req.params.id;
  try {
    const getRole = await Role.findOne({
      where: {
        id: id,
      },
    });

    const cekRole = await Role.findOne({
      where: {
        role,
      },
    });

    if (!role) {
      return res.status(400).json({
        message: "Gagal memperbarui data. Mohon isi role",
      });
    }
    if (cekRole) {
      return res.status(400).json({
        message: "Data sudah terdaftar",
      });
    }
    if (!getRole) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    const updateRole = await Role.update(
      {
        role: role,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json({
      message: "Data berhasil diubah",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

roleController.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const cekRole = await Role.findOne({
      where: {
        id: id,
      },
    });
    if (!cekRole) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      const deleteRole = await Role.destroy({
        where: {
          id: id,
        },
      });
      return res.status(404).json({
        message: "Data berhasil dihapus",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

module.exports = roleController;
