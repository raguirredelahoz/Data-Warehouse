
require('dotenv').config()
const { request, response } = require('express');
const express = require('express');
const contacto = require('./contactos');
const usuarios = require('./usuarios');
const regiones = require('./regiones');
const paises = require('./paises');
const ciudades = require('./ciudades');
const companias = require('./companias');
const login = require ('./login');
const cors = require('cors');

const server = express();

server.use(cors());

server.use(express.json({limit: '100kb' }));

server.use(express.urlencoded({ extended: true }));

// Endpoint de Usuarios //
/*server.get('/usuarios', (req, res) => {
    usuarios.obtenerTodosLosUsuarios().then(usuario => res.status(200).json({usuario}))
})*/

server.get('/usuarios', (req, res) => {
    console.log(req.query.offset, req.query.limit, req.query);
    let params;
    if (req.query.offset===undefined){
        params={
         search:'',
         offset:0,
         limit:10
        }
    }else{
      params=req.query
    }    
    usuarios.obtenerTodosLosUsuarios(params).then(usuario => res.status(200).json(usuario))
})

server.post('/usuarios', (req, res) => {
    let nuevoUsuario= Object.values(req.body);
    const result = usuarios.crearUsuarios(nuevoUsuario);
    result.then(usuario => {
    res.status(201).json('Usuario creado correctamente')} )
    .catch (error => {
        res.status(409).json({Message:error.parent.sqlMessage})
    })
});

server.delete('/usuarios', (req, res) => {
    let eliminar= Object.values(req.body);
     usuarios.eliminarUsuarios(eliminar).then(usuario => {
     res.status(200).json('Usuario eliminado correctamente')} )
});

server.put('/usuarios/:email', (req, res) => {
    usuarios.actualizarUsuarios(req.body, req.params.email).then(usuario => {
   res.status(200).json('Usuario actualizado correctamente')} )
});

// Endpoint de Regiones //
server.get('/regiones', async (req, res) => {
    //regiones.obtenerTodasLasRegiones().then(region => res.status(200).json({region}))
    let regions = await regiones.obtenerTodasLasRegiones();
    return res.status(200).json({regions})
})

server.post('/regiones', (req, res) => {
    let nuevaregion= Object.values(req.body);
    const result = regiones.crearRegiones(nuevaregion);
    result.then(region => {
    res.status(201).json('Region creada correctamente')} )
    .catch (error => {
        res.status(409).json({Message:error.parent.sqlMessage})
    })
});

server.delete('/regiones', (req, res) => {
    let eliminar= Object.values(req.body);
     regiones.eliminarRegiones(eliminar).then(usuario => {
     res.status(201).json('Region eliminada correctamente')} )
});

server.put('/regiones/:id', (req, res) => {
    regiones.actualizarRegiones(req.body, req.params.id).then(region => {
   res.status(201).json('Region actualizada correctamente')} )
});

// Endpoint de Paises //
server.get('/paises', async(req, res) => {
    //paises.obtenerTodosLosPaises().then(pais => res.status(200).json({pais}))
    let countries = await paises.obtenerTodosLosPaises();
    return res.status(200).json({countries})
})

server.post('/paises', (req, res) => {
    let nuevopais= Object.values(req.body);
    const result = paises.crearPaises(nuevopais);
    result.then(pais => {
    res.status(201).json('Pais creado correctamente')} )
    .catch (error => {
        res.status(409).json({Message:error.parent.sqlMessage})
    })
});

server.delete('/paises', (req, res) => {
    let eliminar= Object.values(req.body);
     paises.eliminarPaises(eliminar).then(pais => {
     res.status(201).json('Pais eliminado correctamente')} )
});

server.put('/paises/:id', (req, res) => {
    paises.actualizarPaises(req.body, req.params.id).then(pais => {
   res.status(201).json('Pais actualizada correctamente')} )
});

// Endpoint de Ciudades //
server.get('/ciudades', async (req, res) => {
    let city = await ciudades.obtenerTodasLasCiudades();
    //ciudades.obtenerTodasLasCiudades().then(ciudad => res.status(200).json({resultado: ciudad}))
    //console.log(city);
    //res.status(200).json({city})
    return res.status(200).json({city})
})

server.post('/ciudades', (req, res) => {
    let nuevaciudad= Object.values(req.body);
    const result = ciudades.crearCiudades(nuevaciudad);
    result.then(ciudad => {
    res.status(201).json('Ciudad creada correctamente')} )
    .catch (error => {
        res.status(409).json({Message:error.parent.sqlMessage})
    })
});

server.delete('/ciudades', (req, res) => {
    let eliminar= Object.values(req.body);
     ciudades.eliminarCiudades(eliminar).then(ciudad => {
     res.status(201).json('Ciudad eliminada correctamente')} )
});

server.put('/ciudades/:id', (req, res) => {
    ciudades.actualizarCiudades(req.body, req.params.id).then(ciudad => {
   res.status(201).json('Ciudad actualizada correctamente')} )
});

// Endpoint de Compañias //
server.get('/companias', (req, res) => {
    console.log(req.query.offset, req.query.limit, req.query);
    let params;
    if (req.query.offset===undefined){
        params={
         search:'',
         offset:0,
         limit:10
        }
    }else{
      params=req.query
    }    
    companias.obtenerTodasLasCompanias(params).then(compania => res.status(200).json(compania))
})

server.post('/companias', (req, res) => {
    let nuevacompania= Object.values(req.body);
    const result = companias.crearCompanias(nuevacompania);
    result.then(compania => {
    res.status(201).json('Compañia creada correctamente')} )
    .catch (error => {
        res.status(409).json({Message:error.parent.sqlMessage})
    })
});

server.delete('/companias', (req, res) => {
    let eliminar = Object.values(req.body);
    companias.eliminarCompanias(eliminar).then(compania => {
            res.status(200).json('Compañia eliminada correctamente')
        })
        .catch(error => {
            res.status(409).json({
                Message: error.parent.sqlMessage
            })
        })
});

server.put('/companias/:id', (req, res) => {
    companias.actualizarCompanias(req.body, req.params.id).then(compania => {
        res.status(200).json('Compañia actualizada correctamente')
    })
    .catch(error => {
        console.log(error)
        res.status(409).json({
            Message: error.parent.sqlMessage
        })
    })
});


//Servidor//
server.listen(3000, () => {
    console.log('Servidor en ejecución...');
});

//middleware Error interno//
server.use((err, req, res, next) => {
    if (err) {
        res.status(500).send({error: `Error interno ${err}`});
    }
    next();
})

// Middleware Endpoint no disponible//
server.use(function (req, res, next) {
    res.status(404).send({error: "Endpoint no disponoble"})
})