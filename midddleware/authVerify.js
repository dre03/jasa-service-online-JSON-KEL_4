const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authVerify = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer")[1].trim();
    if (!token) {
      return res.status(401).json({
        message: "Token tidak boleh kosong",
      });
    }
    const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
    if (verifyToken) {
      const { id_role, id } = verifyToken;
      req.id_role = id_role;
      req.id_user = id
      next();
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token sudah habis",
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Terjadi kesalahan pada server",
      });
    }
  }
};

const checkRole = (req, res, next, role) => {
  if (req.id_role == role) {
    next();
  } else {
    return res.status(404).json({
      message: "Anda tidak diizinkan mengakses halaman ini"
    });
  }
};

module.exports = { authVerify, checkRole };
