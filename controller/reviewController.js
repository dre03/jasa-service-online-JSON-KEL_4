const reviewController = {}
const { User, Review, Order, } = require("../models")

/*
    this is auto generate example, you can continue 

*/
reviewController.index = async(req,res) => {
    res.json({
        message : "Hello reviewController"
    })
}

reviewController.create = async (req, res) => {
    try {
        const {id_order,rating, comment} = req.body
        const id_user = req.id_user

        const fields = ["id_order","rating", "comment"];
        const filterField = fields.filter((f) => !req.body[f]);
        if (filterField.length) {
            console.log(filterField);
            return res.status(400).json({
                message: `Mohon Lengkapi Data ${filterField.join(', ')}`
            })
        }

        if (rating <= 0 || rating > 5) {
            return res.status(400).json({
                message: `Rating Hanya 1 sampai 5`
            })
        }
        
        // Validasi Id Order
        const getOrder = await Order.findOne({
            attributes: {
                include: ["id"]
            },
            where: {
                id: id_order
            }
        })
        if (!getOrder) {
            return res.status(404).json({
                message: `Data Id ${id_order} Tidak Ditemukan`
            })
        } 


        // // Validasi Id Item Device 
        // const getItemDevices = await Item_devices.findOne({
        //     where: {
        //         id: getOrder.id_items_device
        //     }
        // })
        // if (!getItemDevices) {
        //     return res.status(404).json({
        //         message: `Data ${getItemDevices.id} Tidak Ditemukan`
        //     })
        // }

        // // Validasi Id User
        const cekUser = await User.findOne({
            where: {
                id: id_user
            }
        })
        // if (getUser.name != nama) {
        //     return res.status(404).json({
        //         message: `Data ${nama} Tidak Sesuai dengan yang diOrder`
        //     })
        // }

        // Validasi Jika Orderan Sudah Direview
        const getReviewId = await Review.findAll({})
        if (id_order <= getReviewId.length) {
            const getReviewId = await Review.findOne({
                attributes: {
                    include: ["id"]
                },
                where: {
                    id_order: id_order
                }
            })
            if (id_order == getReviewId.id_order) {
                return res.status(404).json({
                    message: `Orderan Tersebut Sudah DiReview`
                })
            }     
        }
        
        const createReview = await Review.create({
            id_user: id_user,
            id_order: getOrder.id,
            rating: rating,
            comment: comment
        })
        return res.status(201).json({
          message: "Data Berhasil Dibuat",
          nama: cekUser.name,
          id_order: getOrder.id,
          rating: rating,
          comment: comment,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
}

reviewController.getAll = async (req, res) => {
    try {
        const getOrder = await User.findAll({
            include: [
                {
                    model: Order,
                    attributes: {
                        exclude: ["createdAt","updatedAt"]
                    }
                }
            ],
             attributes: {
                exclude: ["createdAt","id","id_role","username","password","passwordSalt","updatedAt"]
            }
        })
        
        return res.status(200).json({
            data: getOrder
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error
        })
    }
}

reviewController.getById = async (req, res) => {
    try {
        const id = req.params.id
        const getReviewById = await User.findOne({
            include: [
                {
                    model: Order,
                    attributes: {
                        exclude: ["createdAt","id", "id_items_device","updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt","id","id_role","username","password","passwordSalt","updatedAt"]
            },
            where: {
                id: id
            }
        })
        if (getReviewById === null) {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            })
        }
        res.status(200).json({
            data: getReviewById
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

module.exports = reviewController

