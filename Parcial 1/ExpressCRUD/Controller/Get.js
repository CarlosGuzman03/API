const db = require('../Config/DB');

// Obtener todos los usuarios
// En Thunder Client poner la URL http://localhost:3000/get y 
// seleccionar el método GET y esto hará una consulta a la base de datos y nos 
// devolverá todos los usuarios que hay en la tabla usuarios

const GetUsuario = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
module.exports = GetUsuario;