const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo



// [ ] Actividad Turística con las siguientes propiedades:
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)


// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
    },
    duration: {
      type: DataTypes.ENUM('30', '60', '90', '120', '150', '180', '210', '240')
    },
    season: {
      type: DataTypes.ENUM(
        'SUMMER', 'FALL', 'WINTER', 'SPRING')
    }
  });
};
