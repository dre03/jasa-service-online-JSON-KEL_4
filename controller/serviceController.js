const { Technician, Service } = require("../models")


const serviceController = {}

/*
    this is auto generate example, you can continue 

*/
serviceController.index = async (req, res) => {
    res.json({
        message: "Hello serviceController"
    })
}

serviceController.getAll = async (req, res) => {
    try {
        const getService = await Service.findAll({
            include: [
                {
                    model: Technician
                }
            ]
        })
        return res.status(200).json({
            data: getService
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error
        })
    }
}

serviceController.getById = async (req, res) => {
    try {
        const { id } = req.params
        const getServiceById = await Service.findOne({
            include: [
                {
                    model: Technician
                }
            ],
            where: {
                id: id
            }
        })
        if (!getServiceById) {
            return res.status(404).json({
                message: "Data Tidak Ditemukan"
            })
        } else {
            return res.status(200).json({
                data: getServiceById
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

serviceController.create = async (req, res) => {
    try {
        const {
            name_technician,
            name_service,
            price_service,
            description_service,
            status_service } = req.body

        const fields = ["name_technician","name_service", "price_service", "description_service", "status_service"];
        const filterField = fields.filter((f) => !req.body[f]);
        if (filterField.length) {
            return res.status(400).json({
                message: `Mohon Lengkapi Data ${filterField.join(', ')}`
            })
        }
        const fieldsHuruf = ["name_service", "description_service", "status_service"];
        const validasiHuruf = /^[a-zA-Z ]+$/;
        for (const field of fieldsHuruf) {
            if (!validasiHuruf.test(req.body[field])) {
                return res.status(400).json({
                    message: `Data ${field} Harus Mengandung Huruf`
                })
            }
        }
        const validasiAngka = /^[0-9]+$/;
        if (!validasiAngka.test(price_service)) {
            return res.status(400).json({
                message: "Data price_service Harus Mengandung Angka"
            })
        }

        const getTechnical = await Technician.findOne({
            where: {
                name_technician: name_technician
            }
        })
        if (!getTechnical) {
            return res.status(404).json({
                message: `Data Nama ${name_technician} Tidak Ditemukan`
            })
        }

        const createService = await Service.create({
            id_technician: getTechnical.id,
            name_service: name_service,
            price_service: price_service,
            description_service: description_service,
            status_service: status_service
        })
        return res.status(201).json({
            message: "Data Berhasil Dibuat"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
}

serviceController.update = async (req, res) => {
    try {
        const { id } = req.params
        const {
            name_technician,
            name_service,
            price_service,
            description_service,
            status_service } = req.body

        const fields = ["name_technician","name_service", "price_service", "description_service", "status_service"];
        const filterField = fields.filter((f) => !req.body[f]);
        if (filterField.length) {
            return res.status(400).json({
                message: `Mohon Lengkapi Data ${filterField.join(', ')}`
            })
        }
        const fieldsHuruf = ["name_service", "description_service", "status_service"];
        const validasiHuruf = /^[a-zA-Z ]+$/;
        for (const field of fieldsHuruf) {
            if (!validasiHuruf.test(req.body[field])) {
                return res.status(400).json({
                    message: `Data ${field} Harus Mengandung Huruf`
                })
            }
        }
        const validasiAngka = /^[0-9]+$/;
        if (!validasiAngka.test(price_service)) {
            return res.status(400).json({
                message: "Data price_service Harus Mengandung Angka"
            })
        }

        const getServiceId = await Service.findOne({
            where: {
                id: id
            }
        })
        if (!getServiceId) {
            return res.status(404).json({
                message: `Data Service Yang Ingin Diupdate Tidak Ditemukan`
            })
        }
        const getTechnical = await Technician.findOne({
            where: {
                name_technician: name_technician
            }
        })
        if (!getTechnical) {
            return res.status(404).json({
                message: `Data Nama ${name_technician} Tidak Ditemukan`
            })
        }
        const updateService = await Service.update({
            id_technician: getTechnical.id,
            name_service: name_service,
            price_service: price_service,
            description_service: description_service,
            status_service: status_service
        }, {
            where: {
                id: id
            }
        })
        return res.status(201).json({
            message: "Data Berhasil Dirubah"
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

serviceController.delete = async (req, res) => {
    try {
        const { id } = req.params
        const deleteService = await Service.destroy({
            where: {
                id: id
            }
        })
        if (!deleteService) {
            return res.status(404).json({
                message: "Data Tidak Ditemukan"
            })
        } else {
            return res.status(201).json({
                message: "Data Berhasil Dihapus"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}





module.exports = serviceController