const db = require('../Config/DB');

// Actualizar un usuario
// Aquí basta con en Thunder Client poner la URL http://localhost:3000/usuarios/update y 
// en el "NumeroDeID" de la URL colocaremos el del usuario que queremos modificar, después 
// seleccionaremos el método PUT y en la pestaña de Body y le mandaremos la modificación 
// del usuario en formato JSON como el siguiente:
// {
//     "nombre": "Carlos Guzmán",
//     "correo": "carlosg@email.com",
//     "edad": 26
// }
// y esto hará una modificación en la base de datos del usuario con el ID que hayamos introducido en 
// la URL y con los datos que hayamos introducido en el Body
// const db = require('../Config/DB');

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

            res.json({ mensaje: `✅ Usuario con ID ${id} actualizado correctamente` });
        }
    );
};

module.exports = UpdateUsuario;