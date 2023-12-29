const { User } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const fs = require("fs");
const userController = {};

dotenv.config();

userController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({
      where: { username },
    });
    if (!username || !password) {
      return res.status(400).json({
        message: "Username dan Paswword tidak boleh kosong",
      });
    }
    if (!findUser) {
      return res.status(401).json({
        message: "Gagal Login, Password dan Username salah",
      });
    }
    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: "Gagal Login, Password dan Username salah",
      });
    }
    const payloadToken = {
      id: findUser.id,
      name: findUser.name,
      nik: findUser.nik,
      gender: findUser.gender,
      username: findUser.username,
      telephone: findUser.telephone,
      address: findUser.address,
      photo: findUser.photo,
      id_role: findUser.id_role,
    };
    const token = jwt.sign(payloadToken, process.env.PRIVATE_KEY, {
      algorithm: "HS256",
      expiresIn: "2h",
    });
    return res.status(200).json({
      data: {
        message: "Berhasil Login",
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      data: {
        message: "Gagal Login, Terjadi kesalahan pada server",
      },
    });
  }
};

userController.register = async (req, res) => {
  try {
    const { name, nik, gender, username, password, telephone, address } =
      req.body;
    const cekNik = await User.findOne({ where: { nik: nik } });

    if (cekNik) {
      return res.status(400).json({
        message: "NIK sudah terdaftar",
      });
    }
    const fields = [
      "name",
      "nik",
      "gender",
      "username",
      "password",
      "telephone",
      "address",
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

    const saltRounds = 10;
    const generateSalt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, generateSalt);
    const createUser = await User.create({
      name: name,
      nik: nik,
      gender: gender,
      username: username,
      password: hashPassword,
      passwordSalt: generateSalt,
      telephone: telephone,
      address: address,
      photo: req.file.filename,
      id_role: (id_role = 1),
    });
    return res.status(201).json({
      message: "User berhasil dibuat",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

userController.getAll = async (req, res) => {
  try {
    const getUser = await User.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({
      data: getUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

userController.update = async (req, res) => {
  const { name, nik, gender, username, password, telephone, address } =
    req.body;
  const id_user = req.id_user;
  try {
    const fields = [
      "name",
      "gender",
      "username",
      "password",
      "telephone",
      "address",
    ];
    const cekUser = await User.findOne({ where: { id: id_user } });
    const filterFields = fields.filter((f) => !req.body[f]);
    if (filterFields.length) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: `Mohon lengkapi data ${filterFields.join(",")}`,
      });
    }

    if (!cekUser) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }
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

    const saltRounds = 10;
    const generateSalt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, generateSalt);
    const updateUser = await User.update(
      {
        name: name,
        gender: gender,
        username: username,
        password: hashPassword,
        passwordSalt: generateSalt,
        telephone: telephone,
        address: address,
        photo: req.file.filename,
      },
      {
        where: {
          id: id_user,
        },
      }
    );
    return res.status(201).json({
      message: "Profile berhasil diupdate",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Gagal memperbarui data, Terjadi kesalahan pada server",
    });
  }
};

userController.delete = async (req, res) => {
  const id_user = req.id_user;
  try {
    const cekUser = await User.findOne({ where: { id: id_user } });
    if (!cekUser) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      const deleteUser = await User.destroy({
        where: {
          id: id_user,
        },
      });
      return res.status(201).json({
        message: "User berhasil dihapus",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

userController.logout = async (req, res) => {
  try {
    const id_user = req.id_user;
    const findUser = await User.findOne({
      where: { id: id_user },
    });
    const payloadToken = {
      id: findUser.id,
      name: findUser.name,
      nik: findUser.nik,
      gender: findUser.gender,
      username: findUser.username,
      telephone: findUser.telephone,
      address: findUser.address,
      photo: findUser.photo,
      id_role: findUser.id_role,
    };
    const token = jwt.sign(payloadToken, process.env.PRIVATE_KEY, {
      algorithm: "HS256",
      expiresIn: 1,
    });
    return res.status(200).json({
      message: "Logout berhasil",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = userController;
