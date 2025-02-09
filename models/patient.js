'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
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
  Patient.init({
    admin_id: DataTypes.INTEGER,
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    symptoms: DataTypes.STRING,
    medicine: DataTypes.STRING,
    injection_date: DataTypes.DATE,
    HPHT: DataTypes.DATE,
    pragnancy_age: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};