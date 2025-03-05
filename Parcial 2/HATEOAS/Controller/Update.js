const halson = require('halson');
const db = require('../Config/DB');

// Actualizar un usuario
const UpdateUsuario = (req, res) => {
    const { id } = req.params;  // ✅ Se obtiene el ID desde la URL
    const { nombre, correo, edad } = req.body;  // ✅ Datos del cuerpo

    if (!id) {
        return res.status(400).json({ error: "ID requerido en la URL" });
    }

    if (!nombre || !correo || !edad) {
        return res.status(400).json({ error: "Todos los campos (nombre, correo, edad) son requeridos" });
    }

    db.query(
        'UPDATE usuarios SET nombre = ?, correo = ?, edad = ? WHERE id = ?',
        [nombre, correo, edad, id],
        (err, result) => {
            if (err) {
                console.error("❌ Error actualizando usuario:", err);
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: "Usuario no encontrado" });
            }

            // Respuesta con Halson y enlaces HATEOAS
            const respuesta = halson({
                mensaje: `✅ Usuario con ID ${id} actualizado correctamente`
            })
            .addLink('self', `http://localhost:3000/usuarios/get/${id}`) // Enlace al usuario actualizado
            .addLink('update', `http://localhost:3000/usuarios/update/${id}`) // Enlace para actualizar el usuario
            .addLink('delete', `http://localhost:3000/usuarios/delete/${id}`) // Enlace para eliminar el usuario
            .addLink('create', 'http://localhost:3000/usuarios/create'); // Enlace para crear un nuevo usuario

            res.json(respuesta);
        }
    );
};

module.exports = UpdateUsuario;
