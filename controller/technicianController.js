const { Technician } = require("../models");
const fs = require('fs');

const technicianController = {}

/*
    this is auto generate example, you can continue 

*/
technicianController.index = async (req, res) => {
    res.json({
        message: "Hello technicianController"
    })
}

technicianController.getAll = async (req, res) => {
    try {
        const getTechnical = await Technician.findAll()
        return res.status(200).json({
            data: getTechnical
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

technicianController.getById = async (req, res) => {
    try {
        const id = req.params.id
        const getTechnicalById = await Technician.findOne({
            where: {
                id: id
            }
        })
        if (getTechnicalById === null) {
            return res.status(404).json({
                message: "Data Tidak Ditemukan"
            })
        }
        res.status(200).json({
            data: getTechnicalById
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

technicianController.create = async (req, res) => {
    try {
        const {
            name_technician,
            gender_technician,
            telephone,
            specialization,
            nik_technician,
            status_technician
        } = req.body
        // Validasi photo technician
        const typeFile = ['image/jpeg', 'image/png'];
        if (!req.file) {
            return res.status(400).json({
                message: "Mohon Lengkapi Data Photo Technician"
            })
        }
        if (!typeFile.includes(req.file.mimetype)) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({
                message: "Hanya Dapat Menerima File Dengan Type JPEG atau PNG"
            })
        }
        // Validasi data yang belum dilengkapi
        const fields = ['name_technician', 'gender_technician', 'telephone', 'specialization', 'nik_technician', 'status_technician'];
        const filterFields = fields.filter((f) => !req.body[f]);
        if (filterFields.length) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                message: `Mohon Lengkapi Data ${filterFields.join(', ')}`
            })
        }
        // Validasi data yang mengandung huruf
        const fieldsHuruf = ['name_technician', 'gender_technician', 'specialization', 'status_technician'];
        const validasiHuruf = /^[a-zA-Z ]+$/;
        for (const field of fieldsHuruf) {
            if (!validasiHuruf.test(req.body[field])) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({
                    message: `Data ${field} Harus Mengandung Huruf`
                })
            }
        }
        // Validasi data yang mengandung angka
        const fieldsAngka = ['telephone', 'nik_technician'];
        const validasiAngka = /^[0-9]+$/;
        for (const field of fieldsAngka) {
            if (!validasiAngka.test(req.body[field])) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({
                    message: `Data ${field} Harus Mengandung Angka`
                })
            }
        }

        const createTechnician = await Technician.create({
            name_technician: name_technician,
            gender_technician: gender_technician,
            telephone: telephone,
            specialization: specialization,
            nik_technician: nik_technician,
            photo_technician: req.file.filename,
            status_technician: status_technician
        })
        return res.status(201).json({
            message: "Data Technician Berhasil Dibuat"
        })

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

technicianController.update = async (req, res) => {
    try {
        const id = req.params.id
        const {
            name_technician,
            gender_technician,
            telephone,
            specialization,
            nik_technician,
            status_technician
        } = req.body
        // Validasi photo technician
        const typeFile = ['image/jpeg', 'image/png'];
        if (!req.file) {
            return res.status(400).json({
                message: "Mohon Lengkapi Data photo_technician"
            })
        }
        if (!typeFile.includes(req.file.mimetype)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                message: "Hanya Dapat Menerima File Dengan Type JPEG atau PNG"
            })
        }
        // Validasi data yang belum dilengkapi
        const fields = ['name_technician', 'gender_technician', 'telephone', 'specialization', 'nik_technician', 'status_technician'];
        const filterFields = fields.filter((f) => !req.body[f]);
        if (filterFields.length) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                message: `Mohon Lengkapi Data ${filterFields.join(', ')}`
            })
        }
        // Validasi data yang mengandung huruf
        const fieldsHuruf = ['name_technician', 'gender_technician', 'specialization', 'status_technician'];
        const validasiHuruf = /^[a-zA-Z ]+$/;
        for (const field of fieldsHuruf) {
            if (!validasiHuruf.test(req.body[field])) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({
                    message: `Data ${field} Harus Mengandung Huruf`
                })
            }
        }
        // Validasi data yang mengandung angka
        const fieldsAngka = ['telephone', 'nik_technician'];
        const validasiAngka = /^[0-9]+$/;
        for (const field of fieldsAngka) {
            if (!validasiAngka.test(req.body[field])) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({
                    message: `Data ${field} Harus Mengandung Angka`
                })
            }
        }

        const getTechnicalById = await Technician.findOne({
            where: {
                id: id
            }
        })
        if (getTechnicalById === null) {
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                message: "Data Tidak Ditemukan"
            })
        }
        const createTechnician = await Technician.update({
            name_technician: name_technician,
            gender_technician: gender_technician,
            telephone: telephone,
            specialization: specialization,
            nik_technician: nik_technician,
            photo_technician: req.file.filename,
            status_technician: status_technician
        }, {
            where: {
                id: id
            }
        })
        return res.status(201).json({
            message: "Data Technician Berhasil Diupdate"
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

technicianController.delete = async (req, res) => {
    try {
        const id = req.params.id
        const deleteTechnician = await Technician.destroy({
            where: {
                id: id
            }
        })
        return res.status(201).json({
            message: "Data Berhasil Dihapus"
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}



module.exports = technicianController