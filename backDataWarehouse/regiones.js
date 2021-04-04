require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodasLasRegiones() {

   let regiones = await sequelize.query('SELECT * FROM Regions', { type: sequelize.QueryTypes.SELECT})
   return regiones;
}

async function crearRegiones(data) {

   let regiones = await sequelize.query('INSERT INTO Regions (name) VALUES (?)',
   {replacements : data}
   )
 return regiones;
}

async function eliminarRegiones(data) {
   let regiones = await  sequelize.query('DELETE FROM Regions WHERE id_region = ?',
   { replacements: data}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}

async function actualizarRegiones(data, id) {
   const {name }=data
   let Regiones = await  sequelize.query('UPDATE Regions SET name= :name WHERE id= :id',
   { replacements: {id, name}}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}


module.exports = {obtenerTodasLasRegiones, crearRegiones, eliminarRegiones, actualizarRegiones}
