'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Admin,{
        foreignKey:`admin_id`,
        onDelate: "CASCADE"
      })
    }
  }
  Pasien.init({
    admin_id: DataTypes.INTEGER,
    no_KTP: DataTypes.STRING,
    name: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    alamat: DataTypes.STRING,
    phone: DataTypes.STRING,
    keluhan: DataTypes.STRING,
    obat: DataTypes.STRING,
    date_suntik: DataTypes.DATE,
    HPHT: DataTypes.DATE,
    hasil_periksa_hamil: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pasien',
  });
  return Pasien;
};