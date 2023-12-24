const { Payment, Payment_history } = require("../models");

const paymentHistoryController = {}

paymentHistoryController.getAll = async (req, res) => {
    try {
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