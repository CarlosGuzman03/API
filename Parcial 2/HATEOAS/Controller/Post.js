const halson = require('halson');
const db = require('../Config/DB');

// Crear un nuevo usuario
const PostUsuario = (req, res) => {
    console.log("Body recibido:", req.body);
    const { nombre, correo, edad } = req.body;

    db.query('INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)', 
        [nombre, correo, edad], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            // Crear respuesta con Halson y agregar enlaces HATEOAS
            const nuevoUsuario = halson({
                id: result.insertId,
                nombre,
                correo,
                edad
            })
            .addLink('self', `http://localhost:3000/usuarios/get/${result.insertId}`) // Enlace al usuario creado
            .addLink('update', `http://localhost:3000/usuarios/update/${result.insertId}`) // Enlace para actualizar el usuario
            .addLink('delete', `http://localhost:3000/usuarios/delete/${result.insertId}`); // Enlace para eliminar el usuario

            res.status(201).json(nuevoUsuario); // Enviar la respuesta con HATEOAS
        }
    );
};

module.exports = PostUsuario;
