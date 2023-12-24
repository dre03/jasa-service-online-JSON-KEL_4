const { Payment, Payment_history, User } = require("../models");

const paymentHistoryController = {}

paymentHistoryController.getAll = async (req, res) => {
    try {
        const id_user = req.id_user;
        const cekUser = await User.findOne({
            where: {
                id: id_user
            }
        })
        if (cekUser.id_role == 1) {
            const getPaymentHistory = await Payment_history.findAll({
              include: [
                {
                  model: Payment,
                },
              ],
              where: {
                id_user: id_user
              }
            });
            return res.status(200).json({
              data: getPaymentHistory,
            });
        }
        const getPaymentHistory = await Payment_history.findAll({
            include: [
                {
                    model: Payment
                }
            ]
        })
        return res.status(200).json({
            data: getPaymentHistory
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = paymentHistoryController