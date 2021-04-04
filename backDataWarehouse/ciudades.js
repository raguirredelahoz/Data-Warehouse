require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodasLasCiudades() {

   let ciudades = await sequelize.query('SELECT * FROM Cities', { type: sequelize.QueryTypes.SELECT})
   return ciudades;
}

async function crearCiudades(data) {

   let ciudades = await sequelize.query('INSERT INTO Cities (id_country, name) VALUES (?,?)',
   {replacements : data}
   )
 return ciudades;
}

async function eliminarCiudades(data) {
   let ciudades = await  sequelize.query('DELETE FROM Cities WHERE id = ?',
   { replacements: data}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}

async function actualizarCiudades(data, id) {
   const {country_id, name }=data
   let ciudades = await  sequelize.query('UPDATE Cities SET country_id= :country_id, name= :name WHERE id= :id',
   { replacements: {id, country_id, name}}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}


module.exports = {obtenerTodasLasCiudades, crearCiudades, eliminarCiudades, actualizarCiudades}
