const db = require('../Config/DB');

// Crear un nuevo usuario
// Aquí basta con en Thunder Client poner la URL http://localhost:3000/create y 
// seleccionar el método POST, en la pestaña de Body y le mandaremos la alta del usuario en
// formato JSON como el siguiente:
// {
//     "nombre": "Carlos Guzmán",
//     "correo": "carlosg@email.com",
//     "edad": 26
// }
// y esto hará una alta en la base de datos
const PostUsuario = (req, res) => {
    console.log("Body recibido:", req.body);
    const { nombre, correo, edad } = req.body;
    db.query('INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)',
        [nombre, correo, edad],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, nombre, correo, edad });
        }
    );
}

module.exports = PostUsuario;