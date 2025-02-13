const  {Patient} = require('../models')
const { Op, fn, col ,literal} = require('sequelize');
const Sequelize = require('sequelize');


class PatientService{
    async addPatient(admin_id,payload){
        
        const {
        
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
            const addPatiens = await Patient.create({
                admin_id,
                nik,
                name,
                age,
                address,
                phone,
                symptoms,
                medicine,
                injection_date: injection_date || null,
                HPHT: HPHT || null,
                pragnancy_age: pragnancy_age || null,
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
                    injection_date: injection_date || null,
                    HPHT: HPHT || null,
                    pragnancy_age: pragnancy_age || null,
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

    async getPatientById(id) {
        try {
            const patient = await Patient.findByPk(id);
            if (!patient) {
                throw new Error("Patient not found");
            }
            return patient;
        } catch (error) {
            throw new Error(error.message); // Re-throw the original error message
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
    async getRecord(payload,userId){
        const patients = await Patient.findAll({
            where: { admin_id: userId } // Filter by admin_id
        });
        const visitCounts = {};
    
        // Count visits based on NIK
        patients.forEach(patient => {
            if (visitCounts[patient.nik]) {
                visitCounts[patient.nik].count += 1; // Increment count if NIK already exists
            } else {
                visitCounts[patient.nik] = {
                    name: patient.name,
                    age: patient.age,
                    address: patient.address,
                    count: 1 // Initialize count
                };
            }
        });
    
        // Convert visitCounts object to an array
        const result = Object.keys(visitCounts).map(nik => ({
            nik,
            ...visitCounts[nik]
        }));
    
        return result; // Return the aggregated result
    }
    async getRecordVisit(payload,userId){
        // Fetch all patients with the specified NIK
    const patients = await Patient.findAll({
        where: {
            admin_id: userId, // Filter by admin_id
            nik: payload // Filter by NIK
        } 
    });

    // Check if any records were found
    if (patients.length === 0) {
        return {
            status: "error",
            message: "No records found for the provided NIK."
        };
    }

    return {
        status: "success",
        data: patients
    };
    }


    async countTotalVisitDay(userId,day, month, year) {
        try {
            const visitCount = await Patient.count({
                where: {
                    admin_id: userId, 
                    [Op.and]: [
                        literal(`EXTRACT(DAY FROM "createdAt") = ${day}`),
                        literal(`EXTRACT(MONTH FROM "createdAt") = ${month}`),
                        literal(`EXTRACT(YEAR FROM "createdAt") = ${year}`)
                    ],
                },
            });
            return visitCount;
        } catch (error) {
            console.error("Error counting visits in service:", error);
            throw error;
        }
    }
    async countTotalVisitMonthly(userId,month, year) {
        try {
            const visitCount = await Patient.count({
                where: {
                    admin_id: userId, // Filter by user ID
                    [Op.and]: [
                        Sequelize.where(fn("EXTRACT", literal("MONTH FROM \"Patient\".\"createdAt\"")), month),
                        Sequelize.where(fn("EXTRACT", literal("YEAR FROM \"Patient\".\"createdAt\"")), year),
                    ],
                    createdAt: {
                        [Op.between]: [
                            new Date(year, month - 1, 1), // Start of the month
                            new Date(), // Current date and time
                        ],
                    },
                },
            });
    
           return visitCount;
        } catch (error) {
            console.error("Error counting visits in service:", error);
            throw error;
        }
    }



}
module.exports = PatientService;