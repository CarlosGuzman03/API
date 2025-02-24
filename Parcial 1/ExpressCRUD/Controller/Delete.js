const db = require('../Config/DB');

// Eliminar un usuario
// En Thunder Client poner la URL http://localhost:3000/usuarios/delete/ID y 
// seleccionar el método DELETE y esto borrará el usuario con el ID que hayamos introducido
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

        res.json({ mensaje: `✅ Usuario con ID ${id} eliminado correctamente` });
    });
};
module .exports = DeleteUsuario;