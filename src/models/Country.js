const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo


// Nombre *
// Imagen de la bandera *
// Continente *
// Capital *
// Subregión
// Área
// Población

// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull: false
      //propiedad ( validate:{len:[3]} ) = valida que la longitud del id sea de 3  
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    }
  });
};
