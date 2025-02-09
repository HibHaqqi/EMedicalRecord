const  {Pasien} = require('../models')


class PatiensService{
    async addPatiens(payload){
        const {
        admin_id,
        no_KTP,
        name,
        umur,
        alamat,
        phone,
        keluhan,
        obat,
        date_suntik,
        HPHT,
        hasil_periksa_hamil,
        note,
        } = payload
        try {
            const addPatiens = await Pasien.create({
                admin_id,
                no_KTP,
                name,
                umur,
                alamat,
                phone,
                keluhan,
                obat,
                date_suntik,
                HPHT,
                hasil_periksa_hamil,
                note,
            });
            return  addPatiens
        } catch (error) {
            console.error("Failed to add Pasiens:", error);
        }
    }
}


module.exports = PatiensService;