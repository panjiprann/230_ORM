module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define("Komik", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tittle: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    author: {
        type: DataTypes.STRING,
    },
 });

  return Komik;
}