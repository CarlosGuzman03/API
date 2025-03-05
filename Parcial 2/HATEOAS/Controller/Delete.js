const halson = require('halson');
const db = require('../Config/DB');

// Eliminar un usuario
const DeleteUsuario = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID requerido en la URL" });
    }

    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("❌ Error eliminando usuario:", err);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Respuesta con enlace HATEOAS
        const response = halson({ mensaje: `✅ Usuario con ID ${id} eliminado correctamente` })
            .addLink('self', 'http://localhost:3000/usuarios/get') // Enlace para ver todos los usuarios
            .addLink('create', 'http://localhost:3000/usuarios/create'); // Enlace para crear un nuevo usuario

        res.json(response);
    });
};

module.exports = DeleteUsuario;
