const { Op } = require("sequelize");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const fs = require("fs");
const userController = {};

dotenv.config();
/*
    this is auto generate example, you can continue 

*/
userController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
    });
    const compaePassword = await bcrypt.compare(password, findUser.password);
    if (compaePassword) {
      const payloadToken = {
        id: findUser.id,
        name: findUser.name,
        nik: findUser.nik,
        gender: findUser.gender,
        username: findUser.username,
        telephone: findUser.telephone,
        address: findUser.address,
        photo: findUser.photo,
      };
      const token = jwt.sign(payloadToken, process.env.PRIVATE_KEY, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      return res.status(200).json({
        data: {
          message: "Berhasil Login",
          tokon: token,
        },
      });
    } else {
      return res.status(401).json({
        data: {
          message: "Gagal Login, Username & Password salah",
        },
      });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(500).json({
        data: {
          message: "Gagal Login",
          tokon: error.message,
        },
      });
    } else {
      return res.status(401).json({
        data: {
          message: "Gagal Login",
          tokon: error.message,
        },
      });
    }
  }
};

userController.register = async (req, res) => {
  try {
    const { name, nik, gender, username, password, telephone, address } =
      req.body;

    const cekNik = await User.findOne({
      where: {
        nik: nik,
      },
    });

    if (cekNik) {
      return res.status(400).json({
        message: "NIK sudah terdaftar",
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
      message: error,
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
      message: error.message,
    });
  }
};

userController.update = async (req, res) => {
  const { name, nik, gender, username, password, telephone, address } =
    req.body;
  const { id } = req.params;

  try {
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
    const getUser = await User.findOne({
      where: {
        id: id,
      },
    });

    const CekRole = await User.findOne({
      where: {
        nik,
      },
    });
  } catch (error) {}
};

module.exports = userController;
