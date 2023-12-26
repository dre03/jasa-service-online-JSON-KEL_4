const { Payment, Order, Payment_history } = require("../models")
const dotenv = require("dotenv");
const uuid = require("uuid");
const midtransClient = require('midtrans-client');


dotenv.config()
const paymentController = {}

let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY
});

paymentController.charge = async (req, res) => {
    try {
        const id_user = req.id_user
        const getOrder = await Order.findOne({
            where: {
                id: req.body.id_order
            }
        })
        if (getOrder.id_user !== id_user) {
            return res.status(404).json({
                message: `Anda Tidak Bisa Membuat Pembayaran Milik Orang Lain`
            })
        }
        let reqToMidtrans = {}

        reqToMidtrans.payment_type = req.body.payment_type
        reqToMidtrans.bank_transfer = {
            bank: req.body.bank_transfer.bank
        }

        const generatedOrderId = uuid.v4();
        reqToMidtrans.transaction_details = { order_id: generatedOrderId }

        const pilihBank = req.body.bank_transfer.bank
        const vaProperty = pilihBank.toLowerCase() + '_va_number';

        reqToMidtrans.transaction_details.gross_amount = getOrder.total_price

        const chargeResponse = await coreApi.charge(reqToMidtrans);
        let dataOrder = {
            id_order: req.body.id_order,
            kode_payment: chargeResponse.order_id,
            status_code: chargeResponse.status_code,
            status_message: chargeResponse.status_message,
            transaction_id: chargeResponse.transaction_id,
            merchant_id: chargeResponse.merchant_id,
            currency: chargeResponse.currency,
            gross_amount: chargeResponse.gross_amount,
            payment_type: chargeResponse.payment_type,
            va_number: chargeResponse[vaProperty],
            transaction_time: chargeResponse.transaction_time,
            transaction_status: chargeResponse.transaction_status,
            fraud_status: chargeResponse.fraud_status,
            expiry_time: chargeResponse.expiry_time,
        };
        const createdPayment = await Payment.create(dataOrder);
        return res.status(201).json({
            message: "Berhasil Membuat Pembayaran",
            data: createdPayment
        });
    } catch (error) {
        return res.json({
            message: "Gagal:" + error.message
        });
    }
}

paymentController.notifikasi = async (req, res) => {
    try {
        const statusResponse = await coreApi.transaction.notification(req.body);
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;

        let updatePayment

        if (transactionStatus == "settlement") {
            updatePayment = await Payment.update({
                status_code: statusResponse.status_code,
                transaction_status: transactionStatus,
                settlement_time: statusResponse.settlement_time,
                signature_key: statusResponse.signature_key
            }, {
                where: { kode_payment: orderId }
            })

            const getUpdatePayment = await Payment.findOne({ where: { kode_payment: orderId } })
            const getOrder = await Order.findOne({
                attributes: {
                    include: ["id"]
                },
                where: {
                    id: getUpdatePayment.id_order
                }
            })
            const createPaymentHistory = await Payment_history.create({
                id_payment: getUpdatePayment.id,
                id_user: getOrder.id_user
            })
        }
        if (transactionStatus == "cancel" || transactionStatus == "expire") {
            updatePayment = await Payment.update({
                status_code: statusResponse.status_code,
                transaction_status: transactionStatus,
                settlement_time: statusResponse.settlement_time,
                signature_key: statusResponse.signature_key
            }, {
                where: { kode_payment: orderId }
            })
        }
        res.status(201).json({
            data: updatePayment
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}


module.exports = paymentController