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
    async editPatiens(payload,id){
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
            const patiens = await Pasien.update(
                {
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
                },
                {
                    where: { id: id },
                }
            );
            if (patiens[0] === 0) {
                throw new Error("Patiens Not found");
            }
            return patiens
        } catch (error) {
            throw new Error("Data tidak lengkap");
        }
    }
    async deletePatiens(payload){
        
    }
}


module.exports = PatiensService;