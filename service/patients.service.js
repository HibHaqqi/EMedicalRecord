const  {Patient} = require('../models')


class PatientService{
    async addPatient(payload){
        const {
        admin_id,
        nik,
        name,
        age,
        address,
        phone,
        symtoms,
        medicine,
        injection_date,
        HPHT,
        pragnancy_age,
        note,
        } = payload
        try {
            const addPatiens = await Patient.create({
                admin_id,
                nik,
                name,
                age,
                address,
                phone,
                symtoms,
                medicine,
                injection_date,
                HPHT,
                pragnancy_age,
                note,
            });
            return  addPatiens
        } catch (error) {
            console.error("Failed to add Pasients:", error);
        }
    }
    async editPatient(payload,id){
        const {
            admin_id,
            nik,
            name,
            age,
            address,
            phone,
            symptoms,
            medicine,
            injection_date,
            HPHT,
            pragnancy_age,
            note,
            } = payload
        try {
            const patiens = await Patient.update(
                {
                    admin_id,
                    nik,
                    name,
                    age,
                    address,
                    phone,
                    symptoms,
                    medicine,
                    injection_date,
                    HPHT,
                    pragnancy_age,
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
    async deletePatient(payload){
        const  id  = payload;
    console.log(id);
    try {
      
      const deletedPatient = await Patient.destroy({
        where: { id: id }, // Match by the 'id' field
      });
      if (deletedPatient === 0) {
        throw new Error("Record not found");
      }
      return deletedPatient;
    } catch (error) {
      throw new Error("Data tidak berhasil dihapus");
    }
    }
}


module.exports = PatientService;