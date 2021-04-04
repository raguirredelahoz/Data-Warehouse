require('dotenv').config()
const Sequelize = require('sequelize');
const path = process.env.DB_PATH;
const sequelize = new Sequelize(path);

async function obtenerTodosLosPaises() {

   let paises = await sequelize.query('SELECT * FROM Contries', { type: sequelize.QueryTypes.SELECT})
   return paises;
}

async function crearPaises(data) {

   let paises = await sequelize.query('INSERT INTO Contries (id_region, name) VALUES (?,?)',
   {replacements : data}
   )
 return paises;
}

async function eliminarPaises(data) {
   let paises = await  sequelize.query('DELETE FROM Contries WHERE id = ?',
   { replacements: data}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}

async function actualizarPaises(data, id) {
   const {region_id, name }=data
   let paises = await  sequelize.query('UPDATE Contries SET region_id= :region_id, name= :name WHERE id= :id',
   { replacements: {id, region_id, name}}
   ).then(function(cambios) {
      console.log(cambios)
  }) 
}


module.exports = {obtenerTodosLosPaises, crearPaises, eliminarPaises, actualizarPaises}
