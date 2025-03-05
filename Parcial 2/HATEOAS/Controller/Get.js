const halson = require('halson');
const db = require('../Config/DB');

// Obtener todos los usuarios
const GetUsuario = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // Envolver cada usuario con Halson y agregar enlaces HATEOAS
        const usuariosConLinks = results.map(usuario => {
            return halson(usuario)
                .addLink('self', `http://localhost:3000/usuarios/get/${usuario.id}`) // Enlace a este usuario específico
                .addLink('update', `http://localhost:3000/usuarios/update/${usuario.id}`) // Enlace para actualizar este usuario
                .addLink('delete', `http://localhost:3000/usuarios/delete/${usuario.id}`); // Enlace para eliminar este usuario
        });

        res.json(usuariosConLinks);
    });
};

module.exports = GetUsuario;
